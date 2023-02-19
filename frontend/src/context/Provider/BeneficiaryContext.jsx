import { createContext, useContext, useEffect, useReducer } from "react";
import { useFetch } from "../../hooks";
import { beneficiaryReducer } from "../Reducer/beneficiaryReducer";
import { LoadingContext } from "./LoadingContext";

export const BeneficiaryContext = createContext();

export const BeneficiaryContextProvider = ({ children }) => {
  const { setIsLoading } = useContext(LoadingContext);
  const [allBeneficiaries, dispatch] = useReducer(beneficiaryReducer, []);

  useEffect(() => {
    async function getAllBeneficiary() {
      let { message } = await useFetch("/api/beneficiary/view", "GET");
      dispatch({ type: "LOAD_ALL", payload: message.data });
      setIsLoading(false);
    }
    setIsLoading(true);
    getAllBeneficiary();
  }, []);

  return (
    <BeneficiaryContext.Provider value={{ allBeneficiaries, dispatch }}>
      {children}
    </BeneficiaryContext.Provider>
  );
};
