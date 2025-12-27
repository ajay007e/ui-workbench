import { Header } from "./Header";
import { Footer } from "./Footer";
import { Breadcrumbs } from "./Breadcrumbs";

export function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex min-h-screen flex-col bg-background dark:bg-background text-foreground dark:text-foreground">
            <Header />

            {/* Main grows to fill remaining height */}
            <main className="flex-1">
                <div className="mx-auto max-w-6xl px-6 py-6">
                    <Breadcrumbs />

                    <section
                        className="
              mt-4 rounded-lg
              bg-surface
              min-h-full
            "
                    >
                        {children}
                    </section>
                </div>
            </main>

            <Footer />
        </div>
    );
}
