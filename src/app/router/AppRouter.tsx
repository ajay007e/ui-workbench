import { BrowserRouter, Routes, Route } from "react-router-dom";
import { routes } from "./routes";
import { Layout } from "@/components/layout/Layout";

export function AppRouter() {
    return (
        <BrowserRouter>
            <Layout>
                <Routes>
                    {routes.map((route) => (
                        <Route key={route.path} path={route.path} element={route.element} />
                    ))}
                </Routes>
            </Layout>
        </BrowserRouter>
    );
}
