import React, { useState, useEffect, useRef } from 'react';
import { Page } from './types';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import HomePage from './pages/HomePage';
import NavigationPage from './pages/NavigationPage';
import BookingPage from './pages/BookingPage';
import EmergencyPage from './pages/EmergencyPage';
import ReportPage from './pages/ReportPage';
import GalleryPage from './pages/GalleryPage';
import SettingsPage from './pages/SettingsPage';
import AboutPage from './pages/AboutPage';
import AnalyticsPage from './pages/AnalyticsPage';
import ChatModal from './components/ChatModal';
import { useSpeechRecognition } from './hooks/useSpeechRecognition';
import { getAIResponse } from './services/aiService';
import { I18nProvider, useI18n } from './i18n';
import { Users, X, Map, CheckCircle, Mic } from 'lucide-react';
import BottomNav from './components/BottomNav';
import LoginPage from './pages/LoginPage';

// Crowd Notification Component (defined in App.tsx to avoid creating new file)
interface CrowdNotificationProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: () => void;
}

const CrowdNotification: React.FC<CrowdNotificationProps> = ({ isOpen, onClose, onNavigate }) => {
  const { t } = useI18n();
  
  if (!isOpen) {
    return null;
  }

  return (
    <div 
      className="fixed top-4 right-4 w-full max-w-sm bg-white dark:bg-gray-800 rounded-xl shadow-2xl p-4 z-[100] border-l-4 border-red-500 animate-slide-down-fade-in"
      role="alert"
      aria-live="assertive"
    >
      <div className="flex items-start">
        <div className="flex-shrink-0 pt-0.5">
          <div className="p-2 bg-red-100 dark:bg-red-800/30 rounded-full">
            <Users className="h-6 w-6 text-red-600 dark:text-red-400" />
          </div>
        </div>
        <div className="ml-3 flex-1">
          <p className="text-sm font-bold text-gray-900 dark:text-white">
            {t('highCrowdAlert')}
          </p>
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
            {t('highCrowdAlertDesc')}
          </p>
          <div className="mt-3 flex space-x-3">
            <button
              onClick={onNavigate}
              className="inline-flex items-center justify-center px-3 py-2 text-sm font-semibold text-white bg-red-500 rounded-md hover:bg-red-600 transition-colors"
            >
              <Map size={16} className="mr-1.5" />
              {t('viewMap')}
            </button>
          </div>
        </div>
        <div className="ml-4 flex-shrink-0 flex">
          <button
            onClick={onClose}
            className="inline-flex text-gray-400 dark:text-gray-500 rounded-md hover:text-gray-500 dark:hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
            aria-label={t('closeNotification')}
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

// Notification Panel Component
interface NotificationPanelProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (page: Page) => void;
}
const NotificationPanel: React.FC<NotificationPanelProps> = ({ isOpen, onClose, onNavigate }) => {
    const { t } = useI18n();
    if (!isOpen) return null;

    const notifications = [
        {
            icon: Users,
            iconColor: 'text-red-500',
            bgColor: 'bg-red-100',
            title: t('highCrowdAlert'),
            desc: t('highCrowdAlertDesc'),
            time: t('minsAgo', { count: 2 }),
            action: () => onNavigate(Page.Navigation),
        },
        {
            icon: CheckCircle,
            iconColor: 'text-green-500',
            bgColor: 'bg-green-100',
            title: t('medicalEmergencyResolved'),
            desc: t('medicalEmergencyResolvedDesc'),
            time: t('minsAgo', { count: 15 }),
            action: () => alert('Notification marked as read.'),
        },
    ];

    return (
        <div className="absolute top-16 right-4 w-full max-w-sm bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 z-50 animate-slide-down-fade-in">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                <h3 className="font-bold text-lg text-gray-800 dark:text-white">{t('notifications')}</h3>
            </div>
            <div className="divide-y divide-gray-100 dark:divide-gray-700 max-h-80 overflow-y-auto">
                {notifications.map((item, index) => {
                    const Icon = item.icon;
                    return (
                        <div key={index} onClick={item.action} className="p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 cursor-pointer transition-colors">
                            <div className="flex items-start">
                                <div className={`p-2 ${item.bgColor} rounded-full mr-3`}>
                                    <Icon size={20} className={item.iconColor} />
                                </div>
                                <div className="flex-1">
                                    <p className="font-semibold text-sm text-gray-800 dark:text-gray-200">{item.title}</p>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">{item.desc}</p>
                                </div>
                                <p className="text-xs text-gray-400 dark:text-gray-500 ml-2 whitespace-nowrap">{item.time}</p>
                            </div>
                        </div>
                    );
                })}
            </div>
            <div className="p-2 bg-gray-50 dark:bg-gray-700/50 border-t border-gray-200 dark:border-gray-700 rounded-b-xl text-center">
                <button className="text-sm font-semibold text-orange-500 hover:text-orange-600 dark:text-orange-400 dark:hover:text-orange-300">
                    {t('viewAll')}
                </button>
            </div>
        </div>
    );
}


interface Message {
    text: string;
    sender: 'user' | 'ai';
}

const AppContent: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => sessionStorage.getItem('isAuthenticated') === 'true');
  const [userRole, setUserRole] = useState<'user' | 'admin' | null>(() => sessionStorage.getItem('userRole') as 'user' | 'admin' | null);
  const [activePage, setActivePageInternal] = useState<Page>(Page.Home);
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [pageContext, setPageContext] = useState<any>(null);
  const { t } = useI18n();
  
  const [showCrowdNotification, setShowCrowdNotification] = useState(false);
  const [isNotificationPanelOpen, setNotificationPanelOpen] = useState(false);
  const notificationPanelRef = useRef<HTMLDivElement>(null);
  
  const [isChatOpen, setChatOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
      { text: t('assistantInitialGreeting'), sender: 'ai' }
  ]);
  const [currentLang, setCurrentLang] = useState<'en-IN' | 'hi-IN'>('en-IN');
  const { transcript, isListening, startListening, stopListening } = useSpeechRecognition();
  const prevTranscriptRef = useRef('');

  useEffect(() => {
    if (isAuthenticated) {
        const timer = setTimeout(() => {
          setShowCrowdNotification(true);
        }, 2500);
        return () => clearTimeout(timer);
    }
  }, [isAuthenticated]);

  useEffect(() => {
    setMessages([{ text: t('assistantInitialGreeting'), sender: 'ai' }])
  }, [t]);


  useEffect(() => {
      if (!isListening && transcript && transcript !== prevTranscriptRef.current) {
          handleSendMessage(transcript);
          prevTranscriptRef.current = transcript;
      }
  }, [isListening, transcript]);
  
  // Close notification panel on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (notificationPanelRef.current && !notificationPanelRef.current.contains(event.target as Node)) {
        // A bit of a hack to prevent closing when the bell icon itself is clicked
        const target = event.target as HTMLElement;
        if (!target.closest('[aria-label="Toggle notifications"]')) {
            setNotificationPanelOpen(false);
        }
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogin = (role: 'user' | 'admin') => {
      sessionStorage.setItem('isAuthenticated', 'true');
      sessionStorage.setItem('userRole', role);
      setIsAuthenticated(true);
      setUserRole(role);
      setActivePageInternal(role === 'admin' ? Page.Analytics : Page.Home);
  };

  const handleLogout = () => {
      sessionStorage.removeItem('isAuthenticated');
      sessionStorage.removeItem('userRole');
      setIsAuthenticated(false);
      setUserRole(null);
  };

  const setActivePage = (page: Page, context: any = null) => {
    setActivePageInternal(page);
    setPageContext(context);
    setNotificationPanelOpen(false);
    window.scrollTo(0, 0); 
  };

  const handleSendMessage = async (text: string) => {
      if (!text.trim()) return;
      const userMessage: Message = { text, sender: 'user' };
      setMessages(prev => [...prev, userMessage]);
      const aiResponseText = await getAIResponse(text);
      const aiMessage: Message = { text: aiResponseText, sender: 'ai' };
      setMessages(prev => [...prev, aiMessage]);
  };

  const handleVoiceSearch = () => {
    setChatOpen(true);
    setTimeout(() => startListening(currentLang), 300);
  }
  
  const handleCloseCrowdNotification = () => {
    setShowCrowdNotification(false);
  };

  const handleNavigateFromCrowdNotification = () => {
    setActivePage(Page.Navigation);
    setShowCrowdNotification(false);
  };
  
  const handleNavigateFromPanel = (page: Page) => {
    setActivePage(page);
    setNotificationPanelOpen(false);
  }

  const renderPage = () => {
    switch (activePage) {
      case Page.Home: return <HomePage setChatOpen={setChatOpen} setActivePage={setActivePage} />;
      case Page.Navigation: return <NavigationPage />;
      case Page.Booking: return <BookingPage initialTab={pageContext?.initialTab} />;
      case Page.Emergency: return <EmergencyPage />;
      case Page.Report: return <ReportPage />;
      case Page.Gallery: return <GalleryPage />;
      case Page.Settings: return <SettingsPage onLogout={handleLogout} />;
      case Page.About: return <AboutPage />;
      case Page.Analytics: return userRole === 'admin' ? <AnalyticsPage /> : <HomePage setChatOpen={setChatOpen} setActivePage={setActivePage} />;
      default: return <HomePage setChatOpen={setChatOpen} setActivePage={setActivePage} />;
    }
  };

  if (!isAuthenticated) {
    return <LoginPage onLogin={handleLogin} />;
  }

  return (
    <div className="h-screen bg-gray-100 dark:bg-gray-900 font-sans text-gray-800 dark:text-gray-200">
      <CrowdNotification 
        isOpen={showCrowdNotification}
        onClose={handleCloseCrowdNotification}
        onNavigate={handleNavigateFromCrowdNotification}
      />
      <Sidebar 
        activePage={activePage} 
        setActivePage={setActivePage} 
        isMenuOpen={isMenuOpen} 
        setMenuOpen={setMenuOpen} 
        userRole={userRole}
        onLogout={handleLogout}
      />
      <div className="flex flex-col h-full">
        <Header 
          setMenuOpen={setMenuOpen} 
          onVoiceSearch={handleVoiceSearch}
          onToggleNotifications={() => setNotificationPanelOpen(prev => !prev)}
        />
        <div ref={notificationPanelRef} className="relative z-50">
            <NotificationPanel
              isOpen={isNotificationPanelOpen}
              onClose={() => setNotificationPanelOpen(false)}
              onNavigate={handleNavigateFromPanel}
            />
        </div>
        <main key={activePage} className="flex-1 overflow-x-hidden overflow-y-auto bg-orange-50 dark:bg-gray-900 animate-fade-in p-4 md:p-6 pb-20 md:pb-4">
          {renderPage()}
        </main>
        <BottomNav activePage={activePage} setActivePage={setActivePage} />
      </div>
        <button
          onClick={handleVoiceSearch}
          className="fixed bottom-20 md:bottom-6 right-6 bg-orange-500 text-white p-4 rounded-full shadow-xl z-40 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-transform hover:scale-110"
          aria-label={t('voiceSearch')}
        >
          <Mic size={24} />
        </button>
        <ChatModal 
          isOpen={isChatOpen}
          onClose={() => setChatOpen(false)}
          messages={messages}
          onSendMessage={handleSendMessage}
          isListening={isListening}
          startListening={startListening}
          stopListening={stopListening}
          currentLang={currentLang}
          setLang={setCurrentLang}
      />
    </div>
  );
}

const App: React.FC = () => {
  return (
    <I18nProvider>
      <AppContent />
    </I18nProvider>
  );
};

export default App;