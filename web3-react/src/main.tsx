import { StrictMode } from "react";
import ReactDOM from "react-dom";
import { Web3ReactProvider } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";
import App from "./App";

const getLibrary = (provider: any) => {
  const library = new Web3Provider(provider, "any");
  return library;
};
const rootElement = document.getElementById("root");
ReactDOM.render(
  <StrictMode>
    <Web3ReactProvider getLibrary={getLibrary}>
      <App />
    </Web3ReactProvider>
  </StrictMode>,
  rootElement
);
