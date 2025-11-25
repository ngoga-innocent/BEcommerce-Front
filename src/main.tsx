import React from "react";
import ReactDOM from "react-dom/client";
import AppRoutes from "./route";
import { Provider } from "react-redux";
import { store } from "./store";
import "./index.css";
import {ToastContainer} from "react-toastify"
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ToastContainer />
    <Provider store={store}>
      <AppRoutes />
    </Provider>
  </React.StrictMode>
);
