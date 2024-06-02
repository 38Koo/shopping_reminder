package main

import db "github.com/38Koo/shopping_reminder/backend/src/infra/database"

func main(){

	db.CreateTable()

	router := newRouter()
	router.Logger.Fatal(router.Start(":8989"))
}