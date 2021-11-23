import { useState, useEffect } from "react";
import { VStack, Button, Heading, LightMode } from "@chakra-ui/react";
import CreatableSelect from "react-select/creatable";
import axios from "axios";
import Link from "next/link";

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
      <LightMode>
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
      </LightMode>

      <Link href={`/timer?tag=${selectedTag?.value}`}>
        <a>
          <Button
            isFullWidth
            colorScheme="green"
            variant="solid"
            disabled={!selectedTag}
            size="sm"
          >
            GO
          </Button>
        </a>
      </Link>
      <Link href={`/back-date?tag=${selectedTag?.value}`}>
        <a>
          <Button
            isFullWidth
            colorScheme="green"
            variant="outline"
            disabled={!selectedTag}
          >
            Back Date
          </Button>
        </a>
      </Link>
    </VStack>
  );
}
