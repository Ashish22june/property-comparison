import React from 'react';

const DetailedBreakdown = ({ 
  detailedBreakdown, 
  selectedProperty,
  userSelections,
  onUpdateSelections 
}) => {
  if (!detailedBreakdown || !selectedProperty) {
    return (
      <div className="glass-card mb-4">
        <div className="card-body text-center">
          <p className="text-muted">Loading detailed calculations...</p>
        </div>
      </div>
    );
  }

  const formatLakhs = (value) => `₹${(value / 100000).toFixed(2)}L`;
  const formatCurrency = (value) => `₹${Math.round(value).toLocaleString()}`;

  return (
    <div className="glass-card mb-4">
      <div className="card-header bg-gradient-info text-white">
        <h5 className="mb-0">
          <i className="bi bi-calculator me-2"></i>
          Detailed Financial Breakdown - {selectedProperty.name}
        </h5>
      </div>
      <div className="card-body">
        {/* Selection Controls */}
        <div className="row mb-4">
          <div className="col-md-4">
            <label className="form-label">Property</label>
            <select 
              className="form-select"
              value={userSelections.selectedPropertyId}
              onChange={(e) => onUpdateSelections('selectedPropertyId', parseInt(e.target.value))}
            >
              {selectedProperty && (
                <option value={selectedProperty.id}>{selectedProperty.name}</option>
              )}
            </select>
          </div>
          <div className="col-md-4">
            <label className="form-label">Exit Price (₹/sq.ft)</label>
            <input 
              type="number" 
              className="form-control"
              value={userSelections.selectedExitPrice}
              onChange={(e) => onUpdateSelections('selectedExitPrice', parseFloat(e.target.value))}
            />
          </div>
          <div className="col-md-4">
            <label className="form-label">Holding Period</label>
            <select 
              className="form-select"
              value={userSelections.selectedYears}
              onChange={(e) => onUpdateSelections('selectedYears', parseInt(e.target.value))}
            >
              <option value={3}>3 Years (36 months)</option>
              <option value={4}>4 Years (48 months)</option>
              <option value={5}>5 Years (60 months)</option>
            </select>
          </div>
        </div>

        {/* EMI Information Section */}
        <div className="row mb-4">
          <div className="col-md-12">
            <div className="p-3 bg-light rounded">
              <h6 className="text-muted mb-3">
                <i className="bi bi-cash-coin me-2"></i>
                EMI Information
              </h6>
              <div className="row g-3">
                <div className="col-md-4">
                  <div className="p-3 bg-white rounded text-center">
                    <small className="text-muted">Home Loan EMI</small>
                    <div className="fw-bold text-primary fs-4">
                      {formatCurrency(detailedBreakdown.homeLoanEMI)}<small>/month</small>
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="p-3 bg-white rounded text-center">
                    <small className="text-muted">Personal Loan EMI (each)</small>
                    <div className="fw-bold text-warning fs-4">
                      {formatCurrency(detailedBreakdown.personalLoanEMI)}<small>/month</small>
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="p-3 bg-white rounded text-center bg-primary text-white">
                    <small className="text-white">Total EMI (both PLs running)</small>
                    <div className="fw-bold fs-4">
                      {formatCurrency(detailedBreakdown.homeLoanEMI + (detailedBreakdown.personalLoanEMI * 2))}<small>/month</small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Interest Paid Section */}
        <div className="row mb-4">
          <div className="col-md-12">
            <div className="p-3 bg-light rounded">
              <h6 className="text-muted mb-3">
                <i className="bi bi-percent me-2"></i>
                Interest Analysis ({userSelections.selectedYears} years)
              </h6>
              <div className="p-3 bg-white rounded">
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <h5 className="fw-bold text-warning mb-1">
                      {formatLakhs(detailedBreakdown.totalInterestPaid)}
                    </h5>
                    <small className="text-muted">Total Interest Paid (includes IDC + EMI interest)</small>
                  </div>
                  <div className="text-end">
                    <div className="badge bg-warning text-dark">IDC: {formatLakhs(detailedBreakdown.homeLoanIDC)}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Loan Outstanding Section */}
        <div className="row mb-4">
          <div className="col-md-12">
            <div className="p-3 bg-light rounded">
              <h6 className="text-muted mb-3">
                <i className="bi bi-bank me-2"></i>
                Loan Outstanding after {userSelections.selectedYears} Years
              </h6>
              <div className="row g-3">
                <div className="col-md-3">
                  <div className="p-3 bg-white rounded text-center">
                    <small className="text-muted">Home Loan</small>
                    <div className="fw-bold">{formatLakhs(detailedBreakdown.homeLoanOutstanding)}</div>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="p-3 bg-white rounded text-center">
                    <small className="text-muted">Personal Loan 1</small>
                    <div className="fw-bold">{formatLakhs(detailedBreakdown.personalLoan1Outstanding)}</div>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="p-3 bg-white rounded text-center">
                    <small className="text-muted">Personal Loan 2</small>
                    <div className="fw-bold">{formatLakhs(detailedBreakdown.personalLoan2Outstanding)}</div>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="p-3 bg-white rounded text-center bg-danger text-white">
                    <small className="text-white">Total Outstanding</small>
                    <div className="fw-bold">{formatLakhs(detailedBreakdown.totalLoanOutstanding)}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sale Analysis Section */}
        <div className="row mb-4">
          <div className="col-md-12">
            <div className="p-3 bg-light rounded">
              <h6 className="text-muted mb-3">
                <i className="bi bi-graph-up me-2"></i>
                Sale Analysis at ₹{userSelections.selectedExitPrice}/sq.ft
              </h6>
              <div className="row g-3">
                <div className="col-md-4">
                  <div className="p-3 bg-white rounded">
                    <small className="text-muted">Property Size</small>
                    <div className="fw-bold">{selectedProperty.size} sq.ft</div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="p-3 bg-white rounded">
                    <small className="text-muted">Sale Value</small>
                    <div className="fw-bold text-success">{formatLakhs(detailedBreakdown.saleValue)}</div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="p-3 bg-white rounded">
                    <small className="text-muted">Loan Repayment</small>
                    <div className="fw-bold text-danger">{formatLakhs(detailedBreakdown.totalLoanOutstanding)}</div>
                  </div>
                </div>
              </div>
              <div className="mt-3 p-3 bg-success text-white rounded">
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <h5 className="fw-bold mb-1">
                      Leftover Cash after {userSelections.selectedYears} years
                    </h5>
                    <small>After repaying all debt</small>
                  </div>
                  <div className="fs-2 fw-bold">
                    {formatLakhs(detailedBreakdown.leftoverCash)}
                  </div>
                </div>
              </div>

              {/* 4 Years Comparison */}
              {userSelections.selectedYears === 3 && detailedBreakdown.fourYearsData && (
                <div className="mt-3 p-3 bg-info bg-opacity-10 rounded">
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <h6 className="text-info mb-1">
                        <i className="bi bi-arrow-right me-2"></i>
                        If held for 4 years:
                      </h6>
                      <small className="text-muted">Leftover cash after 4 years at same price</small>
                    </div>
                    <div className="fw-bold text-info">
                      {formatLakhs(detailedBreakdown.fourYearsData.leftoverCash)}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Net Gain/Loss Section */}
        <div className="row">
          <div className="col-md-12">
            <div className="p-3 bg-light rounded">
              <h6 className="text-muted mb-3">
                <i className="bi bi-cash-stack me-2"></i>
                Net Position after {userSelections.selectedYears} Years
              </h6>
              <div className="row g-3 mb-3">
                <div className="col-md-6">
                  <div className="p-3 bg-white rounded">
                    <small className="text-muted">Total EMIs Paid from Income</small>
                    <div className="fw-bold text-danger">{formatLakhs(detailedBreakdown.totalEMIPaid)}</div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="p-3 bg-white rounded">
                    <small className="text-muted">Cash After Sale</small>
                    <div className="fw-bold text-success">{formatLakhs(detailedBreakdown.leftoverCash)}</div>
                  </div>
                </div>
              </div>
              <div className={`p-4 rounded ${detailedBreakdown.netGainLoss >= 0 ? 'bg-success' : 'bg-danger'} text-white`}>
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <h4 className="fw-bold mb-1">
                      Net {detailedBreakdown.netGainLoss >= 0 ? 'Gain' : 'Loss'}
                    </h4>
                    <small>Cash after sale minus EMIs paid from income</small>
                  </div>
                  <div className="fs-1 fw-bold">
                    {formatLakhs(Math.abs(detailedBreakdown.netGainLoss))}
                    <div className="fs-6">{detailedBreakdown.netGainLoss >= 0 ? 'Profit' : 'Loss'}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailedBreakdown;