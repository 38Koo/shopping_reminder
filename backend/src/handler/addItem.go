package handler

import (
	"context"
	"database/sql"
	"fmt"
	"net/http"
	"strings"
	"time"

	db "github.com/38Koo/shopping_reminder/backend/src/infra/database"
	"github.com/38Koo/shopping_reminder/backend/src/infra/database/schema"
	"github.com/clerkinc/clerk-sdk-go/clerk"
	"github.com/labstack/echo/v4"
)

func AddItem(c echo.Context) error {
	db := db.SetUpDB()
	defer db.Close()

	tx, err := db.Begin()
	if err != nil {
		fmt.Println(err)
		return c.JSON(http.StatusInternalServerError, map[string]string{"message": "Internal Server Error"})
	}

	defer func() {
		if err != nil {
			if rollbackErr := tx.Rollback(); rollbackErr != nil {
				fmt.Println(rollbackErr)
			}
			return
		}

		if commitErr := tx.Commit(); commitErr != nil {
			fmt.Println(commitErr)
		}
	}()

	claims, ok := clerk.SessionFromContext(c.Request().Context())
	if !ok {
		return c.JSON(http.StatusUnauthorized, map[string]string{"message": "unauthorized"})
	}

	var item *schema.Item
	if err := c.Bind(&item);err != nil {
		fmt.Println(err)
		return err
	}
	var purchaseDate time.Time
	var purchaseDateLogs *schema.PurchaseDataLogs
	if err := c.Bind(&purchaseDateLogs);err != nil {
		fmt.Println(err)
		purchaseDateLogs.PurchaseDate = time.Now()
	} else {		
		const layout = "Mon Jan 02 2006 15:04:05 GMT-0700"
		purchaseDateStr := purchaseDateLogs.PurchaseDate.Format(layout)
		purchaseDateStr = strings.Split(purchaseDateStr, " (")[0]
		purchaseDate, err = time.Parse(layout, purchaseDateStr)
		if err != nil {
			fmt.Println(err)
			return c.JSON(http.StatusBadRequest, map[string]string{"message": "purchaseDate is invalid"})
		}
	}
	today := time.Now()
	untilNextTimeByDays := int32(purchaseDate.Sub(today).Hours() / 24)

	userUID := claims.Subject
	ctx := context.Background()
	var user schema.User 

	// ユーザーIDの取得
	err = db.NewSelect().Model(&user).Where("uuid = ?", userUID).Scan(ctx)
	if err != nil {
		fmt.Println(err)
		return c.JSON(http.StatusInternalServerError, map[string]string{"message": "Internal Server Error"})
	}

	// userID毎のitemIDの最大値を取得
	var maxItemID schema.Item
	err = db.NewSelect().Model(&maxItemID).Where("user_id = ?", user.ID).Order("user_item_id DESC").Limit(1).Scan(ctx)
	if err != nil {
		if err.Error() == sql.ErrNoRows.Error() {
			maxItemID.UserItemID = 0
		} else {
			fmt.Println(err)
			return c.JSON(http.StatusInternalServerError, map[string]string{"message": "Internal Server Error"})
		}
	}
	if maxItemID.UserItemID == 0 {
		maxItemID.UserItemID = 1
	}
	
	var maxPurchaseLogsID schema.PurchaseDataLogs
	err = db.NewSelect().Model(&purchaseDateLogs).Where("user_id = ?", user.ID).Where("item_id = ?", item.ID).Order("id DESC").Limit(1).Scan(ctx)
	if err != nil {
		if err.Error() == sql.ErrNoRows.Error() {
			maxPurchaseLogsID.PurchaseCount = 0
		} else {
			fmt.Println(err)
			return c.JSON(http.StatusInternalServerError, map[string]string{"message": "Internal Server Error"})
		}
	}

	if maxPurchaseLogsID.PurchaseCount == 0 {
		maxPurchaseLogsID.PurchaseCount = 1
	}
	
	item = &schema.Item{
		Name: item.Name,
		Stock: item.Stock,
		Memo: item.Memo,
		UserID: user.ID,
		UserItemID: maxItemID.UserItemID + 1,
		LatestReminder: false,
		UntilNextTimeByDays: untilNextTimeByDays,
	}

	purchaseDateLogs = &schema.PurchaseDataLogs{
 		ItemID: maxItemID.UserItemID,
		PurchaseDate: purchaseDate,
		PurchaseCount: maxPurchaseLogsID.PurchaseCount + 1,
	}

	_, err = tx.NewInsert().Model(item).Exec(ctx)
	if err != nil {
		fmt.Println(err)
		return c.JSON(http.StatusInternalServerError, map[string]string{"message": "Internal Server Error"})
	}

	_, err = tx.NewInsert().Model(purchaseDateLogs).Exec(ctx)
	if err != nil {
		fmt.Println(err)
		return c.JSON(http.StatusInternalServerError, map[string]string{"message": "Internal Server Error"})
	}

	return c.JSON(http.StatusOK, nil)
}