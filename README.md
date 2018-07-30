# URL to PNG

### How to Use:

Serve the project

```
git clone git@github.com:jasonraimondi/url-to-png.git
cd url-to-png
docker-compose up
```

If you want to serve via node locally, you will need to update [app.module.ts](./src/app.module.ts) to point CouchDB to `localhost:5984` instead of `couchdb:5984`

```
npm install
npm run serve
```

Navigate to the following URL

```
localhost:3000?url=https://jasonraimondi.com
```


### Tools:

- Puppeteer for headless chrome image rendering
- Sharp for image resizing
- CouchDB for image store

### Docker

If you run `docker-compose up` it should boot the project and spin it up on `localhost:3000`


