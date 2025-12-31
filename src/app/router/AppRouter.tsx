import { HashRouter, Routes, Route } from "react-router-dom";
import { routes } from "./routes";
import { Layout } from "@/components/layout/Layout";
import { Fragment } from "react";

export function AppRouter() {
    return (
        <HashRouter>
            <Routes>
                {routes.map((route) => {
                    const Wrapper = route.isLayoutRequired ? Layout : Fragment;

                    return (
                        <Route
                            key={route.path}
                            path={route.path}
                            element={<Wrapper>{route.element}</Wrapper>}
                        />
                    );
                })}
            </Routes>
        </HashRouter>
    );
}
