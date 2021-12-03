import { Heading, Box } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";
import AnalyticsComponent from "../components/chart/Analytics";

// https://stackoverflow.com/questions/11396628/highcharts-datetime-axis-how-to-disable-time-part-show-only-dates
// https://www.highcharts.com/forum/viewtopic.php?t=42696
export default function Analytics() {
  const [data, setData] = useState([]);
  useEffect(() => {
    axios
      .get("/api/analytics-360")
      .then((res) => {
        console.log(res.data);
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
        alert("Server error");
      });
  }, []);

  const chartOptions = {
    chart: {
      zoomType: "x",
    },
    title: {
      text: "Your time tracked over the time",
    },
    subtitle: {
      text: "Pinch the chart to zoom in",
    },
    xAxis: {
      type: "datetime",
    },
    yAxis: {
      title: {
        text: "Hours",
      },
    },
    legend: {
      enabled: false,
    },
    tooltip: {
      formatter: function () {
        return this.y >= 1
          ? `${this.y.toFixed(2)} hours`
          : `${(this.y * 60).toFixed(2)} minutes`;
      },
    },
    series: [
      {
        type: "area",
        name: "Hour",
        data: data.timeSeries,
      },
    ],
  };

  return (
    <Box>
      <Heading textAlign="center">Your time analytics</Heading>
      <AnalyticsComponent {...data} />
      <HighchartsReact highcharts={Highcharts} options={chartOptions} />;
    </Box>
  );
}
