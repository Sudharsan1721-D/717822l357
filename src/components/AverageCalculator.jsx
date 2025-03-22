import React, { useState } from 'react';
import { fetchNumbers } from '../services/api';
import NumberList from './NumberList';
import Stats from './Stats';

const AverageCalculator = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);
  const [numberType, setNumberType] = useState('p');

  const handleFetchNumbers = async (type) => {
    setNumberType(type);
    setLoading(true);
    setError(null);
    
    try {
      const data = await fetchNumbers(type);
      setResult(data);
    } catch (err) {
      setError(err.message || 'Failed to fetch numbers');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="calculator-container">
      <h2>Fetch Numbers by Type</h2>
      
      <div className="btn-group">
        <button 
          className="btn"
          onClick={() => handleFetchNumbers('p')} 
          disabled={loading}
        >
          Prime Numbers (p)
        </button>
        <button 
          className="btn"
          onClick={() => handleFetchNumbers('f')} 
          disabled={loading}
        >
          Fibonacci Numbers (f)
        </button>
        <button 
          className="btn"
          onClick={() => handleFetchNumbers('e')} 
          disabled={loading}
        >
          Even Numbers (e)
        </button>
        <button 
          className="btn"
          onClick={() => handleFetchNumbers('r')} 
          disabled={loading}
        >
          Random Numbers (r)
        </button>
      </div>

      {loading && <p className="loading">Loading...</p>}
      {error && <p className="error">{error}</p>}
      
      {result && (
        <>
          <Stats 
            average={result.avg} 
            numberType={numberType} 
            windowSize={result.windowCurrState.length}
          />
          
          <div className="list-container">
            <NumberList 
              title="Previous Window State" 
              numbers={result.windowPrevState} 
            />
            <NumberList 
              title="Current Window State" 
              numbers={result.windowCurrState} 
            />
          </div>
          
          <NumberList 
            title="Numbers Received from API" 
            numbers={result.numbers} 
          />
        </>
      )}
    </div>
  );
};

export default AverageCalculator;