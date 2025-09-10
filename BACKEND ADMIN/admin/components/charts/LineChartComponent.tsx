
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

interface LineChartProps {
    data: any[];
    dataKey: string;
}

const LineChartComponent: React.FC<LineChartProps> = ({ data, dataKey }) => {
    return (
        <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                <XAxis dataKey="name" tick={{ fontSize: 12 }} stroke="#6b7280" />
                <YAxis tick={{ fontSize: 12 }} stroke="#6b7280" />
                <Tooltip
                    contentStyle={{
                        backgroundColor: '#ffffff',
                        border: '1px solid #e0e0e0',
                        borderRadius: '0.5rem',
                    }}
                />
                <Legend iconSize={10}/>
                <Line type="monotone" dataKey={dataKey} stroke="#FF6B00" strokeWidth={2} activeDot={{ r: 8 }} name="Visitors" />
            </LineChart>
        </ResponsiveContainer>
    );
};

export default LineChartComponent;
