package storage

import (
	"github.com/nikitaSstepanov/Intelligent-Men-Website/backend/users_service/internal/usecase/storage/user"
	"github.com/nikitaSstepanov/Intelligent-Men-Website/backend/users_service/pkg/client/postgresql"
	"github.com/redis/go-redis/v9"
)

type Storage struct {
	Users *user.UserStorage
}

func New(pg postgresql.Client, rd *redis.Client) *Storage {
	return &Storage{
		Users: user.New(pg, rd),
	}
}