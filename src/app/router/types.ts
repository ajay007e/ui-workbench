import type { ReactNode } from "react";

export interface AppRoute {
    path: string;
    label: string;
    isLayoutRequired: boolean;
    element: ReactNode;
}
