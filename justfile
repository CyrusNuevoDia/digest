# Justfile – handy task runner (https://just.systems)

# --- settings ---------------------- https://just.systems/man/en/settings.html
set dotenv-load := true
set dotenv-path := ".env"
set ignore-comments := true

dev *args:
  bun run dev {{args}}

build:
  bun run build

preview: build
  bun run start

fmt:
  bun run fmt

lint:
  bun run lint
