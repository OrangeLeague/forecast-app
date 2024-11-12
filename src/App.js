import React, { useState } from 'react';
import { CashFlowForm } from './components/CashFlowForm';
import { Dashboard } from './components/Dashboard';
import './App.css';

function App() {
  const [formData, setFormData] = useState(null);

  const handleFormSubmit = (data) => {
    setFormData(data);
  };

  return (
    <div className="container">
      <header className="header">
        <h1>FinFlow - Smart Cash Flow Management</h1>
        <p>Optimize your financial operations with AI-powered insights</p>
      </header>
      <CashFlowForm onSubmit={handleFormSubmit} />
      <Dashboard data={formData} />
    </div>
  );
}

export default App;
