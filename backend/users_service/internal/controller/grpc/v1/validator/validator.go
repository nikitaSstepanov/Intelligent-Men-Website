package validator

import (
	"regexp"

	"github.com/go-ozzo/ozzo-validation/v4"
	"github.com/go-ozzo/ozzo-validation/v4/is"
	protobuf "github.com/nikitaSstepanov/Intelligent-Men-Website/backend/users_service/protobuf/users"
)

var (
	lowerLettersRegex = regexp.MustCompile(`[a-z]{1}`)
	upperLettersRegex = regexp.MustCompile(`[A-Z]{1}`)
	numbsRegex        = regexp.MustCompile(`[0-9]{1}`)
	symbolsRegex      = regexp.MustCompile(`[\W]{1}`)
)

func ValidateUserData(data *protobuf.UserData) error {
	return validation.ValidateStruct(
		data,
		validation.Field(&data.Email, validation.Required, is.Email),
		validation.Field(&data.Username, validation.Required),
		validation.Field(
			&data.Password, 
			validation.Required, 
			validation.Length(8, 50), 
			validation.Match(lowerLettersRegex),
			validation.Match(upperLettersRegex),
			validation.Match(numbsRegex),
			validation.Match(symbolsRegex),
		),
	)
}