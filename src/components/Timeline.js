import { useEffect, useState } from "react";
import { API, graphqlOperation } from "aws-amplify";
import { Container, Box, Icon, Center } from "@chakra-ui/react";
import { listHoots } from "../graphql/queries";
import { Placeholder } from "./Placeholder";
import { List } from "./List";
import { ListItem } from "./ListItem";
import { HamburgerIcon } from "@chakra-ui/icons";
import Modal from "./Modal";

export default function Timeline() {
  const [hoots, setHoots] = useState([]);

  useEffect(() => {
    fetchHoots();
  }, []);

  async function fetchHoots() {
    try {
      const hootData = await API.graphql(graphqlOperation(listHoots));
      const hoots = hootData.data.listHoots.items;
      setHoots(hoots);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <Container maxW="container.lg">
      <Center paddingTop="5">
        <Modal newHoot={(newHoot) => setHoots([...hoots, newHoot])}></Modal>
      </Center>
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
            {hoots
              .slice(0)
              .reverse()
              .map((hoot, index) => (
                <ListItem
                  title={hoot.name}
                  subTitle={hoot.description}
                  createdAt={hoot.createdAt}
                  key={index}
                  icon={<Icon as={HamburgerIcon} boxSize="6" />}
                >
                  <Placeholder hoot={hoot} />
                </ListItem>
              ))}
          </List>
        </Box>
      </Box>
    </Container>
  );
}
