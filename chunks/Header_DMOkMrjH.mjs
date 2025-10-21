import { c as createComponent, a as createAstro, f as addAttribute, e as renderTemplate, m as maybeRenderHead, s as spreadAttributes, d as renderSlot, r as renderComponent } from './astro/server_CN0qAJDK.mjs';
import 'kleur/colors';
import 'clsx';
/* empty css                         */
import { _ as __ASTRO_IMAGE_IMPORT_1BIFs1 } from './blog-placeholder-1_DhpbVPFw.mjs';
import { a as SITE_TITLE } from './consts_CkYcPHIr.mjs';

const $$Astro$1 = createAstro();
const $$BaseHead = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$BaseHead;
  const canonicalURL = new URL(Astro2.url.pathname, Astro2.site);
  const { title, description, image = __ASTRO_IMAGE_IMPORT_1BIFs1 } = Astro2.props;
  return renderTemplate`<!-- Global Metadata --><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><link rel="icon" type="image/svg+xml" href="data:image/svg+xml;utf8,<svg xmlns=&quot;http://www.w3.org/2000/svg&quot; width=&quot;24&quot; height=&quot;24&quot; viewBox=&quot;0 0 24 24&quot; fill=&quot;none&quot; stroke=&quot;white&quot; stroke-width=&quot;2&quot; stroke-linecap=&quot;round&quot; stroke-linejoin=&quot;round&quot; class=&quot;icon icon-tabler icons-tabler-outline icon-tabler-planet&quot;><path stroke=&quot;none&quot; d=&quot;M0 0h24v24H0z&quot; fill=&quot;none&quot;/><path d=&quot;M18.816 13.58c2.292 2.138 3.546 4 3.092 4.9c-.745 1.46 -5.783 -.259 -11.255 -3.838c-5.47 -3.579 -9.304 -7.664 -8.56 -9.123c.464 -.91 2.926 -.444 5.803 .805&quot; /><path d=&quot;M12 12m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0&quot; /></svg>"><link rel="sitemap" href="/sitemap-index.xml"><link rel="alternate" type="application/rss+xml"${addAttribute(SITE_TITLE, "title")}${addAttribute(new URL("rss.xml", Astro2.site), "href")}><meta name="generator"${addAttribute(Astro2.generator, "content")}><!-- Font preloads --><link rel="preload" href="/fonts/atkinson-regular.woff" as="font" type="font/woff" crossorigin><link rel="preload" href="/fonts/atkinson-bold.woff" as="font" type="font/woff" crossorigin><!-- Canonical URL --><link rel="canonical"${addAttribute(canonicalURL, "href")}><!-- Primary Meta Tags --><title>${title}</title><meta name="title"${addAttribute(title, "content")}><meta name="description"${addAttribute(description, "content")}><!-- Open Graph / Facebook --><meta property="og:type" content="website"><meta property="og:url"${addAttribute(Astro2.url, "content")}><meta property="og:title"${addAttribute(title, "content")}><meta property="og:description"${addAttribute(description, "content")}><meta property="og:image"${addAttribute(new URL(image.src, Astro2.url), "content")}><!-- Twitter --><meta property="twitter:card" content="summary_large_image"><meta property="twitter:url"${addAttribute(Astro2.url, "content")}><meta property="twitter:title"${addAttribute(title, "content")}><meta property="twitter:description"${addAttribute(description, "content")}><meta property="twitter:image"${addAttribute(new URL(image.src, Astro2.url), "content")}>`;
}, "D:/\u5EFA\u7AD9/personal work collection/portfolio-site/src/components/BaseHead.astro", void 0);

const $$Footer = createComponent(($$result, $$props, $$slots) => {
  const today = /* @__PURE__ */ new Date();
  return renderTemplate`${maybeRenderHead()}<footer data-astro-cid-sz7xmlte>
&copy; ${today.getFullYear()} Elko-Utopia. All rights reserved.
<div class="social-links" data-astro-cid-sz7xmlte> <!-- Email --> <a href="mailto:elkoutopia@gmail.com" target="_blank" data-astro-cid-sz7xmlte> <span class="sr-only" data-astro-cid-sz7xmlte>Email</span> <svg viewBox="0 0 16 16" aria-hidden="true" width="32" height="32" data-astro-cid-sz7xmlte> <path fill="currentColor" d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v.217l-8 4.8-8-4.8V4zm0 1.383v6.617a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V5.383l-7.555 4.533a1 1 0 0 1-1.11 0L0 5.383z" data-astro-cid-sz7xmlte></path> </svg> </a> <!-- Instagram --> <a href="https://www.instagram.com/elkoutopia/" target="_blank" data-astro-cid-sz7xmlte> <span class="sr-only" data-astro-cid-sz7xmlte>Instagram</span> <svg viewBox="0 0 16 16" aria-hidden="true" width="32" height="32" data-astro-cid-sz7xmlte> <path fill="currentColor" d="M5 1h6a4 4 0 0 1 4 4v6a4 4 0 0 1-4 4H5a4 4 0 0 1-4-4V5a4 4 0 0 1 4-4zm0 1.5A2.5 2.5 0 0 0 2.5 5v6A2.5 2.5 0 0 0 5 13.5h6A2.5 2.5 0 0 0 13.5 11V5A2.5 2.5 0 0 0 11 2.5H5zm3 2a3.5 3.5 0 1 1 0 7 3.5 3.5 0 0 1 0-7zm0 1.5A2 2 0 1 0 10 9a2 2 0 0 0-2-2zm3.25-1.25a.75.75 0 1 1 0 1.5.75.75 0 0 1 0-1.5z" data-astro-cid-sz7xmlte></path> </svg> </a> </div> </footer> `;
}, "D:/\u5EFA\u7AD9/personal work collection/portfolio-site/src/components/Footer.astro", void 0);

