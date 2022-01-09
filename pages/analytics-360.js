import { Heading, VStack, Button, HStack } from "@chakra-ui/react";
import axios from "axios";
import Head from "next/head";
import { useEffect, useState } from "react";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";
import AnalyticsComponent from "../components/chart/Analytics";
import Analytics360TagTable from "@components/chart/Analytics360TagTable";
import { highChartsTheme } from "lib/util";

// https://stackoverflow.com/questions/11396628/highcharts-datetime-axis-how-to-disable-time-part-show-only-dates
// https://www.highcharts.com/forum/viewtopic.php?t=42696
Highcharts.theme = highChartsTheme;
if (typeof Highcharts === "object") Highcharts.setOptions(Highcharts.theme);

const createCategoriesSpline = (data) => {
  return (
    data?.timeSeries.map((timer) => new Date(timer.timeStamp).toDateString()) ||
    []
  );
};

const createCategoriesColumn = (data) => {
  return data?.tags || [];
};

const createDataSpline = (data) => {
  return (
    data?.tags.map((tag) => {
      return {
        name: tag,
        marker: {
          symbol: "square",
        },
        data: data.timeSeries.map((timer) => {
          if (timer[tag] >= 5)
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
    }) || []
  );
};

const createDataColumn = (data) => {
  const seriesValues =
    data?.tags.map((tag) => {
      return data.timeSeries.reduce((total, timer) => total + timer[tag], 0);
    }) || [];
  return [
    {
      name: "",
      data: seriesValues,
    },
  ];
};
const chartOptionsCreator = (
  data,
  createCategoriesSpline,
  createDataSpline,
  type = "spline",
  max = 7,
  title = "Your entire time track",
  subtitle = "Drag chart to see more :)"
) => {
  const chartOptions = {
    chart: {
      height: 300,
      panning: true,
      followTouchMove: true,
      type,
    },
    credits: {
      enabled: false,
    },
    title: {
      text: title,
    },
    subtitle: {
      text: subtitle,
    },
    xAxis: {
      categories: createCategoriesSpline(data),
      min: 0,
      max: max,
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
        let items = this.points || splat(this);

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
      // https://www.highcharts.com/forum/viewtopic.php?t=6399
      // events: {
      //   show: function () {
      //     let chart = this.chart,
      //       series = chart.series,
      //       i = series.length,
      //       otherSeries;
      //     while (i--) {
      //       otherSeries = series[i];
      //       if (otherSeries != this && otherSeries.visible) {
      //         otherSeries.hide();
      //       }
      //     }
      //   },
      // },
    },
    series: createDataSpline(data),
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
        alert(err?.response?.data || "Internal Server Error :)");
      });
  }, []);
  return (
    <>
      <Head>
        <title>@time-stamp - your hand crafter time analysis :)</title>
        <meta
          property={"og:title"}
          content={"@time-stamp - your hand crafter time analysis :)"}
        />
        <meta
          property="og:image"
          content={
            "https://user-images.githubusercontent.com/54087826/145572545-2b84f8a2-9c31-4dfe-bfc8-4a69580336ea.png"
          }
        />
      </Head>
      <VStack alignItems="left">
        <Heading textAlign="center">Your time analytics</Heading>
        <AnalyticsComponent {...data} />
        <HighchartsReact
          highcharts={Highcharts}
          options={chartOptionsCreator(
            data,
            createCategoriesSpline,
            createDataSpline,
            "spline",
            7
          )}
        />
        <HighchartsReact
          highcharts={Highcharts}
          options={chartOptionsCreator(
            data,
            createCategoriesColumn,
            createDataColumn,
            "column",
            null,
            "",
            ""
          )}
        />
        <Analytics360TagTable data={data} />
      </VStack>{" "}
    </>
  );
}
