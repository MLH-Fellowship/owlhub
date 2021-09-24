import { useEffect, useState } from "react";
import { API, graphqlOperation } from "aws-amplify";
import { Container } from "@chakra-ui/react";
import { listTodos } from "../graphql/queries";
import PostForm from "./PostForm";
import Card from "./Card";

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

      {todos
        .slice(0)
        .reverse()
        .map((todo, index) => (
          <Card todo={todo} key={index}></Card>
        ))}
    </Container>
  );
}
