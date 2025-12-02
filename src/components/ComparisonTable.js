import React from 'react';

const ComparisonTable = ({ properties, exitPrices, profits, profitDifferences }) => {
  if (!profits || profits.length === 0) {
    return (
      <div className="card">
        <div className="card-header bg-primary text-white">
          <h4 className="mb-0">Profit Comparison Table</h4>
        </div>
        <div className="card-body text-center">
          <p className="text-muted">Loading comparison data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="table-responsive">
      <table className="table table-striped table-hover mb-0">
        <thead className="table-dark">
          <tr>
            <th style={{ minWidth: '150px' }}>Exit Price (₹/sq.ft)</th>
            {properties.map(property => (
              <th key={property.id} className="text-center" style={{ minWidth: '200px' }}>
                {property.name}
                {property.isHighlighted && <span className="ms-1">⭐</span>}
              </th>
            ))}
            <th className="text-center" style={{ minWidth: '150px' }}>Difference</th>
          </tr>
        </thead>
        <tbody>
          {exitPrices.map((exitPrice, index) => {
            const profit1 = profits[0]?.[index];
            const profit2 = profits[1]?.[index];
            const difference = profitDifferences[index];
            
            return (
              <tr key={exitPrice}>
                <td className="fw-bold align-middle">
                  <div className="d-flex align-items-center">
                    <span className="badge bg-primary me-2">₹{exitPrice}</span>
                    <small className="text-muted">per sq.ft</small>
                  </div>
                </td>
                
                {/* Property 1 */}
                <td className="text-center align-middle">
                  {profit1 ? (
                    <>
                      <div className={`fw-bold ${parseFloat(profit1.netProfit) < 0 ? 'text-danger' : 'text-success'}`}>
                        ₹{profit1.netProfit}L
                      </div>
                      <small className="text-muted">({profit1.roi} ROI)</small>
                      <div className="small text-muted">
                        Sale: ₹{profit1.saleValue}L
                      </div>
                    </>
                  ) : (
                    <span className="text-muted">-</span>
                  )}
                </td>
                
                {/* Property 2 */}
                <td className="text-center align-middle">
                  {profit2 ? (
                    <>
                      <div className={`fw-bold ${parseFloat(profit2.netProfit) < 0 ? 'text-danger' : 'text-success'}`}>
                        ₹{profit2.netProfit}L
                      </div>
                      <small className="text-muted">({profit2.roi} ROI)</small>
                      <div className="small text-muted">
                        Sale: ₹{profit2.saleValue}L
                      </div>
                    </>
                  ) : (
                    <span className="text-muted">-</span>
                  )}
                </td>
                
                {/* Difference */}
                <td className="text-center align-middle">
                  {difference ? (
                    <div className={`fw-bold ${parseFloat(difference.difference) < 0 ? 'text-danger' : 'text-success'}`}>
                      ₹{Math.abs(parseFloat(difference.difference)).toFixed(2)}L
                      <div className="small">
                        {parseFloat(difference.difference) < 0 ? 'Lower' : 'Higher'} by {difference.percentage}%
                      </div>
                      <div className={`badge ${parseFloat(difference.difference) < 0 ? 'bg-danger' : 'bg-success'} mt-1`}>
                        {parseFloat(difference.difference) < 0 ? properties[0].name : properties[1].name} leads
                      </div>
                    </div>
                  ) : (
                    <span className="text-muted">-</span>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      
      {/* Table Summary */}
      <div className="card-footer bg-light">
        <div className="row">
          <div className="col-md-6">
            <small className="text-muted">
              <i className="bi bi-info-circle me-1"></i>
              Net Profit shown in Lakhs (L)
            </small>
          </div>
          <div className="col-md-6 text-end">
            <small className="text-muted">
              <span className="text-success">● Positive</span>
              <span className="mx-2">|</span>
              <span className="text-danger">● Negative</span>
            </small>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComparisonTable;