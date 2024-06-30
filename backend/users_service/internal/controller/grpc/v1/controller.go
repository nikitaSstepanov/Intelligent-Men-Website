package controller

import (
	"github.com/nikitaSstepanov/Intelligent-Men-Website/backend/users_service/internal/controller/grpc/v1/user"
	uc "github.com/nikitaSstepanov/Intelligent-Men-Website/backend/users_service/internal/usecase"
	protobuf "github.com/nikitaSstepanov/Intelligent-Men-Website/backend/users_service/protobuf/users"
)

type Controller struct {
	protobuf.UnimplementedUsersServiceServer
	Users user.UsersHandler
}

func New(usecase *uc.UseCase) *Controller {
	return &Controller{
		Users: *user.New(usecase.Users),
	}
}