import { type Router } from "@remix-run/router";
import ReactDOM from "react-dom/client";
import {
    Route,
    RouterProvider,
    createBrowserRouter,
    createRoutesFromElements,
} from "react-router-dom";
import App from "./App";
import AuthLayout from "./components/AuthLayout";
import LoginView from "./components/LoginView";
import TermList from "./components/TermList";
import TermView from "./components/TermView";
import "./index.css";
import {
    addCardAction,
    addTermAction,
    deleteCardAction,
    deleteTermAction,
    loginAction,
    modifyCardAction,
    modifyTermAction,
    moveCardAction,
} from "./utils/actions";
import { termListLoader, termViewLoader } from "./utils/loaders";

const root: ReactDOM.Root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
);

const router: Router = createBrowserRouter(
    createRoutesFromElements(
        <Route element={ <App /> }>
            <Route path="/login" element={ <LoginView /> } />
            <Route path="/login/action" action={ loginAction } />
            <Route element={ <AuthLayout /> }>
                <Route path="/">
                    <Route path="" element={ <TermList /> } loader={ termListLoader } />
                    <Route path="term/:id" element={ <TermView /> } loader={ termViewLoader }></Route>

                    <Route path="term/add" action={ addTermAction }></Route>
                    <Route path="term/modify" action={ modifyTermAction }></Route>
                    <Route path="term/delete" action={ deleteTermAction }></Route>

                    <Route path="card/add" action={ addCardAction }></Route>
                    <Route path="card/modify" action={ modifyCardAction }></Route>
                    <Route path="card/move" action={ moveCardAction }></Route>
                    <Route path="card/delete" action={ deleteCardAction }></Route>
                </Route>
            </Route>
        </Route>
    ),
);

root.render(
    <RouterProvider router={ router } />
);
