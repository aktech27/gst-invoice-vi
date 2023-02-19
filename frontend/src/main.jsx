import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import "./Animations.css";
import { LoadingContextProvider } from "./context/Provider/LoadingContext";
import { BeneficiaryContextProvider } from "./context/Provider/BeneficiaryContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <LoadingContextProvider>
      <BeneficiaryContextProvider>
        <App />
      </BeneficiaryContextProvider>
    </LoadingContextProvider>
  </React.StrictMode>
);
