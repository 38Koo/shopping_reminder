package handler

import (
	"context"
	"encoding/json"
	"fmt"
	"io"
	"log"
	"net/http"
	"os"
	"time"

	db "github.com/38Koo/shopping_reminder/backend/src/infra/database"
	"github.com/38Koo/shopping_reminder/backend/src/infra/database/schema"
	"github.com/labstack/echo/v4"
	svix "github.com/svix/svix-webhooks/go"
)


type EmailAddress struct {
	ID            string `json:"id"`
	EmailAddress  string `json:"emailAddress"`
}

type UserDetailsForClerk struct {
	ID    string `json:"id"`
	Email []EmailAddress `json:"emailAddresses"`
	Name  string `json:"username"`
}

func CreateUser(c echo.Context) error {
	fmt.Println("CreateUser")
	webhookSecret := os.Getenv("WEBHOOK_SECRET")

	// Headerからsvixデータを取得
	svixId := c.Request().Header.Get("svix-id")
	svixTimestamp := c.Request().Header.Get("svix-timestamp")
	svixSignature := c.Request().Header.Get("svix-signature")
	// いずれかのデータが取得できなかった場合はエラーを返す
	if svixId == "" || svixTimestamp == "" || svixSignature == "" {
		return echo.NewHTTPError(400, "svix headers not found")
	}

	// bodyデータの取得
	reqBody, err := io.ReadAll(c.Request().Body)
	if err != nil {
		return err
		
	}

	webHook, err := svix.NewWebhook(webhookSecret)
	if err != nil {
		return err
	}


	err = webHook.Verify(reqBody, c.Request().Header)
	if err != nil {
		return err
	}

	var evt map[string]interface{}
	err = json.Unmarshal(reqBody, &evt)
	if err != nil {
		return err
	}

	db := db.SetUpDB()
	defer db.Close()

	ctx := context.Background()

	data := evt["data"].(map[string]interface{})
	emailAddressData := data["email_addresses"].([]interface{})
	firstEmailAddressData := emailAddressData[0].(map[string]interface{})
	userId := data["id"].(string)
	email := firstEmailAddressData["email_address"].(string)
	

	externalAccountsData := data["external_accounts"].([]interface{})
	firstExternalAccountData := externalAccountsData[0].(map[string]interface{})
	name := firstExternalAccountData["family_name"].(string) + firstExternalAccountData["given_name"].(string)

	user := &schema.User{
    UUID: userId,
    Name: name,
    Email: email,
    CreatedAt: time.Now(),
	}
	
	_, err = db.NewInsert().Model(user).Exec(ctx, &schema.User{
		UUID: userId,
		Name: name,
		Email: email,
		CreatedAt: time.Now(),
	})
	if err != nil {
		log.Fatal(err)
	}

	return c.JSON(http.StatusOK, nil)
}
