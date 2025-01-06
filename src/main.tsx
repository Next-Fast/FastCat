// Style
import "@styles/tailwindcss.css";

// React
import React from "react";
import ReactDOM from "react-dom/client";

// Router
import { routeTree } from '@/routeTree.gen';
import { createRouter, RouterProvider } from "@tanstack/react-router";

// i18n
import '@lib/locale'

// Create a new router instance
const router = createRouter({ 
  routeTree,
  defaultPreload: "intent"
})

// Register the router instance for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}


// Render the app
const rootElement = document.getElementById("root") as HTMLElement;
ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
