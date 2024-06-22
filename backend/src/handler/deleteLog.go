package handler

import (
	"context"
	"net/http"
	"strconv"

	db "github.com/38Koo/shopping_reminder/backend/src/infra/database"
	"github.com/38Koo/shopping_reminder/backend/src/infra/database/schema"
	"github.com/labstack/echo/v4"
)

func DeleteLog(c echo.Context) error {

	db := db.SetUpDB()
	defer db.Close()



	ctx := context.Background()

	var log schema.PurchaseDataLogs

	logIDStr := c.Param("logID")
	logID, err := strconv.ParseInt(logIDStr, 10, 64)
	if err != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{"message": "purchaseCount is invalid"})
	}

	log = schema.PurchaseDataLogs{
		ID: logID,
	}

 	_, err = db.NewDelete().
 		Model(&log).
		WherePK().
		Exec(ctx)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, map[string]string{"message": "failed to delete log"})
	}

	return nil
}
