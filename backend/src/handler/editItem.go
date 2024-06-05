package handler

import (
	"context"
	"fmt"
	"net/http"
	"strconv"

	db "github.com/38Koo/shopping_reminder/backend/src/infra/database"
	"github.com/38Koo/shopping_reminder/backend/src/infra/database/schema"
	"github.com/clerkinc/clerk-sdk-go/clerk"
	"github.com/labstack/echo/v4"
)

func EditItem(c echo.Context) error {
	db := db.SetUpDB()
	defer db.Close()

	claims, ok := clerk.SessionFromContext(c.Request().Context())
	if !ok {
		return c.JSON(http.StatusUnauthorized, map[string]string{"message": "unauthorized"})
	}

	var item *schema.Item
	if err := c.Bind(&item);err != nil {
		return err
	}

	// itemIDをreqPathから取得
	userItemIDStr := c.Param("itemID")
	userItemID, err := strconv.ParseInt(userItemIDStr, 10, 64)
	if err != nil {
		fmt.Println(err)
		return c.JSON(http.StatusBadRequest, map[string]string{"message": "itemID is invalid"})
	}

	userUID := claims.Subject
	ctx := context.Background()
	var user schema.User

	// userIDを取得
	err = db.NewSelect().Model(&user).Where("uuid = ?", userUID).Scan(ctx)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, map[string]string{"message": "Internal Server Error"})
	}	

	item = &schema.Item{
		Name: item.Name,
		Memo: item.Memo,
		UserItemID: userItemID,
		UserID: user.ID,
	}

	// where句にitemIDを追加
	_, err = db.NewUpdate().Column("name", "memo").Model(item).WherePK().Exec(ctx)	
	if err != nil {
		return c.JSON(http.StatusInternalServerError, map[string]string{"message": "Internal Server Error"})
	}

	return c.JSON(http.StatusOK, nil)
}