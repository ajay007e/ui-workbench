import type { AppRoute } from "./types";
import { HomePage } from "@/pages/home/HomePage";
import { ComponentPage } from "@/pages/component/ComponentPage";
import { ComponentRenderPage } from "@/pages/component/ComponentRenderPage";

export const routes: AppRoute[] = [
    {
        path: "/",
        label: "Home",
        isLayoutRequired: true,
        element: <HomePage />,
    },
    {
        path: "/component/:id",
        label: "Component",
        isLayoutRequired: false,
        element: <ComponentRenderPage />,
    },
    {
        path: "*",
        label: "Components",
        isLayoutRequired: true,
        element: <ComponentPage />,
    },
];
