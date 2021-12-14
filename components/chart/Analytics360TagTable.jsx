import { useState, useEffect } from "react";
import {
  Table,
  Thead,
  Tbody,
  Container,
  Tr,
  Th,
  Td,
  TableCaption,
  VStack,
  Skeleton,
} from "@chakra-ui/react";
import { ArrowUpIcon, ArrowDownIcon } from "@chakra-ui/icons";

function getTagAnalytics(timeSeries, tag) {
  if (!timeSeries) return {};

  return timeSeries.reduce(
    (total, cur) => {
      if (cur[tag] == 0) {
        return total;
      } else {
        return {
          numDays: total.numDays + 1,
          numHours: total.numHours + cur[tag],
        };
      }
    },
    {
      numDays: 0,
      numHours: 0,
    }
  );
}

function TagAnalytics({ numDays, numHours, avgHours, tag }) {
  return (
    <Tr>
      <Td textTransform={"capitalize"}>{tag}</Td>
      <Td>{numDays}</Td>
      <Td>{numHours.toFixed(2)}</Td>
      <Td>{avgHours}</Td>
    </Tr>
  );
}

const SortByArrow = ({ sortBy, descOrder, order }) => {
  if (order != sortBy) return null;
  if (descOrder) return <ArrowDownIcon w={6} h={6} />;
  else return <ArrowUpIcon w={6} h={6} />;
};

export default function Analytics360TagTable({ data }) {
  const [descOrder, setdescOrder] = useState(false);
  const [sortBy, setSortBy] = useState("numDays");
  const [analyticsData, setAnalyticsData] = useState([]);
  useEffect(() => {
    if (!data) return;
    const analyticsData = data.tags.map((tag) => {
      const analytics = getTagAnalytics(data.timeSeries, tag);
      const avgHours =
        analytics.numHours > 0
          ? (analytics.numHours / analytics.numDays).toFixed(2)
          : 0;
      return {
        ...getTagAnalytics(data.timeSeries, tag),
        avgHours: Number(avgHours),
        tag,
      };
    });

    setAnalyticsData(analyticsData);
  }, [data]);

  if (!data)
    return (
      <VStack alignItems={"left"} p={2}>
        <Skeleton height="20px" />
        <Skeleton height="20px" />
        <Skeleton height="20px" />
        <Skeleton height="20px" />
        <Skeleton height="20px" />
        <Skeleton height="20px" />
        <Skeleton height="20px" />
        <Skeleton height="20px" />
      </VStack>
    );

  const setOrder = (order) => {
    if (sortBy == order) setdescOrder(!descOrder);
    else {
      setdescOrder(false);
      setSortBy(order);
    }
  };
  return (
    <Container h="100px" w="100%" maxW={"100%"}>
      <Table variant="striped" size="sm" placement="top">
        <TableCaption>Time according to your tags</TableCaption>
        <Thead>
          <Tr>
            <Th>Tag</Th>
            <Th cursor="pointer" onClick={() => setOrder("numDays")}>
              No. Days{" "}
              <SortByArrow
                sortBy={sortBy}
                descOrder={descOrder}
                order={"numDays"}
              />
            </Th>
            <Th cursor="pointer" onClick={() => setOrder("numHours")}>
              No. Hours
              <SortByArrow
                sortBy={sortBy}
                descOrder={descOrder}
                order={"numHours"}
              />
            </Th>
            <Th cursor="pointer" onClick={() => setOrder("avgHours")}>
              Avg Hours{" "}
              <SortByArrow
                sortBy={sortBy}
                descOrder={descOrder}
                order={"avgHours"}
              />
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          {analyticsData
            .sort((tag1, tag2) =>
              descOrder
                ? tag1[sortBy] - tag2[sortBy]
                : tag2[sortBy] - tag1[sortBy]
            )
            .map((d) => (
              <TagAnalytics key={d.tag} {...d} />
            ))}
        </Tbody>
      </Table>
    </Container>
  );
}
