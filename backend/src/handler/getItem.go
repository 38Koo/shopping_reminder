package handler

import (
	"context"
	"database/sql"
	"fmt"
	"net/http"
	"strconv"

	db "github.com/38Koo/shopping_reminder/backend/src/infra/database"
	"github.com/38Koo/shopping_reminder/backend/src/infra/database/schema"
	"github.com/uptrace/bun"

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
	var items schema.Items
	userItemIDStr := c.Param("itemID")
	userItemID, err := strconv.ParseInt(userItemIDStr, 10, 64)
	if err != nil {
		fmt.Println(err)
		return c.JSON(http.StatusBadRequest, map[string]string{"message": "itemID is invalid"})
	}

	err = db.NewSelect().
    Model(&items).
		Where("user_item_id = ?", userItemID).
		Relation("Users", func(q * bun.SelectQuery) *bun.SelectQuery {
			return q.Where("uuid = ?", userUID)
		}).
		Relation("Logs").
    Scan(ctx)
	if err != nil {
		fmt.Println(err)
		if err.Error() == sql.ErrNoRows.Error() {
			return c.JSON(http.StatusNotFound, map[string]string{"message": "item not found"})
		}
		return c.JSON(http.StatusInternalServerError, map[string]string{"message": "Internal Server Error"})
	}

	return c.JSON(http.StatusOK, items)
}