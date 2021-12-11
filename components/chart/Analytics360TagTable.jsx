import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
} from "@chakra-ui/react";

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

function TagAnalytics({ tag, timeSeries }) {
  const analytics = getTagAnalytics(timeSeries, tag);
  const avgHours =
    analytics.numHours > 0
      ? (analytics.numHours / analytics.numDays).toFixed(2)
      : 0;
  return (
    <Tr>
      <Td>{tag}</Td>
      <Td>{analytics.numDays}</Td>
      <Td>{analytics.numHours.toFixed(2)}</Td>
      <Td>{avgHours}</Td>
    </Tr>
  );
}
export default function Analytics360TagTable({ data }) {
  return (
    <Table variant="simple">
      <TableCaption>Time according to your tags</TableCaption>
      <Thead>
        <Tr>
          <Th>Tag</Th>
          <Th>No. Days</Th>
          <Th>No. Hours</Th>
          <Th>Avg Hours</Th>
        </Tr>
      </Thead>
      <Tbody>
        {data?.tags.map((tag) => (
          <TagAnalytics key={tag} tag={tag} timeSeries={data.timeSeries} />
        ))}
      </Tbody>
    </Table>
  );
}
