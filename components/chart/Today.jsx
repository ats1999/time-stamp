import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";

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
  title: {
    text: "Today's uses",
  },
  subtitle: {
    text: "",
  },
  xAxis: {
    min: 0,
    max: 7,
    categories: ["react", "node", "etc"],
  },
  yAxis: {
    title: {
      text: "",
    },
    labels: {
      formatter: function () {
        return this.value;
      },
    },
  },
  tooltip: {
    formatter:function(){
        return this.y
    }
  },
  series: [
    {
      name: "Today's uses",
      pointWidth: 30,
      marker: {
        symbol: "square",
      },
      data: [10, 50, 60],
    },
  ],
};

export default function Today() {
  return <HighchartsReact highcharts={Highcharts} options={chartOptions} />;
}
