import React from 'react';
import { Bar } from 'react-chartjs-2';

function SignupsOverview({ data }) {
  // Prepare data for each product's sign-ups in different school types
  const analyticsData = prepareChartData(data, 'Zeraki Analytics');
  const financeData = prepareChartData(data, 'Zeraki Finance');
  const timetableData = prepareChartData(data, 'Zeraki Timetable');

  // Function to prepare chart data for a specific product
  function prepareChartData(data, product) {
    const productData = data.signupsOverview.find(item => item.product === product);
    if (!productData) return { labels: [], datasets: [] };

    return {
      labels: Object.keys(productData).filter(key => key !== 'product'),
      datasets: [
        {
          label: product,
          data: Object.values(productData).filter(value => typeof value === 'number'),
          backgroundColor: generateColors(Object.keys(productData).length - 1), // Generate colors for bars
        },
      ],
    };
  }

  // Function to generate random colors for bars
  function generateColors(count) {
    // Generate random colors using hex codes
    const colors = [];
    for (let i = 0; i < count; i++) {
      colors.push('#' + Math.floor(Math.random()*16777215).toString(16));
    }
    return colors;
  }

  // Bar graph options
  const options = {
    responsive: true,
    indexAxis: 'y',
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
      tooltip: {
        mode: 'index',
        intersect: false,
      },
    },
  };

  return (
    <div className="signups-overview">
      <div className="chart">
        <h2>Zeraki Analytics Signups</h2>
        <Bar data={analyticsData} options={options} />
      </div>
      <div className="chart">
        <h2>Zeraki Finance Signups</h2>
        <Bar data={financeData} options={options} />
      </div>
      <div className="chart">
        <h2>Zeraki Timetable Signups</h2>
        <Bar data={timetableData} options={options} />
      </div>
    </div>
  );
}

export default SignupsOverview;
