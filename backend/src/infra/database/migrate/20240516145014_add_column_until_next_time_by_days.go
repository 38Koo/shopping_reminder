package migrations

import (
	"context"
	"fmt"

	"github.com/uptrace/bun"
)

func init() {
	Migrations.MustRegister(func(ctx context.Context, db *bun.DB) error {
		fmt.Print(" [up migration] ")
		_, err := db.Exec(`
			ALTER TABLE items
			ADD COLUMN until_next_time_by_days INT;
		`)
		return err
	}, func(ctx context.Context, db *bun.DB) error {
		fmt.Print(" [down migration] ")
		_, err := db.Exec(`
			ALTER TABLE items
			DROP COLUMN until_next_time_by_days;
		`)
		return err
	})
}
