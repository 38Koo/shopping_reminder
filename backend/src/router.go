package main

import (
	"encoding/json"
	"fmt"
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
		AllowOrigins: []string{"http://localhost:3000", "http://localhost:8989"},
		AllowMethods: []string{http.MethodGet, http.MethodPost, http.MethodHead, http.MethodOptions},
	}))
	fmt.Println("oh...........Yeah!!!!!!!!!!!!!!!!!")

	api := e.Group("/api")
	// api.Use(echojwt.WithConfig(echojwt.Config{
	// 	SigningKey: []byte("secret"),
	// }))

	clerkApiKey := os.Getenv("CLERK_API_KEY")
	client, err :=  clerk.NewClient(clerkApiKey)
	if err != nil {
		panic(err)
	}

	injectActiveSession := func(next echo.HandlerFunc) echo.HandlerFunc {
		return func(c echo.Context) error {
			clerk.WithSessionV2(client)(http.HandlerFunc(func(w http.ResponseWriter, req *http.Request) {
				if err := next(c); err != nil {
					c.Error(err)
				}
				sessionClaims, ok := clerk.SessionFromContext(req.Context())
				if ok {
					jsonResp, _ := json.Marshal(sessionClaims)
					fmt.Fprint(w, string(jsonResp))
				}
			}))
			
			return nil
		}
	}
	
	e.Use(injectActiveSession)
	
	api.GET("/list", handler.GetItems)

	return e
}
