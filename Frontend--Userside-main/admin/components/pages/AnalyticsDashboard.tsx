import React from 'react';
import { PieChart, Pie, Cell, LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';


const StrokeIcon = ({ path, className = "w-6 h-6" }: { path: string, className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d={path} />
    </svg>
);

const kpiData = [
    { title: "RESPONSE TIME", value: "28min", prev: "45min", change: "37.8%", trend: "down", color: "blue", icon: "mdi:clock-fast" },
    { title: "INCIDENT RESOLUTION RATE", value: "92%", prev: "78%", change: "17.9%", trend: "up", color: "green", icon: "mdi:check-decagram-outline" },
    { title: "SYSTEM ACCURACY", value: "96%", prev: "85%", change: "12.9%", trend: "up", color: "orange", icon: "mdi:target" },
    { title: "STAFF EFFICIENCY", value: "89%", prev: "72%", change: "23.6%", trend: "up", color: "purple", icon: "mdi:account-group-outline" },
];

const pieData = [
    { name: 'Excellent (80-100)', value: 65 },
    { name: 'Good (41-79)', value: 25 },
    { name: 'Poor (0-40)', value: 10 },
];
const PIE_COLORS = ['#22c55e', '#f97316', '#ef4444'];

const lineData = [
    { name: 'Jan', 'New System': 82, 'Old System': 65 }, { name: 'Feb', 'New System': 85, 'Old System': 68 },
    { name: 'Mar', 'New System': 90, 'Old System': 72 }, { name: 'Apr', 'New System': 88, 'Old System': 70 },
    { name: 'May', 'New System': 91, 'Old System': 75 }, { name: 'Jun', 'New System': 92, 'Old System': 78 },
    { name: 'Jul', 'New System': 90, 'Old System': 76 }, { name: 'Aug', 'New System': 93, 'Old System': 80 },
    { name: 'Sep', 'New System': 95, 'Old System': 81 }, { name: 'Oct', 'New System': 94, 'Old System': 83 },
    { name: 'Nov', 'New System': 96, 'Old System': 85 }, { name: 'Dec', 'New System': 97, 'Old System': 84 },
];

const barData = [
    { name: 'Temple Area', 'New System': 92, 'Old System': 85 },
    { name: 'Parking Lots', 'New System': 88, 'Old System': 75 },
    { name: 'Main Entrance', 'New System': 94, 'Old System': 80 },
    { name: 'Food Courts', 'New System': 87, 'Old System': 82 },
    { name: 'Rest Areas', 'New System': 96, 'Old System': 75 },
    { name: 'Information Desk', 'New System': 96, 'Old System': 91 },
];

const AnalyticsDashboard: React.FC = () => {
    return (
        <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
                    <StrokeIcon path="M2.5 2v6h6M2.66 15.57a10 10 0 1 0 .57-8.38" className="w-8 h-8 text-blue-500" />
                    Analytics Dashboard
                </h1>
                <p className="text-gray-500 mt-1">Ujjain360 Performance</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {kpiData.map(kpi => (
                    <div key={kpi.title} className={`bg-${kpi.color}-50 border border-${kpi.color}-200 rounded-2xl p-5 space-y-3`}>
                        <div className="flex justify-between items-center">
                          <p className="text-xs font-bold text-gray-500">{kpi.title}</p>
                          {/* FIX: Changed 'className' to 'class' for the iconify-icon web component. */}
                          <iconify-icon icon={kpi.icon} class={`text-2xl text-${kpi.color}-500 opacity-70`}></iconify-icon>
                        </div>
                        <p className={`text-4xl font-bold text-${kpi.color}-600`}>{kpi.value}</p>
                        <div className="flex justify-between items-center text-sm">
                            <span className="text-gray-500">Previous: {kpi.prev}</span>
                            <span className={`font-bold flex items-center ${kpi.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                                {kpi.trend === 'up' ? '▲' : '▼'} {kpi.change}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                 <div className="h-80 relative">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie data={pieData} cx="50%" cy="50%" innerRadius={80} outerRadius={120} fill="#8884d8" paddingAngle={5} dataKey="value">
                                {pieData.map((entry, index) => <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />)}
                            </Pie>
                            <Tooltip />
                            <Legend iconType="circle" />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                    <div className="bg-gray-100 p-6 rounded-2xl text-center flex flex-col items-center justify-center space-y-2">
                        {/* FIX: Changed 'className' to 'class' for the iconify-icon web component. */}
                        <iconify-icon icon="mdi:help-rhombus-outline" class="text-3xl text-gray-500"></iconify-icon>
                        <p className="text-3xl font-bold">1,247</p>
                        <p className="text-gray-600">Total Help Requests</p>
                    </div>
                    <div className="bg-green-100 p-6 rounded-2xl text-center flex flex-col items-center justify-center space-y-2">
                        {/* FIX: Changed 'className' to 'class' for the iconify-icon web component. */}
                        <iconify-icon icon="mdi:thumb-up-outline" class="text-3xl text-green-600"></iconify-icon>
                        <p className="text-3xl font-bold">92%</p>
                        <p className="text-green-800">Positive Feedback</p>
                    </div>
                    <div className="bg-yellow-100 p-6 rounded-2xl text-center flex flex-col items-center justify-center space-y-2">
                        {/* FIX: Changed 'className' to 'class' for the iconify-icon web component. */}
                        <iconify-icon icon="mdi:star-half-full" class="text-3xl text-yellow-600"></iconify-icon>
                        <p className="text-3xl font-bold">4.6</p>
                        <p className="text-yellow-800">Avg Rating</p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
                <div className="lg:col-span-3 bg-gray-50 border border-gray-200 rounded-2xl p-6">
                    <h3 className="text-lg font-bold mb-4">Incident Resolution Trends</h3>
                    <div className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={lineData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" fontSize={12} />
                                <YAxis fontSize={12} unit="%" />
                                <Tooltip />
                                <Legend />
                                <Line type="monotone" dataKey="New System" stroke="#16a34a" strokeWidth={2} />
                                <Line type="monotone" dataKey="Old System" stroke="#ef4444" strokeWidth={2} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>
                <div className="lg:col-span-2 bg-gray-50 border border-gray-200 rounded-2xl p-6">
                    <h3 className="text-lg font-bold mb-4">Area-wise Incident Resolution</h3>
                     <div className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={barData} layout="vertical" margin={{ left: 20 }}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis type="number" hide />
                                <YAxis type="category" dataKey="name" width={100} fontSize={12} axisLine={false} tickLine={false}/>
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="New System" fill="#16a34a" radius={[0, 4, 4, 0]} />
                                <Bar dataKey="Old System" fill="#ef4444" radius={[0, 4, 4, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AnalyticsDashboard;