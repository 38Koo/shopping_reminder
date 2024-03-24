package seeder

import (
	"database/sql"
	"fmt"
	"log"
	"os"
	"time"

	schema "github.com/38Koo/shopping_reminder/infra/database/schema"
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

	users := []schema.User{
		{Name: "test1", Email: "test1", UUID: "UUID1", CreatedAt: time.Now(),  },
		{Name: "test2", Email: "test2", UUID: "UUID2", CreatedAt: time.Now(),  },
	}

	for _, user := range users {
		_, err := sqlDB.Exec("INSERT INTO users (name, email, uuid) VALUES ($1, $2, $3)", user.Name, user.Email, user.UUID)
		if err != nil {
			log.Fatal(err)
		}
	}

	log.Println("Data seeding completed")

}
