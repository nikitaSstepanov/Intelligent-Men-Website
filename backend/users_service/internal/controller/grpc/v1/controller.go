package controller

import (
	uc "github.com/nikitaSstepanov/Intelligent-Men-Website/backend/users_service/internal/usecase"
	"github.com/nikitaSstepanov/Intelligent-Men-Website/backend/users_service/protobuf"
)

type Controller struct {
	protobuf.UnimplementedUsersServiceServer
	usecase *uc.UseCase
}

func New(usecase *uc.UseCase) *Controller {
	return &Controller{
		usecase: usecase,
	}
}