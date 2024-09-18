import React from "react";
import ReactDOM from "react-dom";
import { Route } from "react-router";
import { Router, createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import Zupass from "./components/zupass/Zupass";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
    },
    {
        path: "/zupass",
        element: <Zupass />,
    },
], {
    basename: "/"
});

const RouterBase = () => {
    return <RouterProvider router={router} />;
}

export default RouterBase;