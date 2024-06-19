package handler

import (
	"context"
	"net/http"
	"strconv"

	db "github.com/38Koo/shopping_reminder/backend/src/infra/database"
	"github.com/38Koo/shopping_reminder/backend/src/infra/database/schema"
	"github.com/clerkinc/clerk-sdk-go/clerk"
	"github.com/labstack/echo/v4"
)

func DeleteLog(c echo.Context) error {

	db := db.SetUpDB()
	defer db.Close()

	claims, ok := clerk.SessionFromContext(c.Request().Context())
	if !ok {
			return c.JSON(http.StatusUnauthorized, map[string]string{"message": "unauthorized"})
	}

	userUID := claims.Subject
	ctx := context.Background()

	var log schema.PurchaseDataLogs
	var user schema.User

	userItemIDStr := c.Param("itemID")
	userItemID,err := strconv.ParseInt(userItemIDStr, 10, 64)
	if err != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{"message": "itemID is invalid"})
	}
	purchaseCountStr := c.Param("purchaseCount")
	purchaseCount, err := strconv.ParseInt(purchaseCountStr, 10, 64)
	if err != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{"message": "purchaseCount is invalid"})
	}

	log = schema.PurchaseDataLogs{
		ItemID: userItemID,
		PurchaseCount: purchaseCount,
	}

	subQuery := db.NewSelect().Column("id").Model(&user).Where("uuid = (?)", userUID)

 	_, err = db.NewDelete().
 		Model(&log).
		Where("item_id = (?)", log.ItemID).
		Where("purchaseCount = (?)", log.PurchaseCount).
		Where("user_id = (?)", subQuery).
		Exec(ctx)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, map[string]string{"message": "failed to delete log"})
	}

	return nil
}
