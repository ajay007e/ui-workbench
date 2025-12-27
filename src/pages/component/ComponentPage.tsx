import { useLocation } from "react-router-dom";
import { showcaseRegistry } from "@/registry/showcaseRegistry";
import { NotFoundPage } from "../NotFoundPage";

export function ComponentPage() {
    const location = useLocation();

    const item = showcaseRegistry.find(
        (entry) => entry.route === location.pathname,
    );

    if (!item) {
        return <NotFoundPage />;
    }

    return (
        <div className="space-y-4">
            <header>
                <h1 className="text-2xl font-semibold">{item.title}</h1>
                <p className="text-muted">{item.description}</p>
            </header>

            <div>{item.component}</div>
        </div>
    );
}
