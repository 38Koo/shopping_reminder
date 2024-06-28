package handler

import (
	"context"
	"database/sql"
	"fmt"
	"math"
	"net/http"
	"time"

	db "github.com/38Koo/shopping_reminder/backend/src/infra/database"
	"github.com/38Koo/shopping_reminder/backend/src/infra/database/schema"

	"github.com/clerkinc/clerk-sdk-go/clerk"
	"github.com/labstack/echo/v4"
)

type LogSummary struct {
	AveragePrice   						float64 
	AverageConsume 						float64 
	DaysLeftUntilNextPurchase int	
	Latest									  time.Time
	UserID 										int
	UserItemID 								int
}

type ItemWithLogSummary struct {
	Item       schema.Items `json:"item"`
	LogSummary LogSummary		`json:"logSummary"`
}

func GetItemList(c echo.Context) error {
	db := db.SetUpDB()
	defer db.Close()

	claims, ok := clerk.SessionFromContext(c.Request().Context())
	if !ok {
  	return c.JSON(http.StatusUnauthorized, map[string]string{"message": "unauthorized"})
	}

	userUID := claims.Subject

	ctx := context.Background()
	var user schema.Users
	var items []schema.Items
	var logSummary LogSummary
	// var itemWithLogSummary []ItemWithLogSummary

	err := db.NewSelect().Model(&user).Where("uuid = ?", userUID).Scan(ctx);
	if err != nil {
		fmt.Println(err)
		return c.JSON(http.StatusInternalServerError, map[string]string{"message": "Internal Server Error"})
	}

	err = db.NewSelect().Model(&items).Where("user_id = ?", user.ID).Scan(ctx)
	if err != nil {
		if err.Error() == sql.ErrNoRows.Error() {
			return c.JSON(http.StatusOK, items)
		}
		fmt.Println(err)
		return c.JSON(http.StatusInternalServerError, map[string]string{"message": "Internal Server Error"})
	}

	// 最新の購入日と、今までの合計期間
	latestPurchaseDate := db.NewSelect().
		ColumnExpr("Max(purchase_date) as latest, Max(purchase_date) - Min(purchase_date) as term, user_id, user_item_id").
		TableExpr("purchase_data_logs as pdl").
		Where("user_id = ?", user.ID).
		GroupExpr("user_id").
		GroupExpr("user_item_id")

	// 最新購入日 - 1 までの価格の合計
	dateUntilNextPurchase := db.NewSelect().
		ColumnExpr("Sum(amount) as sum_amount, AVG(price) as average_price, pdl.user_id, pdl.user_item_id").
		TableExpr("purchase_data_logs as pdl").
		Join("LEFT JOIN latest_purchase_date as lpd").
		JoinOn("pdl.user_id = lpd.user_id").
		JoinOn("pdl.user_item_id = lpd.user_item_id").
		Where("pdl.user_id = ?", user.ID).
		Where("purchase_date <> lpd.latest").
		GroupExpr("pdl.user_id").
		GroupExpr("pdl.user_item_id")

	// 2つを結合
	err = db.NewSelect().
		With("latest_purchase_date", latestPurchaseDate).
		With("date_until_next_purchase", dateUntilNextPurchase).
		Model(&logSummary).
		ModelTableExpr("latest_purchase_date as lpd").
		ColumnExpr("sum_amount / (EXTRACT(DAY FROM term)) as average_consume, average_price, latest, lpd.user_id, lpd.user_item_id").
		Join("LEFT JOIN date_until_next_purchase as dunp").
		JoinOn("lpd.user_id = dunp.user_id").
		JoinOn("lpd.user_item_id = dunp.user_item_id").
		Scan(ctx)
	if err != nil {
		if err.Error() == sql.ErrNoRows.Error() {
			return c.JSON(http.StatusOK, items)
		}
		fmt.Println(err)
		return c.JSON(http.StatusInternalServerError, map[string]string{"message": "Internal Server Error"})
	}

	averageConsume := math.Round(logSummary.AverageConsume* 100)/ 100
	daysLeftUntilNextPurchase := time.Since(logSummary.Latest.AddDate(0, 0, int(math.Floor(averageConsume)))).Hours() / 24 
	fmt.Println(daysLeftUntilNextPurchase)
	fmt.Println(logSummary.Latest.AddDate(0, 0, int(math.Floor(averageConsume))))
	
	fmt.Println(logSummary)

	logSummary = LogSummary{
		AveragePrice: logSummary.AveragePrice,
		AverageConsume: averageConsume,
		DaysLeftUntilNextPurchase: int(daysLeftUntilNextPurchase),
		Latest: logSummary.Latest,
		UserID: logSummary.UserID,
		UserItemID: logSummary.UserItemID,
	}

	fmt.Println(logSummary)
	
	return c.JSON(http.StatusOK, items)
}