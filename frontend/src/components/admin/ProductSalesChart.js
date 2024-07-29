import { useState } from 'react';
import { PieChart, Pie, Legend, Tooltip, ResponsiveContainer, Cell } from 'recharts';

export default function ProductSalesChart({ data }) {
    const pieColors = [
        "#DFB6B2",

        "#2B124C",
        "#522B5B",
        "#854F6C",
        "#1D1A39",
        "#451912",
        "#662549",
        "#AE445A",
        "#F39F5A",
        "#E8BCB9",
        "#854F6C",
        "#DFB6B2",
        "#FBE4D8",
        "#1D1A39",
        "#451912",
        "#662549",
        "#AE445A",
        "#F39F5A",
        "#E8BCB9",
        "#E1CBD7"
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

        <div style={{ width: "90%", marginLeft: "80px" }}>
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
                    {/* <Pie data={data} dataKey="percent" nameKey="name" cx="50%" cy="50%" outerRadius={50} fill="#8884d8" /> */}
                    <Pie
                        dataKey="percent"
                        nameKey="name"
                        isAnimationActive={true}
                        data={filteredData}
                        cx="50%"
                        cy="50%"
                        outerRadius={300}
                        fill="#8884d8"
                        label={renderCustomizedLabel}
                        labelLine={false}
                    // label
                    >  {
                            data.map((entry, index) => <Cell key={`cell-${index}`} fill={pieColors[index % pieColors.length]} />)
                        }
                    </Pie>
                    <Tooltip />
                    <Legend layout="vetical" verticalAlign="top" align="right" />
                </PieChart>
            </ResponsiveContainer>
        </div>


    );
}