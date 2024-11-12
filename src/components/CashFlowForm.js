import React, { useState } from 'react';

export function CashFlowForm({ onSubmit }) {
  const [formValues, setFormValues] = useState({
    dailyVolume: '',
    cashBalance: '',
    inflows: '',
    outflows: '',
    debtPayment: '',
    investmentPlans: ''
  });

  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.id]: parseFloat(e.target.value) || '' });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formValues);
  };

  return (
    <div className="form-container">
      <h2>Enter Your Financial Data</h2>
      <form onSubmit={handleSubmit}>
        {['dailyVolume', 'cashBalance', 'inflows', 'outflows', 'debtPayment', 'investmentPlans'].map(field => (
          <div className="input-group" key={field}>
            <label htmlFor={field}>{field.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())} ($)</label>
            <input type="number" id={field} value={formValues[field]} onChange={handleChange} required min="0" step="0.01" />
          </div>
        ))}
        <button type="submit" className="btn">Generate Forecast</button>
      </form>
    </div>
  );
}
