package auth

type AuthStorage interface {}

type AuthUseCase struct {
	Jwt     *JwtUseCase
	storage AuthStorage
}

func New(store AuthStorage, options *JwtOptions) *AuthUseCase {
	return &AuthUseCase{
		Jwt:     NewJwt(options),
		storage: store,
	}
}