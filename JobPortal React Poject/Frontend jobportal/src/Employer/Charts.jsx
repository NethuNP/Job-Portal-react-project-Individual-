import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

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
            {`${(percent * 100).toFixed(2)}%`}
        </text>
    );
};

const Charts = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const pendingResponse = await fetch('http://localhost:8070/applications/pending/percentage');
                const declinedResponse = await fetch('http://localhost:8070/applications/declined/percentage');
                const approvedResponse = await fetch('http://localhost:8070/applications/approved/percentage');

                const [pendingResult, declinedResult, approvedResult] = await Promise.all([
                    pendingResponse.json(),
                    declinedResponse.json(),
                    approvedResponse.json()
                ]);

                const pendingPercentage = parseFloat(pendingResult.percentage);
                const declinedPercentage = parseFloat(declinedResult.percentage);
                const approvedPercentage = parseFloat(approvedResult.percentage);

                const newData = [
                    { name: 'Pending', value: pendingPercentage },
                    { name: 'Declined', value: declinedPercentage },
                    { name: 'Approved', value: approvedPercentage }
                ];

                setData(newData);
                setLoading(false);
            } catch (err) {
                console.error("Error fetching data:", err);
                setError("Failed to fetch data");
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="container mx-auto grid grid-cols-2 gap-4 ml-10">
            <div>
                <h2 className="text-xl   text-gray-500 font-bold">Application Status</h2>
                <PieChart width={300} height={300}>
                    <Pie
                        data={data}
                        cx={150}
                        cy={150}
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
                    <Legend verticalAlign="bottom" height={36} />
                </PieChart>
            </div>
            <div className='mt-10'>
                <LineChart width={300} height={300} data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend verticalAlign="bottom" height={36} />
                    <Line type="monotone" dataKey="value" stroke="#8884d8" activeDot={{ r: 5 }} />
                </LineChart>
            </div>
        </div>
    );
};

export default Charts;
