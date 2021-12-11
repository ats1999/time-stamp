import { useState, useEffect } from "react";
import { VStack, Button, Heading, LightMode } from "@chakra-ui/react";
import CreatableSelect from "react-select/creatable";
import axios from "axios";
import Link from "next/link";

const dot = (color = "transparent") => ({
  alignItems: "center",
  display: "flex",
  color: "white",
  ":before": {
    backgroundColor: color,
    borderRadius: 10,
    content: '" "',
    display: "block",
    marginRight: 8,
    height: 10,
    width: 10,
  },
});

export default function Tags() {
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTag, setSelectedTag] = useState(null);

  useEffect(() => {
    axios
      .get("/api/tag")
      .then((res) => setTags(res.data))
      .catch((err) => {
        console.log(err)
        alert(err?.response?.data || "Internal Server Error :)");
      })
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
          // https://react-select.com/home#custom-styles
          styles={{
            control: (styles) => ({ ...styles, backgroundColor: "black" }),
            option: (styles, { data, isDisabled, isFocused, isSelected }) => {
              return {
                ...styles,
                backgroundColor: isSelected
                  ? "#1f6300"
                  : isFocused
                  ? "#0b0236"
                  : "black",
                color: isDisabled ? "#ccc" : isSelected ? "gray" : "white",
                ":active": {
                  ...styles[":active"],
                },
              };
            },
            input: (styles) => ({ ...styles, ...dot() }),
            placeholder: (styles) => ({ ...styles, ...dot("#ccc") }),
            singleValue: (styles, { data }) => ({
              ...styles,
              ...dot(data.color),
            }),
          }}
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
