package handler

import (
	"context"
	"net/http"

	db "github.com/38Koo/shopping_reminder/backend/src/infra/database"
	"github.com/38Koo/shopping_reminder/backend/src/infra/database/schema"
	"github.com/clerkinc/clerk-sdk-go/clerk"
	"github.com/labstack/echo/v4"
	"github.com/uptrace/bun"
)

func GetReportList(c echo.Context) error {
	db := db.SetUpDB()
	defer db.Close()

	claims, ok := clerk.SessionFromContext(c.Request().Context())
	if !ok {
		return c.JSON(http.StatusUnauthorized, map[string]string{"message": "unauthorized"})
	}

	userUID := claims.Subject
	
	ctx := context.Background()
	var items []schema.Items

	err := db.NewSelect().
		Model(&items).
		Relation("Users", func(q *bun.SelectQuery) *bun.SelectQuery {
			return q.Where("uuid = ?", userUID)
		}).
		Scan(ctx)

	if err != nil {
		return c.JSON(http.StatusInternalServerError, map[string]string{"message": "Internal Server Error"})
	}

	return c.JSON(http.StatusOK, items)
}