import { PropsWithChildren } from "react";
import SolanaContextProvider from "./SolanaContext";
import ToastContainer from "./ToastContainer";

const AppContext: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <ToastContainer />
      <SolanaContextProvider>{children}</SolanaContextProvider>
    </>
  );
};

export default AppContext;
