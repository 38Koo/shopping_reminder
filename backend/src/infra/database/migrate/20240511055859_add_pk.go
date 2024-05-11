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
			DROP CONSTRAINT items_pkey;
			ALTER TABLE items
			ADD PRIMARY KEY (user_item_id, user_id);
			ALTER TABLE items
			ALTER COLUMN name SET NOT NULL,
			ALTER COLUMN stock SET NOT NULL
		`)
		if err != nil {
			return err
		}
		return nil
	}, func(ctx context.Context, db *bun.DB) error {
		fmt.Print(" [down migration] ")
		_, err := db.Exec(`
			ALTER TABLE items
			DROP CONSTRAINT items_pkey;
			ALTER TABLE items
			ADD PRIMARY KEY (id);
			ALTER TABLE items
			ALTER COLUMN name DROP NOT NULL,
			ALTER COLUMN stock DROP NOT NULL
		`)
		return err
	})
}
