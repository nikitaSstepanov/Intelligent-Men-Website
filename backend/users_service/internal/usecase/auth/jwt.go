package auth

import (
	"time"

	"github.com/golang-jwt/jwt/v5"
	e "github.com/nikitaSstepanov/Intelligent-Men-Website/backend/users_service/pkg/errors"
)

type JwtUseCase struct {
	audience []string
	issuer   string
	key      string
}

type JwtOptions struct {
	Audience []string `yaml:"audience"`
	Issuer   string   `yaml:"issuer"`
	Key      string   `env:"JWT_SECRET"`
}

type Claims struct {
	Id   uint64 `json:"id"`
	Role string `json:"role"` 
	jwt.RegisteredClaims
}

var (
	internalErr = e.New("Something going wrong...", e.Internal)
	unauthErr   = e.New("Invalid token", e.Unauthorize)
)

func NewJwt(options *JwtOptions) *JwtUseCase {
	return &JwtUseCase{
		audience: options.Audience,
		issuer:   options.Issuer,
		key:      options.Key,
	}
}

func (j *JwtUseCase) ValidateToken(jwtString string) (*Claims, *e.Error) {
	token, err := jwt.ParseWithClaims(jwtString, &Claims{}, j.keyFunc)
	if err != nil {
		return nil, internalErr
	}

	if !token.Valid {
		return nil, unauthErr
	}

	return token.Claims.(*Claims), nil
}

func (j *JwtUseCase) GenerateToken(id uint64, role string, expires time.Duration) (string, *e.Error) {
	c := Claims{
		id,
		role,
		jwt.RegisteredClaims{
			ExpiresAt: jwt.NewNumericDate(time.Now().Add(expires)),
			Issuer: j.issuer,
			Audience: j.audience,
		},
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, c)

	tokenString, err := token.SignedString([]byte(j.key))
	if err != nil {
		return "", internalErr
	}

	return tokenString, nil
}

func (j *JwtUseCase) keyFunc(token *jwt.Token) (interface{}, error) {
	return []byte(j.key), nil
}