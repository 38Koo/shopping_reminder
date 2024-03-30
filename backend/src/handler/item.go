package handler

import (
	"context"
	"fmt"
	"log"
	"net/http"

	"github.com/38Koo/shopping_reminder/backend/src/auth"
	db "github.com/38Koo/shopping_reminder/backend/src/infra/database"
	"github.com/38Koo/shopping_reminder/backend/src/infra/database/schema"

	"github.com/labstack/echo/v4"
)

func GetItems(c echo.Context) error {
	fmt.Println("oh...........Yeah!!!!!!!!!!!!!!!!!")
	db := db.SetUpDB()
	uid := auth.GetUserIDFromToken(c)
	ctx := context.Background()
	var user schema.User
	var items []schema.Item

	err := db.NewSelect().Model((&user)).Where("uuid", uid).Scan(ctx);
	if err != nil {
		log.Fatal(err)
	}

	err = db.NewSelect().Model(&items).Where("user_id", user.ID).Scan(ctx)
	if err != nil {
		log.Fatal(err)
	}
	return c.JSON(http.StatusOK, items)
}