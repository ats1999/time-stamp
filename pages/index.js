import { useState } from "react";
import Hero from "components/layout/Hero";
import Aday from "@components/chart/Aday";
import { VStack, Input } from "@chakra-ui/react";

import { to_YY_MM_DD } from "../lib/util";

export default function Home() {
  let curDate = new Date();
  const [date, setDate] = useState(to_YY_MM_DD(new Date()));
  return (
    <div>
      <VStack p={1} alignItems="left">
        <Input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          max={to_YY_MM_DD(new Date())}
          w="200px"
        />
      </VStack>
      <Aday date={new Date(date).getTime()} />
      <Hero />
    </div>
  );
}
