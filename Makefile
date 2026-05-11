.PHONY: dev build upload deploy-infra help

help:
	@echo "Available commands:"
	@echo "  make dev          - Start development server"
	@echo "  make build        - Build for production"
	@echo "  make upload       - Upload to S3 and invalidate CloudFront"
	@echo "  make deploy-infra - Deploy AWS infrastructure (CloudFormation)"

dev:
	npm run dev

build:
	npm run build

upload: build
	./upload.sh

deploy-infra:
	cd infrastructure && ./deploy.sh
