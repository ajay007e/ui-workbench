import { Link } from "react-router-dom";

export function NotFoundPage() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 text-center">
      <h1 className="text-3xl font-semibold">404</h1>
      <p className="text-muted">The page you are looking for does not exist.</p>

      <Link
        to="/"
        className="
          rounded-md
          bg-primary px-4 py-2
          text-primary-foreground
        "
      >
        Go back home
      </Link>
    </div>
  );
}
