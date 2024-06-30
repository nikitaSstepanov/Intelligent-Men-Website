package errors

import (
	"net/http"

	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

type Error struct {
	Message string
	Code    StatusType
}

type StatusType int

const (
	Internal StatusType = iota
	NotFound
	BadInput
	Conflict
	Unauthorize
)

func New(msg string, status StatusType) *Error {
	return &Error{
		Message: msg,
		Code:   status,
	}
}

func (e *Error) ToHttpCode() int {
	switch e.Code {

	case Internal:
		return http.StatusInternalServerError

	case NotFound:
		return http.StatusNotFound

	case BadInput:
		return http.StatusBadRequest

	case Conflict:
		return http.StatusConflict

	case Unauthorize:
		return http.StatusUnauthorized

	default:
		return http.StatusOK

	}
}

func (e *Error) ToGRPCErr() error {
	return status.Errorf(e.ToGRPCCode(), e.Message)
}

func (e *Error) ToGRPCCode() codes.Code {
	switch e.Code {

	case Internal:
		return codes.Internal

	case NotFound:
		return codes.NotFound

	case BadInput:
		return codes.InvalidArgument

	case Conflict:
		return codes.AlreadyExists

	case Unauthorize:
		return codes.Unauthenticated

	default:
		return codes.OK

	}
}