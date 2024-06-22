package handler

import (
	"context"
	"fmt"
	"net/http"
	"strings"
	"time"

	db "github.com/38Koo/shopping_reminder/backend/src/infra/database"
	"github.com/38Koo/shopping_reminder/backend/src/infra/database/schema"
	"github.com/clerkinc/clerk-sdk-go/clerk"
	"github.com/labstack/echo/v4"
	"github.com/uptrace/bun"
)

type ReportItemFromRequest struct {
	UserItemID				  int64  		`json:"itemID"`
	PurchaseDate  			time.Time `json:"PurchaseDate"`
	PurchaseAmount 			int64     `json:"PurchaseAmount"`
	Price 							int64     `json:"Price"`
	PurchaseCount 			int64     `json:"PurchaseCount"`
}

type RequestBodyForReportSubmit struct {
	Report []ReportItemFromRequest `json:"report"`
}

type maxCount struct {
	ID int64				`bun:"item_id"`
	MaxCount int64	`bun:"max"`
}

func SubmitReport(c echo.Context) error {
	db := db.SetUpDB()
	defer db.Close()
	
	claims, ok := clerk.SessionFromContext(c.Request().Context())
	if !ok {
			return c.JSON(http.StatusUnauthorized, map[string]string{"message": "unauthorized"})
	}

	var reqBody *RequestBodyForReportSubmit
	if err := c.Bind(&reqBody); err != nil {
		fmt.Println(err)
		return err
	}

	if len(reqBody.Report) == 0 {
		return c.JSON(http.StatusBadRequest, map[string]string{"message": "report is empty"})
	}

	userUID := claims.Subject

	ctx := context.Background()

	var logs []schema.PurchaseDataLogs
	var user schema.Users
	
	err := db.NewSelect().Model(&user).Where("uuid = ?", userUID).Scan(ctx)
	if err != nil {
		fmt.Println(err)
		return c.JSON(http.StatusInternalServerError, map[string]string{"message": "internal server error"})
	}

	var userItemIDs []int64

	for _, report := range reqBody.Report {
	    userItemIDs = append(userItemIDs, report.UserItemID)
	}
	var item []maxCount
	err = db.NewSelect().
		Model(&item).
		ModelTableExpr("purchase_data_logs AS pdl").
		ColumnExpr("item_id, max(purchasecount)").
		Where("item_id IN (?)", bun.In(userItemIDs)).
		Group("item_id","user_id").
		Scan(ctx)
		
	if err != nil {
		fmt.Println(err)
		return c.JSON(http.StatusInternalServerError, map[string]string{"message": "internal server error"})
	}

	for i, log := range reqBody.Report {
		var purchaseDate time.Time
		var amount int64
		var price int64
		const layout = "Mon Jan 02 2006 15:04:05 GMT-0700"
		location, err := time.LoadLocation("Asia/Tokyo")
		if err != nil {
			fmt.Println(err)
			return c.JSON(http.StatusBadRequest, map[string]string{"message": "purchaseDate is invalid"})
		}

		purchaseDateStr := log.PurchaseDate
		if purchaseDateStr.IsZero() {
			purchaseDate = time.Now()
			purchaseDate = time.Date(purchaseDate.Year(), purchaseDate.Month(), purchaseDate.Day(), 0, 0, 0, 0, purchaseDate.Location())
		} else {
			FormattedPurchaseDateStr := purchaseDateStr.Format(layout)
			FormattedPurchaseDateStr = strings.Split(FormattedPurchaseDateStr, " (")[0]
			purchaseDate, err = time.Parse(layout, FormattedPurchaseDateStr)
			if err != nil {
				fmt.Println(err)
				return c.JSON(http.StatusBadRequest, map[string]string{"message": "purchaseDate is invalid"})
			}
		}

		purchaseDate = purchaseDate.In(location)
		purchaseDate = time.Date(purchaseDate.Year(), purchaseDate.Month(), purchaseDate.Day(), 0, 0, 0, 0, purchaseDate.Location())
		
		amount = log.PurchaseAmount
		price = log.Price

		log := schema.PurchaseDataLogs{
			ItemID: item[i].ID,
			PurchaseDate: purchaseDate,
			Amount: amount,
			Price: price,
			UserID: user.ID,
		}

		logs = append(logs, log)

	}

	_, err = db.NewInsert().Model(&logs).Exec(ctx)
	if err != nil {
		fmt.Println(err)
		return c.JSON(http.StatusInternalServerError, map[string]string{"message": "internal server error"})
	}

	return c.JSON(http.StatusOK, map[string]string{"message": "success"})
}