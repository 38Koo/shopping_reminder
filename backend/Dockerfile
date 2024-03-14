FROM golang:1.21-alpine
RUN apk update && apk add git && apk add --no-cache go
WORKDIR /usr/local

# Copy go mod and sum files 
COPY go.mod go.sum .

# Download all dependencies. Dependencies will be cached if the go.mod and go.sum files are not changed 
RUN go mod download && go mod verify

# Copy the source from the current directory to the Working Directory inside the container 
COPY ./src .

CMD ["go", "run", "src/infra/database/database.go"]
