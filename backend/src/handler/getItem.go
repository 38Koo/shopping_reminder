package handler

import (
	"context"
	"fmt"
	"log"
	"net/http"
	"strconv"

	db "github.com/38Koo/shopping_reminder/backend/src/infra/database"
	"github.com/38Koo/shopping_reminder/backend/src/infra/database/schema"

	"github.com/clerkinc/clerk-sdk-go/clerk"
	"github.com/labstack/echo/v4"
)

func GetItem(c echo.Context) error {
	db := db.SetUpDB()
	defer db.Close()

	claims, ok := clerk.SessionFromContext(c.Request().Context())
	if !ok {
  	return c.JSON(http.StatusUnauthorized, map[string]string{"message": "unauthorized"})
	}

	userUID := claims.Subject

	ctx := context.Background()
	var user schema.User
	var item schema.Item
	userItemIDStr := c.Param("itemID")
	userItemID, err := strconv.ParseInt(userItemIDStr, 10, 64)
	if err != nil {
		fmt.Println(err)
		return c.JSON(http.StatusBadRequest, map[string]string{"message": "itemID is invalid"})
	}

	err = db.NewSelect().
		Model(&user).
		Where("uuid = ?", userUID).
		Scan(ctx);
	if err != nil {
		fmt.Println(err)
		log.Fatal(err)
	}

	err = db.NewSelect().
    Model(&item).
    Relation("Logs").
    Where("i.user_id = ?", user.ID).
		Where("i.user_item_id = ?", userItemID).
    Scan(ctx)
	if err != nil {
		fmt.Println(err)
		log.Fatal(err)
	}

	return c.JSON(http.StatusOK, item)
}