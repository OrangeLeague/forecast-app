import React, { useEffect, useRef } from 'react';
import { HealthIndicators } from './HealthIndicators';
import Chart from 'chart.js/auto';

export function Dashboard({ data }) {
  const chartRef = useRef(null); // Ref to store the canvas element
  const forecastChartRef = useRef(null); // Ref to store the Chart instance

  useEffect(() => {
    if (data) {
      const ctx = chartRef.current.getContext('2d');
      const months = ['Month 1', 'Month 2', 'Month 3', 'Month 4', 'Month 5', 'Month 6'];

      const projectedBalance = months.map((_, index) => (
        data.cashBalance + (data.inflows - data.outflows - data.debtPayment) * (index + 1) - (data.investmentPlans / 6) * (index + 1)
      ));

      // Destroy existing chart instance if it exists
      if (forecastChartRef.current) {
        forecastChartRef.current.destroy();
      }

      // Create a new chart instance and store it in the ref
      forecastChartRef.current = new Chart(ctx, {
        type: 'line',
        data: {
          labels: months,
          datasets: [{
            label: 'Projected Cash Balance',
            data: projectedBalance,
            borderColor: '#2a3b8f',
            backgroundColor: 'rgba(42, 59, 143, 0.1)',
            fill: true
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: { beginAtZero: true }
          }
        }
      });
    }

    // Cleanup function to destroy the chart instance on unmount
    return () => {
      if (forecastChartRef.current) {
        forecastChartRef.current.destroy();
      }
    };
  }, [data]);

  if (!data) return null;

  return (
    <div className="dashboard">
      <div className="card">
        <h3>Cash Flow Forecast</h3>
        <div className="chart-container">
          <canvas ref={chartRef} id="forecastChart"></canvas>
        </div>
      </div>
      <div className="card">
        <h3>Financial Health Indicators</h3>
        <HealthIndicators data={data} />
      </div>
    </div>
  );
}
