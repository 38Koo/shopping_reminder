FROM golang:1.21-alpine
RUN apk update && apk add git && apk add --no-cache go && apk add --no-cache curl
WORKDIR /usr/local

RUN mkdir /usr/local/backend/src -p

# Copy go mod and sum files 
COPY ./src/go.mod ./src/go.sum ./backend/src

# Copy the source from the current directory to the Working Directory inside the container 
COPY . .

# Download all dependencies. Dependencies will be cached if the go.mod and go.sum files are not changed 
RUN cd ./src && go mod download && go mod verify && go mod tidy

WORKDIR /usr/local/backend/src

CMD ["go", "run", "./main.go", "./router.go"]
