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
			ADD COLUMN memo text
		`)
		if err != nil {
			return err
		}
		_, err = db.Exec(`
			ALTER TABLE items
			ADD COLUMN user_item_id integer
		`)
		return err
	}, func(ctx context.Context, db *bun.DB) error {
		fmt.Print(" [down migration] ")
		_, err := db.Exec(`
			ALTER TABLE items
			DROP COLUMN memo;
		`)
		if err != nil {
			return err
		}
		_, err = db.Exec(`
			ALTER TABLE items
			DROP COLUMN user_item_id;
		`)
		return err
	})
}
