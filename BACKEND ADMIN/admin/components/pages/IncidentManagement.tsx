import React from 'react';
import { motion } from 'framer-motion';
import { Incident, IncidentPriority, IncidentStatus } from '../../types';

const StrokeIcon = ({ path, className = "w-5 h-5" }: { path: string, className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d={path} />
    </svg>
);

const incidents: Incident[] = [
    { id: '1', title: 'Medical Emergency', priority: 'CRITICAL', status: 'OPEN', description: 'Patient experiencing chest pain in the main lobby area', location: 'Main Lobby - Floor 1', timestamp: '2024-01-15 14:30', assignedTo: 'Dr. Sarah Johnson', reportedTime: 'Reported 5 mins ago' },
    { id: '2', title: 'Fire Alarm Activation', priority: 'HIGH', status: 'IN PROGRESS', description: 'Smoke detector triggered in server room, investigating cause', location: 'Server Room #8 - Floor 3', timestamp: '2024-01-15 14:15', assignedTo: 'Fire Safety Team', reportedTime: 'In progress for 15 mins' },
    { id: '3', title: 'Power Outage', priority: 'HIGH', status: 'IN PROGRESS', description: 'Electrical failure affecting building Wing C, backup power activated', location: 'Building Wing C', timestamp: '2024-01-15 13:45', assignedTo: 'Maintenance Team', reportedTime: 'In progress for 45 mins' },
    { id: '4', title: 'Security Breach', priority: 'MEDIUM', status: 'RESOLVED', description: 'Unauthorized access detected at main entrance, reviewing footage', location: 'Main Entrance', timestamp: '2024-01-15 12:20', assignedTo: 'Security Team Alpha', reportedTime: 'Resolved 1 hour ago' },
    { id: '5', title: 'Water Leak', priority: 'LOW', status: 'OPEN', description: 'Minor water leak detected in restroom facilities on floor 2', location: 'Floor 2 - Restroom', timestamp: '2024-01-15 11:30', assignedTo: 'Facilities Team', reportedTime: 'Reported 3 hours ago' },
    { id: '6', title: 'Equipment Malfunction', priority: 'MEDIUM', status: 'RESOLVED', description: 'HVAC system showing irregular temperature readings', location: 'HVAC Control Room', timestamp: '2024-01-15 10:15', assignedTo: 'Technical Support', reportedTime: 'Resolved 4 hours ago' },
];

const priorityStyles: Record<IncidentPriority, string> = {
    CRITICAL: 'bg-red-100 text-red-700',
    HIGH: 'bg-orange-100 text-orange-700',
    MEDIUM: 'bg-yellow-100 text-yellow-700',
    LOW: 'bg-blue-100 text-blue-700',
};

const statusStyles: Record<IncidentStatus, string> = {
    OPEN: 'bg-red-100 text-red-700',
    'IN PROGRESS': 'bg-yellow-100 text-yellow-700',
    RESOLVED: 'bg-green-100 text-green-700',
};

const kpiCardData = [
    { title: 'Total Incidents', value: 247, color: 'bg-gray-100 text-black', textColor: 'text-gray-600', icon: 'mdi:format-list-numbered' },
    { title: 'Open', value: 45, color: 'bg-red-500 text-white', textColor: 'opacity-80', icon: 'mdi:folder-open-outline' },
    { title: 'In Progress', value: 18, color: 'bg-yellow-500 text-white', textColor: 'opacity-80', icon: 'mdi:progress-clock' },
    { title: 'Resolved', value: 172, color: 'bg-green-500 text-white', textColor: 'opacity-80', icon: 'mdi:check-circle-outline' },
    { title: 'Critical', value: 12, color: 'bg-purple-500 text-white', textColor: 'opacity-80', icon: 'mdi:alert-circle-outline' },
];

const IncidentManagement: React.FC = () => {
    return (
        <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 space-y-6">
            <div className="flex flex-wrap justify-between items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
                        <iconify-icon icon="ph:warning-light" class="w-8 h-8 text-orange-500"></iconify-icon>
                        Incident Management
                    </h1>
                    <p className="text-gray-500 mt-1">Monitor and respond to incidents in real-time</p>
                </div>
                <motion.button 
                  onClick={() => alert('Emergency Protocol activated!')}
                  whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="bg-red-600 text-white font-bold py-3 px-5 rounded-lg flex items-center gap-2">
                    <StrokeIcon path="M12 9v2m0 4h.01" className="w-5 h-5"/> Emergency Protocol
                </motion.button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {kpiCardData.map((card) => (
                    <div key={card.title} className={`p-4 rounded-xl ${card.color}`}>
                        <div className="flex justify-between items-center">
                            <div>
                                <p className={`font-semibold text-sm ${card.textColor}`}>{card.title}</p>
                                <p className="text-4xl font-bold">{card.value}</p>
                            </div>
                            {/* FIX: Changed 'className' to 'class' for the iconify-icon web component. */}
                            <iconify-icon icon={card.icon} class={`text-4xl ${card.title === 'Total Incidents' ? 'text-gray-400' : 'opacity-70'}`}></iconify-icon>
                        </div>
                    </div>
                ))}
            </div>

            <div className="flex flex-wrap justify-between items-center pt-4 gap-4">
                <div className="flex gap-4">
                    <select className="border border-gray-300 rounded-lg px-4 py-2 bg-gray-50" onChange={(e) => alert(`Status filter changed to ${e.target.value}`)}>
                        <option>All Status</option>
                        <option>Open</option>
                        <option>In Progress</option>
                        <option>Resolved</option>
                    </select>
                    <select className="border border-gray-300 rounded-lg px-4 py-2 bg-gray-50" onChange={(e) => alert(`Priority filter changed to ${e.target.value}`)}>
                        <option>All Priority</option>
                        <option>Critical</option>
                        <option>High</option>
                        <option>Medium</option>
                        <option>Low</option>
                    </select>
                </div>
                <p className="text-gray-500 text-sm">Showing 247 of 247 incidents</p>
            </div>

            <div className="space-y-4">
                {incidents.map(incident => (
                    <motion.div key={incident.id} className="bg-gray-50 rounded-xl p-4 border border-gray-200" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
                        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between">
                            <div className="flex-1 mb-4 lg:mb-0">
                                <div className="flex items-center flex-wrap gap-3 mb-2">
                                    <h3 className="text-lg font-bold text-gray-800">{incident.title}</h3>
                                    <span className={`px-2 py-0.5 text-xs font-bold rounded ${priorityStyles[incident.priority]}`}>{incident.priority}</span>
                                    <span className={`px-2 py-0.5 text-xs font-bold rounded ${statusStyles[incident.status]}`}>{incident.status}</span>
                                </div>
                                <p className="text-sm text-gray-600 mb-4">{incident.description}</p>
                                <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-gray-600">
                                    <div className="flex items-center gap-2"><StrokeIcon path="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z M12 10a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" className="w-4 h-4 text-gray-400"/> {incident.location}</div>
                                    <div className="flex items-center gap-2"><StrokeIcon path="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2 M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z" className="w-4 h-4 text-gray-400"/> {incident.assignedTo}</div>
                                    <div className="flex items-center gap-2"><StrokeIcon path="M12 8v4l3 3m6-3a9 9 0 1 1-18 0 9 9 0 0 1 18 0z" className="w-4 h-4 text-gray-400"/> {incident.reportedTime}</div>
                                </div>
                            </div>
                            <div className="flex flex-wrap items-center gap-2 lg:ml-4">
                                <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => alert(`Marking incident '${incident.title}' as resolved.`)} className="flex items-center gap-1.5 px-3 py-2 text-sm font-semibold bg-green-100 text-green-700 rounded-lg hover:bg-green-200 whitespace-nowrap">
                                    <StrokeIcon path="M20 6L9 17l-5-5" className="w-4 h-4" /> Mark Resolved
                                </motion.button>
                                <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => alert(`Adding update to incident '${incident.title}'.`)} className="flex items-center gap-1.5 px-3 py-2 text-sm font-semibold bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 whitespace-nowrap">
                                    <StrokeIcon path="M12 5v14m-7-7h14" className="w-4 h-4" /> Add Update
                                </motion.button>
                                <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => alert(`Assigning and starting incident '${incident.title}'.`)} className="flex items-center gap-1.5 px-3 py-2 text-sm font-semibold bg-orange-400 text-white rounded-lg hover:bg-orange-500 whitespace-nowrap">
                                    <StrokeIcon path="M5 3l14 9-14 9V3z" className="w-4 h-4" /> Assign & Start
                                </motion.button>
                                <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => alert(`Viewing details for incident '${incident.title}'.`)} className="flex items-center gap-1.5 px-3 py-2 text-sm font-semibold bg-blue-500 text-white rounded-lg hover:bg-blue-600 whitespace-nowrap">
                                    <StrokeIcon path="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8zM12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" className="w-4 h-4" /> View Details
                                </motion.button>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default IncidentManagement;