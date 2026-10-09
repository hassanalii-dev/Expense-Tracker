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

  const categories = [
    "Food",
    "Rent",
    "Clothes",
    "Transport",
    "Bills",
  ];

  const categoryTotals = categories.map((category) => {
    return expenses
      .filter((item) => item.category === category)
      .reduce((total, item) => total + item.amount, 0);
  });

  const options = {
    chart: {
      type: "bar",
      toolbar: {
        show: false,
      },
      animations: {
        enabled: true,
        easing: "easeinout",
        speed: 600,
      },
      background: "transparent",
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

    colors: [
      "#f97316", // Orange
      "#3b82f6", // Blue
      "#ec4899", // Pink
      "#8b5cf6", // Purple
      "#eab308", // Yellow
    ],

    dataLabels: {
      enabled: true,
      formatter: function (value) {
        return "Rs. " + Number(value).toLocaleString();
      },
      offsetY: -20,
      style: {
        fontSize: "12px",
        colors: ["#94a3b8"],
      },
    },

    xaxis: {
      categories: categories,
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      labels: {
        style: {
          fontSize: "12px",
          colors: "#94a3b8",
        },
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
        style: {
          colors: "#94a3b8",
        },
        formatter: function (value) {
          return "Rs. " + Number(value).toLocaleString();
        },
      },
    },

    grid: {
      borderColor: "#1e293b",
    },

    tooltip: {
      theme: "dark",
      y: {
        formatter: function (value) {
          return "Rs. " + Number(value).toLocaleString();
        },
      },
    },

    title: {
      text: "Expenses by Category",
      align: "center",
      style: {
        color: "#f1f5f9",
        fontSize: "16px",
        fontWeight: "600",
      },
    },

    legend: {
      show: false,
    },

    responsive: [
      {
        breakpoint: 640,
        options: {
          chart: {
            height: 300,
          },
          dataLabels: {
            style: {
              fontSize: "10px",
            },
          },
        },
      },
    ],
  };

  const series = [
    {
      name: "Expense",
      data: categoryTotals,
    },
  ];

  return (
    <div className="mt-6 w-full min-w-0 rounded-2xl border border-slate-800 bg-slate-900 p-2 shadow-xl transition-all duration-300 sm:mt-8 sm:p-5">
      {totalIncome === 0 && totalExpenses === 0 ? (
        <p className="py-10 text-center text-sm text-slate-500 sm:text-base">
          Add income or expenses to see the chart
        </p>
      ) : (
        <div className="w-full min-w-0 overflow-hidden">
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