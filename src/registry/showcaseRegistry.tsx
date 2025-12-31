import type { ShowcaseItem } from "./types";
import { PreviewPlaceholder, DemoPlaceholder } from "./placeholders";
import FlamesGame from "@/features/animations/FlamesGame/FlamesGames";
import BlackJack from "@/features/animations/BlackJack/BlackJack";

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
    id: "flames-game",
    title: "Flames Game",
    description:
      "a popular fortune-telling game used to predict the outcome of a relationship between two people",
    category: "animations",
    route: "/animations/flames",
    preview: <PreviewPlaceholder title="Flames" />,
    component: <FlamesGame />,
  },

  {
    id: "blackjack-game",
    title: "Blackjack Game",
    description:
      "a classic casino card game where the player competes against the dealer to reach 21 without busting",
    category: "animations",
    route: "/animations/blackjack",
    preview: <PreviewPlaceholder title="Blackjack" />,
    component: <BlackJack />,
  },
];
