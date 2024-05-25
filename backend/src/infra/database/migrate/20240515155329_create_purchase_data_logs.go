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
			CREATE TABLE purchase_data_logs (
				id serial PRIMARY KEY,
				item_id int NOT NULL,
				purchasedate timestamp NOT NULL,
				purchasecount int NOT NULL,
				created_at timestamp NOT NULL,
				updated_at timestamp NULL,
				deleted_at timestamp NULL
			);
		`)
		return err
	}, func(ctx context.Context, db *bun.DB) error {
		fmt.Print(" [down migration] ")
		_, err := db.Exec(`
			DROP TABLE purchase_data_logs;
		`)
		return err
	})
}
