import { useEffect, useState } from "react";
import { API, graphqlOperation } from "aws-amplify";
import { Container } from "@chakra-ui/react";
import { createTodo } from "../graphql/mutations";
import { listTodos } from "../graphql/queries";
import SyntaxHighlighter from "react-syntax-highlighter";
import { dark } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { VStack } from "@chakra-ui/react";
import { Input } from "@chakra-ui/react";
import { useCounter } from "@chakra-ui/counter"
import {MoonIcon} from "@chakra-ui/icons";
import { Textarea } from "@chakra-ui/react";
import { Button, useColorModeValue } from "@chakra-ui/react";

const initialState = { name: "", description: "" };

export default function Todo() {
  const [formState, setFormState] = useState(initialState);
  const [todos, setTodos] = useState([]);
  
  useEffect(() => {
    fetchTodos();
  }, []);

  function setInput(key, value) {
    setFormState({ ...formState, [key]: value });
  }

  async function fetchTodos() {
    try {
      const todoData = await API.graphql(graphqlOperation(listTodos));
      const todos = todoData.data.listTodos.items;
      setTodos(todos);
    } catch (err) {
      console.log("error fetching todos");
    }
  }

  async function addTodo() {
    try {
      if (!formState.name || !formState.description) return;
      const todo = { ...formState };
      setTodos([...todos, todo]);
      setFormState(initialState);
      await API.graphql(graphqlOperation(createTodo, { input: todo }));
    } catch (err) {
      console.log("error creating todo:", err);
    }
  }
  const counter = useCounter({
    max: 10,
    min: 0,
    step: 1,
  })
 
  return (
    <Container maxW="container.md">
      <VStack>
        <h2 style={{paddingTop:'15px'}}>&lt;hoot your code/&gt;</h2>
        <Input
          style={{ width:"300px" }}
          bg={useColorModeValue("")}
          placeholder="Name"
          value={formState.name}
          onChange={(event) => setInput("name", event.target.value)}
        />
        <Textarea
          style={{ height:"100px", overflowWrap: "break-word", overflow: "auto" }}
          bg={useColorModeValue("")}
          placeholder="Code"
          value={formState.description}
          onChange={(event) => setInput("description", event.target.value)}
        />
        <Button colorScheme="teal" onClick={addTodo}>
          Hoot
        </Button>
      </VStack>

      {todos.map((todo, index) => (
        <div key={todo.id ? todo.id : index} style={styles.todo}>
          <p style={styles.todoName}>{todo.name}</p>
          <SyntaxHighlighter language="javascript" style={dark}>
            {todo.description}
          </SyntaxHighlighter>
          <MoonIcon boxSize={6} style={{marginTop:'10px', marginLeft:'10px'}} color="red.450" />
        </div>
      ))}
    </Container>
  );
}

const styles = {
  todo: { marginBottom: 15 },
  todoName: { fontSize: 20, fontWeight: "bold" },
};
