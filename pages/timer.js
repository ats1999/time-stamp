import React, { useState } from "react";

import {
  VStack,
  useColorModeValue,
  Text,
  Button,
  HStack,
} from "@chakra-ui/react";

import { useRouter } from "next/router";

import CompoundTimer from "react-compound-timer";
export default function Timer() {
  const router = useRouter();
  const [paused, setPaused] = useState(true);
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
      <CompoundTimer initialTime={0}>
        {({ start, resume, pause, stop, reset, timerState }) => (
          <React.Fragment>
            <Text
              className={paused ? "blink_timer" : ""}
              fontSize="70px"
              textAlign="center"
            >
              <CompoundTimer.Hours /> : <CompoundTimer.Minutes /> :{" "}
              <CompoundTimer.Seconds />
            </Text>
            <Button
              w="auto"
              variant="solid"
              mx="auto"
              onClick={() => {
                paused ? resume() : pause();
                setPaused(!paused);
              }}
              size="lg"
              variant="unstyles"
            >
              {paused ? "▶️" : "⏸️"}
            </Button>
            {/* <div>
              <button onClick={start}>Start</button>
              <button onClick={pause}>Pause</button>
              <button onClick={resume}>Resume</button>
              <button onClick={stop}>Stop</button>
              <button onClick={reset}>Reset</button>
            </div> */}
          </React.Fragment>
        )}
      </CompoundTimer>

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
      >
        Save for {router.query.tag}
      </Button>
    </VStack>
  );
}
