import React from 'react';
import { BarChart3, Users, CalendarCheck, FileWarning, Clock } from 'lucide-react';
import Card from '../components/Card';
import { useI18n } from '../i18n';

const StatCard: React.FC<{ icon: React.ElementType, title: string, value: string, change: string, changeType: 'increase' | 'decrease' }> = ({ icon: Icon, title, value, change, changeType }) => {
  const isIncrease = changeType === 'increase';
  return (
    <Card>
      <div className="flex items-center space-x-4">
        <div className="p-3 bg-orange-100 dark:bg-orange-900/50 rounded-lg">
          <Icon size={24} className="text-orange-500" />
        </div>
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">{title}</p>
          <p className="text-2xl font-bold text-gray-800 dark:text-white">{value}</p>
        </div>
      </div>
      <p className={`text-sm mt-2 ${isIncrease ? 'text-green-600' : 'text-red-600'}`}>
        {isIncrease ? '▲' : '▼'} {change} since yesterday
      </p>
    </Card>
  );
};

const BarChart: React.FC<{ data: { label: string, value: number }[], color: string }> = ({ data, color }) => {
  const maxValue = Math.max(...data.map(d => d.value));
  return (
    <div className="flex justify-around items-end h-32 space-x-2">
      {data.map(item => (
        <div key={item.label} className="flex-1 flex flex-col items-center">
          <div className="w-full h-full flex items-end">
            <div 
              className={`w-full rounded-t-md ${color}`}
              style={{ height: `${(item.value / maxValue) * 100}%` }}
              title={`${item.label}: ${item.value}`}
            ></div>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{item.label}</p>
        </div>
      ))}
    </div>
  );
};


const AnalyticsPage: React.FC = () => {
  const { t } = useI18n();

  const bookingData = [
    { label: 'Mon', value: 120 },
    { label: 'Tue', value: 180 },
    { label: 'Wed', value: 250 },
    { label: 'Thu', value: 220 },
    { label: 'Fri', value: 300 },
    { label: 'Sat', value: 450 },
    { label: 'Sun', value: 500 },
  ];
  
  const peakHoursData = [
    { label: '6am', value: 250 },
    { label: '9am', value: 600 },
    { label: '12pm', value: 450 },
    { label: '3pm', value: 500 },
    { label: '6pm', value: 800 },
    { label: '9pm', value: 300 },
  ];

  const incidentTypes = [
    { type: 'Medical', count: 12, color: 'bg-red-500' },
    { type: 'Crowd', count: 8, color: 'bg-orange-500' },
    { type: 'Waste', count: 25, color: 'bg-yellow-500' },
    { type: 'Other', count: 5, color: 'bg-gray-500' },
  ];
  const totalIncidents = incidentTypes.reduce((sum, item) => sum + item.count, 0);

  return (
    <div>
      <div className="flex items-center space-x-3 mb-6">
        <BarChart3 size={32} className="text-orange-500" />
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">{t('analyticsTitle')}</h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatCard icon={Users} title={t('liveCrowdCount')} value="~15,480" change="+5.2%" changeType="increase" />
        <StatCard icon={CalendarCheck} title={t('bookingsToday')} value="832" change="-1.8%" changeType="decrease" />
        <StatCard icon={FileWarning} title={t('incidentsToday')} value="50" change="+10%" changeType="increase" />

        <Card className="md:col-span-2">
          <h2 className="text-lg font-bold text-gray-800 dark:text-white mb-1">{t('bookingTrends')}</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">{t('past7Days')}</p>
          <BarChart data={bookingData} color="bg-blue-500" />
        </Card>

        <Card>
          <h2 className="text-lg font-bold text-gray-800 dark:text-white mb-1">{t('incidentReports')}</h2>
           <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">{t('byType')}</p>
           <div className="space-y-2">
             {incidentTypes.map(item => (
               <div key={item.type}>
                 <div className="flex justify-between text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                   <span>{item.type}</span>
                   <span>{item.count}</span>
                 </div>
                 <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div className={`${item.color} h-2 rounded-full`} style={{ width: `${(item.count / totalIncidents) * 100}%` }}></div>
                 </div>
               </div>
             ))}
           </div>
        </Card>

        <Card className="lg:col-span-3">
          <div className="flex items-center space-x-3 mb-1">
            <Clock size={20} className="text-orange-500" />
            <h2 className="text-lg font-bold text-gray-800 dark:text-white">{t('peakHours')}</h2>
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">{t('peakHoursDesc')}</p>
          <BarChart data={peakHoursData} color="bg-red-500" />
        </Card>
      </div>
    </div>
  );
};
export default AnalyticsPage;