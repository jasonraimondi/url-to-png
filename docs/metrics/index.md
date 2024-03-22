# Metrics

The metrics endpoint provides information about the browser pool, such as the spare resource capacity, pool size, available and borrowed instances, pending requests, and the maximum and minimum pool size.

You can enable metrics by setting `METRICS=true`. This will expose a `/metrics` endpoint for Prometheus to scrape.

```json
{
  "poolMetrics": {
    "spareResourceCapacity": 8,
    "size": 2,
    "available": 2,
    "borrowed": 0,
    "pending": 0,
    "max": 10,
    "min": 2
  }
}
```
