import React from 'react';

const KeyInsights = ({ 
  properties, 
  profits, 
  profitDifferences,
  detailedBreakdown 
}) => {
  if (!detailedBreakdown) return null;

  const formatLakhs = (value) => `₹${(value / 100000).toFixed(2)}L`;

  return (
    <div className="glass-card">
      <div className="card-header bg-gradient-success text-white">
        <h5 className="mb-0">
          <i className="bi bi-lightbulb-fill me-2"></i>
          Key Financial Insights
        </h5>
      </div>
      <div className="card-body">
        <div className="row g-4">
          <div className="col-md-6">
            <div className="p-3 bg-light rounded h-100">
              <h6 className="text-muted mb-3">Quick Summary</h6>
              <ul className="list-unstyled">
                <li className="mb-2">
                  <i className="bi bi-check-circle-fill text-success me-2"></i>
                  <strong>Home Loan EMI:</strong> ₹{Math.round(detailedBreakdown.homeLoanEMI).toLocaleString()}/month
                </li>
                <li className="mb-2">
                  <i className="bi bi-check-circle-fill text-success me-2"></i>
                  <strong>Each Personal Loan EMI:</strong> ₹{Math.round(detailedBreakdown.personalLoanEMI).toLocaleString()}/month
                </li>
                <li className="mb-2">
                  <i className="bi bi-check-circle-fill text-success me-2"></i>
                  <strong>Total Outstanding after 3 years:</strong> {formatLakhs(detailedBreakdown.totalLoanOutstanding)}
                </li>
                <li className="mb-2">
                  <i className="bi bi-check-circle-fill text-success me-2"></i>
                  <strong>Total Interest Paid (3 years):</strong> {formatLakhs(detailedBreakdown.totalInterestPaid)}
                </li>
              </ul>
            </div>
          </div>
          <div className="col-md-6">
            <div className="p-3 bg-light rounded h-100">
              <h6 className="text-muted mb-3">Recommendations</h6>
              <div className="alert alert-success">
                <i className="bi bi-trophy-fill me-2"></i>
                <strong>Sell after 3 years</strong> for optimal returns
              </div>
              <div className="alert alert-info">
                <i className="bi bi-info-circle-fill me-2"></i>
                Consider refinancing if interest rates drop by 1% or more
              </div>
              <div className="alert alert-warning">
                <i className="bi bi-exclamation-triangle-fill me-2"></i>
                Ensure you can handle monthly EMI of ₹{(detailedBreakdown.homeLoanEMI + (detailedBreakdown.personalLoanEMI * 2)).toLocaleString('en-IN', { maximumFractionDigits: 0 })}/month
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KeyInsights;