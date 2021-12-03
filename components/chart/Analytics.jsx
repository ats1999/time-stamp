import {
  Box,
  chakra,
  Flex,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  useColorModeValue,
} from "@chakra-ui/react";
import { BsPerson } from "react-icons/bs";
import { FiServer } from "react-icons/fi";
import { GoLocation } from "react-icons/go";
import { IoIosToday } from "react-icons/io";
import { Ri24HoursLine } from "react-icons/ri";
import { FaHourglassHalf } from "react-icons/fa";

function StatsCard(props) {
  const { title, stat, icon } = props;
  return (
    <Stat
      px={{ base: 2, md: 4 }}
      py={"5"}
      shadow={"xl"}
      border={"1px solid"}
      borderColor={useColorModeValue("gray.800", "gray.500")}
      rounded={"lg"}
    >
      <Flex justifyContent={"space-between"}>
        <Box pl={{ base: 2, md: 4 }}>
          <StatLabel fontWeight={"medium"} isTruncated>
            {title}
          </StatLabel>
          <StatNumber fontSize={"2xl"} fontWeight={"medium"}>
            {stat}
          </StatNumber>
        </Box>
        <Box
          my={"auto"}
          color={useColorModeValue("gray.800", "gray.200")}
          alignContent={"center"}
        >
          {icon}
        </Box>
      </Flex>
    </Stat>
  );
}

export default function BasicStatistics({ totalDays, avgHours, totalHours }) {
  return (
    <Box maxW="7xl" mx={"auto"} pt={5} px={{ base: 2, sm: 12, md: 17 }}>
      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={{ base: 5, lg: 8 }}>
        <StatsCard
          title={"Days"}
          stat={totalDays}
          icon={<IoIosToday size={"3em"} />}
        />
        <StatsCard
          title={"Hours"}
          stat={totalHours}
          icon={<Ri24HoursLine size={"3em"} />}
        />
        <StatsCard
          title={"Avg Hours"}
          stat={avgHours}
          icon={<FaHourglassHalf size={"3em"} />}
        />
      </SimpleGrid>
    </Box>
  );
}
