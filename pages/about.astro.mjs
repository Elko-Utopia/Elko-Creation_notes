import { c as createComponent, a as createAstro, r as renderComponent, b as renderHead, d as renderSlot, e as renderTemplate, m as maybeRenderHead, u as unescapeHTML } from '../chunks/astro/server_CN0qAJDK.mjs';
import 'kleur/colors';
import '@astrojs/internal-helpers/path';
import '@astrojs/internal-helpers/remote';
import { $ as $$Image } from '../chunks/_astro_assets_wf-ntoJe.mjs';
import { $ as $$BaseHead, a as $$Header, b as $$Footer } from '../chunks/Header_DMOkMrjH.mjs';
import { $ as $$FormattedDate } from '../chunks/FormattedDate_IRSCH_Za.mjs';
/* empty css                                 */
import 'clsx';
export { renderers } from '../renderers.mjs';

const AboutHeroImage = new Proxy({"src":"/Creation_notes/_astro/blog-placeholder-about.BtEdEmGp.jpg","width":960,"height":480,"format":"jpg"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "D:/建站/personal work collection/portfolio-site/src/assets/blog-placeholder-about.jpg";
							}
							if (target[name] !== undefined && globalThis.astroAsset) globalThis.astroAsset?.referencedImages.add("D:/建站/personal work collection/portfolio-site/src/assets/blog-placeholder-about.jpg");
							return target[name];
						}
					});

const $$Astro = createAstro();
const $$BlogPost = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$BlogPost;
  const { title, description, pubDate, updatedDate, heroImage } = Astro2.props;
  return renderTemplate`<html lang="en" data-astro-cid-bvzihdzo> <head>${renderComponent($$result, "BaseHead", $$BaseHead, { "title": title, "description": description, "data-astro-cid-bvzihdzo": true })}${renderHead()}</head> <body data-astro-cid-bvzihdzo> ${renderComponent($$result, "Header", $$Header, { "data-astro-cid-bvzihdzo": true })} <main data-astro-cid-bvzihdzo> <article data-astro-cid-bvzihdzo> <div class="hero-image" data-astro-cid-bvzihdzo> ${heroImage && renderTemplate`${renderComponent($$result, "Image", $$Image, { "width": 1020, "height": 510, "src": heroImage, "alt": "", "data-astro-cid-bvzihdzo": true })}`} </div> <div class="prose" data-astro-cid-bvzihdzo> <div class="title" data-astro-cid-bvzihdzo> <div class="date" data-astro-cid-bvzihdzo> ${renderComponent($$result, "FormattedDate", $$FormattedDate, { "date": pubDate, "data-astro-cid-bvzihdzo": true })} ${updatedDate && renderTemplate`<div class="last-updated-on" data-astro-cid-bvzihdzo>
Last updated on ${renderComponent($$result, "FormattedDate", $$FormattedDate, { "date": updatedDate, "data-astro-cid-bvzihdzo": true })} </div>`} </div> <h1 data-astro-cid-bvzihdzo>${title}</h1> <hr data-astro-cid-bvzihdzo> </div> ${renderSlot($$result, $$slots["default"])} </div> </article> </main> ${renderComponent($$result, "Footer", $$Footer, { "data-astro-cid-bvzihdzo": true })} </body></html>`;
}, "D:/\u5EFA\u7AD9/personal work collection/portfolio-site/src/layouts/BlogPost.astro", void 0);

const html = () => "<h2 id=\"️-elkos-creation-notes\">🛰️ Elko's Creation Notes</h2>\n<p>Hi! Welcome to the website. I'm <strong>Elko</strong>, a first-year student at <strong>SCAD</strong>, majoring in Animation and Concept Design. This site began as a simple experiment — a place to learn, document, and create.</p>\n<p>I'm passionate about drawing, worldbuilding, and visual storytelling. Here, I'll be sharing my progress, creative notes, and selected works as I explore what it means to design coherent worlds and stories through images.</p>\n<p>The <strong>Star of Departure</strong> is my long-term world-building project — a story of humanity rebuilding civilization on an alien world, a world divided between coexistence and war. In the end, will humanity learn to live with the alien, or destroy it to survive?</p>\n<p>For this project, my goal is to create a tightly constructed hard science fiction narrative — one that is logically coherent and self-consistent, while also exploring profound philosophical ideas, maintaining narrative unity, and presenting technology that feels believable and grounded.</p>\n<p>This website is still growing. Over time, I'll refine its structure and add more of my works, reflections, and visual experiments. Thank you for visiting and being part of this first step.</p>";

				const frontmatter = {};
				const file = "D:/建站/personal work collection/portfolio-site/src/content/about.md";
				const url = undefined;

				const Content = createComponent((result, _props, slots) => {
					const { layout, ...content } = frontmatter;
					content.file = file;
					content.url = url;

					return renderTemplate`${maybeRenderHead()}${unescapeHTML(html())}`;
				});

const $$About = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$BlogPost, { "title": "About Me", "description": "Lorem ipsum dolor sit amet", "pubDate": /* @__PURE__ */ new Date("October 20 2025"), "heroImage": AboutHeroImage, "data-astro-cid-kh7btl4r": true }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<article class="home-copy" aria-label="Home content copy" data-astro-cid-kh7btl4r> ${renderComponent($$result2, "AboutContent", Content, { "data-astro-cid-kh7btl4r": true })} </article>  ` })}`;
}, "D:/\u5EFA\u7AD9/personal work collection/portfolio-site/src/pages/about.astro", void 0);

const $$file = "D:/建站/personal work collection/portfolio-site/src/pages/about.astro";
const $$url = "/Creation_notes/about";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$About,
	file: $$file,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
