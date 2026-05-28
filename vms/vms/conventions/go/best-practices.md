# VMS Go — Best Practices

## 0. Go Version Baseline

**Rule:** Always target Go 1.26 for VMS Go services unless a repo is explicitly locked to an older version by the team.

- Set `go 1.26` in `go.mod` for new or upgraded services
- Prefer Go 1.26 standard library APIs and idioms instead of writing compatibility fallbacks for older versions
- When concurrency fits, prefer `sync.WaitGroup.Go` over manual `Add` / `Done` boilerplate

```go
var wg sync.WaitGroup

wg.Go(func() {
    process(ctx)
})

wg.Wait()
```

## 1. Context Propagation

**Rule:** Pass `context.Context` as the first argument to all functions performing I/O or long-running computations.

```go
func (s *Service) GetData(ctx context.Context, id string) (*Data, error) {
    return s.repo.Find(ctx, id)
}
```

## 2. Environment and Config Management

**Rule:** Use `github.com/spf13/viper` for environment and config management. Do not scatter direct `os.Getenv`, `os.LookupEnv`, or ad hoc environment parsing across application code.

- Centralize config loading in a dedicated `config` package
- Bind environment variables through `viper`
- Parse, validate, and default configuration once at startup
- Pass typed config structs downward instead of re-reading environment variables in services, handlers, or repositories

```go
type Config struct {
    HTTPPort string
    LogLevel string
}

func Load() (*Config, error) {
    viper.SetDefault("HTTP_PORT", "8080")
    viper.SetDefault("LOG_LEVEL", "info")
    viper.AutomaticEnv()

    cfg := &Config{
        HTTPPort: viper.GetString("HTTP_PORT"),
        LogLevel: viper.GetString("LOG_LEVEL"),
    }
    return cfg, nil
}
```

## 3. Functional Options Pattern

**Rule:** Use the "Options" pattern for complex struct initialization to maintain API stability.

```go
type Client struct {
    timeout time.Duration
}

type Option func(*Client)

func WithTimeout(d time.Duration) Option {
    return func(c *Client) { c.timeout = d }
}

func NewClient(opts ...Option) *Client {
    c := &Client{timeout: defaultTimeout}
    for _, opt := range opts { opt(c) }
    return c
}
```

## 4. Defensive Error Handling

**Rule:** Wrap errors with context using `%w` for easier debugging while preserving the original error type.

```go
if err != nil {
    return fmt.Errorf("fetching user %s: %w", id, err)
}
```

## 5. Strict Typing

**Rule:** Avoid `interface{}` (or `any`) unless building a truly generic utility. Prefer explicit types or Go Generics for type safety.
