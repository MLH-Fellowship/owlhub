import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  useColorModeValue,
  Textarea,
  Input,
  VStack,
  Button,
} from "@chakra-ui/react";
import { useState } from "react";
import { createTodo } from "../graphql/mutations";
import { API, graphqlOperation } from "aws-amplify";

const initialState = { name: "", description: "" };

export default function BasicUsage(props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
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
    <>
      <Button onClick={onOpen}>Hoot!</Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>&lt;hoot your code/&gt;</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack>
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
                onChange={(event) =>
                  setInput("description", event.target.value)
                }
              />
            </VStack>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="teal" mr={3} onClick={addTodo}>
              Hoot
            </Button>
            <Button colorScheme="blue" onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
