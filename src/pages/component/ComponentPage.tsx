import { useLocation, Link } from "react-router-dom";
import { showcaseRegistry } from "@/registry/showcaseRegistry";
import { NotFoundPage } from "../NotFoundPage";
import { ExternalLink } from "lucide-react";
import { useLayoutEffect, useRef, useState } from "react";

const LAPTOP_WIDTH = 1440;
const LAPTOP_HEIGHT = 900;

export function ComponentPage() {
    const location = useLocation();
    const item = showcaseRegistry.find(
        (entry) => entry.route === location.pathname,
    );

    if (!item) {
        return <NotFoundPage />;
    }

    const wrapperRef = useRef<HTMLDivElement>(null);
    const [scale, setScale] = useState(1);

    useLayoutEffect(() => {
        const wrapper = wrapperRef.current;
        if (!wrapper) return;

        const resize = () => {
            const wrapperWidth = wrapper.clientWidth;
            if (!wrapperWidth) return;

            setScale(Math.min(wrapperWidth / LAPTOP_WIDTH, 1));
        };

        resize();

        const observer = new ResizeObserver(resize);
        observer.observe(wrapper);

        return () => observer.disconnect();
    }, []);

    return (
        <div className="space-y-4">
            {/* Header */}
            <header className="flex items-start justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-semibold">{item.title}</h1>
                    <p className="text-muted">{item.description}</p>
                </div>

                <Link
                    to={`/component/${item.id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Open full component"
                    className="text-muted hover:text-foreground"
                >
                    <ExternalLink className="h-5 w-5" />
                </Link>
            </header>

            <div
                ref={wrapperRef}
                className="relative w-full overflow-hidden rounded-lg border bg-background"
                style={{
                    height: LAPTOP_HEIGHT * scale,
                }}
            >
                <div
                    style={{
                        width: LAPTOP_WIDTH,
                        height: LAPTOP_HEIGHT,
                        transform: `scale(${scale})`,
                        transformOrigin: "top left",
                    }}
                >
                    {item.component}
                </div>
            </div>
        </div>
    );
}
