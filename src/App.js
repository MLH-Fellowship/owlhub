/* src/App.js */
import React from "react";
import Amplify from "aws-amplify";
import { withAuthenticator } from "@aws-amplify/ui-react";
import awsExports from "./aws-exports";
import Timeline from "./components/Timeline";
import Navbar from "./components/Navbar";

Amplify.configure(awsExports);

const App = () => {
  return (
    <>
      <Timeline></Timeline>
    </>
  );
};

export default withAuthenticator(App);
