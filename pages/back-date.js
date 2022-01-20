import React, { useState, useRef } from "react";

import {
  VStack,
  useColorModeValue,
  Input,
  Text,
  Button,
} from "@chakra-ui/react";

import { useRouter } from "next/router";
import axios from "axios";

import { to_YY_MM_DD } from "../lib/util";

export default function BackDate() {
  const router = useRouter();
  const [submitIng, setSubmitIng] = useState(false);
  const [time, setTime] = useState(0);
  const [date, setDate] = useState(to_YY_MM_DD(new Date()));
  const minutesInputRef = useRef(null);

  const submitTagTimer = () => {
    setSubmitIng(true);
    axios
      .post("/api/timer", {
        tag: router.query.tag,
        time: time * 60 * 1000,
        date:new Date(date).getTime(),
      })
      .then((res) => {
        alert("Updated successfully");
        minutesInputRef.current.value = '';
        setTime('');
        alert(err?.response?.data || "Internal Server Error :)");
      })
      .catch((err) => {
        console.log(err)
      })
      .finally(() => setSubmitIng(false));
  };

  return (
    <VStack
      w="400px"
      maxW="100%"
      mx="auto"
      alignItems="left"
      role={"group"}
      p={6}
      maxW={"330px"}
      w={"full"}
      bg={useColorModeValue("white", "gray.800")}
      boxShadow={"2xl"}
      rounded={"lg"}
      pos={"relative"}
      zIndex={1}
    >
      <Text>Enter time in minutes</Text>
      <Input
        onChange={(e) => setTime(e.target.value)}
        placeholder="minutes"
        ref={minutesInputRef}
        w="100%"
        type="number"
      />
      <Input
        onChange={(e) => setDate(e.target.value)}
        value={date}
        max={to_YY_MM_DD(new Date())}
        w="100%"
        type="date"
      />
      <Button
        mt={10}
        w={"full"}
        bg={"green.400"}
        color={"white"}
        rounded={"xl"}
        boxShadow={"0 5px 20px 0px rgb(72 187 120 / 43%)"}
        _hover={{
          bg: "green.500",
        }}
        _focus={{
          bg: "green.500",
        }}
        onClick={submitTagTimer}
        isLoading={submitIng}
        disabled={time <= 0 || !date}
      >
        Save for {router.query.tag}
      </Button>
    </VStack>
  );
}
