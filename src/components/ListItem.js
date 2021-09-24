import {
  Stack,
  Flex,
  Circle,
  Text,
  useColorModeValue,
  Heading,
  Spacer,
} from "@chakra-ui/react";
import TimeAgo from "react-timeago";

export const ListItem = (props) => {
  const {
    title,
    subTitle,
    createdAt,
    icon,
    isLastItem,
    children,
    ...stackProps
  } = props;
  return (
    <Stack as="li" direction="row" spacing="4" {...stackProps}>
      <Flex direction="column" alignItems="center" aria-hidden="true">
        <Circle
          bg={useColorModeValue("blue.500", "blue.300")}
          size="12"
          borderWidth="4px"
          borderColor={useColorModeValue("white", "gray.800")}
          color={useColorModeValue("white", "black")}
        >
          {icon}
        </Circle>
        {!isLastItem && <Flex flex="1" borderRightWidth="1px" mb="-12" />}
      </Flex>
      <Stack spacing="4" pt="1" flex="1">
        <Flex direction="column">
          <Heading fontSize="md" fontWeight="semibold">
            {title}
          </Heading>
          <Flex>
            <Text
              fontSize="sm"
              color={useColorModeValue("gray.600", "gray.400")}
            >
              {subTitle}
            </Text>
            <Spacer />
            <Text
              fontSize="sm"
              color={useColorModeValue("gray.600", "gray.400")}
            >
              <TimeAgo date={createdAt} />
            </Text>
          </Flex>
        </Flex>
        <Flex>{children}</Flex>
      </Stack>
    </Stack>
  );
};
