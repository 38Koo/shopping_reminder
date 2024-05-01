package handler

import (
	"context"
	"log"
	"net/http"

	db "github.com/38Koo/shopping_reminder/backend/src/infra/database"
	"github.com/38Koo/shopping_reminder/backend/src/infra/database/schema"

	"github.com/clerkinc/clerk-sdk-go/clerk"
	"github.com/labstack/echo/v4"
)

func GetItems(c echo.Context) error {
	db := db.SetUpDB()
	defer db.Close()

	claims, ok := clerk.SessionFromContext(c.Request().Context())
	if !ok {
  	return c.JSON(http.StatusUnauthorized, map[string]string{"message": "unauthorized"})
	}

	userUID := claims.Subject

	ctx := context.Background()
	var user schema.User
	var items []schema.Item

	err := db.NewSelect().Model(&user).Where("uuid = ?", userUID).Scan(ctx);
	if err != nil {
		log.Fatal(err)
	}

	err = db.NewSelect().Model(&items).Where("user_id = ?", user.ID).Scan(ctx)
	if err != nil {
		log.Fatal(err)
	}
	return c.JSON(http.StatusOK, items)
}