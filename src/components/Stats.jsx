import React from 'react';

const Stats = ({ average, numberType, windowSize }) => {
  const getNumberTypeName = (type) => {
    switch (type) {
      case 'p': return 'Prime';
      case 'f': return 'Fibonacci';
      case 'e': return 'Even';
      case 'r': return 'Random';
      default: return type;
    }
  };

  return (
    <div className="stats-container">
      <h3>Statistics</h3>
      <p><strong>Number Type:</strong> {getNumberTypeName(numberType)}</p>
      <p><strong>Window Size:</strong> {windowSize}</p>
      <p><strong>Average:</strong> {average}</p>
    </div>
  );
};

export default Stats;