import React, { useState, useEffect, useCallback } from 'react';

const InputForm = ({ propertyData, onUpdate, onAddProperty, onRemoveProperty }) => {
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [localData, setLocalData] = useState(propertyData);

  // Update local data when prop changes
  useEffect(() => {
    setLocalData(propertyData);
  }, [propertyData]);

  // Debounced update to parent
  useEffect(() => {
    const timer = setTimeout(() => {
      onUpdate(localData);
    }, 300); // 300ms debounce

    return () => clearTimeout(timer);
  }, [localData, onUpdate]); // Fixed: Added dependencies

  const handlePropertyChange = (propertyId, field, value) => {
    const updatedProperties = localData.properties.map(property => 
      property.id === propertyId ? { ...property, [field]: parseFloat(value) || 0 } : property
    );
    
    setLocalData(prev => ({
      ...prev,
      properties: updatedProperties
    }));
  };

  const handleExitPriceChange = (index, value) => {
    const updatedExitPrices = [...localData.exitPrices];
    updatedExitPrices[index] = parseFloat(value) || 0;
    
    setLocalData(prev => ({
      ...prev,
      exitPrices: updatedExitPrices
    }));
  };

  const handleAssumptionChange = (field, value) => {
    setLocalData(prev => ({
      ...prev,
      assumptions: {
        ...prev.assumptions,
        [field]: parseFloat(value) || 0
      }
    }));
  };

  const addExitPrice = () => {
    setLocalData(prev => ({
      ...prev,
      exitPrices: [...prev.exitPrices, 6000]
    }));
  };

  const removeExitPrice = (index) => {
    if (localData.exitPrices.length > 1) {
      const updatedExitPrices = localData.exitPrices.filter((_, i) => i !== index);
      setLocalData(prev => ({
        ...prev,
        exitPrices: updatedExitPrices
      }));
    }
  };

  const toggleHighlight = (propertyId) => {
    const updatedProperties = localData.properties.map(property => ({
      ...property,
      isHighlighted: property.id === propertyId
    }));
    
    setLocalData(prev => ({
      ...prev,
      properties: updatedProperties
    }));
  };

  return (
    <div className="card mb-5">
      <div className="card-header bg-primary text-white">
        <h5 className="mb-0">⚙️ Property Comparison Settings</h5>
      </div>
      <div className="card-body">
        
        {/* Basic Settings */}
        <div className="row g-3 mb-4">
          <div className="col-md-4">
            <label className="form-label">Purchase Price (₹ psf)</label>
            <input
              type="number"
              className="form-control"
              value={localData.purchasePrice}
              onChange={(e) => setLocalData(prev => ({
                ...prev,
                purchasePrice: parseFloat(e.target.value) || 0
              }))}
            />
          </div>
          
          <div className="col-md-8">
            <label className="form-label">Exit Price Scenarios (₹ psf)</label>
            <div className="d-flex gap-2 flex-wrap">
              {localData.exitPrices.map((price, index) => (
                <div key={index} className="d-flex align-items-center">
                  <input
                    type="number"
                    className="form-control"
                    style={{ width: '120px' }}
                    value={price}
                    onChange={(e) => handleExitPriceChange(index, e.target.value)}
                  />
                  {localData.exitPrices.length > 1 && (
                    <button 
                      className="btn btn-sm btn-outline-danger ms-1"
                      onClick={() => removeExitPrice(index)}
                      type="button"
                    >
                      ❌
                    </button>
                  )}
                </div>
              ))}
              <button 
                className="btn btn-outline-primary" 
                onClick={addExitPrice}
                type="button"
              >
                ➕ Add Scenario
              </button>
            </div>
          </div>
        </div>

        {/* Property Inputs */}
        <div className="row g-4">
          {localData.properties.map((property) => (
            <div key={property.id} className="col-lg-6">
              <div className="card">
                <div className="card-header d-flex justify-content-between align-items-center">
                  <h6 className="mb-0">{property.name}</h6>
                  <div>
                    <button 
                      className={`btn btn-sm ${property.isHighlighted ? 'btn-warning' : 'btn-outline-warning'}`}
                      onClick={() => toggleHighlight(property.id)}
                      type="button"
                    >
                      {property.isHighlighted ? '⭐ Highlighted' : 'Mark as Best'}
                    </button>
                  </div>
                </div>
                <div className="card-body">
                  <div className="row g-3">
                    <div className="col-12">
                      <label className="form-label">Flat Size (Sq Ft)</label>
                      <input
                        type="number"
                        className="form-control"
                        value={property.size}
                        onChange={(e) => handlePropertyChange(property.id, 'size', e.target.value)}
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Cash Invested (₹ L)</label>
                      <input
                        type="number"
                        step="0.01"
                        className="form-control"
                        value={property.cashInvested}
                        onChange={(e) => handlePropertyChange(property.id, 'cashInvested', e.target.value)}
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Loan Outstanding (₹ L)</label>
                      <input
                        type="number"
                        step="0.01"
                        className="form-control"
                        value={property.loanOutstanding}
                        onChange={(e) => handlePropertyChange(property.id, 'loanOutstanding', e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Advanced Settings Toggle */}
        <div className="text-center mt-4">
          <button 
            className="btn btn-outline-secondary"
            onClick={() => setShowAdvanced(!showAdvanced)}
            type="button"
          >
            {showAdvanced ? '▲ Hide' : '▼ Show'} Advanced Settings
          </button>
        </div>

        {/* Advanced Settings */}
        {showAdvanced && (
          <div className="row g-3 mt-3">
            <div className="col-md-3">
              <label className="form-label">Personal Loan Rate (%)</label>
              <input
                type="number"
                step="0.1"
                className="form-control"
                value={localData.assumptions.personalLoanRate}
                onChange={(e) => handleAssumptionChange('personalLoanRate', e.target.value)}
              />
            </div>
            <div className="col-md-3">
              <label className="form-label">Home Loan Rate (%)</label>
              <input
                type="number"
                step="0.1"
                className="form-control"
                value={localData.assumptions.homeLoanRate}
                onChange={(e) => handleAssumptionChange('homeLoanRate', e.target.value)}
              />
            </div>
            <div className="col-md-3">
              <label className="form-label">Investment Period (Years)</label>
              <input
                type="number"
                className="form-control"
                value={localData.assumptions.investmentPeriod}
                onChange={(e) => handleAssumptionChange('investmentPeriod', e.target.value)}
              />
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default InputForm;