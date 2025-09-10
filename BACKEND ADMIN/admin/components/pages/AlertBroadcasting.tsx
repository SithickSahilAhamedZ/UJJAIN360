import React, { useState } from 'react';

const alertTypes = [
    { name: 'Information', icon: 'mdi:information-outline', color: 'blue' },
    { name: 'Warning', icon: 'mdi:alert-outline', color: 'orange' },
    { name: 'Emergency', icon: 'mdi:alert-circle-outline', color: 'red' },
    { name: 'Success', icon: 'mdi:check-circle-outline', color: 'green' },
];

const audiences = [
    { name: 'All Pilgrims', count: '50k+', icon: 'mdi:account-group-outline', color: 'blue' },
    { name: 'Main Temple', count: '15k', icon: 'mdi:temple-hindu-outline', color: 'purple' },
    { name: 'Volunteers Only', count: '500', icon: 'mdi:account-heart-outline', color: 'green' },
    { name: 'Gate 1 Area', count: '8k', icon: 'mdi:gate', color: 'orange' },
    { name: 'Parking Areas', count: '25k', icon: 'mdi:car-multiple', color: 'blue' },
    { name: 'Medical Team', count: '200', icon: 'mdi:medical-bag', color: 'red' },
    { name: 'Security Team', count: '800', icon: 'mdi:shield-account-outline', color: 'gray' },
    { name: 'Transport Team', count: '300', icon: 'mdi:bus-school', color: 'teal' },
];

const deliveryChannels = [
    { id: 'push', name: 'Push Notifications', sub: 'Mobile app notifications', icon: 'mdi:bell-outline', color: 'blue' },
    { id: 'sms', name: 'SMS', sub: 'Text messages', icon: 'mdi:message-text-outline', color: 'green' },
    { id: 'whatsapp', name: 'WhatsApp', sub: 'WhatsApp messages', icon: 'mdi:whatsapp', color: 'green' },
    { id: 'pa', name: 'Public Announcement', sub: 'PA system broadcast', icon: 'mdi:bullhorn-outline', color: 'purple' },
];

const templates = [
    { title: "Weather Update", message: "Weather conditions have changed. Please check the latest forecast and take necessary precautions.", icon: 'mdi:weather-partly-cloudy' },
    { title: "Route Diversion", message: "Route diversion in effect. Please follow the alternate route guidance and allow for extra travel time.", icon: 'mdi:directions-fork' },
    { title: "Emergency Assembly", message: "Emergency assembly required. Please proceed to your designated assembly point immediately.", icon: 'mdi:account-group-outline' },
    { title: "Service Update", message: "Service update notification. Please check the latest information regarding facility availability.", icon: 'mdi:information-outline' },
];

const stats = [
    { value: '147', label: 'Alerts Sent', change: '+23', color: 'blue', icon: 'mdi:send-outline' },
    { value: '89.2k', label: 'Total Reach', change: '+5.2k', color: 'green', icon: 'mdi:account-group-outline' },
    { value: '2.3s', label: 'Avg Delivery', change: '-0.5s', color: 'purple', icon: 'mdi:clock-fast' },
    { value: '98.7%', label: 'Success Rate', change: '+2.1%', color: 'orange', icon: 'mdi:check-all' },
];

const emergencyActions = [
    { label: 'Emergency Evacuation Alert', sub: 'Immediate evacuation required', color: 'red', icon: 'mdi:run-fast' },
    { label: 'Medical Emergency Response', sub: 'Medical assistance needed', color: 'blue', icon: 'mdi:hospital-box-outline' },
    { label: 'Weather Advisory', sub: 'Severe weather warning', color: 'orange', icon: 'mdi:weather-windy' },
];

