import React from 'react';

const bookings = [
    { type: 'Transport', service: 'Delhi-Haridwar Express', customer: 'Rajesh Kumar', amount: '₹2,450', status: 'Confirmed', time: '2 hours ago', icon: 'material-symbols:desktop-windows-outline', color: 'blue' },
    { type: 'Accommodation', service: 'Deluxe Room-3 Nights', customer: 'Priya Sharma', amount: '₹3,500', status: 'Confirmed', time: '5 hours ago', icon: 'mdi:account-outline', color: 'purple' },
    { type: 'Transport', service: 'Mumbai-Haridwar AC', customer: 'Amit Patel', amount: '₹3,450', status: 'Pending', time: '7 hours ago', icon: 'material-symbols:desktop-windows-outline', color: 'blue' },
    { type: 'Accommodation', service: 'Standard Room-2 Nights', customer: 'Sunita Verma', amount: '₹3,900', status: 'Confirmed', time: '1 hours ago', icon: 'mdi:account-outline', color: 'purple' },
    { type: 'Transport', service: 'Bangalore-Haridwar', customer: 'Vikram Singh', amount: '₹4,600', status: 'Confirmed', time: '5 hours ago', icon: 'material-symbols:desktop-windows-outline', color: 'blue' },
    { type: 'Accommodation', service: 'Suite Room-4 Nights', customer: 'Meera Gupta', amount: '₹15,500', status: 'Pending', time: '2 hours ago', icon: 'mdi:account-outline', color: 'purple' },
];

const kpiData = [
    { title: "Today's Revenue", value: "₹2,85,640", change: "+18.2%", changeType: "increase", icon: 'mdi:currency-inr', color: "green" },
    { title: "New Bookings", value: "346", change: "+24", changeType: "increase", icon: 'mdi:account-plus-outline', color: "blue" },
    { title: "Avg Occupancy", value: "87.5%", change: "+5.2%", changeType: "increase", icon: 'mdi:chart-pie-outline', color: "purple" },
    { title: "Available Slots", value: "1,247", change: "-56", changeType: "decrease", icon: 'mdi:calendar-check-outline', color: "orange" },
];

const getStatusPill = (status: 'Confirmed' | 'Pending') => {
    if (status === 'Confirmed') {
        return (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-bold rounded-full bg-green-100 text-green-700">
                {/* FIX: Changed 'className' to 'class' for the iconify-icon web component. */}
                <iconify-icon icon="mdi:check-circle" class="text-base"></iconify-icon>
                Confirmed
            </span>
        );
    }
    return (
        <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-bold rounded-full bg-yellow-100 text-yellow-700">
            {/* FIX: Changed 'className' to 'class' for the iconify-icon web component. */}
                <iconify-icon icon="mdi:clock-outline" class="text-base"></iconify-icon>
            Pending
        </span>
    );
};


