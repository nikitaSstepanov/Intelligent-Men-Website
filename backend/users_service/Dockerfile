FROM golang:alpine AS builder

EXPOSE 80

WORKDIR /usr/local/src

COPY ["go.mod", "go.sum", "./"]

RUN ["go", "mod", "download"]

COPY ./ ./

RUN ["go", "build", "-o", "./bin/users_service", "./cmd/users_service"]

FROM alpine AS runner

COPY --from=builder /usr/local/src/bin/users_service ./

COPY ./config ./config

COPY ./migrations/scheme ./migrations/scheme

COPY .env .env

CMD [ "./users_service" ]