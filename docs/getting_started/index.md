# Getting Started

## Docker

You can run URL-to-PNG using Docker with the following command:

```bash
docker run --rm -p 3089:3089 ghcr.io/jasonraimondi/url-to-png
```

The Docker image is also available on [DockerHub](https://hub.docker.com/r/jasonraimondi/url-to-png/).

# API

URL-to-PNG provides a single endpoint that accepts various query parameters to customize the generated image.

## Query Parameters

- `url` (required): The valid URL to be captured.
- `width` (optional): The width of the output screenshot. Default is `250`.
- `height` (optional): The height of the output screenshot. Default is `250`.
- `viewPortWidth` (optional): The width of the render viewport. Default is `1080`.
- `viewPortHeight` (optional): The height of the render viewport. Default is `1080`.
- `forceReload` (optional): Forces a reload of the cached image. Default is `false`.
- `isMobile` (optional): Adds a mobile flag to the user agent. Default is `false`.
- `isFullPage` (optional): Renders the full page instead of the viewport crop. Default is `false`.
- `isDarkMode` (optional): Prefers the dark color scheme. Default is `false`.
- `deviceScaleFactor` (optional): Specifies the device scale factor (can be thought of as DPR). Default is `1`.

## Usage Examples

Here are some example combinations of query parameters:

```
http://localhost:3089?url=https://jasonraimondi.com
http://localhost:3089?url=https://jasonraimondi.com&forceReload=true
http://localhost:3089?url=https://jasonraimondi.com&isFullPage=true
http://localhost:3089?url=https://jasonraimondi.com&isMobile=true
http://localhost:3089?url=https://jasonraimondi.com&isDarkMode=true
http://localhost:3089?url=https://jasonraimondi.com&width=400&height=400
http://localhost:3089?url=https://jasonraimondi.com&viewPortHeight=400&viewPortWidth=400
http://localhost:3089?url=https://jasonraimondi.com&isFullPage=true&isMobile=true&width=400&height=400&viewPortHeight=400&viewPortWidth=400
http://localhost:3089?url=https://jasonraimondi.com&isMobile=true&isFullPage=true&viewPortWidth=375&width=375&deviceScaleFactor=1
```

```html
<img src="http://localhost:3089?url=https://jasonraimondi.com" 
     alt="Jason Raimondi's personal home page screenshot" />
```
