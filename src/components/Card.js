import SyntaxHighlighter from "react-syntax-highlighter";
import { dark } from "react-syntax-highlighter/dist/esm/styles/hljs";

export default function Card(props) {
  return (
    <div key={props.todo.id ? props.todo.id : props.key} style={styles.todo}>
      <p style={styles.todoName}>{props.todo.name}</p>
      <SyntaxHighlighter language="javascript" style={dark}>
        {props.todo.description}
      </SyntaxHighlighter>
    </div>
  );
}

const styles = {
  todo: { marginBottom: 15 },
  todoName: { fontSize: 20, fontWeight: "bold" },
};
