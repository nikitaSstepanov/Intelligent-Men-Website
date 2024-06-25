package grpc

import (
	"net"

	"github.com/nikitaSstepanov/Intelligent-Men-Website/backend/users_service/protobuf"
	grpcpkg "google.golang.org/grpc"
)

type Server struct {
	server *grpcpkg.Server
	url    string
}

type Config struct {
	Url string `yaml:"url"`
}

func NewServer(handler Handler, cfg *Config) *Server {
	gRPCServer := grpcpkg.NewServer()

	protobuf.RegisterUsersServiceServer(gRPCServer, handler)

	return &Server{
		server: gRPCServer,
		url:    cfg.Url,
	}
}

func (s *Server) Start() error {
	listener, err := net.Listen("tcp", s.url)
	if err != nil {
		return err
	}

	if err := s.server.Serve(listener); err != nil {
		return err
	}

	return nil
}

func (s *Server) Stop() {
	s.server.GracefulStop()
}

type Handler protobuf.UsersServiceServer