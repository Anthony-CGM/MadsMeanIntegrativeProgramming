import { useState } from 'react';
import { PieChart, Pie, Legend, Tooltip, ResponsiveContainer, Cell } from 'recharts';

export default function ProductSalesChart({ data }) {
  const pieColors = [
    "#FF6633",
    "#FFB399",
    "#FF33FF",
    "#FFFF99",
    "#00B3E6",
    "#E6B333",
    "#3366E6",
    "#999966",
    "#809980",
    "#E6FF80",
    "#1AFF33",
    "#999933",
    "#FF3380",
    "#CCCC00",
    "#66E64D",
    "#4D80CC",
    "#FF4D4D",
    "#99E6E6",
    "#6666FF"
  ];

  const RADIAN = Math.PI / 180;

  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text x={x} y={y} fill="black" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
        {`${percent}%`}
      </text>
    );
  };

  const [nameKeyInput, setNameKeyInput] = useState('');

  const handleNameKeyInputChange = (event) => {
    setNameKeyInput(event.target.value);
  };

  const filteredData = nameKeyInput ? data.filter((entry) => entry.name === nameKeyInput) : data;

  return (
    <div>
      <form>
      <label htmlFor="nameKeyInput" className="transparent-label">Enter Product: </label>
        <input
          id="nameKeyInput"
          type="text"
          value={nameKeyInput}
          onChange={handleNameKeyInputChange}
        />
      </form>

      <ResponsiveContainer width="90%" height={1000}>
        <PieChart width={1000} height={1000}>
          <Pie
            dataKey="percent"
            nameKey="name"
            isAnimationActive={true}
            data={filteredData}
            cx="50%"
            cy="50%"
            outerRadius={300}
            fill="#f590f3"
            label={renderCustomizedLabel}
            labelLine={false}
          >
            {filteredData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={pieColors[index % pieColors.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend layout="vertical" verticalAlign="top" align="right" />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}