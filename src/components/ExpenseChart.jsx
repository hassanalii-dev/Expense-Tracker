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

    colors: [
      "#f97316",
      "#3b82f6",
      "#ec4899",
      "#8b5cf6",
      "#eab308",
    ],

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
      text: "Expenses by Category",
      align: "center",
      style: {
        color: "#444",
      },
    },

    responsive: [
      {
        breakpoint: 640,
        options: {
          chart: {
            height: 300,
          },
          plotOptions: {
            bar: {
              borderRadius: 6,
              columnWidth: "45%",
            },
          },
          dataLabels: {
            enabled: true,
            offsetY: -18,
            style: {
              fontSize: "10px",
            },
          },
          xaxis: {
            labels: {
              style: {
                fontSize: "10px",
              },
            },
          },
          yaxis: {
            labels: {
              style: {
                fontSize: "9px",
              },
            },
          },
        },
      },
      {
        breakpoint: 400,
        options: {
          chart: {
            height: 270,
          },
          plotOptions: {
            bar: {
              borderRadius: 5,
              columnWidth: "50%",
            },
          },
          dataLabels: {
            enabled: false,
          },
          xaxis: {
            labels: {
              rotate: -45,
              style: {
                fontSize: "9px",
              },
            },
          },
          yaxis: {
            labels: {
              style: {
                fontSize: "8px",
              },
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
    <div className="mt-6 w-full min-w-0 rounded-2xl bg-white p-2 shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl sm:mt-8 sm:p-5">
      {totalIncome === 0 && totalExpenses === 0 ? (
        <p className="py-10 text-center text-sm text-gray-500 sm:text-base">
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