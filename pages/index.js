import { useState } from "react";
import Hero from "components/layout/Hero";
import Aday from "@components/chart/Aday";
import { Box, Input } from "@chakra-ui/react";
export default function Home() {
  let curDate = new Date();
  const [date, setDate] = useState(
    `${curDate.getFullYear()}-${curDate.getMonth()+1}-${curDate.getDate()}`
  );

  return (
    <div>
      <Box p={1}>
        <Input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          // max={`${curDate.getFullYear()}-${curDate.getMonth()+1}-${curDate.getDate()}`}
          w="200px"
        />
      </Box>
      <Aday date={new Date(date).getTime()} />
      <Hero />
    </div>
  );
}
