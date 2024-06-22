package handler

import (
	"context"
	"fmt"
	"net/http"
	"strconv"
	"time"

	db "github.com/38Koo/shopping_reminder/backend/src/infra/database"
	"github.com/38Koo/shopping_reminder/backend/src/infra/database/schema"
	"github.com/clerkinc/clerk-sdk-go/clerk"
	"github.com/labstack/echo/v4"
)

type editLogRequest struct {
	PurchaseCount int64     `bun:"purchasecount,pk,notnull"`
	PurchaseDate  time.Time `bun:"purchasedate" json:"purchaseDate"`
	Price         int64     `bun:"price,notnull"`
	Amount        int64			`bun:"amount"`	
}

func EditLog(c echo.Context) error {
	db := db.SetUpDB()
	defer db.Close()

	claims, ok := clerk.SessionFromContext(c.Request().Context())
	if !ok {
		return c.JSON(http.StatusUnauthorized, map[string]string{"message": "unauthorized"})
	}

	itemIDStr := c.Param("itemID")
	itemID, err := strconv.ParseInt(itemIDStr, 10, 64)
	if err != nil {
		fmt.Println(err)
		return c.JSON(http.StatusBadRequest, map[string]string{"message": "itemID is invalid"})
	}

	useUID := claims.Subject
	fmt.Println(useUID)
	ctx := context.Background()
	
	var log editLogRequest
	if err := c.Bind(&log); err != nil {
		fmt.Println(err)
		return err
	}

	user := schema.Users{
		UUID: useUID,
	}
	

	subQuery := db.NewSelect().Column("id").Model(&user).Where("uuid = ?", useUID)
	_,err = db.NewUpdate().
		Column("purchasedate", "amount", "price").
		ModelTableExpr("purchase_data_logs AS pdl").
		Model(&log).
		Where("item_id = (?)", itemID).
		Where("purchasecount = (?)", log.PurchaseCount).
		Where("user_id = (?)", subQuery).
		Exec(ctx)
	if err != nil {
		fmt.Println(222)
		fmt.Println(err)
		return c.JSON(http.StatusInternalServerError, map[string]string{"message": "Internal Server Error"})
	}

	return nil

}