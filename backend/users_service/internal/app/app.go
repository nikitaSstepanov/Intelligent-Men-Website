package app

import (
	"context"
	"os"
	"os/signal"
	"syscall"

	"github.com/nikitaSstepanov/Intelligent-Men-Website/backend/users_service/internal/controller/grpc/v1"
	"github.com/nikitaSstepanov/Intelligent-Men-Website/backend/users_service/internal/usecase"
	"github.com/nikitaSstepanov/Intelligent-Men-Website/backend/users_service/internal/usecase/storage"
	"github.com/nikitaSstepanov/Intelligent-Men-Website/backend/users_service/migrations"
	"github.com/nikitaSstepanov/Intelligent-Men-Website/backend/users_service/pkg/client/postgresql"
	"github.com/nikitaSstepanov/Intelligent-Men-Website/backend/users_service/pkg/client/redis"
	"github.com/nikitaSstepanov/Intelligent-Men-Website/backend/users_service/pkg/logging"
	"github.com/nikitaSstepanov/Intelligent-Men-Website/backend/users_service/protobuf/grpc"
)

type App struct {
	controller *controller.Controller
	usecase    *usecase.UseCase
	storage    *storage.Storage
	logger     *logging.Logger
	server     *grpc.Server
}

func New() *App {
	cfg, err := getAppConfig()
	if err != nil {
		panic("Can`t get app config. Error: " + err.Error())
	}

	logger := logging.NewLogger(&cfg.Logger)

	ctx := context.TODO()

	pg, err := postgresql.ConnectToDB(ctx, &cfg.Postgres)
	if err != nil {
		logger.Error("Can`t connect to postgres", logging.ErrAttr(err))
	} else {
		logger.Info("Postgres is connected")
	}

	if err := migrations.Migrate(pg); err != nil {
		logger.Error("Can`t migrate DB scheme", logging.ErrAttr(err))
	} else {
		logger.Info("DB scheme is migrated")
	}

	redisConn, err := redis.ConnectToRedis(ctx, &cfg.Redis)
	if err != nil {
		logger.Error("Can`t connect to redis", logging.ErrAttr(err))
	} else {
		logger.Info("Redis is connected")
	}

	app := &App{}

	app.logger = logger

	app.storage = storage.New(pg, redisConn)

	app.usecase = usecase.New(app.storage)

	app.controller = controller.New(app.usecase)

	app.server = grpc.NewServer(app.controller, &cfg.Server)

	return app
}

func (a *App) Run() {
	if err := a.server.Start(); err != nil {
		a.logger.Error("Can`t start gRPC server", logging.ErrAttr(err))
	}

	a.logger.Info("Application is running")

	ShutdownApp(a)

	a.logger.Info("Application shutdown")
}

func ShutdownApp(a *App) {
	quit := make(chan os.Signal, 1)
	signal.Notify(quit, syscall.SIGTERM, syscall.SIGINT)
	<-quit

	a.server.Stop()
}