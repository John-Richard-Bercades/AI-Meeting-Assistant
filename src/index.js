import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";

// Initialize authentication state if not already set
if (!localStorage.getItem('isAuthenticated')) {
  localStorage.setItem('isAuthenticated', 'false');
}

const container = document.getElementById("root");
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
