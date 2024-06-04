# Usage

URL-to-PNG provides a single endpoint that accepts various query parameters to customize the generated image.

## Query Parameters

- `url` (required): The valid URL to be captured.
- `width` (optional): The width of the output screenshot. Default is `250`.
- `height` (optional): The height of the output screenshot. Default is `250`.
- `viewportWidth` (optional): The width of the render viewport. Default is `1080`.
- `viewportHeight` (optional): The height of the render viewport. Default is `1080`.
- `forceReload` (optional): Forces a reload of the cached image. Default is `false`.
- `isMobile` (optional): Adds a mobile flag to the user agent. Default is `false`.
- `isFullPage` (optional): Renders the full page instead of the viewport crop. Default is `false`.
- `isDarkMode` (optional): Prefers the dark color scheme. Default is `false`.
- `deviceScaleFactor` (optional): Specifies the device scale factor (can be thought of as DPR). Default is `1`.

## Examples

Here are some example combinations of query parameters:

```
http://localhost:3089?url=https://jasonraimondi.com
http://localhost:3089?url=https://jasonraimondi.com&forceReload=true
http://localhost:3089?url=https://jasonraimondi.com&isFullPage=true
http://localhost:3089?url=https://jasonraimondi.com&isMobile=true
http://localhost:3089?url=https://jasonraimondi.com&isDarkMode=true
http://localhost:3089?url=https://jasonraimondi.com&width=400&height=400
http://localhost:3089?url=https://jasonraimondi.com&viewportHeight=400&viewportWidth=400
http://localhost:3089?url=https://jasonraimondi.com&isFullPage=true&isMobile=true&width=400&height=400&viewportHeight=400&viewportWidth=400
http://localhost:3089?url=https://jasonraimondi.com&isMobile=true&isFullPage=true&viewportWidth=375&width=375&deviceScaleFactor=1
```

Use in your HTML

```html
<img
  src="http://localhost:3089?url=https://jasonraimondi.com"
  alt="Jason Raimondi's personal home page screenshot"
/>
```
