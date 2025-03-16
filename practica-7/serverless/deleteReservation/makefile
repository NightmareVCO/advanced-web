.PHONY: all build package clean

ZIP_NAME ?= function.zip

all: build package clean

build:
	@echo "==> Compilando para Lambda (linux/arm64)..."
	GOOS=linux GOARCH=arm64 CGO_ENABLED=0 go build -tags lambda.norpc -o bootstrap main.go

package:
	@echo "==> Creando $(ZIP_NAME)..."
	zip "$(ZIP_NAME)" bootstrap

clean:
	@echo "==> Limpiando..."
	rm -f bootstrap