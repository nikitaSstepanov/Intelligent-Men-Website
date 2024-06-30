package user

import (
	"context"

	conv "github.com/nikitaSstepanov/Intelligent-Men-Website/backend/users_service/internal/controller/grpc/v1/converter"
	"github.com/nikitaSstepanov/Intelligent-Men-Website/backend/users_service/internal/controller/grpc/v1/validator"
	"github.com/nikitaSstepanov/Intelligent-Men-Website/backend/users_service/internal/entity"
	e "github.com/nikitaSstepanov/Intelligent-Men-Website/backend/users_service/pkg/errors"
	protobuf "github.com/nikitaSstepanov/Intelligent-Men-Website/backend/users_service/protobuf/users"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

type UsersUseCase interface {
	GetUserById(ctx context.Context, id uint64) (*entity.User, *e.Error)
}

type UsersHandler struct {
	usecase UsersUseCase
}

func New(uc UsersUseCase) *UsersHandler {
	return &UsersHandler{
		usecase: uc,
	}
}

func (u *UsersHandler) GetProfile(ctx context.Context, userId *protobuf.UserId) (*protobuf.Profile, error) {
	user, err := u.usecase.GetUserById(ctx, userId.Id)
	if err != nil {
		return nil, err.ToGRPCErr()
	}

	return conv.UserEntityToProfile(user), nil
}

func (u *UsersHandler) Registration(ctx context.Context, userData *protobuf.UserData) (*protobuf.Tokens, error) {
	err := validator.ValidateUserData(userData)
	if err != nil {
		return nil, status.Errorf(codes.InvalidArgument, err.Error())
	}

	return nil, nil
}