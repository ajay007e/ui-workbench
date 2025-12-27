import type { AppRoute } from "./types";
import { HomePage } from "@/pages/home/HomePage";
import { ComponentPage } from "@/pages/component/ComponentPage";

export const routes: AppRoute[] = [
    {
        path: "/",
        label: "Home",
        element: <HomePage />,
    },
    {
        path: "*",
        label: "Components",
        element: <ComponentPage />,
    },
];
