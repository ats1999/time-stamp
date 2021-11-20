import { useState, useEffect } from "react";
import { VStack, Button, Heading } from "@chakra-ui/react";
import CreatableSelect from "react-select/creatable";
import axios from "axios";

export default function Tags() {
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTag, setSelectedTag] = useState(null);

  useEffect(() => {
    axios
      .get("/api/tag")
      .then((res) => setTags(res.data))
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, []);

  const createTag = (tag) => {
    setLoading(true);
    axios
      .post("/api/tag", { tag })
      .then((res) => {
        setTags([...tags, tag]);
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  };
  return (
    <VStack
      alignItems="left"
      p={2}
      mt={3}
      width="400px"
      maxWidth="100%"
      mx="auto"
    >
      <Heading as="h1" size="sm">
        {" "}
        Select a TAG to get started
      </Heading>
      <CreatableSelect
        onChange={setSelectedTag}
        onCreateOption={createTag}
        options={tags.map((tag) => {
          return {
            value: tag,
            label: tag,
          };
        })}
        isLoading={loading}
      />
      <Button colorScheme="green" variant="solid"disabled={!selectedTag}>
        GO
      </Button>
    </VStack>
  );
}
