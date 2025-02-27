import React from 'react';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AF19FF'];

const Legend = ({ participants }) => {
  return (
    <div className="legend">
      {participants.map((p, index) => (
        <div key={index} className="legend-item">
          <div className="legend-color"
            style={{ backgroundColor: COLORS[index % COLORS.length] }}
          ></div>
          <span className="legend-name">
            {p.first_name}
            &nbsp;
            {p.last_name}
          </span>
        </div>
      ))}
    </div>
  );
};

export default Legend;