import { createContext, useContext, useEffect, useReducer } from "react";
import { useFetch } from "../../hooks";
import { productReducer } from "../Reducer/productReducer";
import { LoadingContext } from "./LoadingContext";

export const ProductContext = createContext();

export const ProductContextProvider = ({ children }) => {
  const { setIsLoading } = useContext(LoadingContext);
  const [allProducts, dispatch] = useReducer(productReducer, []);

  useEffect(() => {
    async function getAllProduct() {
      let { message } = await useFetch("/api/product/view", "GET");
      dispatch({ type: "LOAD_ALL", payload: message.data });
      setIsLoading(false);
    }
    setIsLoading(true);
    getAllProduct();
  }, []);

  return (
    <ProductContext.Provider value={{ allProducts, dispatch }}>{children}</ProductContext.Provider>
  );
};
