package main

import (
	"bytes"
	"context"
	"fmt"
	"os"
	"time"

	db "github.com/38Koo/shopping_reminder/backend/src/infra/database"
	"github.com/resend/resend-go/v2"
)

type Result struct {
	AverageConsumeRounded     float64   `bun:"average_consume_rounded"`
	AverageConsumeFloor       float64   `bun:"average_consume_floor"`
	Latest                    time.Time `bun:"latest"`
	UserID                    int       `bun:"user_id"`
	UserItemID                int       `bun:"user_item_id"`
	DaysLeftUntilNextPurchase float64   `bun:"days_left_until_next_purchase"`
	Email                     string    `bun:"email"`     // Add email field
	UserName                  string    `bun:"user_name"` // Add user_name field
	ItemName                  string    `bun:"item_name"` // Add item_name field
}

func main() {
	db := db.SetUpDB()
	defer db.Close()

	ctx := context.Background()
	var results []Result

	err := db.NewSelect().
		With("latest_purchase_date", db.NewSelect().
			ColumnExpr("MAX(purchase_date) AS latest").
			ColumnExpr("MAX(purchase_date) - MIN(purchase_date) AS term").
			Column("user_id", "user_item_id").
			Table("purchase_data_logs").
			Where("deleted_at IS NULL").
			Group("user_id", "user_item_id")).
		With("date_until_next_purchase", db.NewSelect().
			ColumnExpr("SUM(amount) AS sum_amount").
			ColumnExpr("AVG(price) AS average_price").
			Column("pdl.user_id", "pdl.user_item_id").
			TableExpr("purchase_data_logs AS pdl").
			Join("LEFT JOIN latest_purchase_date AS lpd ON pdl.user_id = lpd.user_id AND pdl.user_item_id = lpd.user_item_id").
			Where("purchase_date <> lpd.latest OR lpd.term = interval '0 hours'").
			Where("pdl.deleted_at IS NULL").
			Group("pdl.user_id", "pdl.user_item_id")).
		TableExpr("(SELECT " +
			"ROUND(CASE WHEN EXTRACT(DAY FROM lpd.term) = 0 THEN 0 ELSE SUM_AMOUNT / EXTRACT(DAY FROM lpd.term) END::numeric, 2) AS average_consume_rounded, " +
			"FLOOR(ROUND(CASE WHEN EXTRACT(DAY FROM lpd.term) = 0 THEN 0 ELSE SUM_AMOUNT / EXTRACT(DAY FROM lpd.term) END::numeric, 2)) AS average_consume_floor, " +
			"lpd.latest, lpd.user_id, lpd.user_item_id, " +
			"EXTRACT(EPOCH FROM (CURRENT_TIMESTAMP - (lpd.latest + INTERVAL '1 day' * FLOOR(ROUND(CASE WHEN EXTRACT(DAY FROM lpd.term) = 0 THEN 0 ELSE SUM_AMOUNT / EXTRACT(DAY FROM lpd.term) END::numeric, 2))))) / 86400 AS days_left_until_next_purchase, " +
			"u.email, u.name AS user_name, i.name AS item_name " + // Select email, user_name, item_name
			"FROM latest_purchase_date AS lpd " +
			"LEFT JOIN date_until_next_purchase AS dunp ON lpd.user_id = dunp.user_id AND lpd.user_item_id = dunp.user_item_id " +
			"JOIN users AS u ON lpd.user_id = u.id " +
			"JOIN items AS i ON lpd.user_item_id = i.user_item_id AND lpd.user_id = i.user_id) AS subquery").
		Where("subquery.days_left_until_next_purchase < 7").
		Scan(ctx, &results)
	if err != nil {
		fmt.Println(err)
	}

	resendApiKey := os.Getenv("RESEND_API_KEY")
	client := resend.NewClient(resendApiKey)
	emailMap := make(map[string]*bytes.Buffer)
	var buffer *bytes.Buffer

	// 上記のクエリの結果をemailでグループ化する
	for index, items := range results {
		if b, ok := emailMap[items.Email]; ok {
			buffer = b
		} else {
			buffer = new(bytes.Buffer)
			emailMap[items.Email] = buffer
			buffer.Reset()
			buffer.WriteString("It might be out of stock this week" + "\r\n")
			buffer.WriteString("<ul>" + "\r\n")
		}
		fmt.Fprintf(buffer, "<li>%.2f days left until next purchase for %s\n", items.DaysLeftUntilNextPurchase, items.ItemName + "</li>\r\n")

		// 取得したデータの中の最後の要素、またはメールアドレスが同一のitemsの中で最後の要素
		if index == len(results) - 1 || results[index + 1].Email != items.Email {
			buffer.WriteString("</ul>" + "\r\n")
		}
	}

	// メール送信
	for email, buffer := range emailMap {
		Params := &resend.SendEmailRequest{
			From:   	"onboarding@resend.dev",
			To: 			[]string{email},
			Subject:	"Shopping Reminder",
			Html: 		buffer.String(),
		}
		_, err := client.Emails.Send(Params)
		if err != nil {
			fmt.Println(err)
		}
	}
}
