.PHONY: install dev build lint preview upload deploy-infra clean help

help:
	@echo "Available commands:"
	@echo "  make install      - Install dependencies"
	@echo "  make dev          - Start development server"
	@echo "  make build        - Build for production"
	@echo "  make lint         - Run linting"
	@echo "  make preview      - Preview production build"
	@echo "  make upload       - Upload to S3 and invalidate CloudFront"
	@echo "  make deploy-infra - Deploy AWS infrastructure (CloudFormation)"
	@echo "  make clean        - Clean build artifacts and dependencies"

install:
	npm install

dev:
	npm run dev

build:
	npm run build

lint:
	npm run lint
	npx tsc --noemit

preview:
	npm run preview

upload: build
	./upload.sh

deploy-infra:
	cd infrastructure && ./deploy.sh

clean:
	rm -rf dist/
	rm -rf node_modules/
