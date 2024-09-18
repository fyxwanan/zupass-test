import React from "react";
import { Router, createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
    },
], {
    basename: "/"
});

const RouterBase = () => {
    return <RouterProvider router={router} />;
}

export default RouterBase;