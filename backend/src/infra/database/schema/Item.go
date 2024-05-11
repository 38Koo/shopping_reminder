package schema

import (
	"time"

	"github.com/uptrace/bun"
)

type Item struct {
    bun.BaseModel `bun:"table:items,alias:i"`
    ID                int64       `bun:"id,pk,autoincrement"`
		Name              string      `bun:"name,notnull" json:"itemName"`
		Stock             int32       `bun:"stock,notnull" json:"stockCount"`
		LastPurchaseDate  time.Time   `bun:"lastpurchasedate"`
		Memo							string      `bun:"memo"`
		UsageDuration     int32       `bun:"usageduration"`
		CreatedAt         time.Time   
		UpdatedAt         time.Time   `bun:",nullzero"`
		DeletedAt         time.Time   `bun:",soft_delete,nullzero"`
		UserItemID				int64       `bun:"user_item_id"`
		UserID            int64       `bun:"user_id"`
}
