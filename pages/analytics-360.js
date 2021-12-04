import { Heading, VStack } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";
import AnalyticsComponent from "../components/chart/Analytics";
import { highChartsTheme } from "lib/util";
// https://stackoverflow.com/questions/11396628/highcharts-datetime-axis-how-to-disable-time-part-show-only-dates
// https://www.highcharts.com/forum/viewtopic.php?t=42696
Highcharts.theme = highChartsTheme;
if (typeof Highcharts === "object") Highcharts.setOptions(Highcharts.theme);

const chartOptionsCreator = (data) => {
  const chartOptions = {
    chart: {
      type: "spline",
      height: 300,
      panning: true,
      followTouchMove: true,
    },
    credits: {
      enabled: false,
    },
    title: {
      text: "Monthly Average Temperature",
    },
    subtitle: {
      text: "Source: WorldClimate.com",
    },
    xAxis: {
      categories:
        data?.timeSeries.map((timer) =>
          new Date(timer.timeStamp).toDateString()
        ) || [],
    },
    yAxis: {
      title: {
        text: "Hours",
      },
      labels: {
        formatter: function () {
          return this.value + " hr";
        },
      },
    },
    tooltip: {
      crosshairs: true,
      shared: true,
    },
    plotOptions: {
      spline: {
        marker: {
          radius: 4,
          lineColor: "#666666",
          lineWidth: 1,
        },
      },
    },
    series:
      data?.tags.map((tag) => {
        return {
          name: tag,
          marker: {
            symbol: "square",
          },
          data: data.timeSeries.map((timer) => {
            if (timer[tag] >= 10)
              return {
                y: timer[tag],
                marker: {
                  symbol:
                    "url(https://www.highcharts.com/samples/graphics/sun.png)",
                },
              };
            return timer[tag];
          }),
        };
      }) || [],
  };

  return chartOptions;
};
export default function Analytics() {
  const [data, setData] = useState(null);
  useEffect(() => {
    axios
      .get("/api/analytics-360")
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
        alert("Server error");
      });
  }, []);

  return (
    <VStack alignItems="left">
      <Heading textAlign="center">Your time analytics</Heading>
      <AnalyticsComponent {...data} />
      <HighchartsReact
        highcharts={Highcharts}
        options={chartOptionsCreator(data)}
      />
    </VStack>
  );
}
