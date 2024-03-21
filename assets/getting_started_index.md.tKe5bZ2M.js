import{_ as a,c as e,o as s,a2 as t}from"./chunks/framework.B5nJBhaa.js";const g=JSON.parse('{"title":"Getting Started","description":"","frontmatter":{},"headers":[],"relativePath":"getting_started/index.md","filePath":"getting_started/index.md"}'),i={name:"getting_started/index.md"},o=t(`<h1 id="getting-started" tabindex="-1">Getting Started <a class="header-anchor" href="#getting-started" aria-label="Permalink to &quot;Getting Started&quot;">​</a></h1><h2 id="docker" tabindex="-1">Docker <a class="header-anchor" href="#docker" aria-label="Permalink to &quot;Docker&quot;">​</a></h2><p>You can run URL-to-PNG using Docker with the following command:</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">docker</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> run</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> --rm</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -p</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 3089</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">:3089</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> ghcr.io/jasonraimondi/url-to-png</span></span></code></pre></div><p>The Docker image is also available on <a href="https://hub.docker.com/r/jasonraimondi/url-to-png/" target="_blank" rel="noreferrer">DockerHub</a>.</p><h1 id="api" tabindex="-1">API <a class="header-anchor" href="#api" aria-label="Permalink to &quot;API&quot;">​</a></h1><p>URL-to-PNG provides a single endpoint that accepts various query parameters to customize the generated image.</p><h2 id="query-parameters" tabindex="-1">Query Parameters <a class="header-anchor" href="#query-parameters" aria-label="Permalink to &quot;Query Parameters&quot;">​</a></h2><ul><li><code>url</code> (required): The valid URL to be captured.</li><li><code>width</code> (optional): The width of the output screenshot. Default is <code>250</code>.</li><li><code>height</code> (optional): The height of the output screenshot. Default is <code>250</code>.</li><li><code>viewPortWidth</code> (optional): The width of the render viewport. Default is <code>1080</code>.</li><li><code>viewPortHeight</code> (optional): The height of the render viewport. Default is <code>1080</code>.</li><li><code>forceReload</code> (optional): Forces a reload of the cached image. Default is <code>false</code>.</li><li><code>isMobile</code> (optional): Adds a mobile flag to the user agent. Default is <code>false</code>.</li><li><code>isFullPage</code> (optional): Renders the full page instead of the viewport crop. Default is <code>false</code>.</li><li><code>isDarkMode</code> (optional): Prefers the dark color scheme. Default is <code>false</code>.</li><li><code>deviceScaleFactor</code> (optional): Specifies the device scale factor (can be thought of as DPR). Default is <code>1</code>.</li></ul><h2 id="usage-examples" tabindex="-1">Usage Examples <a class="header-anchor" href="#usage-examples" aria-label="Permalink to &quot;Usage Examples&quot;">​</a></h2><p>Here are some example combinations of query parameters:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>http://localhost:3089?url=https://jasonraimondi.com</span></span>
<span class="line"><span>http://localhost:3089?url=https://jasonraimondi.com&amp;forceReload=true</span></span>
<span class="line"><span>http://localhost:3089?url=https://jasonraimondi.com&amp;isFullPage=true</span></span>
<span class="line"><span>http://localhost:3089?url=https://jasonraimondi.com&amp;isMobile=true</span></span>
<span class="line"><span>http://localhost:3089?url=https://jasonraimondi.com&amp;isDarkMode=true</span></span>
<span class="line"><span>http://localhost:3089?url=https://jasonraimondi.com&amp;width=400&amp;height=400</span></span>
<span class="line"><span>http://localhost:3089?url=https://jasonraimondi.com&amp;viewPortHeight=400&amp;viewPortWidth=400</span></span>
<span class="line"><span>http://localhost:3089?url=https://jasonraimondi.com&amp;isFullPage=true&amp;isMobile=true&amp;width=400&amp;height=400&amp;viewPortHeight=400&amp;viewPortWidth=400</span></span>
<span class="line"><span>http://localhost:3089?url=https://jasonraimondi.com&amp;isMobile=true&amp;isFullPage=true&amp;viewPortWidth=375&amp;width=375&amp;deviceScaleFactor=1</span></span></code></pre></div><div class="language-html vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">img</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> src</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;http://localhost:3089?url=https://jasonraimondi.com&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> </span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">     alt</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;Jason Raimondi&#39;s personal home page screenshot&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> /&gt;</span></span></code></pre></div>`,13),l=[o];function n(p,r,h,d,c,u){return s(),e("div",null,l)}const k=a(i,[["render",n]]);export{g as __pageData,k as default};
