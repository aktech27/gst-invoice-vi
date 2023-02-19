import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import "./Animations.css";
import { LoadingContextProvider } from "./context/Provider/LoadingContext";
import { BeneficiaryContextProvider } from "./context/Provider/BeneficiaryContext";
import { ProductContextProvider } from "./context/Provider/ProductContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <LoadingContextProvider>
      <BeneficiaryContextProvider>
        <ProductContextProvider>
          <App />
        </ProductContextProvider>
      </BeneficiaryContextProvider>
    </LoadingContextProvider>
  </React.StrictMode>
);
