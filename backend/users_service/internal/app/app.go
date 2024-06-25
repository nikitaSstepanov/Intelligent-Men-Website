package app

import (
	"github.com/nikitaSstepanov/Intelligent-Men-Website/backend/users_service/protobuf/grpc"
)

type App struct {
	server *grpc.Server
}

func New() *App {
	app := &App{}

	return app
}

func (a *App) Run() {
	
}