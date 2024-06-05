import{_ as e,c as a,o as s,a3 as t}from"./chunks/framework.C3Zxep_Z.js";const g=JSON.parse('{"title":"Usage","description":"","frontmatter":{},"headers":[],"relativePath":"usage/index.md","filePath":"usage/index.md"}'),i={name:"usage/index.md"},o=t(`<h1 id="usage" tabindex="-1">Usage <a class="header-anchor" href="#usage" aria-label="Permalink to &quot;Usage&quot;">​</a></h1><p>URL-to-PNG provides a single endpoint that accepts various query parameters to customize the generated image.</p><h2 id="query-parameters" tabindex="-1">Query Parameters <a class="header-anchor" href="#query-parameters" aria-label="Permalink to &quot;Query Parameters&quot;">​</a></h2><ul><li><code>url</code> (required): The valid URL to be captured.</li><li><code>width</code> (optional): The width of the output screenshot. Default is <code>250</code>.</li><li><code>height</code> (optional): The height of the output screenshot. Default is <code>250</code>.</li><li><code>viewPortWidth</code> (optional): The width of the render viewport. Default is <code>1080</code>.</li><li><code>viewPortHeight</code> (optional): The height of the render viewport. Default is <code>1080</code>.</li><li><code>forceReload</code> (optional): Forces a reload of the cached image. Default is <code>false</code>.</li><li><code>isMobile</code> (optional): Adds a mobile flag to the user agent. Default is <code>false</code>.</li><li><code>isFullPage</code> (optional): Renders the full page instead of the viewport crop. Default is <code>false</code>.</li><li><code>isDarkMode</code> (optional): Prefers the dark color scheme. Default is <code>false</code>.</li><li><code>deviceScaleFactor</code> (optional): Specifies the device scale factor (can be thought of as DPR). Default is <code>1</code>.</li></ul><h2 id="examples" tabindex="-1">Examples <a class="header-anchor" href="#examples" aria-label="Permalink to &quot;Examples&quot;">​</a></h2><p>Here are some example combinations of query parameters:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>http://localhost:3089?url=https://jasonraimondi.com</span></span>
<span class="line"><span>http://localhost:3089?url=https://jasonraimondi.com&amp;forceReload=true</span></span>
<span class="line"><span>http://localhost:3089?url=https://jasonraimondi.com&amp;isFullPage=true</span></span>
<span class="line"><span>http://localhost:3089?url=https://jasonraimondi.com&amp;isMobile=true</span></span>
<span class="line"><span>http://localhost:3089?url=https://jasonraimondi.com&amp;isDarkMode=true</span></span>
<span class="line"><span>http://localhost:3089?url=https://jasonraimondi.com&amp;width=400&amp;height=400</span></span>
<span class="line"><span>http://localhost:3089?url=https://jasonraimondi.com&amp;viewPortHeight=400&amp;viewPortWidth=400</span></span>
<span class="line"><span>http://localhost:3089?url=https://jasonraimondi.com&amp;isFullPage=true&amp;isMobile=true&amp;width=400&amp;height=400&amp;viewPortHeight=400&amp;viewPortWidth=400</span></span>
<span class="line"><span>http://localhost:3089?url=https://jasonraimondi.com&amp;isMobile=true&amp;isFullPage=true&amp;viewPortWidth=375&amp;width=375&amp;deviceScaleFactor=1</span></span></code></pre></div><p>Use in your HTML</p><div class="language-html vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">img</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">  src</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;http://localhost:3089?url=https://jasonraimondi.com&quot;</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">  alt</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;Jason Raimondi&#39;s personal home page screenshot&quot;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">/&gt;</span></span></code></pre></div>`,9),l=[o];function n(p,h,c,r,d,u){return s(),a("div",null,l)}const k=e(i,[["render",n]]);export{g as __pageData,k as default};