import React from 'react';

export function HealthIndicators({ data }) {
  const monthlyNetCashFlow = data.inflows - data.outflows - data.debtPayment;
  const burnRate = data.outflows + data.debtPayment;
  const runway = data.cashBalance / burnRate;
  const liquidityRatio = data.cashBalance / data.dailyVolume;

  return (
    <div>
      <div className={`alert ${monthlyNetCashFlow >= 0 ? 'alert-success' : 'alert-warning'}`}>
        <strong>Monthly Net Cash Flow:</strong> ${monthlyNetCashFlow.toLocaleString()}
      </div>
      <div className={`alert ${runway >= 6 ? 'alert-success' : 'alert-warning'}`}>
        <strong>Cash Runway:</strong> {runway.toFixed(1)} months
      </div>
      <div className={`alert ${liquidityRatio >= 30 ? 'alert-success' : 'alert-warning'}`}>
        <strong>Liquidity Ratio:</strong> {liquidityRatio.toFixed(1)} days
      </div>
    </div>
  );
}
