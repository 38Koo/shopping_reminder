package main

import (
	"database/sql"
	"fmt"
	"log"
	"os"
	"shopping_reminder/src/infra/database/schema/Item"
	"time"

	_ "github.com/lib/pq"
)

func main() {
	dbName := os.Getenv("POSTGRES_DB")
	dbUserName := os.Getenv("POSTGRES_USER")
	dbPassword := os.Getenv("POSTGRES_PASSWORD")
	connStr := fmt.Sprintf("host=db user=%s password=%s dbname=%s sslmode=disable", dbUserName, dbPassword, dbName)

	sqlDB, err := sql.Open("postgres", connStr)
	if err != nil {
		log.Fatal(err)
	}
	defer sqlDB.Close()

	items := []Item.Item{
		{Name: "test1", Stock: 1, LastPurchaseDate: time.Now(), UsageDuration: 2, CreatedAt: time.Now()},
		{Name: "test2", Stock: 1, LastPurchaseDate: time.Now(), UsageDuration: 2, CreatedAt: time.Now()},
	}

	for _, item := range items {
		_, err := sqlDB.Exec("INSERT INTO items (name, Stock, LastPurchaseDate, UsageDuration) VALUES ($1, $2, $3, $4)", item.Name, item.Stock, item.LastPurchaseDate, item.UsageDuration)
		if err != nil {
			log.Fatal(err)
		}
	}

	log.Println("Data seeding completed")

}
