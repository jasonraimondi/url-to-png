# Configuration

URL-to-PNG allows you to configure various settings through environment variables. Here are the available configuration options:

## General Settings

- `LOG_LEVEL`: Logging level (debug, info, warn, error). Default: `debug`.
- `NODE_ENV`: Node environment (development, production). Default: `development`.
- `PORT`: Port number for the application to listen on. Default: `3089`.
- `CACHE_CONTROL`: Cache-Control header value for the responses. Default: `"public, max-age=86400, immutable"`.

## Allow List

- `ALLOW_LIST`: Comma-separated list of allowed domains for screenshots. If undefined or empty, all domains are allowed. Example: `ALLOW_LIST=jasonraimondi.com,github.com`.

## Playwright Options

- `BROWSER_TIMEOUT`: Browser timeout in milliseconds for rendering. Default: `10000`.
- `BROWSER_WAIT_UNTIL`: Event to wait for before considering the page loaded. Valid options: `'load'`, `'domcontentloaded'`, `'networkidle'`. Default: `'domcontentloaded'`.

## Database Connection Pool

- `POOL_IDLE_TIMEOUT_MS`: Idle timeout for database connection pool in milliseconds. Default: `15000`.
- `POOL_MAX`: Maximum number of connections in the database pool. Default: `10`.
- `POOL_MAX_WAITING_CLIENTS`: Maximum number of waiting clients for the database pool. Default: `50`.
- `POOL_MIN`: Minimum number of connections in the database pool. Default: `2`.

## Metrics and Encryption

- `METRICS`: Enable or disable metrics collection. Default: `false`.
- `CRYPTO_KEY`: Encryption key for sensitive data.

## Storage Providers

- `STORAGE_PROVIDER`: Storage provider to use. Valid options: `stub`, `s3`, `couchdb`, `filesystem`. Default: `stub`.

### Filesystem Storage Provider

- `IMAGE_STORAGE_PATH`: Path to store images when using the filesystem storage provider.

### S3 Storage Provider

- `AWS_BUCKET`: AWS S3 bucket name.
- `AWS_ACCESS_KEY_ID`: AWS access key ID.
- `AWS_SECRET_ACCESS_KEY`: AWS secret access key.
- `AWS_DEFAULT_REGION`: AWS default region. Default: `us-east-1`.
- `AWS_ENDPOINT_URL_S3`: AWS S3 endpoint URL.
- `AWS_FORCE_PATH_STYLE`: Force path-style URLs for S3. Default: `false`.

### CouchDB Storage Provider

- `COUCH_DB_HOST`: CouchDB host.
- `COUCH_DB_PASS`: CouchDB password.
- `COUCH_DB_PORT`: CouchDB port.
- `COUCH_DB_PROTOCOL`: CouchDB protocol.
- `COUCH_DB_USER`: CouchDB username.
- `COUCHDB_DATABASE`: CouchDB database name. Default: `images`.

To configure URL-to-PNG, set the appropriate environment variables either in your `.env` file or pass them as environment variables to your Docker container.