const AlertBroadcasting: React.FC = () => {
    const [selectedChannels, setSelectedChannels] = useState(['push']);
    const [selectedAudiences, setSelectedAudiences] = useState<string[]>([]);
    const [activeAlertType, setActiveAlertType] = useState('Information');
    const [alertTitle, setAlertTitle] = useState('');
    const [alertMessage, setAlertMessage] = useState('');

    const toggleChannel = (id: string) => {
        setSelectedChannels(prev => prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id]);
    }
    const toggleAudience = (name: string) => {
        setSelectedAudiences(prev => prev.includes(name) ? prev.filter(c => c !== name) : [...prev, name]);
    }

    const applyTemplate = (template: typeof templates[0]) => {
        setAlertTitle(template.title);
        setAlertMessage(template.message);
        alert(`Template '${template.title}' applied.`);
    };
    
    const sendAlert = () => {
        if (!alertTitle || !alertMessage || selectedAudiences.length === 0 || selectedChannels.length === 0) {
            alert("Please fill in all fields, and select at least one audience and one delivery channel.");
            return;
        }
        alert(`Sending '${activeAlertType}' alert titled '${alertTitle}' to ${selectedAudiences.join(', ')} via ${selectedChannels.join(', ')}.`);
    }

    return (
        <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
            <div className="flex items-start gap-4 mb-6 pb-6 border-b border-gray-200">
                <div className="bg-blue-100 p-3 rounded-full text-blue-600 flex items-center justify-center">
                   {/* FIX: Changed 'className' to 'class' for the iconify-icon web component. */}
                   <iconify-icon icon="mdi:bullhorn-outline" class="text-3xl"></iconify-icon>
                </div>
                <div>
                    <h1 className="text-3xl font-bold text-gray-800">Alert Broadcasting System</h1>
                    <p className="text-gray-500 mt-1">Send real-time notifications to pilgrims and staff</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
                <div className="lg:col-span-3 space-y-6">
                    {/* Compose Alert */}
                    <div className="p-6 bg-gray-50 border border-gray-200 rounded-2xl">
                        <h2 className="font-bold mb-4 text-gray-700 flex items-center gap-2 text-lg">
                            {/* FIX: Changed 'className' to 'class' for the iconify-icon web component. */}
                            <iconify-icon icon="mdi:square-edit-outline" class="text-xl"></iconify-icon> Compose Alert
                        </h2>
                        <div className="grid grid-cols-2 gap-3 mb-4">
                            {alertTypes.map(type => (
                                <button key={type.name} onClick={() => setActiveAlertType(type.name)} className={`flex items-center justify-center gap-2 py-3 px-2 rounded-lg text-sm font-semibold transition-all duration-200 border ${activeAlertType === type.name ? `bg-${type.color}-100 text-${type.color}-700 border-${type.color}-300 shadow-sm` : 'bg-white border-gray-200 hover:bg-gray-100'}`}>
                                    {/* FIX: Changed 'className' to 'class' for the iconify-icon web component. */}
                                    <iconify-icon icon={type.icon} class="text-xl"></iconify-icon> {type.name}
                                </button>
                            ))}
                        </div>
                        <div>
                            <label className="font-semibold text-gray-600 text-sm mb-1 block">Alert Title</label>
                            <input type="text" placeholder="Enter a clear and concise alert title." value={alertTitle} onChange={(e) => setAlertTitle(e.target.value)} className="w-full border border-gray-300 rounded-lg p-3 mb-4 bg-white"/>
                        </div>
                        <div>
                            <label className="font-semibold text-gray-600 text-sm mb-1 block flex items-center gap-1.5">
                                {/* FIX: Changed 'className' to 'class' for the iconify-icon web component. */}
                                <iconify-icon icon="mdi:text-box-outline" class="text-base"></iconify-icon> Alert Message
                            </label>
                            <textarea placeholder="Type your detailed alert message here..." rows={4} value={alertMessage} onChange={(e) => setAlertMessage(e.target.value)} className="w-full border border-gray-300 rounded-lg p-3 bg-white"></textarea>
                        </div>
                    </div>
                    {/* Target Audience */}
                    <div className="p-6 bg-gray-50 border border-gray-200 rounded-2xl">
                        {/* FIX: Changed 'className' to 'class' for the iconify-icon web component. */}
                        <h2 className="font-bold mb-4 text-gray-700 text-lg flex items-center gap-2"><iconify-icon icon="mdi:account-group-outline" class="text-xl"></iconify-icon> Target Audience</h2>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                            {audiences.map(audience => (
                                <div key={audience.name} onClick={() => toggleAudience(audience.name)} className={`relative bg-white border p-3 rounded-xl text-center cursor-pointer hover:shadow-md hover:-translate-y-1 transition-all duration-200 flex flex-col items-center justify-center ${selectedAudiences.includes(audience.name) ? 'border-blue-500 ring-2 ring-blue-200' : 'border-gray-200'}`}>
                                    {/* FIX: Changed 'className' to 'class' for the iconify-icon web component. */}
                                    <div className={`w-10 h-10 mb-2 flex items-center justify-center rounded-full bg-${audience.color}-100 text-${audience.color}-600`}><iconify-icon icon={audience.icon} class="text-2xl"></iconify-icon></div>
                                    <p className="font-bold text-sm text-gray-800">{audience.name}</p>
                                    <p className="text-xs text-gray-500">{audience.count}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                    {/* Delivery Channels */}
                    <div className="p-6 bg-gray-50 border border-gray-200 rounded-2xl">
                        <h2 className="font-bold mb-4 text-gray-700 text-lg">Delivery Channels</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                           {deliveryChannels.map(channel => (
                               <div key={channel.id} onClick={() => toggleChannel(channel.id)} className={`bg-white border p-4 rounded-xl cursor-pointer transition-all duration-200 flex items-center justify-between ${selectedChannels.includes(channel.id) ? 'border-blue-500 ring-2 ring-blue-200' : 'border-gray-200'}`}>
                                 <div className="flex items-center gap-3">
                                   {/* FIX: Changed 'className' to 'class' for the iconify-icon web component. */}
                                   <div className={`p-2 rounded-lg bg-${channel.color}-100 text-${channel.color}-600`}><iconify-icon icon={channel.icon} class="text-2xl"></iconify-icon></div>
                                   <div>
                                       <p className="font-semibold text-sm text-gray-800">{channel.name}</p>
                                       <p className="text-xs text-gray-500">{channel.sub}</p>
                                   </div>
                                 </div>
                                 <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${selectedChannels.includes(channel.id) ? 'bg-blue-500 border-blue-500' : 'border-gray-300'}`}>
                                     {/* FIX: Changed 'className' to 'class' for the iconify-icon web component. */}
                                     {selectedChannels.includes(channel.id) && <iconify-icon icon="mdi:check" class="text-white text-base"></iconify-icon>}
                                 </div>
                               </div>
                           ))}
                        </div>
                    </div>
                    <button onClick={sendAlert} className="w-full bg-red-600 text-white font-bold py-4 rounded-xl text-lg flex items-center justify-center gap-2 hover:bg-red-700 transition-colors duration-200">
                        {/* FIX: Changed 'className' to 'class' for the iconify-icon web component. */}
                        <iconify-icon icon="mdi:send-outline" class="text-xl"></iconify-icon> Send Alert
                    </button>
                </div>
                
                <div className="lg:col-span-2 space-y-6">
                    {/* Quick Templates */}
                    <div className="p-6 bg-gray-50 border border-gray-200 rounded-2xl">
                        {/* FIX: Changed 'className' to 'class' for the iconify-icon web component. */}
                        <h2 className="font-bold mb-4 text-gray-700 text-lg flex items-center gap-2"><iconify-icon icon="mdi:file-multiple-outline" class="text-xl"></iconify-icon> Quick Templates</h2>
                        <div className="space-y-3">
                          {templates.map(template => (
                             <button key={template.title} onClick={() => applyTemplate(template)} className="w-full bg-white border border-gray-200 p-3 rounded-xl text-left hover:bg-gray-100 transition-colors duration-200 flex items-center gap-3">
                                 {/* FIX: Changed 'className' to 'class' for the iconify-icon web component. */}
                                 <div className="text-gray-500"><iconify-icon icon={template.icon} class="text-2xl"></iconify-icon></div>
                                 <div>
                                    <p className="font-bold text-sm text-gray-800">{template.title}</p>
                                    <p className="text-xs text-gray-500">{template.message}</p>
                                 </div>
                             </button>
                          ))}
                        </div>
                    </div>
                    {/* Today's Stats */}
                    <div className="p-6 bg-gray-50 border border-gray-200 rounded-2xl">
                        {/* FIX: Changed 'className' to 'class' for the iconify-icon web component. */}
                        <h2 className="font-bold mb-4 text-gray-700 text-lg flex items-center gap-2"><iconify-icon icon="mdi:chart-bar" class="text-xl"></iconify-icon> Today's Stats</h2>
                         <div className="grid grid-cols-2 gap-4">
                             {stats.map(stat => (
                                 <div key={stat.label} className="p-4 bg-white rounded-xl border border-gray-200">
                                     <div className="flex justify-between items-center mb-1">
                                         <div className={`w-8 h-8 flex items-center justify-center rounded-lg bg-${stat.color}-100 text-${stat.color}-600`}>
                                            {/* FIX: Changed 'className' to 'class' for the iconify-icon web component. */}
                                            <iconify-icon icon={stat.icon} class="text-xl"></iconify-icon>
                                         </div>
                                         <span className={`text-xs font-bold px-2 py-0.5 rounded-md ${stat.change.startsWith('+') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>{stat.change}</span>
                                     </div>
                                     <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
                                     <p className="text-sm text-gray-500">{stat.label}</p>
                                 </div>
                             ))}
                         </div>
                    </div>
                    {/* Emergency Actions */}
                    <div className="p-6 bg-gray-50 border border-gray-200 rounded-2xl">
                        {/* FIX: Changed 'className' to 'class' for the iconify-icon web component. */}
                        <h2 className="font-bold mb-4 text-gray-700 text-lg flex items-center gap-2"><iconify-icon icon="mdi:alert-octagon-outline" class="text-xl"></iconify-icon> Emergency Actions</h2>
                        <div className="space-y-3">
                           {emergencyActions.map(action => (
                               <button key={action.label} onClick={() => alert(`${action.label} triggered!`)} className={`w-full bg-${action.color}-500 text-white font-bold py-3 rounded-xl flex items-start gap-3 p-3 hover:bg-${action.color}-600 transition-colors duration-200`}>
                                   {/* FIX: Changed 'className' to 'class' for the iconify-icon web component. */}
                                   <div className="mt-1"><iconify-icon icon={action.icon} class="text-xl"></iconify-icon></div>
                                   <div className="text-left">
                                       <p>{action.label}</p>
                                       <p className="text-xs font-normal opacity-80">{action.sub}</p>
                                   </div>
                                </button>
                           ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AlertBroadcasting;