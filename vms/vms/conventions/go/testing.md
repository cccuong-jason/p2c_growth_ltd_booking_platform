# VMS Go — Testing Conventions

## 1. Framework

**Mandate:** Use `github.com/stretchr/testify/require` for assertions.
**Why:** Fails tests immediately on first error, reducing noise in CI.

```go
func TestAddition(t *testing.T) {
    result := Add(2, 2)
    require.Equal(t, 4, result)
}
```

## 2. Table-Driven Tests

**Mandate:** Use anonymous struct slices for testing functions with multiple input/output scenarios.

```go
func TestValidateEmail(t *testing.T) {
    tests := []struct {
        name    string
        email   string
        isValid bool
    }{
        {"valid", "test@opswat.com", true},
        {"missing @", "testopswat.com", false},
        {"empty", "", false},
    }

    for _, tt := range tests {
        t.Run(tt.name, func(t *testing.T) {
            got := ValidateEmail(tt.email)
            require.Equal(t, tt.isValid, got)
        })
    }
}
```

## 3. Mocks

**Rule:** Prefer interfaces for dependencies to allow easy mocking via `mockery` or manual fakes. Co-locate mocks with tests if not used globally.
