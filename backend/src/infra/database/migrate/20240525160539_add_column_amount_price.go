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
			ALTER TABLE purchase_data_logs
			ADD COLUMN amount int;
			ALTER TABLE purchase_data_logs
			ADD COLUMN price int NOT NULL DEFAULT 0;
			ALTER TABLE items
			ADD COLUMN avaragePrice int;
		`)
		return err
	}, func(ctx context.Context, db *bun.DB) error {
		fmt.Print(" [down migration] ")
		_, err := db.Exec(`
			ALTER TABLE purchase_data_logs
			DROP COLUMN amount;
			ALTER TABLE purchase_data_logs
			DROP COLUMN price;
			ALTER TABLE items
			DROP COLUMN avaragePrice;
		`)
		return err
	})
}
