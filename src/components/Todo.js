import { useEffect, useState } from "react";
import { API, graphqlOperation } from "aws-amplify";
import {
  Container,
  Box,
  Icon,
} from "@chakra-ui/react";
import { listTodos } from "../graphql/queries";
import { Placeholder } from "./Placeholder";
import { List } from "./List";
import { ListItem } from "./ListItem";
import {
  HamburgerIcon,
} from "@chakra-ui/icons";
import Modal from "./Modal"

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
    <Container maxW="container.lg">
      <Modal newTodo={(newTodo) => setTodos([...todos, newTodo])}></Modal>
      <Box as="section">
        <Box
          maxW="2xl"
          mx="auto"
          p={{
            base: "4",
            md: "8",
          }}
        >
          <List spacing="12">
            {todos
              .slice(0)
              .reverse()
              .map((todo, index) => (
                <ListItem
                  title={todo.name}
                  subTitle="Posted by Mark Chandler"
                  icon={<Icon as={HamburgerIcon} boxSize="6" />}
                >
                  <Placeholder todo={todo} key={index} />
                </ListItem>
              ))}
          </List>
        </Box>
      </Box>
    </Container>
  );
}
