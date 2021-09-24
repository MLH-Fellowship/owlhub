import { useEffect, useState } from "react";
import { API, graphqlOperation } from "aws-amplify";
import { Container, Box, Icon, VStack, Button } from "@chakra-ui/react";
import { listTodos } from "../graphql/queries";
import PostForm from "./PostForm";
import { Placeholder } from "./Placeholder";
import { List } from "./List";
import { ListItem } from "./ListItem";
import { HamburgerIcon, TriangleUpIcon, TriangleDownIcon } from "@chakra-ui/icons";

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
      <PostForm newTodo={(newTodo) => setTodos([...todos, newTodo])}></PostForm>
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
                  <VStack>
                    <Button
                      colorScheme="teal"
                    >
                      <TriangleUpIcon
                        boxSize={3}
                        color="red.450"
                        style={{ marginRight: "2px" }}
                      />
                    </Button>
                    <Button
                      colorScheme="teal"
                    >
                      <TriangleDownIcon
                        boxSize={3}
                        color="red.450"
                        style={{ marginTop: "2px" }}
                      />
                    </Button>
                  </VStack>
                </ListItem>
              ))}
          </List>
        </Box>
      </Box>
    </Container>
  );
}
