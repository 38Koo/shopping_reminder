package handler

import (
	"context"
	"fmt"
	"net/http"

	db "github.com/38Koo/shopping_reminder/backend/src/infra/database"
	"github.com/38Koo/shopping_reminder/backend/src/infra/database/schema"
	"github.com/clerkinc/clerk-sdk-go/clerk"
	"github.com/labstack/echo/v4"
)

func EditLog(c echo.Context) error {
	db := db.SetUpDB()
	defer db.Close()

	claims, ok := clerk.SessionFromContext(c.Request().Context())
	if !ok {
		return c.JSON(http.StatusUnauthorized, map[string]string{"message": "unauthorized"})
	}

	useUID := claims.Subject
	fmt.Println(useUID)
	ctx := context.Background()
	
	var log schema.PurchaseDataLogs
	if err := c.Bind(&log); err != nil {
		fmt.Println(err)
		return err
	}

	_, err := db.NewUpdate().
		Column("purchase_date", "amount", "price").
		Model(&log).
		WherePK().
		Exec(ctx)
	if err != nil {
		fmt.Println(err)
		return c.JSON(http.StatusInternalServerError, map[string]string{"message": "Internal Server Error"})
	}

	return nil

}