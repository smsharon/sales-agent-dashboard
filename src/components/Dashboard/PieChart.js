import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

function PieChart({ title, target, achieved }) {
  const remaining = target - achieved;
  const data = {
    labels: ['Target Achieved', 'Remaining Target'],
    datasets: [
      {
        label: 'Signups',
        data: [achieved, remaining > 0 ? remaining : 0],
        backgroundColor: ['#4caf50', '#f44336'],
        hoverOffset: 4,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      tooltip: {
        callbacks: {
          label: function (context) {
            let label = context.label || '';
            if (label) {
              label += ': ';
            }
            label += Math.round(context.raw);
            return label;
          },
        },
      },
      legend: {
        display: true,
        position: 'bottom',
      },
    },
  };

  return (
    <div className="chart-container">
      <h3 style={{ textAlign: 'center' }}>{title}</h3>
      <Pie data={data} options={options} />
    </div>
  );
}

export default PieChart;
