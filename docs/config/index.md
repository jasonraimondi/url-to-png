# Configuration

Configure various settings through environment variables.

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

## Connection Pool Options

- `POOL_IDLE_TIMEOUT_MS`: Idle timeout for browser connection pool in milliseconds. Default: `15000`.
- `POOL_MAX`: Maximum number of connections in the browser pool. Default: `10`.
- `POOL_MAX_WAITING_CLIENTS`: Maximum number of waiting clients for the browser pool. Default: `50`.
- `POOL_MIN`: Minimum number of connections in the browser pool. Default: `2`.

## Default Browser Options

- `DEFAULT_WIDTH`: Default width of the rendered image in pixels. Default: `250`
- `DEFAULT_HEIGHT`: Default height of the rendered image in pixels. Default: `250`
- `DEFAULT_VIEWPORT_WIDTH`: Default width of the browser viewport in pixels. Default: `1080`
- `DEFAULT_VIEWPORT_HEIGHT`: Default height of the browser viewport in pixels. Default: `1080`
- `DEFAULT_IS_MOBILE`: Whether to emulate a mobile device. Default: `false`
- `DEFAULT_IS_FULL_PAGE`: Whether to capture the full page or clip the page at the viewport height. Default: `false`
- `DEFAULT_IS_DARK_MODE`: Whether to request dark mode. Default: `false`
- `DEFAULT_DEVICE_SCALE_FACTOR`: Default device scale factor (e.g., 2 for retina displays). Default: `1`

## Metrics and Encryption

- `METRICS`: Enable or disable metrics collection. Default: `false`.
- `CRYPTO_KEY`: Encryption key for sensitive data.

## Storage Providers

The project supports multiple storage providers for caching rendered images. The storage provider can be configured using the `STORAGE_PROVIDER` environment variable. The available storage providers are:

### Stub Storage Provider (default)

The stub storage provider is a placeholder storage provider that doesn't actually store or retrieve images, it simply logs debug messages. It can be used for testing or when storage functionality is not required.

### Filesystem

The filesystem storage provider allows storing and retrieving rendered images on the local filesystem.

- `STORAGE_PROVIDER`: `"filesystem"`
- `IMAGE_STORAGE_PATH`: The directory path where images will be stored

### S3

The S3 compatible storage provider allows storing and retrieving rendered images using Amazon S3.

- `STORAGE_PROVIDER`: `"s3"`
- `AWS_BUCKET`: The name of the S3 bucket to store images
- `AWS_ACCESS_KEY_ID`: The AWS access key ID
- `AWS_SECRET_ACCESS_KEY`: The AWS secret access key
- `AWS_DEFAULT_REGION`: The AWS region for S3 (default: "us-east-1")
- `AWS_FORCE_PATH_STYLE`: Set to `true` to use path-style URLs for S3 (default: `false`)
- `AWS_ENDPOINT_URL_S3`: The endpoint URL for S3 (optional)

### CouchDB

The CouchDB storage provider allows storing and retrieving rendered images using CouchDB.

- `STORAGE_PROVIDER`: `"couchdb"`
- `COUCH_DB_PROTOCOL`: The protocol for connecting to CouchDB (e.g., "http" or "https")
- `COUCH_DB_USER`: The CouchDB username
- `COUCH_DB_PASS`: The CouchDB password
- `COUCH_DB_HOST`: The CouchDB host
- `COUCH_DB_PORT`: The CouchDB port
- `COUCHDB_DATABASE`: The name of the CouchDB database to store images (default: "images")
