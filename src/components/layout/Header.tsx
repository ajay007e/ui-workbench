import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/app/theme/useTheme";

export function Header() {
    const { theme, toggleTheme } = useTheme();

    return (
        <header
            className="
        sticky top-0 z-50
        border-b border-border
        bg-surface-elevated
        text-foreground
      "
        >
            <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
                <span className="text-sm font-semibold">UI Workbench</span>

                <button
                    onClick={toggleTheme}
                    className="
            flex items-center gap-2 rounded-md
            border border-border
            bg-surface px-3 py-1.5 text-sm
            transition cursor-pointer
            hover:bg-primary hover:text-primary-foreground
          "
                >
                    {theme === "dark" ? <Moon size={16} /> : <Sun size={16} />}
                    {theme === "dark" ? "Dark" : "Light"}
                </button>
            </div>
        </header>
    );
}
