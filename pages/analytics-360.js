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
      text: "Your entire time track",
    },
    subtitle: {
      text: "The below chart contains the time from the day you started with us :)",
    },
    xAxis: {
      categories:
        data?.timeSeries.map((timer) =>
          new Date(timer.timeStamp).toDateString()
        ) || [],
      min: 0,
      max: 7,
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
      
      // https://stackoverflow.com/questions/6867607/want-to-sort-highcharts-tooltip-results
      formatter: function (tooltip) {
        let items = this.points || splat(this)

        // sort the values
        items.sort(function (a, b) {
          return a.y < b.y ? -1 : a.y > b.y ? 1 : 0;
        });
        items.reverse();

        return tooltip.defaultFormatter.call(this, tooltip);
      },
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
