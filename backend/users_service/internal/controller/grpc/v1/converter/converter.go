package converter

import (
	"github.com/nikitaSstepanov/Intelligent-Men-Website/backend/users_service/internal/entity"
	protobuf "github.com/nikitaSstepanov/Intelligent-Men-Website/backend/users_service/protobuf/users"
)

func UserEntityToProfile(user *entity.User) *protobuf.Profile {
	return &protobuf.Profile{
		Username: user.Username,
		Email: user.Email,
		PhotoPath: user.PhotoPath,
	}
}