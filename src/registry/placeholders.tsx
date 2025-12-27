export function PreviewPlaceholder({ title }: { title: string }) {
  return (
    <div
      className="
      flex h-24 items-center justify-center rounded-md border border-border
      bg-surface text-sm text-secondary
      dark:bg-background
    "
    >
      {title} preview
    </div>
  );
}

export function DemoPlaceholder({ title }: { title: string }) {
  return (
    <div
      className="
      flex h-64 items-center justify-center rounded-md border border-border
      bg-surface text-lg font-medium
      dark:bg-background
    "
    >
      {title} demo
    </div>
  );
}
