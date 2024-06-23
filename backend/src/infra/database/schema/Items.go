package schema

import (
	"time"

	"github.com/uptrace/bun"
)

type Items struct {
    bun.BaseModel `bun:"table:items,alias:i"`
    ID                  int64               `bun:"id,autoincrement,notnull"`
		UserItemID				  int64               `bun:"user_item_id,pk,notnull"`
		UserID              int64               `bun:"user_id,pk,notnull"`
		Name                string              `bun:"name,notnull" json:"itemName"`
		Stock               int64               `bun:"stock,notnull" json:"stockCount"`
		Memo							  string              `bun:"memo"`
		CreatedAt           time.Time           `bun:"default:current_timestamp"`
		UpdatedAt           time.Time           `bun:",nullzero"`
		DeletedAt           time.Time           `bun:",soft_delete,nullzero"`
		Logs		            []*PurchaseDataLogs `bun:"rel:has-many,join:user_item_id=user_item_id,join:user_id=user_id"`
		Users								*Users              `bun:"rel:belongs-to,join:user_id=id"`
}
