import { useSelector } from "react-redux";
import Chart from "react-apexcharts";

function ExpenseChart() {
  const income = useSelector(
    (state) => state.expenseTracker.income
  );

  const expenses = useSelector(
    (state) => state.expenseTracker.expenses
  );

  const totalIncome = income.reduce(
    (total, item) => total + item.amount,
    0
  );

  const totalExpenses = expenses.reduce(
    (total, item) => total + item.amount,
    0
  );

  const options = {
    chart: {
      height: 350,
      type: "bar",
      toolbar: {
        show: true,
      },
    },

    plotOptions: {
      bar: {
        borderRadius: 10,
        dataLabels: {
          position: "top",
        },
      },
    },

    colors: ["#16a34a", "#dc2626"],

    dataLabels: {
      enabled: true,
      formatter: function (val) {
        return "Rs. " + Number(val).toLocaleString();
      },
      offsetY: -20,
      style: {
        fontSize: "12px",
        colors: ["#304758"],
      },
    },

    xaxis: {
      categories: ["Income", "Expenses"],
      position: "bottom",

      axisBorder: {
        show: false,
      },

      axisTicks: {
        show: false,
      },

      crosshairs: {
        fill: {
          type: "gradient",
          gradient: {
            colorFrom: "#D8E3F0",
            colorTo: "#BED1E6",
            stops: [0, 100],
            opacityFrom: 0.4,
            opacityTo: 0.5,
          },
        },
      },

      tooltip: {
        enabled: true,
      },
    },

    yaxis: {
      axisBorder: {
        show: false,
      },

      axisTicks: {
        show: false,
      },

      labels: {
        formatter: function (val) {
          return "Rs. " + Number(val).toLocaleString();
        },
      },
    },

    tooltip: {
      y: {
        formatter: function (val) {
          return "Rs. " + Number(val).toLocaleString();
        },
      },
    },

    title: {
      text: "Income vs Expenses",
      floating: true,
      offsetY: 0,
      align: "center",
      style: {
        color: "#444",
      },
    },
  };

  const series = [
    {
      name: "Amount",
      data: [totalIncome, totalExpenses],
    },
  ];

  return (
    <div className="mt-8 rounded-2xl bg-white p-5 shadow-lg">
      {totalIncome === 0 && totalExpenses === 0 ? (
        <p className="py-10 text-center text-gray-500">
          Add income or expenses to see the chart
        </p>
      ) : (
        <div className="w-full">
          <Chart
            options={options}
            series={series}
            type="bar"
            height={350}
            width="100%"
          />
        </div>
      )}
    </div>
  );
}

export default ExpenseChart;