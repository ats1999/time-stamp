import { VStack, Button, Heading } from "@chakra-ui/react";
import CreatableSelect from "react-select/creatable";

const options = [
  { value: "chocolate", label: "Chocolate" },
  { value: "strawberry", label: "Strawberry" },
  { value: "vanilla", label: "Vanilla" },
];
export default function Tags() {
  return (
    <VStack alignItems="left" p={2} mt={3} width="400px" maxWidth="100%" mx="auto">
      <Heading as="h1" size="sm">
        {" "}
        Select a TAG to get started
      </Heading>
      <CreatableSelect
        isClearable
        onChange={(val) => console.log(val)}
        onCreateOption={(val) => console.log(val)}
        options={options}
      />
      <Button colorScheme="green" variant="solid">
        GO
      </Button>
    </VStack>
  );
}
