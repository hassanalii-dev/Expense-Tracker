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

  const chartColors =
    totalIncome < totalExpenses
      ? ["#16a34a", "#dc2626"]
      : ["#16a34b", "#16a34a"];

  const options = {
    chart: {
      type: "bar",
      toolbar: {
        show: true,
      },
      animations: {
        enabled: true,
        easing: "easeinout",
        speed: 600,
      },
    },

    plotOptions: {
      bar: {
        borderRadius: 8,
        columnWidth: "40%",
        distributed: true,
        dataLabels: {
          position: "top",
        },
      },
    },

    colors: chartColors,

    dataLabels: {
      enabled: true,
      formatter: function (value) {
        return "Rs. " + Number(value).toLocaleString();
      },
      offsetY: -20,
      style: {
        fontSize: "12px",
        colors: ["#374151"],
      },
    },

    xaxis: {
      categories: ["Income", "Expenses"],
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
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
        formatter: function (value) {
          return "Rs. " + Number(value).toLocaleString();
        },
      },
    },

    tooltip: {
      y: {
        formatter: function (value) {
          return "Rs. " + Number(value).toLocaleString();
        },
      },
    },

    title: {
      text: "Income vs Expenses",
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
    <div className="mt-6 rounded-2xl bg-white p-3 shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl sm:mt-8 sm:p-5">
      {totalIncome === 0 && totalExpenses === 0 ? (
        <p className="py-10 text-center text-sm text-gray-500 sm:text-base">
          Add income or expenses to see the chart
        </p>
      ) : (
        <div className="w-full overflow-hidden">
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