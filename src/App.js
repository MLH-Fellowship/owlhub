/* src/App.js */
import React, {  } from "react";
import { ChakraProvider } from "@chakra-ui/react";
import Amplify, {  } from "aws-amplify";
import { withAuthenticator } from "@aws-amplify/ui-react";
import awsExports from "./aws-exports";
import Todo from "./components/Todo";

Amplify.configure(awsExports);

const App = () => {
  
  return (
    <ChakraProvider>
      <Todo></Todo>
    </ChakraProvider>
  );
};

export default withAuthenticator(App);
