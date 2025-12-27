import type { ReactNode } from "react";

export type ShowcaseCategory =
    | "landing"
    | "forms"
    | "dashboards"
    | "animations";

export interface ShowcaseItem {
    id: string;
    title: string;
    description: string;
    category: ShowcaseCategory;
    route: string;

    hide?: boolean;
    /**
     * Small live preview shown on home page
     */
    preview: ReactNode;

    /**
     * Full demo shown on its own page
     */
    component: ReactNode;
}