const $$Astro = createAstro();
const $$HeaderLink = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$HeaderLink;
  const { href, class: className, ...props } = Astro2.props;
  const pathname = Astro2.url.pathname.replace("/Creation_notes/", "");
  const subpath = pathname.match(/[^\/]+/g);
  const isActive = href === pathname || href === "/" + (subpath?.[0] || "");
  return renderTemplate`${maybeRenderHead()}<a${addAttribute(href, "href")}${addAttribute([className, { active: isActive }], "class:list")}${spreadAttributes(props)} data-astro-cid-eimmu3lg> ${renderSlot($$result, $$slots["default"])} </a> `;
}, "D:/建站/personal work collection/portfolio-site/src/components/HeaderLink.astro", void 0);

const $$Header = createComponent(($$result, $$props, $$slots) => {
  const base = "/Creation_notes/";
  return renderTemplate`${maybeRenderHead()}<header data-astro-cid-3ef6ksr2> <nav data-astro-cid-3ef6ksr2> <h2 data-astro-cid-3ef6ksr2><a${addAttribute(base, "href")} data-astro-cid-3ef6ksr2>${SITE_TITLE}</a></h2> <div class="internal-links" data-astro-cid-3ef6ksr2> ${renderComponent($$result, "HeaderLink", $$HeaderLink, { "href": base, "data-astro-cid-3ef6ksr2": true }, { "default": ($$result2) => renderTemplate`Home` })} ${renderComponent($$result, "HeaderLink", $$HeaderLink, { "href": base + "blog/", "data-astro-cid-3ef6ksr2": true }, { "default": ($$result2) => renderTemplate`Blog` })} <a${addAttribute(base + "portfolio/", "href")} data-astro-cid-3ef6ksr2>Portfolio</a> ${renderComponent($$result, "HeaderLink", $$HeaderLink, { "href": base + "about/", "data-astro-cid-3ef6ksr2": true }, { "default": ($$result2) => renderTemplate`About` })} </div> <div class="social-links" data-astro-cid-3ef6ksr2> <a href="mailto:elkoutopia@gmail.com" target="_blank" data-astro-cid-3ef6ksr2> <span class="sr-only" data-astro-cid-3ef6ksr2>Email</span> <svg viewBox="0 0 24 24" aria-hidden="true" width="32" height="32" data-astro-cid-3ef6ksr2> <path fill="currentColor" d="M2 4h20v16H2V4zm2 2v12h16V6H4zm8 5 8-5H4l8 5z" data-astro-cid-3ef6ksr2></path> </svg> </a> <!-- Instagram --> <a href="https://www.instagram.com/elkoutopia/" target="_blank" data-astro-cid-3ef6ksr2> <span class="sr-only" data-astro-cid-3ef6ksr2>Instagram</span> <svg viewBox="0 0 24 24" aria-hidden="true" width="32" height="32" data-astro-cid-3ef6ksr2> <path fill="currentColor" d="M7 2C4.2 2 2 4.2 2 7v10c0 2.8 2.2 5 5 5h10c2.8 0 5-2.2 5-5V7c0-2.8-2.2-5-5-5H7zm10 2c1.6 0 3 1.4 3 3v10c0 1.6-1.4 3-3 3H7c-1.6 0-3-1.4-3-3V7c0-1.6 1.4-3 3-3h10zM12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm0 2a3 3 0 1 1 0 6 3 3 0 0 1 0-6zm4.5-.5a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" data-astro-cid-3ef6ksr2></path> </svg> </a> </div> </nav> </header> `;
}, "D:/建站/personal work collection/portfolio-site/src/components/Header.astro", void 0);

export { $$BaseHead as $, $$Header as a, $$Footer as b };
