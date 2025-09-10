import React, { useEffect, useRef } from 'react';

const StrokeIcon = ({ path, className = "w-6 h-6" }: { path: string, className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d={path} />
    </svg>
);

const kpiData = [
    { title: "Total Complaints", value: "127", icon: <StrokeIcon path="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /> },
    { title: "Open Incidents", value: "23", icon: <StrokeIcon path="M13 10V3L4 14h7v7l9-11h-7z" />, color: "text-red-500" },
    { title: "Avg Response", value: "18 mins", icon: <StrokeIcon path="M12 8v4l3 3m6-3a9 9 0 1 1-18 0 9 9 0 0 1 18 0z" />, color: "text-green-500" },
    { title: "Critical Alerts", value: "8", icon: <StrokeIcon path="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 0 1-3.46 0" />, color: "text-red-500" },
];

const complaints = [
    { title: "Toilet Overflow", location: "Ghat Area T-4532 (2 mins)", priority: "High", icon: <StrokeIcon path="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" className="w-5 h-5" />, coords: [23.1895, 75.7665] as [number, number] },
    { title: "Water Quality Issue", location: "Chlorine Levels Below Threshold", priority: "High", icon: <StrokeIcon path="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0L12 2.69z" className="w-5 h-5" />, coords: [23.1875, 75.7685] as [number, number] },
    { title: "Disease Alert", location: "Fever cluster detected - 15 cases", priority: "High", icon: <StrokeIcon path="M12 8v8m-4-4h8m8-4a10 10 0 1 1-20 0 10 10 0 0 1 20 0z" className="w-5 h-5" />, coords: [23.1885, 75.7695] as [number, number] },
    { title: "Bin Collection Needed", location: "Multiple bins at 95% capacity", priority: "High", icon: <StrokeIcon path="M3 6h18m-2 0v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" className="w-5 h-5" />, coords: [23.1905, 75.7655] as [number, number] },
];

const predictions = [
    { title: "Toilet Block 3 Overflow", detail: "Expected in 45 minutes", impact: "Impact: High", confidence: 92 },
    { title: "Disease Outbreak Risk", detail: "Potential fever Cluster at Sector C", impact: "Impact: Critical", confidence: 76 },
    { title: "Water Shortage", detail: "Shortage expected at Ghat 2 in 2 hours", impact: "Impact: High", confidence: 85 },
];

const infraStatus = [
    { value: "150,847", label: "Bins Operational", percent: "98% Operational", icon: "mdi:trash-can-outline" },
    { value: "45,200", label: "Lights Functioning", percent: "99% Functional", icon: "mdi:lightbulb-on-outline" },
    { value: "8,900", label: "Toilets OK", percent: "99% OK", icon: "mdi:toilet" },
    { value: "245", label: "Water Taps Available", percent: "95% Available", icon: "mdi:faucet" },
];

const ReportManagement: React.FC = () => {
    const mapContainerRef = useRef<HTMLDivElement>(null);
    const mapRef = useRef<any>(null);

    useEffect(() => {
        if (mapContainerRef.current && !mapRef.current) {
            const map = L.map(mapContainerRef.current).setView([23.188, 75.767], 16);
            mapRef.current = map;

            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            }).addTo(map);

            complaints.forEach(item => {
                const icon = L.divIcon({
                    className: 'custom-icon',
                    html: `<div class="w-4 h-4 pulsing-icon"></div>`,
                    iconSize: [16, 16],
                    iconAnchor: [8, 8],
                });

                L.marker(item.coords, { icon: icon }).addTo(map)
                  .bindPopup(`<b>${item.title}</b><br>${item.location.split('(')[0]}`);
            });
        }

        return () => {
            if (mapRef.current) {
                mapRef.current.remove();
                mapRef.current = null;
            }
        };
    }, []);

    return (
        <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {kpiData.map(kpi => (
                    <div key={kpi.title} className="bg-gray-50 border border-gray-200 rounded-xl p-5 flex items-center gap-4">
                        <div className={`p-3 rounded-lg bg-white ${kpi.color || 'text-gray-500'}`}>{kpi.icon}</div>
                        <div>
                            <p className="text-3xl font-bold text-gray-800">{kpi.value}</p>
                            <p className="text-gray-500 text-sm font-medium">{kpi.title}</p>
                        </div>
                    </div>
                ))}
            </div>
            
            <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold flex items-center gap-2">
                        <StrokeIcon path="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" className="w-6 h-6 text-blue-500" />
                        Live Monitoring Map
                    </h2>
                    <button onClick={() => alert('Refreshing map...')} className="border border-gray-300 rounded-lg px-3 py-1 text-sm font-semibold bg-white hover:bg-gray-100 flex items-center gap-1">
                        <StrokeIcon path="M23 4v6h-6M1 20v-6h6" className="w-4 h-4"/> Refresh
                    </button>
                </div>
                <div ref={mapContainerRef} className="bg-gray-200 h-64 rounded-xl z-0" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6">
                    <h3 className="text-lg font-bold mb-4">Live Complaints & Critical Alerts</h3>
                    <div className="space-y-3">
                        {complaints.map(item => (
                            <div key={item.title} className="bg-white p-3 rounded-lg border flex items-center justify-between gap-3">
                                <div className="flex items-center gap-3 flex-1">
                                    <div className="text-red-500">{item.icon}</div>
                                    <div className="flex-1">
                                        <p className="font-bold text-red-600">{item.title}</p>
                                        <p className="text-sm text-gray-500">{item.location}</p>
                                    </div>
                                </div>
                                <span className="px-3 py-1 text-xs font-bold rounded-full bg-red-100 text-red-700 whitespace-nowrap">{item.priority}</span>
                            </div>
                        ))}
                    </div>
                    <button onClick={() => alert('Viewing all complaints & alerts!')} className="mt-4 w-full text-center font-semibold p-3 rounded-lg bg-gray-100 text-gray-800 hover:bg-red-100 hover:text-red-700 active:bg-red-200 transition-colors duration-200">View All Complaints & Alerts</button>
                </div>
                <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6">
                    <h3 className="text-lg font-bold mb-4">AI Predictive Alerts</h3>
                    <div className="space-y-3">
                        {predictions.map(item => (
                            <div key={item.title} className="bg-white p-3 rounded-lg border">
                                <div className="flex justify-between items-start gap-3">
                                    <div className="flex items-start gap-3 flex-1">
                                        <div className="mt-1 text-orange-500">
                                            <StrokeIcon path="M13 10V3L4 14h7v7l9-11h-7z" className="w-5 h-5"/>
                                        </div>
                                        <div className="flex-1">
                                            <p className="font-bold">{item.title}</p>
                                            <p className="text-sm text-gray-500">{item.detail}</p>
                                            <p className={`text-xs font-semibold ${item.impact.includes('Critical') ? 'text-red-600' : 'text-orange-600'}`}>{item.impact}</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-bold text-lg text-green-600">{item.confidence}%</p>
                                        <p className="text-xs text-gray-400">Confidence</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                     <button onClick={() => alert('Viewing all AI predictions!')} className="mt-4 w-full text-center font-semibold p-3 rounded-lg bg-gray-100 text-gray-800 hover:bg-red-100 hover:text-red-700 active:bg-red-200 transition-colors duration-200">View All AI Predictions</button>
                </div>
            </div>

             <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6">
                 <h3 className="text-lg font-bold mb-4">Infrastructure Status Overview</h3>
                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {infraStatus.map(item => (
                        <div key={item.label} className="bg-white p-4 rounded-lg border text-center flex flex-col items-center justify-center space-y-1">
                            {/* FIX: Changed 'className' to 'class' for the iconify-icon web component. */}
                            <iconify-icon icon={item.icon} class="text-3xl text-gray-500 mb-2"></iconify-icon>
                            <p className="text-3xl font-bold">{item.value}</p>
                            <p className="text-gray-600 font-medium">{item.label}</p>
                            <p className="text-sm text-green-600 font-semibold">{item.percent}</p>
                        </div>
                    ))}
                </div>
             </div>
        </div>
    );
};

export default ReportManagement;