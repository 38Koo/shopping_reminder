package handler

import (
	"context"
	"log"
	"net/http"
	"strconv"
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

	claims, ok := clerk.SessionFromContext(c.Request().Context())
	if !ok {
		return c.JSON(http.StatusUnauthorized, map[string]string{"message": "unauthorized"})
	}

	itemName := c.FormValue("itemName")
	stockCountStr := c.FormValue("stockCount")
	stockCount, err := strconv.Atoi(stockCountStr)
	if err != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{"message": "stockCount is invalid"})
	}
	purchaseDateStr := c.FormValue("purchaseDate")
	const layout = "Mon Jan 02 2006 15:04:05 GMT-0700"
	purchaseDateStr = strings.Split(purchaseDateStr, " (")[0] // タイムゾーンの名前を削除
	purchaseDate, err := time.Parse(layout, purchaseDateStr)
	if err != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{"message": "purchaseDate is invalid"})
	}
	// memo := c.FormValue("memo")

	userUID := claims.Subject
	ctx := context.Background()
	var user schema.User

	// ユーザーIDの取得
	err = db.NewSelect().Model(&user).Where("uuid = ?", userUID).Scan(ctx)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, map[string]string{"message": "Internal Server Error"})
	}

	item := &schema.Item{
		UserID: user.ID,
    Name: itemName,
    Stock: int32(stockCount),
    LastPurchaseDate: purchaseDate,
	}

	_, err = db.NewInsert().Model(item).Exec(ctx)
	if err != nil {
		log.Fatal(err)
	}

	return c.JSON(http.StatusOK, nil)
}