// chart.js
export function renderDonutChart(income, expense) {
  const canvas = document.getElementById("donut-chart");
  const ctx = canvas.getContext("2d");

  const total = income + expense;

  const incomeAngle = (income / total) * Math.PI * 2;
  const expenseAngle = (expense / total) * Math.PI * 2;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Expense
  ctx.beginPath();
  ctx.strokeStyle = "#ff5a79";
  ctx.lineWidth = 18;
  ctx.arc(100, 100, 60, 0, expenseAngle);
  ctx.stroke();

  // Income
  ctx.beginPath();
  ctx.strokeStyle = "#4ade80";
  ctx.arc(100, 100, 60, expenseAngle, expenseAngle + incomeAngle);
  ctx.stroke();
}

// Initial rendering on script load