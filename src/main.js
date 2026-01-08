import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from "react";
import ReactDOM from "react-dom/client";
import AppRoutes from "./route";
import { Provider } from "react-redux";
import { store } from "./store";
import "./index.css";
import { ToastContainer } from "react-toastify";
ReactDOM.createRoot(document.getElementById("root")).render(_jsxs(React.StrictMode, { children: [_jsx(ToastContainer, {}), _jsx(Provider, { store: store, children: _jsx(AppRoutes, {}) })] }));
