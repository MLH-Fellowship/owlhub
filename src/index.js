import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import Amplify from "aws-amplify";
import awsExports from "./aws-exports";
import { extendTheme } from "@chakra-ui/react";
import { ChakraProvider } from "@chakra-ui/react";
import "@fontsource/league-mono/400.css"
import Navbar from "./components/Navbar";
Amplify.configure(awsExports);


ReactDOM.render(
	
  <React.StrictMode>
  <ChakraProvider>
      <Navbar></Navbar>
      <App />
    </ChakraProvider>
    
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
