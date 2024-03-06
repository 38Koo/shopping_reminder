package main

import (
	"time"

	"github.com/uptrace/bun"
)

type Item struct {
    bun.BaseModel `bun:"table:item,alias:i"`
    ID                int64       `bun:"id,pk,autoincrement"`
		Name              string      `bun:"name,notnull"`
		Stock             string      `bun:"stock,notnull"`
		LastPurchaseDate  time.Time   `bun:"lastpurchasedate"`
		UsageDuration     time.Time   `bun:"usageduration"`
		CreatedAt         time.Time   
		UpdatedAt         time.Time   `bun:"nullzero"`
		DeletedAt         time.Time   `bun:"soft_delete,nullzero"`
}
