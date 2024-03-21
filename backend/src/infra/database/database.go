package main

import (
	"context"
	"database/sql"
	"fmt"
	"log"
	"net/http"
	"os"
	"shopping_reminder/src/infra/database/schema/Item"
	"shopping_reminder/src/infra/database/schema/User"

	"github.com/labstack/echo/v4"
	_ "github.com/lib/pq"
	"github.com/uptrace/bun"
	"github.com/uptrace/bun/dialect/pgdialect"
	"github.com/uptrace/bun/extra/bundebug"
)

func main() {
	dbName := os.Getenv("POSTGRES_DB")
	dbUserName := os.Getenv("POSTGRES_USER")
	dbPassword := os.Getenv("POSTGRES_PASSWORD")
	connStr := fmt.Sprintf("host=db user=%s password=%s dbname=%s sslmode=disable", dbUserName,dbPassword, dbName)
	sqlDB, err := sql.Open("postgres", connStr)
	if err != nil {
		log.Fatal(err)
	}
	defer sqlDB.Close()

	db := bun.NewDB(sqlDB, pgdialect.New())
	defer db.Close()

	db.AddQueryHook(bundebug.NewQueryHook(
		// bundebug.WithVerbose(true)
		bundebug.FromEnv("BUNDEBUG"),
	))

	ctx := context.Background()
	_, err = db.NewCreateTable().Model((*User.User)(nil)).IfNotExists().Exec(ctx)
	if err != nil {
		log.Fatal(err)
	}

	_, err = db.NewCreateTable().Model((*Item.Item)(nil)).IfNotExists().Exec(ctx)
	if err != nil {
		log.Fatal(err)
	}

	e := echo.New()

	// 一覧取得
	e.GET("/", func(c echo.Context) error {
		var items []Item.Item
		ctx := context.Background()
		// TODO: where句の追加
		err := db.NewSelect().Model(&items).Order("created_at").Scan(ctx)
		if err != nil {
			e.Logger.Error(err)
			return c.JSON(http.StatusBadRequest,  map[string]string{"error": err.Error()})
		}
		return c.JSON(http.StatusOK, items)
	})

	e.Logger.Fatal(e.Start(":8989"))
}