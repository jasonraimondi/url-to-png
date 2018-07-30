# URL to PNG

### How to Use:

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

Required Params:

- `url`: string, valid URL

Optional Params:

- `forceReload`: true - force reload image if it is already stored
- `width`: number - width of screenshot
- `height`: number - height of screenshot
- `viewPortWidth`: number - width of render viewport
- `viewPortHeight`: number - height of render viewport

### Using Storage

#### AWS S3

To use AWS S3 you are going to need to copy the environment file and the aws config sample.

```
cp config/.env.sample config/.env
cp config/aws-config.sample.json config/aws-config.json
```

Make sure that `AWS_S3=true` and `AWS_BUCKET` are set properly, and the aws-config.json exists.

#### CouchDB

To use CouchDB, you are going to need to copy the environment file

```
cp config/.env.sample config/.env
```

Make sure that `COUCH_DB=true` and the proper values for your instance are filled out.

### Tools:

- NestJS/Express web server
- Puppeteer for headless chrome image rendering
- Sharp for image resizing
- CouchDB or AWS S3 for image store

### Docker

If you run `docker-compose up` it should boot the project and spin it up on `localhost:3000`


