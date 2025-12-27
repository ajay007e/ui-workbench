import { showcaseRegistry } from "./showcaseRegistry";
import type { ShowcaseCategory } from "./types";

export function getShowcaseByCategory(category: ShowcaseCategory) {
    return showcaseRegistry.filter((item) => item.category === category);
}
