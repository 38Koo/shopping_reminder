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
	return c.JSON(http.StatusOK, items)
}