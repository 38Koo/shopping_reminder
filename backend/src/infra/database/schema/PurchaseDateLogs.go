package schema

import (
	"time"

	"github.com/uptrace/bun"
)

type PurchaseDataLogs struct {
	bun.BaseModel `bun:"table:purchase_data_logs,alias:pdl"`
	ID 								int64       `bun:"id,autoincrement,pk,notnull"`
	ItemID 					  int64       `bun:"item_id,notnull"`
	UserID 					  int64       `bun:"user_id,notnull"`
	PurchaseDate  		time.Time   `bun:"purchase_date,notnull" json:"purchaseDate"`
	Amount 						int64			  `bun:"amount"`
	Price 						int64			  `bun:"price,notnull"`
	CreatedAt         time.Time   `bun:"default:current_timestamp"`
	UpdatedAt         time.Time   `bun:",nullzero"`
	DeletedAt         time.Time   `bun:",soft_delete,nullzero"`
}