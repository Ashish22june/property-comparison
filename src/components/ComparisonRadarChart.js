import React, { useEffect, useRef } from 'react';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

const ComparisonRadarChart = ({ properties, profits }) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (chartRef.current && profits && profits.length > 0) {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }

      const ctx = chartRef.current.getContext('2d');
      
      // Calculate metrics for radar chart
      const metrics = ['Net Profit', 'ROI', 'Appreciation', 'Sale Value'];
      
      // Remove unused maxValues variable
      const datasets = properties.map((property, index) => {
        const propertyProfits = profits[index];
        if (!propertyProfits) return null;
        
        const avgProfit = propertyProfits.reduce((sum, scenario) => 
          sum + parseFloat(scenario.netProfit), 0) / propertyProfits.length;
        
        const avgROI = propertyProfits.reduce((sum, scenario) => 
          sum + parseFloat(scenario.roi), 0) / propertyProfits.length;
        
        const avgAppreciation = propertyProfits.reduce((sum, scenario) => 
          sum + parseFloat(scenario.appreciation), 0) / propertyProfits.length;
        
        const avgSaleValue = propertyProfits.reduce((sum, scenario) => 
          sum + parseFloat(scenario.saleValue), 0) / propertyProfits.length;

        return {
          label: property.name,
          data: [avgProfit, avgROI, avgAppreciation, avgSaleValue],
          backgroundColor: property.isHighlighted 
            ? 'rgba(72, 187, 120, 0.2)' 
            : 'rgba(33, 147, 176, 0.2)',
          borderColor: property.isHighlighted 
            ? 'rgba(72, 187, 120, 1)' 
            : 'rgba(33, 147, 176, 1)',
          borderWidth: 2
        };
      }).filter(Boolean);

      chartInstance.current = new Chart(ctx, {
        type: 'radar',
        data: {
          labels: metrics,
          datasets: datasets
        },
        options: {
          responsive: true,
          plugins: {
            title: {
              display: true,
              text: '📈 Performance Comparison (Averages)',
              font: {
                size: 16,
                weight: 'bold'
              }
            }
          },
          scales: {
            r: {
              beginAtZero: true,
              ticks: {
                callback: function(value) {
                  return value.toFixed(1);
                }
              }
            }
          }
        }
      });
    }

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [properties, profits]);

  return (
    <div>
      <h6 className="text-center mb-3">Performance Radar Comparison</h6>
      <canvas ref={chartRef} />
    </div>
  );
};

export default ComparisonRadarChart;