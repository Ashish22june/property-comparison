import React from 'react';

const ScenarioCard = ({ property, exitPrice, profitData, isHighlighted }) => {
  if (!profitData) {
    return (
      <div className="glass-card">
        <div className="card-body text-center p-4">
          <div className="spinner-border text-primary mb-3" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="text-muted mb-0">Calculating scenario...</p>
        </div>
      </div>
    );
  }

  const profitValue = parseFloat(profitData.netProfit);
  const roiValue = parseInt(profitData.roi);
  
  // Determine profit level for styling
  const getProfitLevel = () => {
    if (profitValue > 15) return 'high';
    if (profitValue > 5) return 'medium';
    return 'low';
  };

  const getROILevel = () => {
    if (roiValue > 100) return 'high';
    if (roiValue > 50) return 'medium';
    return 'low';
  };

  const profitLevel = getProfitLevel();
  const roiLevel = getROILevel();

  const profitColors = {
    high: 'bg-success',
    medium: 'bg-warning',
    low: 'bg-danger'
  };

  const roiColors = {
    high: 'text-success',
    medium: 'text-warning',
    low: 'text-danger'
  };

  return (
    <div className="glass-card hover-lift">
      <div className="card-header bg-light d-flex justify-content-between align-items-center">
        <div>
          <span className="badge bg-primary me-2">
            <i className="bi bi-currency-rupee me-1"></i>
            {exitPrice}/sq.ft
          </span>
          <small className="text-muted">Exit Scenario</small>
        </div>
        <div className={`status-badge ${profitColors[profitLevel]} text-white`}>
          <i className="bi bi-arrow-up-right me-1"></i>
          {profitLevel.toUpperCase()} PROFIT
        </div>
      </div>
      <div className="card-body">
        <div className="row g-3">
          <div className="col-6">
            <div className="text-center p-3 rounded-3 bg-primary bg-opacity-10">
              <div className="text-primary mb-2">
                <i className="bi bi-cash-coin fs-3"></i>
              </div>
              <div>
                <small className="text-muted d-block">Sale Value</small>
                <h5 className="fw-bold mb-0">₹{profitData.saleValue}L</h5>
              </div>
            </div>
          </div>
          <div className="col-6">
            <div className="text-center p-3 rounded-3 bg-success bg-opacity-10">
              <div className="text-success mb-2">
                <i className="bi bi-graph-up-arrow fs-3"></i>
              </div>
              <div>
                <small className="text-muted d-block">Net Profit</small>
                <h5 className={`fw-bold mb-0 ${profitColors[profitLevel].replace('bg-', 'text-')}`}>
                  ₹{profitData.netProfit}L
                </h5>
              </div>
            </div>
          </div>
          <div className="col-6">
            <div className="text-center p-3 rounded-3 bg-info bg-opacity-10">
              <div className="text-info mb-2">
                <i className="bi bi-percent fs-3"></i>
              </div>
              <div>
                <small className="text-muted d-block">ROI</small>
                <h5 className={`fw-bold mb-0 ${roiColors[roiLevel]}`}>
                  {profitData.roi}
                </h5>
              </div>
            </div>
          </div>
          <div className="col-6">
            <div className="text-center p-3 rounded-3 bg-warning bg-opacity-10">
              <div className="text-warning mb-2">
                <i className="bi bi-arrow-up-right fs-3"></i>
              </div>
              <div>
                <small className="text-muted d-block">Appreciation</small>
                <h5 className="fw-bold text-warning mb-0">
                  {profitData.appreciation}
                </h5>
              </div>
            </div>
          </div>
        </div>
        
        {/* Progress Bar */}
        <div className="mt-4">
          <div className="d-flex justify-content-between mb-2">
            <small className="text-muted">Profit Achievement</small>
            <small className="fw-bold">{profitValue > 0 ? 'Excellent' : 'Review'}</small>
          </div>
          <div className="progress custom-progress">
            <div 
              className={`progress-bar ${profitColors[profitLevel]} custom-progress-bar`}
              style={{ width: `${Math.min(profitValue * 5, 100)}%` }}
              role="progressbar"
            >
              <small className="px-2">{Math.min(profitValue * 5, 100).toFixed(0)}%</small>
            </div>
          </div>
        </div>
      </div>
      
      {isHighlighted && (
        <div className="card-footer bg-success bg-opacity-10 text-center">
          <small className="text-success">
            <i className="bi bi-star-fill me-1"></i>
            Recommended Investment Scenario
          </small>
        </div>
      )}
    </div>
  );
};

export default ScenarioCard;