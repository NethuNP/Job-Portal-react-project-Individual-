import React from 'react';
import { PieChart, Pie, Cell } from 'recharts';

const data = [
    { name: 'Pending', value: 400 },
    { name: 'Interview', value: 300 },
    { name: 'Declined', value: 300 },
    { name: 'Approve', value: 200 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
        <text
            x={x}
            y={y}
            fill="white"
            textAnchor={x > cx ? 'start' : 'end'}
            dominantBaseline="central"
        >
            {`${(percent * 100).toFixed(0)}%`}
        </text>
    );
};

const Charts = () => {
    return (
        <div className="flex items-center p-">
            <PieChart width={400} height={400}>
                <Pie
                    data={data}
                    cx="50%"
                    cy="30%"
                    labelLine={false}
                    label={renderCustomizedLabel}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                >
                    {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                </Pie>
            </PieChart>
            <div className="flex flex-col items-start ml-3">
                {data.map((item, index) => (
                    <div key={index} className="flex items-center mb-2">
                        <div className="h-5 w-5" style={{ backgroundColor: COLORS[index % COLORS.length] }}></div>
                        <p className="ml-2 font-bold">{item.name}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Charts;
