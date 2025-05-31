<h1 align="center">
  	<img height="100" src="https://res.cloudinary.com/jmondi/image/upload/v1536798191/jasonraimondi.com/url-to-img/url-to-png-logo.png" alt="URL to PNG logo" />
  	<br /> URL to PNG
</h1>

[![GitHub License](https://img.shields.io/github/license/jasonraimondi/url-to-png)](https://github.com/jasonraimondi/url-to-png/blob/main/LICENSE)
[![GitHub Workflow Status](https://img.shields.io/github/actions/workflow/status/jasonraimondi/url-to-png/ci.yml?branch=main&style=flat-square)](https://github.com/jasonraimondi/url-to-png)
[![Docker Pulls](https://img.shields.io/docker/pulls/jasonraimondi/url-to-png)](https://hub.docker.com/r/jasonraimondi/url-to-png/tags)


A URL to PNG generator over HTTP with a fairly simple API accessed via query params passed to the server.

- Generate PNG images from URLs
- Customizable image dimensions and viewport size
- Support for mobile user agent and dark mode rendering
- Caching of generated images
- Allow list for domain-specific requests
- Configurable Playwright options
- Integration with various storage providers (AWS S3, CouchDB, Filesystem)
- Prometheus metrics endpoint

## Examples

<table>
  <tr>
    <td><img src="./screenshots/jasonraimondi.com.png" width="250"/></td>
    <td><img src="./screenshots/github.com_jasonraimondi_url-to-png.png" width="250"/></td>
  </tr>
</table>

Use in your HTML

```html
<img src="http://localhost:3089?url=https://jasonraimondi.com&width=600">
<img src="http://localhost:3089?url=https://github.com/jasonraimondi/url-to-png&width=600">
```

## Getting Started

Checkout [the docs to getting_started](https://jasonraimondi.github.io/url-to-png/getting_started/)

### Docker

Run the following command:

```
docker run --rm -p 3089:3089 ghcr.io/jasonraimondi/url-to-png
```

On the hub: [Link to DockerHub](https://hub.docker.com/r/jasonraimondi/url-to-png/)

### Local Serve

Serve the project

```
git clone https://github.com/jasonraimondi/url-to-png
cd url-to-png
pnpm install
pnpm exec playwright install chromium
pnpm dev
```

## Configuration

Read the [full config options](https://jasonraimondi.github.io/url-to-png/config/)

## Encryption

Learn about [encryption](https://jasonraimondi.github.io/url-to-png/encryption/)

## Metrics

Learn about [metrics](https://jasonraimondi.github.io/url-to-png/metrics/)

## Star History

[![Star History Chart](https://api.star-history.com/svg?repos=jasonraimondi/url-to-png&type=Timeline)](https://star-history.com/#jasonraimondi/url-to-png&Timeline)
