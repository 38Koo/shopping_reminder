package db

import (
	"context"
	"database/sql"
	"fmt"
	"log"
	"os"

	"github.com/38Koo/shopping_reminder/backend/src/infra/database/schema"
	_ "github.com/lib/pq"
	"github.com/uptrace/bun"
	"github.com/uptrace/bun/dialect/pgdialect"
	"github.com/uptrace/bun/extra/bundebug"
)

func SetUpDB() *bun.DB {
	dbName := os.Getenv("POSTGRES_DB")
	dbUserName := os.Getenv("POSTGRES_USER")
	dbPassword := os.Getenv("POSTGRES_PASSWORD")
	connStr := fmt.Sprintf("host=db user=%s password=%s dbname=%s sslmode=disable", dbUserName,dbPassword, dbName)
	sqlDB, err := sql.Open("postgres", connStr)
	if err != nil {
		log.Fatal(err)
	}

	db := bun.NewDB(sqlDB, pgdialect.New())

	db.AddQueryHook(bundebug.NewQueryHook(
		// bundebug.WithVerbose(true)
		bundebug.FromEnv("BUNDEBUG"),
	))

	return db
}

func CreateTable() {
	db := SetUpDB()

	ctx := context.Background()
	
	_, err := db.NewCreateTable().Model((*schema.User)(nil)).IfNotExists().Exec(ctx)
	if err != nil {
		log.Fatal(err)
	}
	 
	_, err = db.NewCreateTable().Model((*schema.Item)(nil)).IfNotExists().Exec(ctx)
	if err != nil {
		log.Fatal(err)
	}
}
