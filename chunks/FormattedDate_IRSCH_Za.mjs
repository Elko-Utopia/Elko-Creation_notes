import { c as createComponent, a as createAstro, m as maybeRenderHead, f as addAttribute, e as renderTemplate } from './astro/server_CN0qAJDK.mjs';
import 'kleur/colors';
import 'clsx';

const $$Astro = createAstro();
const $$FormattedDate = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$FormattedDate;
  const { date } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<time${addAttribute(date.toISOString(), "datetime")}> ${date.toLocaleDateString("en-us", {
    year: "numeric",
    month: "short",
    day: "numeric"
  })} </time>`;
}, "D:/\u5EFA\u7AD9/personal work collection/portfolio-site/src/components/FormattedDate.astro", void 0);

export { $$FormattedDate as $ };
