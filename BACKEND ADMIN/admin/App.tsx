import React, { useState } from 'react';
// FIX: Import Transition type from framer-motion to resolve typing issues with transition objects.
import { motion, AnimatePresence, Transition } from 'framer-motion';
import Navbar from './components/Navbar';
import CrowdMonitoring from './components/pages/CrowdMonitoring';
import IncidentManagement from './components/pages/IncidentManagement';
import BookingOverview from './components/pages/BookingOverview';
import AlertBroadcasting from './components/pages/AlertBroadcasting';
import AnalyticsDashboard from './components/pages/AnalyticsDashboard';
import ReportManagement from './components/pages/ReportManagement';
import { Page } from './types';
import { NAV_ITEMS } from './constants';

const App: React.FC = () => {
  const [activePage, setActivePage] = useState<Page>(NAV_ITEMS[0].id);

  const renderActivePage = () => {
    switch (activePage) {
      case 'dashboard':
        return <CrowdMonitoring />;
      case 'incidents':
        return <IncidentManagement />;
      case 'booking':
        return <BookingOverview />;
      case 'alerts':
        return <AlertBroadcasting />;
      case 'analytics':
        return <AnalyticsDashboard />;
      case 'reports':
        return <ReportManagement />;
      default:
        return <CrowdMonitoring />;
    }
  };

  const pageVariants = {
    initial: {
      opacity: 0,
      y: 20,
    },
    in: {
      opacity: 1,
      y: 0,
    },
    out: {
      opacity: 0,
      y: -20,
    },
  };

  // FIX: Explicitly type `pageTransition` with the `Transition` type from framer-motion
  // to ensure properties like `ease` and `type` are correctly typed as literals, not strings.
  const pageTransition: Transition = {
    type: 'tween',
    ease: 'anticipate',
    duration: 0.5,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-orange-100 to-yellow-200 font-sans text-gray-800">
      <Navbar activePage={activePage} setActivePage={setActivePage} />
      <main className="p-4 md:p-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={activePage}
            initial="initial"
            animate="in"
            exit="out"
            variants={pageVariants}
            transition={pageTransition}
          >
            {renderActivePage()}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
};

export default App;