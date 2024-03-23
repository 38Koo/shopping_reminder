package Item

import (
	"time"

	"github.com/uptrace/bun"
)

type Item struct {
    bun.BaseModel `bun:"table:items,alias:i"`
    ID                int64       `bun:"id,pk,autoincrement"`
		Name              string      `bun:"name,notnull"`
		Stock             int32       `bun:"stock,notnull"`
		LastPurchaseDate  time.Time   `bun:"lastpurchasedate"`
		UsageDuration     int32       `bun:"usageduration"`
		CreatedAt         time.Time   
		UpdatedAt         time.Time   `bun:",nullzero"`
		DeletedAt         time.Time   `bun:",soft_delete,nullzero"`
		UserID 						int64 			`bun:user_id`
}
