package usecase

import "github.com/nikitaSstepanov/Intelligent-Men-Website/backend/users_service/internal/usecase/storage"

type UseCase struct {

}

func New(store *storage.Storage) *UseCase {
	return &UseCase{}
}