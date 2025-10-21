import { c as createComponent, r as renderComponent, b as renderHead, e as renderTemplate } from '../chunks/astro/server_CN0qAJDK.mjs';
import 'kleur/colors';
import { $ as $$BaseHead, a as $$Header, b as $$Footer } from '../chunks/Header_DMOkMrjH.mjs';
import { S as SITE_DESCRIPTION, a as SITE_TITLE } from '../chunks/consts_CkYcPHIr.mjs';
/* empty css                                 */
export { renderers } from '../renderers.mjs';

const $$Index = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`<html lang="en" data-astro-cid-j7pv25f6> <head>${renderComponent($$result, "BaseHead", $$BaseHead, { "title": SITE_TITLE, "description": SITE_DESCRIPTION, "data-astro-cid-j7pv25f6": true })}${renderHead()}</head> <body data-astro-cid-j7pv25f6> ${renderComponent($$result, "Header", $$Header, { "data-astro-cid-j7pv25f6": true })} <main data-astro-cid-j7pv25f6> <h1 data-astro-cid-j7pv25f6>🛰️ Elko's Creation Notes</h1> <p data-astro-cid-j7pv25f6>
Hi! Welcome to the website.
        I'm <strong data-astro-cid-j7pv25f6>Elko</strong>, a first-year student at <strong data-astro-cid-j7pv25f6>SCAD</strong>, majoring in Animation and Concept Design.
        This site began as a simple experiment — a place to learn, document, and create.
</p> <p data-astro-cid-j7pv25f6>
I'm passionate about drawing, worldbuilding, and visual storytelling.
        Here, I'll be sharing my progress, creative notes, and selected works as I explore what it means
        to design coherent worlds and stories through images.
</p> <p data-astro-cid-j7pv25f6>
The <strong data-astro-cid-j7pv25f6>Star of Departure</strong> is my long-term world-building project —
        a story of humanity rebuilding civilization on an alien world, a world divided between coexistence and war.
        In the end, will humanity learn to live with the alien, or destroy it to survive?
</p> <p data-astro-cid-j7pv25f6>
For this project, my goal is to create a tightly constructed hard science fiction narrative —
        one that is logically coherent and self-consistent, while also exploring profound philosophical ideas,
        maintaining narrative unity, and presenting technology that feels believable and grounded.
</p> <p data-astro-cid-j7pv25f6>
This website is still growing. Over time, I'll refine its structure and add more of my works,
        reflections, and visual experiments.  
        Thank you for visiting and being part of this first step.
</p> </main> ${renderComponent($$result, "Footer", $$Footer, { "data-astro-cid-j7pv25f6": true })}  </body> </html>`;
}, "D:/\u5EFA\u7AD9/personal work collection/portfolio-site/src/pages/index.astro", void 0);

const $$file = "D:/建站/personal work collection/portfolio-site/src/pages/index.astro";
const $$url = "/Creation_notes";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