const BookingOverview: React.FC = () => {
    return (
        <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
                    {/* FIX: Changed 'className' to 'class' for the iconify-icon web component. */}
                    <iconify-icon icon="iconoir:view-grid" class="w-8 h-8 text-blue-500"></iconify-icon>
                    Booking Overview
                </h1>
                <p className="text-gray-500 mt-1">Monitor reservations and capacity management</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {kpiData.map(kpi => (
                    <div key={kpi.title} className="bg-gray-50 border border-gray-200 rounded-2xl p-5">
                        <div className="flex justify-between items-start">
                           <div className={`bg-${kpi.color}-100 text-${kpi.color}-600 p-3 rounded-xl`}>
                             {/* FIX: Changed 'className' to 'class' for the iconify-icon web component. */}
                             <iconify-icon icon={kpi.icon} class="w-6 h-6"></iconify-icon>
                           </div>
                           <span className={`text-sm font-bold px-2 py-1 rounded-md ${kpi.changeType === 'increase' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>{kpi.change}</span>
                        </div>
                        <div className="mt-4">
                            <p className="text-3xl font-bold text-gray-800">{kpi.value}</p>
                            <p className="text-gray-500 text-sm font-medium">{kpi.title}</p>
                        </div>
                    </div>
                ))}
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6">
                    <h3 className="text-lg font-bold mb-2">Transport Bookings</h3>
                    <div className="flex justify-between items-baseline">
                        <p className="text-3xl font-bold">2,847</p>
                        <p className="text-gray-500 font-medium">/ 3,625 Total</p>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                        <div className="bg-cyan-400 h-2.5 rounded-full" style={{width: '78%'}}></div>
                    </div>
                    <h4 className="font-bold mt-6 mb-3 text-gray-700">Performance Metrics</h4>
                    <div className="space-y-3 text-sm">
                        <div className="flex justify-between text-gray-600"><span className="font-medium flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-green-400"></div>Revenue Today</span><span className="font-bold text-gray-800">₹1,65,640</span></div>
                        <div className="flex justify-between text-gray-600"><span className="font-medium flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-blue-400"></div>Bookings Today</span><span className="font-bold text-gray-800">156</span></div>
                        <div className="flex justify-between text-gray-600"><span className="font-medium flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-purple-400"></div>Most Popular Route</span><span className="font-bold text-gray-800">Delhi-Haridwar</span></div>
                    </div>
                </div>
                 <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6">
                    <h3 className="text-lg font-bold mb-2">Accommodation Bookings</h3>
                    <div className="flex justify-between items-baseline">
                        <p className="text-3xl font-bold">1,385</p>
                        <p className="text-gray-500 font-medium">/ 1,500 Total</p>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                        <div className="bg-fuchsia-400 h-2.5 rounded-full" style={{width: '92%'}}></div>
                    </div>
                    <h4 className="font-bold mt-6 mb-3 text-gray-700">Performance Metrics</h4>
                    <div className="space-y-3 text-sm">
                        <div className="flex justify-between text-gray-600"><span className="font-medium flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-green-400"></div>Revenue Today</span><span className="font-bold text-gray-800">₹1,00,640</span></div>
                        <div className="flex justify-between text-gray-600"><span className="font-medium flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-blue-400"></div>Bookings Today</span><span className="font-bold text-gray-800">190</span></div>
                        <div className="flex justify-between text-gray-600"><span className="font-medium flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-purple-400"></div>Most Popular Room</span><span className="font-bold text-gray-800">Deluxe Rooms</span></div>
                    </div>
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-left min-w-[700px]">
                    <thead>
                        <tr className="border-b border-gray-200 text-left">
                           <th className="px-4 py-3 text-sm font-medium text-gray-500">Type</th>
                           <th className="px-4 py-3 text-sm font-medium text-gray-500">Service</th>
                           <th className="px-4 py-3 text-sm font-medium text-gray-500">Customer</th>
                           <th className="px-4 py-3 text-sm font-medium text-gray-500">Amount</th>
                           <th className="px-4 py-3 text-sm font-medium text-gray-500">Status</th>
                           <th className="px-4 py-3 text-sm font-medium text-gray-500">Time</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bookings.map((booking, index) => (
                             <tr key={index} className="border-b border-gray-100 last:border-b-0 hover:bg-gray-50/50 transition-colors">
                                <td className="px-4 py-5 align-middle">
                                    <span className={`inline-flex items-center gap-2.5 text-sm font-semibold bg-${booking.color}-100 text-${booking.color}-700 pl-2 pr-3 py-1.5 rounded-lg`}>
                                        <div className="bg-white p-1 rounded-md flex items-center justify-center">
                                            {/* FIX: Changed 'className' to 'class' for the iconify-icon web component. */}
                                            <iconify-icon icon={booking.icon} class={`text-lg text-${booking.color}-600`}></iconify-icon>
                                        </div>
                                        {booking.type}
                                    </span>
                                </td>
                                 <td className="px-4 py-5 align-middle text-gray-600 text-sm font-medium">{booking.service}</td>
                                 <td className="px-4 py-5 align-middle text-gray-600 text-sm font-medium">{booking.customer}</td>
                                 <td className="px-4 py-5 align-middle text-gray-800 font-bold text-sm">{booking.amount}</td>
                                 <td className="px-4 py-5 align-middle">{getStatusPill(booking.status as 'Confirmed' | 'Pending')}</td>
                                 <td className="px-4 py-5 align-middle text-gray-500 text-sm">{booking.time}</td>
                             </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default BookingOverview;