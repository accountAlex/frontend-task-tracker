import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss"; // Если у вас есть общие стили, они будут импортированы сюда
import App from "../src/App.tsx";

// Находим элемент с id "root", в который будет встраиваться наше React-приложение
const rootElement = document.getElementById("root") as HTMLElement;
const root = ReactDOM.createRoot(rootElement);

// Рендерим компонент App внутри элемента root
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
