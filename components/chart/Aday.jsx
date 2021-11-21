import { useState, useEffect } from "react";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";
import axios from "axios";

export default function Today({ date }) {
  const [data, setData] = useState([]);
  useEffect(() => {
    axios
      .get(`/api/timer?date=${date?.split("-").reverse().join("/")}`)
      .then((res) => {
        setData(res.data);

        // if the data is empty and the date is current date, then show alert
        if (
          res.data.length == 0 &&
          date != new Date().toLocaleDateString().split("/").reverse().join("-")
        )
          alert("There is no data on date selected date");
      })
      .catch((err) => {
        console.log(err);
      });
  }, [date]);

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
      text: `${
        date?.split("-").reverse().join("/") == new Date().toLocaleDateString()
          ? "Today's"
          : date?.split("-").reverse().join("/")
      } stats`,
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
        name: `${
          date?.split("-").reverse().join("/") ==
          new Date().toLocaleDateString()
            ? "Today's"
            : date?.split("-").reverse().join("/")
        } stats`,
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
