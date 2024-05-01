package main

import (
	"net/http"
	"os"

	handler "github.com/38Koo/shopping_reminder/backend/src/handler"
	"github.com/clerkinc/clerk-sdk-go/clerk"
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
)


func newRouter() *echo.Echo {
	e := echo.New()

	e.Use(middleware.Logger())
	e.Use(middleware.Recover())

	e.Use(middleware.CORSWithConfig(middleware.CORSConfig{
		AllowOrigins: []string{"http://localhost:3000"},
		AllowMethods: []string{http.MethodGet, http.MethodPost},
		AllowCredentials: true,
	}))

	api := e.Group("/api")
	// jwtSignInKey := os.Getenv("JWT_SIGNIN_KEY")
	// api.Use(echojwt.WithConfig(echojwt.Config{
	// 	SigningKey: []byte(jwtSignInKey),
	// }))

	apiKey := os.Getenv("CLERK_API_KEY")

	client, err := clerk.NewClient(apiKey)
	if err != nil {
		panic(err)
	}

	injectActiveSession := clerk.WithSessionV2(client)

	api.Use(echo.WrapMiddleware(injectActiveSession))

	// 初回ユーザー登録
	api.POST("/webhook/create", handler.CreateUser)

	// リスト取得
	api.GET("/list", handler.GetItems)

	// アイテム追加
	api.POST("/add/item", handler.AddItem)

	return e
}
