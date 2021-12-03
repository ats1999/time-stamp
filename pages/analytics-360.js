import { Heading, Box } from "@chakra-ui/react";
import axios from "axios";
import { useEffect } from "react";
export default function Analytics() {
  useEffect(() => {
    axios
      .get("/api/analytics-360")
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
        alert("Server error");
      });
  }, []);

  return (
    <Box>
      <Heading textAlign="center">Your time analytics</Heading>
    </Box>
  );
}
