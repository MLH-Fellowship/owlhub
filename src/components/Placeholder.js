import { Container } from "@chakra-ui/react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { dark } from "react-syntax-highlighter/dist/esm/styles/hljs";

export const Placeholder = (props) => (
  <Container>
    <SyntaxHighlighter language="javascript" style={dark} wrapLines ="true">
      {props.code}
    </SyntaxHighlighter>
  </Container>
);
