.PHONY: install dev test lint build verify audit

export NEXT_TELEMETRY_DISABLED := 1

install:
	npm install

dev:
	npm run dev

test:
	npm run test

lint:
	npm run lint

build:
	npm run build

verify: test lint build

audit:
	npm audit --audit-level=high
