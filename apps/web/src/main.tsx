import React from "react";
import ReactDOM from "react-dom/client";
import { createRouter, RouterProvider } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";
import "./index.css";
import { QueryProvider } from "./api/query-provider";
import { Toaster } from 'react-hot-toast';

const router = createRouter({
  routeTree,
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryProvider>
      <Toaster toastOptions={{
        position: "top-right"
      }} />
      <RouterProvider router={router} />
    </QueryProvider>
  </React.StrictMode>,
);
