import SyntaxHighlighter from "react-syntax-highlighter";
import { dark } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { useCounter } from "@chakra-ui/counter";
import {MoonIcon} from "@chakra-ui/icons";
import { Button} from "@chakra-ui/react";
export default function Card(props) {
  const counter = useCounter({
    max: 10,
    min: 0,
    step: 1,
  })

  return (
    <div key={props.todo.id ? props.todo.id : props.key} style={styles.todo}>
      <p style={styles.todoName}>{props.todo.name}</p>
      <SyntaxHighlighter language="javascript" style={dark}>
        {props.todo.description}
      </SyntaxHighlighter>
      <Button style={{marginTop:'10px', marginLeft:'10px'}}  colorScheme="teal" onClick={() => counter.increment()}><MoonIcon boxSize={5} color="red.450" style={{marginRight:'2px'}}/> {counter.value}</Button>

    </div>
  );
}

const styles = {
  todo: { marginBottom: 15 },
  todoName: { fontSize: 20, fontWeight: "bold" },
};
