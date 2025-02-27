import React from 'react';
import { PieChart, Pie, Cell, Tooltip } from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AF19FF'];

const PieChartComponent = ({ participants }) => {
    return (
      <PieChart width={400} height={400}>
        <Pie
          data={participants}
          dataKey="participation"
          nameKey="first_name"
          cx="50%"
          cy="50%"
          outerRadius={150}
          innerRadius={50}
        >
          {participants.map((_, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    );
};

export default PieChartComponent;