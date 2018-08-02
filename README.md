# URL to PNG

A URL to PNG generator over HTTP with a fairly simple API accessed via query params passed to the servers single endpoint.

- `url: string`
    - **Required**
    - Valid URL to be captured
- `width: number`
    - Default: `250`
    - Width of output screenshot
- `height: number`
    - Default: `250`
    - Height of output screenshot
- `viewPortWidth: number`
    - Default: `1080`
    - Width of render viewport
- `viewPortHeight: number`
    - Default: `1080`
    - Height of render viewport
- `forceReload: boolean`
    - Default: `false`
    - Force cached image reload
- `isMobile: boolean`
    - Default: false
    - Adds mobile flag to user agent
- `isFullPage: boolean`
    - Default: false
    - Render full page instead of viewport crop

## How to Use:

Serve the project

```
git clone git@github.com:jasonraimondi/url-to-png.git
cd url-to-png
docker-compose up
```

If you want to serve via node locally:

```
npm install
npm run serve
```

Navigate to the following URL

```
localhost:3000?url=https://jasonraimondi.com
```


## Image Storage / Cache

NOTE: Currently you are only able to use **ONE** storage option at a time.

You are going to need to copy the environment file to use any of the storage options. By default no images are cached.

```
cp config/.env.sample config/.env
```

#### AWS S3

To use Amazon S3, ensure the following variables are loaded in your `.env`:

```
AWS_S3_ENABLED=true
AWS_ACCESS_KEY=
AWS_SECRET_KEY=
AWS_REGION=
AWS_BUCKET=
```

#### CouchDB

To use CouchDB, ensure the following variables are loaded in your `.env`:

```
COUCH_DB_ENABLED=true
COUCH_DB_PROTOCOL=
COUCH_DB_HOST=
COUCH_DB_USER=
COUCH_DB_PASS=
```

## Docker

Run the following command:

```
docker run --rm -p 3000:3000 jasonraimondi/url-to-png
```

Navigate to `localhost:3000?url=https://google.com`. 

Try any of the following:

```
http://localhost:3000?url=https://google.com
http://localhost:3000?url=https://google.com&forceReload=true
http://localhost:3000?url=https://google.com&isFullPage=true
http://localhost:3000?url=https://google.com&isMobile=true
http://localhost:3000?url=https://google.com&width=400&height=400
http://localhost:3000?url=https://google.com&viewPortHeight=400&viewPortWidth=400
http://localhost:3000?url=https://google.com&viewPortHeight=400&viewPortWidth=400
http://localhost:3000?url=https://google.com&isFullPage=true&isMobile=true&width=400&height=400&viewPortHeight=400&viewPortWidth=400
```

On the hub: [Link to DockerHub](https://hub.docker.com/r/jasonraimondi/url-to-png/)
