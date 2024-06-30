package controller

import (
	"context"

	protobuf "github.com/nikitaSstepanov/Intelligent-Men-Website/backend/users_service/protobuf/users"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

func (c *Controller) GetOwnProfile(ctx context.Context, accessToken *protobuf.AccessToken) (*protobuf.Profile, error) {
	return nil, status.Errorf(codes.Unimplemented, "method GetOwnProfile not implemented")
}

func (c *Controller) GetProfile(ctx context.Context, userId *protobuf.UserId) (*protobuf.Profile, error) {
	return c.Users.GetProfile(ctx, userId)
}

func (c *Controller) Registration(ctx context.Context, userData *protobuf.UserData) (*protobuf.Tokens, error) {
	return c.Users.Registration(ctx, userData)
}

func (c *Controller) UpdateAccount(ctx context.Context, updateUserData *protobuf.UpdateUserData) (*protobuf.Empty, error) {
	return nil, status.Errorf(codes.Unimplemented, "method UpdateAccount not implemented")
}

func (c *Controller) DeleteAccount(ctx context.Context, accessToken *protobuf.AccessToken) (*protobuf.Empty, error) {
	return nil, status.Errorf(codes.Unimplemented, "method DeleteAccount not implemented")
}

func (c *Controller) ActivateAccount(ctx context.Context, activationUrl *protobuf.ActivationUrl) (*protobuf.Empty, error) {
	return nil, status.Errorf(codes.Unimplemented, "method ActivateAccount not implemented")
}

func (c *Controller) CancelRegistration(ctx context.Context, activationUrl *protobuf.ActivationUrl) (*protobuf.Empty, error) {
	return nil, status.Errorf(codes.Unimplemented, "method CancelRegistration not implemented")
}

func (c *Controller) Login(ctx context.Context, loginData *protobuf.LoginData) (*protobuf.Tokens, error) {
	return nil, status.Errorf(codes.Unimplemented, "method Login not implemented")
}

func (c *Controller) Logout(ctx context.Context, refreshToken *protobuf.RefreshToken) (*protobuf.Empty, error) {
	return nil, status.Errorf(codes.Unimplemented, "method Logout not implemented")
}

func (c *Controller) Refresh(ctx context.Context, refreshToken *protobuf.RefreshToken) (*protobuf.Tokens, error) {
	return nil, status.Errorf(codes.Unimplemented, "method Refresh not implemented")
}

func (c *Controller) CheckAccess(ctx context.Context, checkAccessData *protobuf.CheckAccessData) (*protobuf.UserId, error) {
	return nil, status.Errorf(codes.Unimplemented, "method CheckAccess not implemented")
}