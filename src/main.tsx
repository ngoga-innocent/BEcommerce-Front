import React from "react";
import ReactDOM from "react-dom/client";
import AppRoutes from "./route";
import { Provider } from "react-redux";
import { store } from "./store";
import "./index.css";
import {ToastContainer} from "react-toastify"
import { HelmetProvider } from "react-helmet-async";
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ToastContainer />
    <HelmetProvider>
    <Provider store={store}>
      <AppRoutes />
    </Provider>
    </HelmetProvider>
  </React.StrictMode>
);
