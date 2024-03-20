<h1 align="center">
  	<img height="100" src="https://res.cloudinary.com/jmondi/image/upload/v1536798191/jasonraimondi.com/url-to-img/url-to-png-logo.png" alt="URL to PNG logo" />
  	<br /> URL to PNG
</h1>

A URL to PNG generator over HTTP with a fairly simple API accessed via query params passed to the servers single endpoint.

## Getting Started

### Docker

Run the following command:

```
docker run --rm -p 3089:3089 ghcr.io/jasonraimondi/url-to-png
```

On the hub: [Link to DockerHub](https://hub.docker.com/r/jasonraimondi/url-to-png/)

### Local Serve

Serve the project

```
git clone git@github.com:jasonraimondi/url-to-png.git
cd url-to-png
pnpm install
# you may need to run this command if you are having issues with playwright
pnpm exec playwright install
pnpm dev
```

## Query Params

- `url: string` - Valid URL to be captured - **Required**
- `width: number` - Width of output screenshot - **Optional** - Default: `250`
- `height: number` - Height of output screenshot - **Optional** - Default: `250`
- `viewPortWidth: number` - Width of render viewport - **Optional** - Default: `1080`
- `viewPortHeight: number` - Height of render viewport - **Optional** - Default: `1080`
- `forceReload: boolean` - Force cached image reload - **Optional** - Default: `false`
- `isMobile: boolean` - Adds mobile flag to user agent - **Optional** - Default: `false
- `isFullPage: boolean` - Render full page instead of viewport crop - **Optional** - Default: `false`
- `isDarkMode: boolean` - Prefer color scheme dark - **Optional** - Default: `false`
- `deviceScaleFactor: number` - Specify device scale factor (can be thought of as dpr) - **Optional** - Default: `1`

Try it out at `localhost:3089?url=https://www.jasonraimondi.com&isDarkMode=true` and you should get back an image capture of my website homepage.

All sorts of combos work:

```
http://localhost:3089?url=https://jasonraimondi.com
http://localhost:3089?url=https://jasonraimondi.com&forceReload=true
http://localhost:3089?url=https://jasonraimondi.com&isFullPage=true
http://localhost:3089?url=https://jasonraimondi.com&isMobile=true
http://localhost:3089?url=https://jasonraimondi.com&isDarkMode=true
http://localhost:3089?url=https://jasonraimondi.com&width=400&height=400
http://localhost:3089?url=https://jasonraimondi.com&viewPortHeight=400&viewPortWidth=400
http://localhost:3089?url=https://jasonraimondi.com&viewPortHeight=400&viewPortWidth=400
http://localhost:3089?url=https://jasonraimondi.com&isFullPage=true&isMobile=true&width=400&height=400&viewPortHeight=400&viewPortWidth=400
http://localhost:3089?url=https://jasonraimondi.com&isMobile=true&isFullPage=true&viewPortWidth=375&width=375&deviceScaleFactor=1
```

## System Requirements

The following is cut from the Playwright documentation, please view the [official system requirement documentation](https://playwright.dev/docs/1.3.0/intro/#system-requirements) for the most up to date requirements guide.

Playwright requires Node.js version 10.15 or above. The browser binaries for Chromium, Firefox and WebKit work across the 3 platforms (Windows, macOS, Linux):

* **Windows**: Works with Windows and Windows Subsystem for Linux (WSL).
* **macOS**: Requires 10.14 or above.
* **Linux**: Depending on your Linux distribution, you might need to install additional dependencies to run the browsers. 
  * **Firefox** requires Ubuntu 18.04+
  * For **Ubuntu 18.04**, the additional dependencies are defined in the [playwright Docker image](https://github.com/microsoft/playwright/blob/master/utils/docker/Dockerfile.bionic), which is based on Ubuntu.

## Allow List

Allow domain specific requests by passing in an ALLOW_LIST. The list should be **comma separated**, **not include spaces**, and should be the **domain name only**.

If this value is either `undefined || ""`, url-to-png will allow any domain to be rendered.

```
ALLOW_LIST=jasonraimondi.com,github.com
```

## Playwright Options

Please see the Playwright API documentation [here](https://playwright.dev/docs/api/class-page#pagegotourl-options) for further knowledge.

```
BROWSER_TIMEOUT=
BROWSER_WAIT_UNTIL=
```

#### `BROWSER_TIMEOUT`

The maximum navigation time in milliseconds, pass 0 to disable timeout. The default value is 10000

#### `BROWSER_WAIT_UNTIL`

When playwright to considers the navigation succeeded. The default value for this option is `domcontentloaded`

Valid Options:

- `'load'` - consider operation to be finished when the `load` event is fired.
- `'domcontentloaded'` - consider operation to be finished when the `DOMContentLoaded` event is fired.
- `'networkidle'` - consider operation to be finished when there are no network connections for at least `500` ms.

## Image Storage / Cache

NOTE: If you are running in Docker, you should skip the .env and load the environment variables into your container.

You are going to need to copy the environment file to use any of the storage options. By default no images are cached.

```
cp .env.sample .env
```

#### AWS S3

To use Amazon S3 set `STORAGE_PROVIDER=s3`, ensure the following variables are loaded in your `.env`:

```
STORAGE_PROVIDER=s3
AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
AWS_DEFAULT_REGION=
AWS_ENDPOINT_URL_S3=
AWS_BUCKET=
```

#### CouchDB

To use CouchDB set `STORAGE_PROVIDER=couchdb`, ensure the following variables are loaded in your `.env`:

```
STORAGE_PROVIDER=couchdb
COUCH_DB_PROTOCOL=
COUCH_DB_HOST=
COUCH_DB_USER=
COUCH_DB_PASS=
```

#### Filesystem

To use your local filesystem, set `STORAGE_PROVIDER=filesystem`, ensure the following variables are loaded in your `.env`:

```
STORAGE_PROVIDER=filesystem
IMAGE_STORAGE_PATH=/tmp/foo
```

## Metrics

You can enable metrics by setting `METRICS=true` in your `.env` file. This will expose a `/metrics` endpoint for Prometheus to scrape.

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

## Sources

- Upstream Repository: [https://git.jasonraimondi.com/jason/url-to-png](https://git.jasonraimondi.com/jason/url-to-png)
- Logo from [https://www.hipsterlogogenerator.com/](https://www.hipsterlogogenerator.com/)
