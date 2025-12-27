import { showcaseRegistry } from "@/registry/showcaseRegistry";
import type { ShowcaseCategory } from "@/registry/types";
import { Link } from "react-router-dom";

const CATEGORY_LABELS: Record<ShowcaseCategory, string> = {
    landing: "Landing Pages",
    forms: "Forms",
    dashboards: "Dashboards",
    animations: "Animations",
};

export function HomePage() {
    const grouped = showcaseRegistry
        .filter((item) => !item.hide)
        .reduce<Record<ShowcaseCategory, typeof showcaseRegistry>>(
            (acc, item) => {
                acc[item.category] = acc[item.category] || [];
                acc[item.category].push(item);
                return acc;
            },
            {} as Record<ShowcaseCategory, typeof showcaseRegistry>,
        );

    return (
        <div className="space-y-10">
            {Object.entries(grouped).map(([category, items]) => (
                <section key={category} className="space-y-4">
                    <h2 className="text-xl font-semibold">
                        {CATEGORY_LABELS[category as ShowcaseCategory]}
                    </h2>

                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {items.map((item) => (
                            <Link
                                key={item.id}
                                to={item.route}
                                className="
                  group rounded-lg border border-border bg-surface p-4
                  transition hover:border-primary
                  dark:bg-background
                "
                            >
                                <div className="mb-3">{item.preview}</div>

                                <div className="space-y-1">
                                    <h3 className="font-medium group-hover:text-primary">
                                        {item.title}
                                    </h3>
                                    <p className="text-sm text-secondary">{item.description}</p>
                                </div>
                            </Link>
                        ))}
                    </div>
                </section>
            ))}
        </div>
    );
}
