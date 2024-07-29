import React, { useState, } from 'react'
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

export default function MonthlySalesChart({ data }) {
    const [xValues, setXValues] = useState([])

    const formatDate = (date) => {
        if (xValues.includes(date.getMonth())) {
            setXValues([...xValues, date.getMonth()])

        } return ''
    }
    return (
        <ResponsiveContainer width="85%" height={600}>
            <LineChart width={600} height={450} data={data} style={{
                    background: 'linear-gradient(to bottom right, rgba(255, 105, 180, 0.5), rgba(0, 191, 255, 0.5))'
                }}  margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                <Line type="solid" dataKey="total" stroke="black" strokeWidth={4} />
                <CartesianGrid stroke="#ffffff" strokeDasharray="9 9 solid" />
                <XAxis dataKey="month" stroke="#ffffff" />
                <YAxis stroke="#ffffff" />
                <Tooltip />
            </LineChart>
        </ResponsiveContainer>

    );
}