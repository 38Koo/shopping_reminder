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

func DeleteItem(c echo.Context) error {

	db := db.SetUpDB()
	defer db.Close()

	tx, err := db.Begin()
	if err != nil {
		fmt.Println(err)
		return c.JSON(http.StatusInternalServerError, map[string]string{"message": "Internal Server Error"})
	}
	
	defer func() {
		if err != nil {
			if rollbackErr := tx.Rollback(); rollbackErr != nil {
				fmt.Println(rollbackErr)
			}
			return
		}
		
		if commitErr := tx.Commit(); commitErr != nil {
			fmt.Println(commitErr)
		}
	}()

	claims, ok := clerk.SessionFromContext(c.Request().Context())
	if !ok {
			return c.JSON(http.StatusUnauthorized, map[string]string{"message": "unauthorized"})
	}

	userUID := claims.Subject
	ctx := context.Background()

	var item schema.Items
	var logs schema.PurchaseDataLogs
	var user schema.Users

	userItemIDStr := c.Param("itemID")
	userItemID,err := strconv.ParseInt(userItemIDStr, 10, 64)
	if err != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{"message": "itemID is invalid"})
	}

	subQuery := db.NewSelect().Model(&user).Column("id").Where("uuid = (?)", userUID)

	_, err = db.NewDelete().
		Model(&logs).
		Where("user_item_id = (?)", userItemID).
		Where("user_id = (?)", subQuery).
		Exec(ctx)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, map[string]string{"message": "failed to delete log"})
	}

	_, err = db.NewDelete().
		Model(&item).
		Where("id = (?)", userItemID).
		Where("user_id = (?)", subQuery).
		Exec(ctx)

	if err != nil {
		return c.JSON(http.StatusInternalServerError, map[string]string{"message": "failed to delete item"})
	}

	return nil
}