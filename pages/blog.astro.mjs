import { c as createComponent, r as renderComponent, b as renderHead, f as addAttribute, e as renderTemplate } from '../chunks/astro/server_CN0qAJDK.mjs';
import 'kleur/colors';
import '@astrojs/internal-helpers/path';
import '@astrojs/internal-helpers/remote';
import { $ as $$Image } from '../chunks/_astro_assets_wf-ntoJe.mjs';
import { g as getCollection } from '../chunks/_astro_content_CQfDAPEY.mjs';
import { $ as $$BaseHead, a as $$Header, b as $$Footer } from '../chunks/Header_DMOkMrjH.mjs';
import { $ as $$FormattedDate } from '../chunks/FormattedDate_IRSCH_Za.mjs';
import { S as SITE_DESCRIPTION, a as SITE_TITLE } from '../chunks/consts_CkYcPHIr.mjs';
/* empty css                                 */
export { renderers } from '../renderers.mjs';

const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const realPosts = (await getCollection("blog")).sort(
    (a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf()
  );
  const placeholderCount = 5;
  const placeholders = Array.from({ length: placeholderCount }, (_, i) => ({
    id: "#",
    placeholder: true,
    data: {
      title: i === 0 ? "Coming soon" : "Coming soon",
      pubDate: null,
      heroImage: null
    }
  }));
  const posts = realPosts.length > 0 ? realPosts : placeholders;
  return renderTemplate`<html lang="en" data-astro-cid-5tznm7mj> <head>${renderComponent($$result, "BaseHead", $$BaseHead, { "title": SITE_TITLE, "description": SITE_DESCRIPTION, "data-astro-cid-5tznm7mj": true })}${renderHead()}</head> <body data-astro-cid-5tznm7mj> ${renderComponent($$result, "Header", $$Header, { "data-astro-cid-5tznm7mj": true })} <main data-astro-cid-5tznm7mj> <section data-astro-cid-5tznm7mj> <ul data-astro-cid-5tznm7mj> ${posts.map((post) => renderTemplate`<li data-astro-cid-5tznm7mj> <a${addAttribute(post.placeholder ? void 0 : `/blog/${post.id}/`, "href")}${addAttribute(post.placeholder, "aria-disabled")} data-astro-cid-5tznm7mj> ${post.data.heroImage ? renderTemplate`${renderComponent($$result, "Image", $$Image, { "width": 720, "height": 360, "src": post.data.heroImage, "alt": "", "data-astro-cid-5tznm7mj": true })}` : renderTemplate`<span class="ph-img" role="img" aria-label="placeholder image" data-astro-cid-5tznm7mj> <span class="ph-shimmer" data-astro-cid-5tznm7mj></span> </span>`} <h4 class="title" data-astro-cid-5tznm7mj> ${post.placeholder ? "Coming soon" : post.data.title} </h4> <p class="date" data-astro-cid-5tznm7mj> ${post.placeholder ? "" : renderTemplate`${renderComponent($$result, "FormattedDate", $$FormattedDate, { "date": post.data.pubDate, "data-astro-cid-5tznm7mj": true })}`} </p> </a> </li>`)} </ul> </section> </main> ${renderComponent($$result, "Footer", $$Footer, { "data-astro-cid-5tznm7mj": true })} </body></html>`;
}, "D:/\u5EFA\u7AD9/personal work collection/portfolio-site/src/pages/blog/index.astro", void 0);

const $$file = "D:/建站/personal work collection/portfolio-site/src/pages/blog/index.astro";
const $$url = "/Creation_notes/blog";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
