import { Link, useLocation } from "react-router-dom";

export function Breadcrumbs() {
    const location = useLocation();
    const segments = location.pathname.split("/").filter(Boolean);

    return (
        <nav className="text-sm text-secondary">
            <ol className="flex items-center gap-2">
                <li>
                    <Link to="/" className="hover:text-primary">
                        Home
                    </Link>
                </li>

                {segments.map((segment, index) => {
                    const path = "/" + segments.slice(0, index + 1).join("/");

                    return (
                        <li key={path} className="flex items-center gap-2">
                            <span>/</span>
                            <Link to={path} className="capitalize hover:text-primary">
                                {segment.replace("-", " ")}
                            </Link>
                        </li>
                    );
                })}
            </ol>
        </nav>
    );
}
