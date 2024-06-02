import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { formatNumber } from './utils'; 
import { Tooltip, BarChart, Bar, XAxis, YAxis, Legend, ResponsiveContainer, Cell } from 'recharts';
import PieChart from './PieChart'; 
import './TopCardMetrics.css';

function TopCardMetrics() {
  const [data, setData] = useState({
    collections: 0,
    signups: 0,
    revenue: 0,
    bouncedCheques: 0,
    targets: [],
    signupsOverview: [],
    upcomingInvoices: [],
    products: {
      zerakiAnalytics: { signups: 0, revenue: 0, target: 200 },
      zerakiFinance: { signups: 0, revenue: 0, target: 150 },
      zerakiTimetable: { signups: 0, revenue: 0, target: 100 }
    }
  });

  useEffect(() => {
    axios.get('https://json-dashboard.vercel.app/data')
      .then(response => setData(response.data));
  }, []);

  return (
    <div className="top-card-metrics-container">
      <div className="top-card-metrics">
        <div className="card">
          <h3>Collections</h3>
          <p><strong className="bold">{data.collections}</strong></p>
        </div>

        <div className="card">
          <h3>Signups</h3>
          <p>Total:</p>
          <p><strong className="bold">{data.signups}</strong></p>
          <div>
            <small>Zeraki Analytics: {data.products.zerakiAnalytics.signups}</small><br />
            <small>Zeraki Finance: {data.products.zerakiFinance.signups}</small><br />
            <small>Zeraki Timetable: {data.products.zerakiTimetable.signups}</small>
          </div>
        </div>

        <div className="card">
          <h3>Revenue</h3>
          <p>Total Revenue:</p>
          <p><strong className="bold">{formatNumber(data.revenue)}</strong></p>
          <div>
            <small>Zeraki Analytics: {formatNumber(data.products.zerakiAnalytics.revenue)}</small><br />
            <small>Zeraki Finance: {formatNumber(data.products.zerakiFinance.revenue)}</small><br />
            <small>Zeraki Timetable: {formatNumber(data.products.zerakiTimetable.revenue)}</small>
          </div>
        </div>

        <div className="card">
          <h3>Bounced Cheques</h3>
          <p><strong className="bold">{data.bouncedCheques}</strong></p>
        </div>
      </div>
      <div className="charts-container">
        
        <div className="chart-card">
          <h3>Product Signups</h3>
          <div className="pie-charts">
            <PieChart title="Zeraki Analytics" target={data.products.zerakiAnalytics.target} achieved={data.products.zerakiAnalytics.signups} />
            <PieChart title="Zeraki Finance" target={data.products.zerakiFinance.target} achieved={data.products.zerakiFinance.signups} />
            <PieChart title="Zeraki Timetable" target={data.products.zerakiTimetable.target} achieved={data.products.zerakiTimetable.signups} />
          </div>
        </div>

        
        <div className="chart-card">
          <h3>Signups by School Type</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data.signupsOverview}>
              
              <XAxis dataKey="schoolType" />
              <YAxis />
              <Legend />
              <Tooltip contentStyle={{ backgroundColor: '#fff', border: '1px solid #ccc' }} />
              <Bar dataKey="Zeraki Analytics" fill="#8884d8">
                {
                  data.signupsOverview.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill="#8884d8"
                      onMouseEnter={(e) => e.target.style.opacity = 0.8}
                      onMouseLeave={(e) => e.target.style.opacity = 1}
                    />
                  ))
                }
              </Bar>
              <Bar dataKey="Zeraki Finance" fill="#82ca9d">
                {
                  data.signupsOverview.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill="#82ca9d"
                      onMouseEnter={(e) => e.target.style.opacity = 0.8}
                      onMouseLeave={(e) => e.target.style.opacity = 1}
                    />
                  ))
                }
              </Bar>
              <Bar dataKey="Zeraki Timetable" fill="#ffc658">
                {
                  data.signupsOverview.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill="#ffc658"
                      onMouseEnter={(e) => e.target.style.opacity = 0.8}
                      onMouseLeave={(e) => e.target.style.opacity = 1}
                    />
                  ))
                }
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

export default TopCardMetrics;