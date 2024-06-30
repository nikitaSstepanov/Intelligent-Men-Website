package user

import (
	"context"
	"fmt"
	"time"

	"github.com/jackc/pgx/v5"
	"github.com/nikitaSstepanov/Intelligent-Men-Website/backend/users_service/internal/entity"
	"github.com/nikitaSstepanov/Intelligent-Men-Website/backend/users_service/pkg/client/postgresql"
	e "github.com/nikitaSstepanov/Intelligent-Men-Website/backend/users_service/pkg/errors"
	goredis "github.com/redis/go-redis/v9"
)

type UserStorage struct {
	postgres postgresql.Client
	redis    *goredis.Client
}

const (
	redisExpires = 3 * time.Hour
	usersTable   = "users"
)

var (
	internalErr = e.New("Something going wrong...", e.Internal)
	conflictErr = e.New("User with this email already exist", e.Conflict)
	notFoundErr = e.New("This user wasn`t found", e.NotFound)
)

func New(pg postgresql.Client, redis *goredis.Client) *UserStorage {
	return &UserStorage{
		postgres: pg,
		redis:    redis,
	}
}

func (u *UserStorage) GetUser(ctx context.Context, id uint64) (*entity.User, *e.Error) {
	var user entity.User

	err := u.redis.Get(ctx, getRedisKey(id)).Scan(&user)
	if err != nil && err != goredis.Nil {
		return nil, internalErr
	}

	query := fmt.Sprintf("SELECT id, email, username, password, photoPath FROM %s WHERE id = %d", usersTable, id)

	row := u.postgres.QueryRow(ctx, query)

	err = row.Scan(
		&user.Id, 
		&user.Email, 
		&user.Username, 
		&user.Password, 
		&user.PhotoPath,
	)
	
	if err != nil {
		if err == pgx.ErrNoRows {
			return nil, notFoundErr
		} else {
			return nil, internalErr
		}
	}

	err = u.redis.Set(ctx, getRedisKey(id), user, redisExpires).Err()
	if err != nil {
		return nil, internalErr
	}

	return &user, nil
}

func (u *UserStorage) CreateUser(ctx context.Context, user *entity.User) *e.Error {
	if err := u.checkEmail(ctx, user.Email); err != nil {
		return err
	}

	query := fmt.Sprintf(
		"INSERT INTO %s (email, username, password, photoPath) VALUES ('%s', '%s', '%s', '%s') RETURNING id;",
		usersTable, user.Email, user.Username, user.Password, user.PhotoPath,
	)

	row := u.postgres.QueryRow(ctx, query)

	err := row.Scan(&user.Id)
	if err != nil {
		return internalErr
	}

	err = u.redis.Set(ctx, getRedisKey(user.Id), user, redisExpires).Err()
	if err != nil {
		return internalErr
	}

	return nil
}

func (u *UserStorage) checkEmail(ctx context.Context, email string) *e.Error {
	query := fmt.Sprintf("SELECT id FROM %s WHERE email = %s", usersTable, email)

	row := u.postgres.QueryRow(ctx, query)

	var candidateId uint64

	err := row.Scan(&candidateId)
	if err != nil {
		return internalErr
	}

	if candidateId != 0 {
		return conflictErr
	}

	return nil
}

func getRedisKey(id uint64) string {
	return fmt.Sprintf("users:%d", id)
}
