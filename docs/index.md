<h1 align="center">
  	<img style="height:200px;padding:0;" height="100" src="https://res.cloudinary.com/jmondi/image/upload/v1536798191/jasonraimondi.com/url-to-img/url-to-png-logo.png" alt="URL-to-PNG logo" />
  	URL-to-PNG
</h1>

![GitHub License](https://img.shields.io/github/license/jasonraimondi/url-to-png)
[![GitHub Workflow Status]( https://img.shields.io/github/actions/workflow/status/jasonraimondi/url-to-png/publish.yml?branch=main&style=flat-square)](https://github.com/jasonraimondi/url-to-png)
![Docker Pulls](https://img.shields.io/docker/pulls/jasonraimondi/url-to-png)

URL-to-PNG is a server that generates PNG images from URLs over HTTP. It provides a simple API that can be accessed via query parameters passed to the server's single endpoint.

### Features

- Generate PNG images from URLs
- Customizable image dimensions and viewport size
- Support for mobile user agent and dark mode rendering
- Caching of generated images
- Allow list for domain-specific requests
- Configurable Playwright options
- Integration with various storage providers (AWS S3, CouchDB, Filesystem)
- Prometheus metrics endpoint
