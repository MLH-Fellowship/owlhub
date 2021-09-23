import { useState } from "react";
import { VStack } from "@chakra-ui/react";
import { Input } from "@chakra-ui/react";
import { Textarea } from "@chakra-ui/react";
import { Button, useColorModeValue } from "@chakra-ui/react";
import { createTodo } from "../graphql/mutations";
import { API, graphqlOperation } from "aws-amplify";

const initialState = { name: "", description: "" };

export default function PostForm(props) {
  const [formState, setFormState] = useState(initialState);

  function setInput(key, value) {
    setFormState({ ...formState, [key]: value });
  }

  async function addTodo() {
    try {
      if (!formState.name || !formState.description) return;
      const todo = { ...formState };
      props.newTodo(todo);
      setFormState(initialState);
      await API.graphql(graphqlOperation(createTodo, { input: todo }));
    } catch (err) {
      console.log("error creating todo:", err);
    }
  }
  return (
    <VStack>
      <h2 style={{ paddingTop: "15px" }}>&lt;hoot your code/&gt;</h2>
      <Input
        style={{ width: "300px" }}
        bg={useColorModeValue("")}
        placeholder="Name"
        value={formState.name}
        onChange={(event) => setInput("name", event.target.value)}
      />
      <Textarea
        style={{
          height: "100px",
          overflowWrap: "break-word",
          overflow: "auto",
        }}
        bg={useColorModeValue("")}
        placeholder="Code"
        value={formState.description}
        onChange={(event) => setInput("description", event.target.value)}
      />
      <Button colorScheme="teal" onClick={addTodo}>
        Hoot
      </Button>
    </VStack>
  );
}
