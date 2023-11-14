import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Chart = () => {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "차트 연습",
      },
    },
  };

  const labels = ["1월", "3월", "5월", "7월", "9월", "11월"];

  const data = {
    labels,
    datasets: [
      {
        label: "다홍",
        data: [10, 20, 30, 40, 50, 60, 70],
        borderColor: "rgb(255, 99, 100)",
        backgroundColor: "rgba(255, 99, 100, 0.5)",
      },
      {
        label: "연두",
        data: [2, 3, 4, 5, 4, 7, 8],
        borderColor: "rgb(53, 162, 100)",
        backgroundColor: "rgba(53, 162,100, 0.5)",
      },
    ],
  };
  return (
    <>
      <Line options={options} data={data} />
    </>
  );
};

export default Chart;
