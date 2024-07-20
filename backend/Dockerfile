# Build stage
FROM golang:1.21-alpine AS builder

# Install necessary dependencies
RUN apk update && apk add --no-cache git curl

WORKDIR /usr/local/backend/src

# Copy go mod and sum files
COPY ./src/go.mod ./src/go.sum ./

# Download all dependencies
RUN go mod download

# Copy the source code
COPY ./src .

# Set environment variables for cross-compilation
ENV GOOS=linux
ENV GOARCH=amd64

# Build the application
RUN go build -tags timetzdata -o /usr/local/bin/myapp ./main.go ./router.go

# Final stage
FROM alpine:latest

# Copy the built binary from the builder stage
COPY --from=builder /usr/local/bin/myapp /usr/local/bin/myapp

# Set the working directory
WORKDIR /usr/local/bin

ENV HOSTNAME "0.0.0.0"

EXPOSE 8080

# Command to run the binary
CMD ["./myapp"]