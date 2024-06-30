package user

import (
	"context"
	"time"

	"github.com/nikitaSstepanov/Intelligent-Men-Website/backend/users_service/internal/entity"
	"github.com/nikitaSstepanov/Intelligent-Men-Website/backend/users_service/internal/usecase/auth"
	e "github.com/nikitaSstepanov/Intelligent-Men-Website/backend/users_service/pkg/errors"
)

type UsersStorage interface {
	GetUser(ctx context.Context, id uint64) (*entity.User, *e.Error)
	CreateUser(ctx context.Context, user *entity.User) *e.Error
}

type UserUseCase struct {
	storage UsersStorage
	auth    *auth.AuthUseCase
}

func New(store UsersStorage, auth *auth.AuthUseCase) *UserUseCase {
	return &UserUseCase{
		storage: store,
		auth:    auth,
	}
}

func (u *UserUseCase) GetUserById(ctx context.Context, id uint64) (*entity.User, *e.Error) {
	return u.storage.GetUser(ctx, id)
}

func (u *UserUseCase) Registration(ctx context.Context, user *entity.User) (*entity.Tokens, *e.Error) {
	err := u.storage.CreateUser(ctx, user)
	if err != nil {
		return nil, err
	}

	//TODO: activation link

	//TODO: adding role

	var tokens entity.Tokens

	access, err := u.auth.Jwt.GenerateToken(user.Id, "USER", 1 * time.Hour)
	if err != nil {
		return nil, err
	}

	tokens.Access = access

	refresh, err := u.auth.Jwt.GenerateToken(user.Id, "USER", 72 * time.Hour)
	if err != nil {
		return nil, err
	}

	tokens.Refresh = refresh

	return &tokens, nil
}