import { useParams } from "react-router-dom";
import { showcaseRegistry } from "@/registry/showcaseRegistry";
import { NotFoundPage } from "../NotFoundPage";

export function ComponentRenderPage() {
    const { id } = useParams<{ id: string }>();

    const item = showcaseRegistry.find((entry) => entry.id === id);

    if (!item) {
        return <NotFoundPage />;
    }

    return <>{item.component}</>;
}
