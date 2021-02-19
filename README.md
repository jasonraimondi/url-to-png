<h1 align="center">
  	<img height="100" src="https://res.cloudinary.com/jmondi/image/upload/v1536798191/jasonraimondi.com/url-to-img/url-to-png-logo.png" alt="URL to PNG logo" />
  	<br /> URL to PNG
</h1>

[![Docker](https://github.com/jasonraimondi/url-to-png/actions/workflows/docker.yml/badge.svg)](https://github.com/jasonraimondi/url-to-png/actions/workflows/docker.yml)
[![Build](https://img.shields.io/docker/cloud/build/jasonraimondi/url-to-png?style=flat-square)](https://hub.docker.com/r/jasonraimondi/url-to-png/)
[![Image Size](https://img.shields.io/docker/image-size/jasonraimondi/url-to-png?style=flat-square)](https://hub.docker.com/r/jasonraimondi/url-to-png/)
[![Pulls](https://img.shields.io/docker/pulls/jasonraimondi/url-to-png?style=flat-square)](https://hub.docker.com/r/jasonraimondi/url-to-png/)
[![Version](https://img.shields.io/docker/v/jasonraimondi/url-to-png?style=flat-square)](https://hub.docker.com/r/jasonraimondi/url-to-png/)

A URL to PNG generator over HTTP with a fairly simple API accessed via query params passed to the servers single endpoint.

- `url: string` - Valid URL to be captured - **Required**
- `width: number` - Width of output screenshot - **Optional** - Default: `250`
- `height: number` - Height of output screenshot - **Optional** - Default: `250`
- `viewPortWidth: number` - Width of render viewport - **Optional** - Default: `1080`
- `viewPortHeight: number` - Height of render viewport - **Optional** - Default: `1080`
- `forceReload: boolean` - Force cached image reload - **Optional** - Default: `false`
- `isMobile: boolean` - Adds mobile flag to user agent - **Optional** - Default: false
- `isFullPage: boolean` - Render full page instead of viewport crop - **Optional** - Default: false

## How to Use:

#### A) Docker

Run the following command:

```
docker run --rm -p 3000:3000 jasonraimondi/url-to-png
```

On the hub: [Link to DockerHub](https://hub.docker.com/r/jasonraimondi/url-to-png/)

#### B) Local Serve

Serve the project

```
git clone git@github.com:jasonraimondi/url-to-png.git
cd url-to-png
npm install
npm run dev
```

#### Up and Running?

Navigate to `localhost:3000?url=https://www.jasonraimondi.com` and you should get back an image capture of my website homepage.

Go ahead and try any of the following:

```
http://localhost:3000?url=https://www.jasonraimondi.com
http://localhost:3000?url=https://www.jasonraimondi.com&forceReload=true
http://localhost:3000?url=https://www.jasonraimondi.com&isFullPage=true
http://localhost:3000?url=https://www.jasonraimondi.com&isMobile=true
http://localhost:3000?url=https://www.jasonraimondi.com&width=400&height=400
http://localhost:3000?url=https://www.jasonraimondi.com&viewPortHeight=400&viewPortWidth=400
http://localhost:3000?url=https://www.jasonraimondi.com&viewPortHeight=400&viewPortWidth=400
http://localhost:3000?url=https://www.jasonraimondi.com&isFullPage=true&isMobile=true&width=400&height=400&viewPortHeight=400&viewPortWidth=400
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
AWS_ACCESS_KEY=
AWS_SECRET_KEY=
AWS_REGION=
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

## Sources

- Upstream Repository: [https://git.jasonraimondi.com/jason/url-to-png](https://git.jasonraimondi.com/jason/url-to-png)
- Logo from [https://www.hipsterlogogenerator.com/](https://www.hipsterlogogenerator.com/)
