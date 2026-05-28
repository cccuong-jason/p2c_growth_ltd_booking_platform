# VMS Go — Infrastructure Mandates

All VMS services MUST use the shared libraries in `github.com/opswat-eng/vms-common-go` for core infrastructure. Do not reinvent these clients.

## 1. Logging

**Mandate:** Use `pkg/observability` and `logging/` redaction.
**Why:** Ensures consistency and prevents accidental leakage of credentials (tokens, passwords) into logs.

```go
import "github.com/opswat-eng/vms-common-go/pkg/observability"

// env: production/staging/development
// format: json/console
// level: info/debug/error
logger, err := observability.NewLogger(env, format, level)
if err != nil {
    // handle error
}

// Redaction is automatic for keys like "authorization", "token", "password"
logger.Info("user login", zap.String("token", sensitiveToken)) // Output: "token": "[REDACTED]"
```

## 2. Kafka

**Mandate:** Use `pkg/kafka`.
**Why:** Standardizes on `franz-go`, provides idempotent consumer runners, and handles synchronous producing correctly.

```go
import "github.com/opswat-eng/vms-common-go/pkg/kafka"

cfg := kafka.ConsumerConfig{
    SeedBrokers:   brokers,
    ConsumerGroup: "my-service",
    Topics:        []string{"vms.events"},
}
cl, err := kafka.NewConsumerClient(cfg)
runner, _ := kafka.NewRunner(cl, nil)

// Run starts the consumer loop; commits are manual after processing
err = runner.Run(ctx, kafka.RecordProcessorFunc(func(ctx context.Context, rec *kgo.Record) error {
    return process(rec)
}))
```

## 3. Tracing (OpenTelemetry)

**Mandate:** Use `pkg/observability.InitTracer`.
**Why:** Ensures all services export spans to the same OTLP collector with correct service naming.

```go
shutdown, err := observability.InitTracer(ctx, "my-service", env, enabled, endpoint)
defer shutdown(ctx)
```

## 4. Import Grouping

Follow this strict grouping in every Go file:

```go
import (
    // 1. Standard Library
    "context"
    "fmt"

    // 2. Third-party packages
    "go.uber.org/zap"

    // 3. VMS Common (Mandatory Infrastructure)
    "github.com/opswat-eng/vms-common-go/pkg/kafka"
    "github.com/opswat-eng/vms-common-go/pkg/observability"

    // 4. Internal Project Packages
    "vms-api-go/internal/service"
)
```
