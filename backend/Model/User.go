package main

import (
	"time"

	"github.com/uptrace/bun"
)

type User struct {
    bun.BaseModel `bun:"table:users,alias:u"`
    ID         int64       `bun:"id,pk,autoincrement"`
		Name       string      `bun:"name,notnull"`
    Email      string      `bun:"email,notnull"`
		UUID       string      `bun:"uuid,notnull"`
		CreatedAt  time.Time   
		UpdatedAt  time.Time   `bun:"nullzero"`
		DeletedAt  time.Time   `bun:"soft_delete,nullzero"`
}
