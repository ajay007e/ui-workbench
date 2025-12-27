import type { ShowcaseItem } from "./types";
import { PreviewPlaceholder, DemoPlaceholder } from "./placeholders";

export const showcaseRegistry: ShowcaseItem[] = [
  {
    id: "demo",
    title: "component-demo",
    description: "component-demo",
    category: "landing",
    hide: true,
    route: "/landing/demo",
    preview: <PreviewPlaceholder title="Demo" />,
    component: <DemoPlaceholder title="Demo" />,
  },

  {
    id: "landing-pinterest",
    title: "Pinterest Landing",
    description: "Masonry-style Pinterest-inspired layout",
    category: "landing",
    route: "/landing/pinterest",
    preview: <PreviewPlaceholder title="Demo" />,
    component: <DemoPlaceholder title="Demo" />,
  },
];
