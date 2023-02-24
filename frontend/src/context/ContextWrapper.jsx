import { LoadingProvider, BeneficiaryProvider, ProductProvider, ToastProvider } from "./Provider";

export default function ContextWrapper({ children }) {
  return (
    <LoadingProvider>
      <ToastProvider>
        <BeneficiaryProvider>
          <ProductProvider>{children}</ProductProvider>
        </BeneficiaryProvider>
      </ToastProvider>
    </LoadingProvider>
  );
}
