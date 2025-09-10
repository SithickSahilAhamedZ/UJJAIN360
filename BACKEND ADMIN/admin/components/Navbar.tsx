import React from 'react';
import { motion } from 'framer-motion';
import type { Page } from '../types';
import { NAV_ITEMS } from '../constants';

const Icon = ({ path, className = "w-5 h-5", onClick }: { path: string, className?: string, onClick?: () => void }) => (
    <svg onClick={onClick} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d={path} />
    </svg>
);

const LogoIcon = () => (
  <div className="w-10 h-10 bg-gradient-to-br from-blue-50 via-green-50 to-blue-100 rounded-lg shadow-inner-sm"></div>
);

interface NavbarProps {
  activePage: Page;
  setActivePage: (page: Page) => void;
}

const Navbar: React.FC<NavbarProps> = ({ activePage, setActivePage }) => {
  return (
    <header className="bg-white sticky top-0 z-50 shadow-sm">
      <div className="mx-auto px-4 sm:px-8 h-20 flex items-center justify-between">
        {/* Left Side: Logo and Title */}
        <div className="flex items-center space-x-3">
          <LogoIcon />
          <div>
            <h1 className="text-lg font-bold text-gray-800">Ujjain360</h1>
            <p className="text-xs text-gray-500">Admin Dashboard</p>
          </div>
        </div>

        {/* Center: Navigation */}
        <nav className="hidden md:flex items-center space-x-2">
          {NAV_ITEMS.map((item) => (
            <motion.button
              key={item.id}
              onClick={() => setActivePage(item.id)}
              className={`relative px-4 py-2 text-sm font-semibold rounded-lg transition-colors focus:outline-none ${
                activePage === item.id ? 'text-green-700' : 'text-gray-600 hover:text-gray-900'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {item.label}
              {activePage === item.id && (
                <motion.div
                  className="absolute inset-0 bg-green-100 rounded-lg -z-10"
                  layoutId="active-nav-item"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
            </motion.button>
          ))}
        </nav>

        {/* Right Side: User Info */}
        <div className="flex items-center space-x-4">
          <div className="text-right">
            <p className="text-sm font-semibold text-gray-800">Admin User</p>
            <p className="text-xs text-gray-500">admin@demo.com</p>
          </div>
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
            <Icon 
              path="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4M10 17l5-5-5-5M15 12H3" 
              className="w-6 h-6 text-gray-500 cursor-pointer hover:text-gray-800 transition-colors" 
              onClick={() => alert('Logout clicked!')}
            />
          </motion.div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;