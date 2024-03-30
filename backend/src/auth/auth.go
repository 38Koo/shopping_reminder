package auth

import (
	"github.com/golang-jwt/jwt/v5"
	"github.com/labstack/echo/v4"
)

type jwtCustomClaims struct {
	UID  int    `json:"uid"`
	Name string `json:"name"`
	jwt.RegisteredClaims
}

func GetUserIDFromToken(c echo.Context) int  {
	user := c.Get("user").(*jwt.Token)
	claims := user.Claims.(*jwtCustomClaims)
	uid := claims.UID
	return uid
}