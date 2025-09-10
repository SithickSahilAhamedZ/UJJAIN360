import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const Icon = ({ path, className = "w-6 h-6" }: { path: string, className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d={path} />
    </svg>
);

const StrokeIcon = ({ path, className = "w-5 h-5" }: { path: string, className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d={path} />
    </svg>
);

const kpiData = [
    { title: 'Total People', value: '63,000', icon: <Icon path="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2m8-10a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM20 8v6m3-3h-6" />, color: 'blue' },
    { title: 'Critical Areas', value: '1', icon: <Icon path="M12 8l-6 8h12l-6-8z" />, color: 'red' },
    { title: 'Avg Density', value: '2.4/4', icon: <Icon path="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0L12 2.69z" />, color: 'green' },
    { title: 'Active Zones', value: '5', icon: <Icon path="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />, color: 'purple' },
];

const areaData = [
    { name: 'Main Temple', people: '15,000', level: 'High', color: 'orange', coords: [23.189, 75.766] as [number, number] },
    { name: 'Gate 1', people: '8,000', level: 'Medium', color: 'yellow', coords: [23.187, 75.768] as [number, number] },
    { name: 'Gate 2', people: '3,000', level: 'Low', color: 'green', coords: [23.191, 75.765] as [number, number] },
    { name: 'Parking Area', people: '25,000', level: 'Critical', color: 'red', coords: [23.185, 75.770] as [number, number] },
    { name: 'Food Court', people: '12,000', level: 'Medium', color: 'yellow', coords: [23.188, 75.769] as [number, number] },
];

const quickActions = [
    { label: 'Send Emergency Alert', color: 'red', icon: 'mdi:alert-octagon-outline' },
    { label: 'Redirect Crowd Flow', color: 'orange', icon: 'mdi:directions-fork' },
    { label: 'Deploy Additional Staff', color: 'blue', icon: 'mdi:account-multiple-plus-outline' },
    { label: 'Update Route Guidance', color: 'green', icon: 'mdi:map-marker-path' },
];

const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
};

const CrowdMonitoring: React.FC = () => {
    const mapContainerRef = useRef<HTMLDivElement>(null);
    const mapRef = useRef<any>(null);

    useEffect(() => {
        if (mapContainerRef.current && !mapRef.current) {
            const map = L.map(mapContainerRef.current).setView([23.188, 75.767], 16);
            mapRef.current = map;

            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            }).addTo(map);

            areaData.forEach(area => {
                const crowdSize = parseInt(area.people.replace(',', ''));
                const iconSize = crowdSize > 20000 ? 40 : crowdSize > 10000 ? 32 : 24;
                
                const icon = L.divIcon({
                    className: 'crowd-marker-icon',
                    html: `<div class="w-full h-full bg-blue-500/80 border-2 border-white rounded-full flex items-center justify-center text-white font-bold text-xs shadow-lg">${area.people.replace(',000', 'k')}</div>`,
                    iconSize: [iconSize, iconSize],
                    iconAnchor: [iconSize / 2, iconSize / 2],
                });
    
                L.marker(area.coords, { icon: icon }).addTo(map)
                    .bindPopup(`<b>${area.name}</b><br>${area.people} People`);
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
        <motion.div initial="hidden" animate="visible" variants={containerVariants}>
            <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
                <motion.div variants={itemVariants} className="mb-6">
                    <h1 className="text-3xl font-bold text-gray-800">Crowd Monitoring Dashboard</h1>
                    <p className="text-gray-500 mt-1">Real time crowd density and flow management</p>
                </motion.div>
                
                <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {kpiData.map(item => (
                        <div key={item.title} className={`p-6 rounded-2xl bg-${item.color}-100 text-${item.color}-800`}>
                            <div className={`mb-4 w-10 h-10 flex items-center justify-center bg-white/50 rounded-full`}>{React.cloneElement(item.icon, { className: 'w-6 h-6' })}</div>
                            <p className="text-sm font-semibold opacity-80">{item.title}</p>
                            <p className="text-3xl font-bold">{item.value}</p>
                        </div>
                    ))}
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <motion.div variants={itemVariants} className="lg:col-span-2 bg-gray-50 rounded-2xl p-6 border border-gray-200">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-bold flex items-center gap-2">
                                <StrokeIcon path="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8zM12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" className="w-6 h-6 text-blue-500" />
                                Live Crowd Map
                            </h2>
                            <select className="border border-gray-300 rounded-lg px-3 py-1 text-sm" onChange={(e) => alert(`Time changed to ${e.target.value}`)}>
                                <option>Last Hour</option>
                                <option>Last 30 Mins</option>
                                <option>Live</option>
                            </select>
                        </div>
                        <div ref={mapContainerRef} className="h-96 rounded-xl z-0" />
                    </motion.div>

                    <div className="space-y-8">
                        <motion.div variants={itemVariants} className="bg-gray-50 rounded-2xl p-6 border border-gray-200">
                            <h2 className="text-xl font-bold mb-4">Area Breakdown</h2>
                            <div className="space-y-3">
                                {areaData.map(area => (
                                    <div key={area.name} className="flex justify-between items-center bg-white p-3 rounded-lg border border-gray-200">
                                        <div>
                                            <p className="font-bold">{area.name}</p>
                                            <p className="text-sm text-gray-500 flex items-center gap-1"><StrokeIcon path="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2 M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z" className="w-4 h-4" /> {area.people} People</p>
                                        </div>
                                        <span className={`px-3 py-1 text-xs font-bold rounded-full bg-${area.color}-100 text-${area.color}-700`}>{area.level}</span>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                        <motion.div variants={itemVariants} className="bg-gray-50 rounded-2xl p-6 border border-gray-200">
                            <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
                            <div className="space-y-3">
                                {quickActions.map(action => (
                                    <button 
                                      key={action.label} 
                                      onClick={() => alert(`${action.label} action triggered!`)}
                                      className={`w-full text-left font-semibold p-3 rounded-lg bg-${action.color}-100 text-${action.color}-700 hover:bg-${action.color}-200 transition flex items-center gap-3`}>
                                        {/* FIX: Changed 'className' to 'class' for the iconify-icon web component. */}
                                        <iconify-icon icon={action.icon} class="text-xl"></iconify-icon>
                                        {action.label}
                                    </button>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default CrowdMonitoring;