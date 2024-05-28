package schema

import (
	"time"

	"github.com/uptrace/bun"
)

type Item struct {
    bun.BaseModel `bun:"table:items,alias:i"`
    ID                  int64       `bun:"id,autoincrement,notnull"`
		UserItemID				  int64       `bun:"user_item_id,pk,notnull"`
		UserID              int64       `bun:"user_id,pk,notnull"`
		Name                string      `bun:"name,notnull" json:"itemName"`
		Stock               int64       `bun:"stock,notnull" json:"stockCount"`
		Memo							  string      `bun:"memo"`
		AveragePrice				float32       `bun:"avarageprice"`
		UsageDuration       int64       `bun:"usageduration"`
		LatestReminder 		  bool				`bun:"latest_reminder,notnull"`
		UntilNextTimeByDays int32       `bun:"until_next_time_by_days"`
		CreatedAt           time.Time   
		UpdatedAt           time.Time   `bun:",nullzero"`
		DeletedAt           time.Time   `bun:",soft_delete,nullzero"`
}
