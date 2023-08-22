import { type Router } from "@remix-run/router";
import React from "react";
import ReactDOM from "react-dom/client";
import {
    Route,
    RouterProvider,
    createBrowserRouter,
    createRoutesFromElements,
} from "react-router-dom";
import App from "./App";
import TermList from "./components/TermList";
import "./index.css";
import { termListLoader } from "./utils/loaders";

const root: ReactDOM.Root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
);

const router: Router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={ <App /> }>
            <Route path="" element={ <TermList /> } loader={ termListLoader } />
        </Route>
    ),
);

root.render(
    <React.StrictMode>
        <RouterProvider router={ router } />
    </React.StrictMode>
);
