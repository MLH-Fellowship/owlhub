/* src/App.js */
import React, {  } from "react";
import { ChakraProvider } from "@chakra-ui/react";
import Amplify, {  } from "aws-amplify";
import { withAuthenticator } from "@aws-amplify/ui-react";
import awsExports from "./aws-exports";
import Todo from "./components/Todo";
import { extendTheme } from "@chakra-ui/react"
import "@fontsource/league-mono/400.css"
import Navbar from "./components/Navbar";


const theme = extendTheme({
  fonts: {
    heading: "League Mono",
    body: "League Mono",
  },
})

Amplify.configure(awsExports);

const App = () => {
  
  return (
    <ChakraProvider theme={theme}>
      <Navbar></Navbar>
      <Todo></Todo>
    </ChakraProvider>
  );
};

export default withAuthenticator(App);
