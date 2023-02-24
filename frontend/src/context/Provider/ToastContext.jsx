import { createContext, useState, useEffect } from "react";

export const ToastContext = createContext();

export const ToastContextProvider = ({ children }) => {
  const [showToast, setShowToast] = useState(false);
  const [toastContent, setToastContent] = useState({});
  useEffect(() => {
    if (showToast) {
      setTimeout(() => {
        setShowToast(false);
      }, 5000);
    }
  }, [showToast]);

  return (
    <ToastContext.Provider value={{ showToast, setShowToast, toastContent, setToastContent }}>
      {children}
    </ToastContext.Provider>
  );
};
