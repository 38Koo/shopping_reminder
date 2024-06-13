package schema

import (
	"time"

	"github.com/uptrace/bun"
)

type PurchaseDataLogs struct {
	bun.BaseModel `bun:"table:purchase_data_logs,alias:pdl"`
	ItemID 					  int64       `bun:"item_id,pk,notnull"`
	UserID 					  int64       `bun:"user_id,pk,notnull"`
	PurchaseCount 		int64			  `bun:"purchasecount,pk,notnull"`
	PurchaseDate  		time.Time   `bun:"purchasedate" json:"purchaseDate"`
	Amount 						int64			  `bun:"amount"`
	Price 						int64			  `bun:"price,notnull"`
	CreatedAt         time.Time   
	UpdatedAt         time.Time   `bun:",nullzero"`
	DeletedAt         time.Time   `bun:",soft_delete,nullzero"`
}