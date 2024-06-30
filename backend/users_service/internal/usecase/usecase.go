package usecase

import (
	"github.com/nikitaSstepanov/Intelligent-Men-Website/backend/users_service/internal/usecase/auth"
	"github.com/nikitaSstepanov/Intelligent-Men-Website/backend/users_service/internal/usecase/storage"
	"github.com/nikitaSstepanov/Intelligent-Men-Website/backend/users_service/internal/usecase/user"
)

type UseCase struct {
	Users *user.UserUseCase
	Auth  *auth.AuthUseCase
}

func New(store *storage.Storage, opts *auth.JwtOptions) *UseCase {
	authUseCase := auth.New(store, opts)

	return &UseCase{
		Users: user.New(store.Users, authUseCase),
		Auth: authUseCase,
	}
}