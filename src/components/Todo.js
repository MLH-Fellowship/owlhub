import { useEffect, useState } from "react";
import { API, graphqlOperation } from "aws-amplify";
import { Container } from "@chakra-ui/react";
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
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetchTodos();
  }, []);

  async function fetchTodos() {
    try {
      const todoData = await API.graphql(graphqlOperation(listTodos));
      const todos = todoData.data.listTodos.items;
      setTodos(todos);
    } catch (err) {
      console.log("error fetching todos");
    }
  }

  return (
    <Container maxW="container.md">
      <PostForm newTodo={(newTodo) => setTodos([...todos, newTodo])}></PostForm>

      {todos.slice(0).reverse().map((todo, index) => (
        <Card todo={todo} key={index}></Card>
      ))}
    </Container>
  );
}
