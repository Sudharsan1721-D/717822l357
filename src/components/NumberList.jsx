import React from 'react';

const NumberList = ({ title, numbers }) => {
  return (
    <div className="list">
      <h3>{title}</h3>
      {numbers.length === 0 ? (
        <p>No numbers available</p>
      ) : (
        <div>
          {numbers.join(', ')}
        </div>
      )}
    </div>
  );
};

export default NumberList;