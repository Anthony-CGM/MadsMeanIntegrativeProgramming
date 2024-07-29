import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    Cell,
} from "recharts";

export default function UserSalesChart({ data }) {
    const barColors = ["#1f77b4", "#ff7f0e", "#2ca02c"]
    return (
        <ResponsiveContainer width="100%" height={700}>

            <AreaChart

                data={data}
                margin={{
                    top: 20, right: 20, bottom: 20, left: 20,
                }}
            >
                <XAxis dataKey="userDetails.name" />
                <YAxis />
                <Area dataKey="total" stroke="#8884d8" fill="#8884d8">
                    {
                        data.map((item, index) => (
                            <Cell key={`cell-${index}`} fill={barColors[index % 20]} />
                        ))
                    }
                </Area>
                <Tooltip />
                <Legend />
            </AreaChart>
        </ResponsiveContainer>


    );
}