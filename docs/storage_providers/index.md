# Storage Providers

The project supports multiple storage providers for caching rendered images. The storage provider can be configured using the `STORAGE_PROVIDER` environment variable. The available storage providers are:

## Stub Storage Provider (default)

The stub storage provider is a placeholder storage provider that doesn't actually store or retrieve images, it simply logs debug messages. It can be used for testing or when storage functionality is not required.

## Filesystem

The filesystem storage provider allows storing and retrieving rendered images on the local filesystem.

- `STORAGE_PROVIDER`: `"filesystem"`
- `IMAGE_STORAGE_PATH`: The directory path where images will be stored

## S3

The S3 compatible storage provider allows storing and retrieving rendered images using Amazon S3.

- `STORAGE_PROVIDER`: `"s3"`
- `AWS_BUCKET`: The name of the S3 bucket to store images
- `AWS_ACCESS_KEY_ID`: The AWS access key ID
- `AWS_SECRET_ACCESS_KEY`: The AWS secret access key
- `AWS_DEFAULT_REGION`: The AWS region for S3 (default: "us-east-1")
- `AWS_FORCE_PATH_STYLE`: Set to `true` to use path-style URLs for S3 (default: `false`)
- `AWS_ENDPOINT_URL_S3`: The endpoint URL for S3 (optional)

## CouchDB

The CouchDB storage provider allows storing and retrieving rendered images using CouchDB.

- `STORAGE_PROVIDER`: `"couchdb"`
- `COUCH_DB_PROTOCOL`: The protocol for connecting to CouchDB (e.g., "http" or "https")
- `COUCH_DB_USER`: The CouchDB username
- `COUCH_DB_PASS`: The CouchDB password
- `COUCH_DB_HOST`: The CouchDB host
- `COUCH_DB_PORT`: The CouchDB port
- `COUCHDB_DATABASE`: The name of the CouchDB database to store images (default: "images")

