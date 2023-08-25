import { type Router } from "@remix-run/router";
import ReactDOM from "react-dom/client";
import {
    Route,
    RouterProvider,
    createBrowserRouter,
    createRoutesFromElements,
} from "react-router-dom";
import App from "./App";
import TermList from "./components/TermList";
import TermView from "./components/TermView";
import "./index.css";
import {
    addCardAction,
    addTermAction,
    deleteCardAction,
    deleteTermAction,
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
        <Route path="/" element={ <App /> }>
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
    ),
);

root.render(
    <RouterProvider router={ router } />
);
