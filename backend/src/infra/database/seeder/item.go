package seeder

import (
	"database/sql"
	"fmt"
	"log"
	"os"

	"time"

	schema "github.com/38Koo/shopping_reminder/backend/src/infra/database/schema"
	_ "github.com/lib/pq"
)

func ItemSeeder() {
	dbName := os.Getenv("POSTGRES_DB")
	dbUserName := os.Getenv("POSTGRES_USER")
	dbPassword := os.Getenv("POSTGRES_PASSWORD")
	connStr := fmt.Sprintf("host=db user=%s password=%s dbname=%s sslmode=disable", dbUserName, dbPassword, dbName)

	sqlDB, err := sql.Open("postgres", connStr)
	if err != nil {
		log.Fatal(err)
	}
	defer sqlDB.Close()

	items := []schema.Items{
		{Name: "test1", Stock: 1, CreatedAt: time.Now()},
		{Name: "test2", Stock: 1, CreatedAt: time.Now()},
	}

	for _, item := range items {
		_, err := sqlDB.Exec("INSERT INTO items (name, Stock, UsageDuration) VALUES ($1, $2, $3, $4)", item.Name, item.Stock)
		if err != nil {
			log.Fatal(err)
		}
	}

	log.Println("Data seeding completed")

}
