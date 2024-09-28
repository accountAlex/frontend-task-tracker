// index.tsx
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss"; // Импорт глобальных стилей
import App from "./App.tsx";

const rootElement = document.getElementById("root") as HTMLElement;
const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
