import React from 'react';

const ProfitChart = ({ properties, exitPrices, profits }) => {
  if (!profits || profits.length === 0) {
    return (
      <div className="text-center p-4">
        <h5>Profit Comparison Chart</h5>
        <p className="text-muted">Chart data loading...</p>
      </div>
    );
  }

  // Simple bar chart using Bootstrap progress bars
  return (
    <div>
      <h5 className="text-center mb-4">Profit Comparison by Exit Price</h5>
      <div className="chart-container">
        {exitPrices.map((exitPrice, index) => {
          const profit1 = profits[0]?.[index] ? parseFloat(profits[0][index].netProfit) : 0;
          const profit2 = profits[1]?.[index] ? parseFloat(profits[1][index].netProfit) : 0;
          const maxProfit = Math.max(profit1, profit2, 1);
          
          return (
            <div key={exitPrice} className="mb-4">
              <div className="d-flex justify-content-between mb-2">
                <span className="fw-bold">₹{exitPrice}/sq.ft</span>
                <small className="text-muted">
                  Flat 1: ₹{profit1.toFixed(2)}L | Flat 2: ₹{profit2.toFixed(2)}L
                </small>
              </div>
              
              <div className="progress mb-2" style={{ height: '25px' }}>
                <div 
                  className="progress-bar bg-primary" 
                  style={{ width: `${(profit1 / maxProfit) * 100}%` }}
                  title={`Flat 1: ₹${profit1.toFixed(2)}L`}
                >
                  <small>Flat 1: ₹{profit1.toFixed(2)}L</small>
                </div>
              </div>
              
              <div className="progress" style={{ height: '25px' }}>
                <div 
                  className="progress-bar bg-success" 
                  style={{ width: `${(profit2 / maxProfit) * 100}%` }}
                  title={`Flat 2: ₹${profit2.toFixed(2)}L`}
                >
                  <small>Flat 2: ₹{profit2.toFixed(2)}L</small>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      
      <div className="legend mt-4 text-center">
        <div className="d-inline-flex gap-3">
          <div className="d-flex align-items-center">
            <div className="bg-primary me-2" style={{ width: '15px', height: '15px' }}></div>
            <small>Flat 1</small>
          </div>
          <div className="d-flex align-items-center">
            <div className="bg-success me-2" style={{ width: '15px', height: '15px' }}></div>
            <small>Flat 2</small>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfitChart;