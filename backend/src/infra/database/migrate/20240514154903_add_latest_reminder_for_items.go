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
			ADD COLUMN IF NOT EXISTS latest_reminder bool DEFAULT false;
			ALTER TABLE items
			ALTER COLUMN latest_reminder SET DEFAULT false;
			ALTER TABLE items
			ALTER COLUMN latest_reminder SET NOT NULL;
		`)
		return err
	}, func(ctx context.Context, db *bun.DB) error {
		fmt.Print(" [down migration] ")
		_, err := db.Exec(`
			ALTER TABLE items
			ALTER COLUMN IF EXISTS latest_reminder DROP NOT NULL;
			ALTER TABLE items
			DROP COLUMN IF EXISTS latest_reminder;
		`)
		return err
	})
}
