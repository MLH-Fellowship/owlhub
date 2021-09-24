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
      <Button onClick={onOpen}>Open Modal</Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
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
                onChange={(event) =>
                  setInput("description", event.target.value)
                }
              />
              <Button colorScheme="teal" onClick={addTodo}>
                Hoot
              </Button>
            </VStack>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant="ghost">Secondary Action</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
