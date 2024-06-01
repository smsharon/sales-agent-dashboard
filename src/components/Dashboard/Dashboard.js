import React from 'react';
import TopCardMetrics from './TopCardMetric';
import UpcomingInvoices from './UpcomingInvoices';
import './Dashboard.css';

function Dashboard() {
  return (
    <div className="dashboard">
      <TopCardMetrics />
      <UpcomingInvoices />
    </div>
  );
}

export default Dashboard;
