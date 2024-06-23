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

type RequestBodyForAddItem struct {
	ID 									int64  `json:"id"`
	UserItemID				  int64
	UserID              int64
	Name                string `json:"itemName"`
	Stock               int64  `json:"stockCount"`
	Price 						 	int64  `json:"price"`
	Memo							  string
	PurchaseDate  			time.Time
}

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
	
	var reqBody *RequestBodyForAddItem
	if err := c.Bind(&reqBody);err != nil {
		fmt.Println(err)
		return err
	}

	var purchaseDate time.Time
	const layout = "Mon Jan 02 2006 15:04:05 GMT-0700"
	location, err := time.LoadLocation("Asia/Tokyo")
	if err != nil {
		fmt.Println(err)
		return c.JSON(http.StatusBadRequest, map[string]string{"message": "purchaseDate is invalid"})
	}
	if reqBody.PurchaseDate.IsZero() {
		purchaseDate = time.Now()
		purchaseDate = time.Date(purchaseDate.Year(), purchaseDate.Month(), purchaseDate.Day(), 0, 0, 0, 0, purchaseDate.Location())
	} else {
		purchaseDateStr := reqBody.PurchaseDate.Format(layout)
		purchaseDateStr = strings.Split(purchaseDateStr, " (")[0]
		purchaseDate, err = time.Parse(layout, purchaseDateStr)
		if err != nil {
			fmt.Println(err)
			return c.JSON(http.StatusBadRequest, map[string]string{"message": "purchaseDate is invalid"})
		}
	}
	purchaseDate = purchaseDate.In(location)
	purchaseDate = time.Date(purchaseDate.Year(), purchaseDate.Month(), purchaseDate.Day(), 0, 0, 0, 0, purchaseDate.Location())

	userUID := claims.Subject
	ctx := context.Background()
	var user schema.Users 

	// ユーザーIDの取得
	err = db.NewSelect().Model(&user).Where("uuid = ?", userUID).Scan(ctx)
	if err != nil {
		fmt.Println(err)
		return c.JSON(http.StatusInternalServerError, map[string]string{"message": "Internal Server Error"})
	}

	// userID毎のitemIDの最大値を取得
	var maxItemID schema.Items
	err = db.NewSelect().
		Model(&maxItemID).
		Where("user_id = ?", user.ID).
		WhereAllWithDeleted().
		Order("user_item_id DESC").
		Limit(1).
		Scan(ctx)
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
	} else {
		maxItemID.UserItemID += 1
	}

	item := &schema.Items{
		Name: reqBody.Name,
		Stock: reqBody.Stock,
		Memo: reqBody.Memo,
		UserID: user.ID,
		UserItemID: maxItemID.UserItemID,
	}

	_, err = tx.NewInsert().
		Model(item).
		Returning("user_item_id").
		Exec(ctx)
	if err != nil {
		fmt.Println(err)
		return c.JSON(http.StatusInternalServerError, map[string]string{"message": "Internal Server Error"})
	}

	purchaseDateLogs := &schema.PurchaseDataLogs{
	 UserItemID: item.UserItemID,
	 UserID: user.ID,
	 PurchaseDate: purchaseDate,
	 Price: reqBody.Price,
	 Amount: reqBody.Stock,
 }
	_, err = tx.NewInsert().
		Model(purchaseDateLogs).
		Exec(ctx)
	if err != nil {
		fmt.Println(err)
		return c.JSON(http.StatusInternalServerError, map[string]string{"message": "Internal Server Error"})
	}

	return c.JSON(http.StatusOK, nil)
}