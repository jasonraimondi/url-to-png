# Getting Started

## Ways to Install

### Docker

You can run URL-to-PNG using Docker with the following command:

```bash
docker run --rm -p 3089:3089 ghcr.io/jasonraimondi/url-to-png
```

### Local Development

To run URL-to-PNG locally, follow these steps:

1. Clone the repository:

   ```bash
   git clone git@github.com:jasonraimondi/url-to-png.git
   cd url-to-png
   ```

2. Install dependencies:

   ```bash
   pnpm install
   ```

3. Install Playwright browsers (if needed):

   ```bash
   pnpm exec playwright install chromium
   ```

4. Start the development server:
   ```bash
   pnpm dev
   ```

The Docker image is also available on [DockerHub](https://hub.docker.com/r/jasonraimondi/url-to-png/).
