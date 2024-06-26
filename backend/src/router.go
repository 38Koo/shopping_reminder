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
	api.GET("/list", handler.GetItemList)

	// アイテム取得
	api.GET("/item/:itemID", handler.GetItem)

	// アイテム追加
	api.POST("/add/item", handler.AddItem)

	// アイテム編集
	api.POST("/edit/item/:itemID", handler.EditItem)

	// ログ編集
	api.POST("/edit/log", handler.EditLog)

	// レポート取得
	api.GET("/report", handler.GetReportList)

	// レポート報告
	api.POST("/report/submit", handler.SubmitReport)

	// ログ削除
	api.POST("/delete/log/:logID", handler.DeleteLog)

	// アイテム削除
	api.POST("/delete/item/:itemID", handler.DeleteItem)

	return e
}
