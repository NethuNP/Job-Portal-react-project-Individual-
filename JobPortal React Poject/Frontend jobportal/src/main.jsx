import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthContextProvider } from "../src/Component/context/AuthContext";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
    <AuthContextProvider>
      <App />
      </AuthContextProvider>
    </BrowserRouter>
    <ToastContainer />
  </React.StrictMode>
);