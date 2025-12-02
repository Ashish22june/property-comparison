import React from 'react';

const BreakdownChart = ({ properties, exitPrices, profits }) => {
  if (!profits || profits.length === 0) {
    return (
      <div className="text-center p-4">
        <h5>Investment Breakdown</h5>
        <p className="text-muted">Chart data loading...</p>
      </div>
    );
  }

  return (
    <div>
      <h5 className="text-center mb-4">Investment vs Return Breakdown</h5>
      
      {properties.map((property, propIndex) => (
        <div key={property.id} className="mb-4">
          <h6 className="text-center mb-3">
            {property.name}
            {property.isHighlighted && <span className="ms-1">⭐</span>}
          </h6>
          
          {exitPrices.map((exitPrice, index) => {
            const profit = profits[propIndex]?.[index];
            if (!profit) return null;
            
            const cashInvested = parseFloat(profit.cashInvested);
            const netProfit = parseFloat(profit.netProfit);
            const totalValue = cashInvested + netProfit;
            
            return (
              <div key={exitPrice} className="mb-3">
                <div className="d-flex justify-content-between mb-1">
                  <small className="fw-bold">₹{exitPrice}/sq.ft</small>
                  <small>Total: ₹{totalValue.toFixed(2)}L</small>
                </div>
                
                <div className="progress" style={{ height: '20px' }}>
                  <div 
                    className="progress-bar bg-warning" 
                    style={{ width: `${(cashInvested / totalValue) * 100}%` }}
                    title={`Cash Invested: ₹${cashInvested}L`}
                  >
                    <small>₹{cashInvested}L</small>
                  </div>
                  <div 
                    className="progress-bar bg-success" 
                    style={{ width: `${(netProfit / totalValue) * 100}%` }}
                    title={`Net Profit: ₹${netProfit.toFixed(2)}L`}
                  >
                    <small>₹{netProfit.toFixed(2)}L</small>
                  </div>
                </div>
                
                <div className="d-flex justify-content-between mt-1">
                  <small className="text-warning">Invested</small>
                  <small className="text-success">Profit</small>
                </div>
              </div>
            );
          })}
        </div>
      ))}
      
      <div className="legend mt-4 text-center">
        <div className="d-inline-flex gap-3">
          <div className="d-flex align-items-center">
            <div className="bg-warning me-2" style={{ width: '15px', height: '15px' }}></div>
            <small>Cash Invested</small>
          </div>
          <div className="d-flex align-items-center">
            <div className="bg-success me-2" style={{ width: '15px', height: '15px' }}></div>
            <small>Net Profit</small>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BreakdownChart;