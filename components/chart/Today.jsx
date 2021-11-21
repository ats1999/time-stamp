import { useState, useEffect } from "react";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";
import axios from "axios";

export default function Today() {
  const [data, setData] = useState([]);
  useEffect(() => {
    axios
      .get("/api/timer")
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const chartOptions = {
    chart: {
      type: "column", //'spline',
      height: 250,
      panning: true,
      followTouchMove: true,
    },
    credits: {
      enabled: false,
    },
    plotOptions: {
      treemap: {
        dataLabels: {
          formatter: function (data) {
            console.log(this, data);
          },
        },
      },
    },
    title: {
      text: "Today's uses",
    },
    subtitle: {
      text: "",
    },
    xAxis: {
      min: 0,
      max: 7,
      categories: data.map((d) => d.tag),
    },
    yAxis: {
      title: {
        text: "Hours",
      },
      labels: {
        formatter: function () {
          return this.value;
        },
      },
    },
    tooltip: {
      formatter: function () {
        return this.y;
      },
    },
    series: [
      {
        name: "Today's uses",
        pointWidth: 30,
        marker: {
          symbol: "square",
        },
        data: data.map((d) =>
          parseFloat((d.time / (1000 * 60 * 60)).toFixed(2))
        ),
      },
    ],
  };
  return <HighchartsReact highcharts={Highcharts} options={chartOptions} />;
}
