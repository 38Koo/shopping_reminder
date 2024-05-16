package handler

import (
	"context"
	"database/sql"
	"fmt"
	"net/http"

	db "github.com/38Koo/shopping_reminder/backend/src/infra/database"
	"github.com/38Koo/shopping_reminder/backend/src/infra/database/schema"
	"github.com/clerkinc/clerk-sdk-go/clerk"
	"github.com/labstack/echo/v4"
)

func AddItem(c echo.Context) error {
	db := db.SetUpDB()
	defer db.Close()

	claims, ok := clerk.SessionFromContext(c.Request().Context())
	if !ok {
		return c.JSON(http.StatusUnauthorized, map[string]string{"message": "unauthorized"})
	}

	var item *schema.Item
	if err := c.Bind(&item);err != nil {
		fmt.Println(err)
		return err
	}

	// const layout = "Mon Jan 02 2006 15:04:05 GMT-0700"
	// purchaseDateStr := item.LastPurchaseDate.Format(layout)
	// purchaseDateStr = strings.Split(purchaseDateStr, " (")[0]
	// purchaseDate, err := time.Parse(layout, purchaseDateStr)
	// if err != nil {
	// 	fmt.Println(err)
	// 	return c.JSON(http.StatusBadRequest, map[string]string{"message": "purchaseDate is invalid"})
	// }

	userUID := claims.Subject
	ctx := context.Background()
	var user schema.User

	// ユーザーIDの取得
	err := db.NewSelect().Model(&user).Where("uuid = ?", userUID).Scan(ctx)
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

	item = &schema.Item{
		Name: item.Name,
		Stock: item.Stock,
		Memo: item.Memo,
		UserID: user.ID,
		UserItemID: maxItemID.UserItemID + 1,
	}

	_, err = db.NewInsert().Model(item).Exec(ctx)
	if err != nil {
		fmt.Println(err)
		return c.JSON(http.StatusInternalServerError, map[string]string{"message": "Internal Server Error"})
	}

	return c.JSON(http.StatusOK, nil)
}