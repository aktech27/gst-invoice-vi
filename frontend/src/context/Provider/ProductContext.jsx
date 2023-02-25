import { createContext, useContext, useEffect, useReducer, useState } from "react";
import { useFetch } from "../../hooks";
import { productReducer } from "../Reducer/productReducer";
import { LoadingContext } from "./LoadingContext";

export const ProductContext = createContext();

export const ProductContextProvider = ({ children }) => {
  const { setIsLoading } = useContext(LoadingContext);
  const [allProducts, dispatch] = useReducer(productReducer, []);
  const [maxPages, setMaxPages] = useState(1);

  useEffect(() => {
    async function getAllProduct() {
      let { message } = await useFetch("/api/product/view?currentPage=1&maxPerPage=10", "GET");
      dispatch({ type: "LOAD", payload: message.data });
      setMaxPages(message.maxPagesPossible);
      setIsLoading(false);
    }
    setIsLoading(true);
    getAllProduct();
  }, []);

  return (
    <ProductContext.Provider value={{ allProducts, dispatch, maxPages }}>
      {children}
    </ProductContext.Provider>
  );
};
