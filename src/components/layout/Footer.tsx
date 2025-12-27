export function Footer() {
    return (
        <footer
            className="
        border-t border-border
        bg-surface-elevated
        text-muted
      "
        >
            <div
                className="
          mx-auto max-w-6xl
          px-6 py-4
          text-xs
          flex items-center justify-center
          text-center
        "
            >
                © {new Date().getFullYear()} UI Workbench — Personal UI Experiments
            </div>
        </footer>
    );
}
