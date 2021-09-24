/* src/App.js */
import React from "react";
import Amplify from "aws-amplify";
import { withAuthenticator } from "@aws-amplify/ui-react";
import awsExports from "./aws-exports";
import Todo from "./components/Todo";
import Navbar from "./components/Navbar";

Amplify.configure(awsExports);

const App = () => {
  return (
    <>
      <Navbar></Navbar>
      <Todo></Todo>
    </>
  );
};

export default withAuthenticator(App);
