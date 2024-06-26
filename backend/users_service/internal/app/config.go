package app

import (
	"github.com/ilyakaznacheev/cleanenv"
	"github.com/joho/godotenv"
	"github.com/nikitaSstepanov/Intelligent-Men-Website/backend/users_service/pkg/client/postgresql"
	"github.com/nikitaSstepanov/Intelligent-Men-Website/backend/users_service/pkg/client/redis"
	"github.com/nikitaSstepanov/Intelligent-Men-Website/backend/users_service/pkg/logging"
	"github.com/nikitaSstepanov/Intelligent-Men-Website/backend/users_service/protobuf/grpc"
)

type AppConfig struct {
	Server   grpc.Config       `yaml:"server"`
	Logger   logging.Config	   `yaml:"logger"`
	Postgres postgresql.Config `yaml:"postgres"`
	Redis    redis.Config      `yaml:"redis"`
}

func getAppConfig() (*AppConfig, error) {
	var cfg AppConfig

	if err := godotenv.Load(".env"); err != nil {
		return nil, err
	}

	err := cleanenv.ReadConfig("config/config.yaml", &cfg)
	if err != nil {
		return nil, err
	}

	return &cfg, nil
}