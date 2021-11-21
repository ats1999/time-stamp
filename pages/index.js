import { useState } from "react";
import Hero from "components/layout/Hero";
import Aday from "@components/chart/Aday";
import { Box, Input } from "@chakra-ui/react";
export default function Home() {
  const [date, setDate] = useState(
    new Date().toLocaleDateString().split("/").reverse().join("-")
  );

  return (
    <div>
      <Box p={1}>
        <Input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          max={new Date().toLocaleDateString().split("/").reverse().join("-")}
          w="200px"
        />
      </Box>
      <Aday date={new Date(date).getTime()}/>
      <Hero />
    </div>
  );
}
