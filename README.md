# URL to PNG

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

Well... I am a huge fan of docker. So we are going to use docker.

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

Navigate to `localhost:3000?url=https://www.jasonraimondi.com` and you should get back an image capture of `https://google.com`. 

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

## Image Storage / Cache

NOTE: Currently you are only able to use **ONE** storage option at a time.
NOTE 2: If you are running in Docker, you should skip the .env and load the environment variables into your container.

You are going to need to copy the environment file to use any of the storage options. By default no images are cached.

```
cp .env.sample .env
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
