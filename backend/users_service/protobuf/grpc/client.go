package grpc

import (
	"context"

	"github.com/nikitaSstepanov/Intelligent-Men-Website/backend/users_service/protobuf/mail"
	"google.golang.org/grpc"
)

type MailServiceClient interface {
	SendActivatonMessage(ctx context.Context, in *mail.ActivationMessageData, opts ...grpc.CallOption) (*mail.Empty, error)
	SendAdminRoleIsSettedMessage(ctx context.Context, in *mail.RoleIsSetedMessageData, opts ...grpc.CallOption) (*mail.Empty, error)
	SendMemberRoleIsSettedMessage(ctx context.Context, in *mail.RoleIsSetedMessageData, opts ...grpc.CallOption) (*mail.Empty, error)
}

type MailConfig struct {
	Url string `yaml:"url"`
}

func NewMailServiceClient(cfg *MailConfig) (MailServiceClient, error) {
	conn, err := grpc.NewClient(cfg.Url)
	if err != nil {
		return nil, err
	}

	client := mail.NewMailServiceClient(conn)

	return client, nil
}