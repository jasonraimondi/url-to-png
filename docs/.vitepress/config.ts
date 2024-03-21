import { defineConfig } from "vitepress";

// https://vitepress.vuejs.org/config/app-configs
export default defineConfig({
  lang: "en-US",
  title: "URL-to-PNG",
  base: "/url-to-png/",
  description:
    "Selfhosted. URL-to-PNG utility featuring parallel rendering using Playwright for screenshots and with storage caching via Local, S3, or CouchDB.",
  themeConfig: {
    repo: "jasonraimondi/url-to-png",
    docsDir: "docs",
    editLink: {
      pattern: 'https://github.com/jasonraimondi/url-to-png/edit/main/docs/:path',
      text: 'Edit this page on GitHub'
    },
    nav: [
      { text: "Github", link: "https://github.com/jasonraimondi/url-to-png" },
      { text: "Getting Started", link: "/getting_started/" },
    ],
    sidebar: [
      {
        items: [
          { text: "Getting Started", link: "/getting_started/" },
          { text: "Configuration", link: "/config/" },
          { text: "Storage Providers", link: "/storage_providers/" },
          { text: "Metrics", link: "/metrics/" },
          { text: "Contributing", link: "/contributing/" },
        ],
      },
    ],
  },
});
