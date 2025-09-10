
import React from 'react';
import type { Page } from '../types';
import { NAV_ITEMS } from '../constants';

interface SidebarProps {
  activePage: Page;
  setActivePage: (page: Page) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activePage, setActivePage }) => {
  return (
    <aside className="w-64 bg-white flex-shrink-0 border-r border-gray-200 flex flex-col">
      <div className="h-20 flex items-center justify-center border-b border-gray-200">
        <h1 className="text-2xl font-bold text-primary">Admin Pro</h1>
      </div>
      <nav className="flex-1 px-4 py-6 space-y-2">
        {NAV_ITEMS.map((item) => (
          <a
            key={item.id}
            href="#"
            onClick={(e) => {
              e.preventDefault();
              setActivePage(item.id);
            }}
            className={`flex items-center px-4 py-3 text-gray-600 rounded-lg transition-all duration-200 ease-in-out
              ${activePage === item.id 
                ? 'bg-primary-light text-primary font-semibold' 
                : 'hover:bg-gray-100 hover:text-gray-900'
              }`}
          >
            <span className="mr-3">{item.icon}</span>
            {item.label}
          </a>
        ))}
      </nav>
      <div className="px-4 py-6 border-t border-gray-200">
        <div className="p-4 bg-primary-light rounded-lg text-center">
            <h3 className="font-bold text-primary">Upgrade to Pro</h3>
            <p className="text-sm text-orange-800 mt-1">Get more features and enhance your workflow.</p>
            <button className="mt-4 bg-primary text-white text-sm font-semibold py-2 px-4 rounded-lg hover:opacity-90 transition-opacity">
                Upgrade Now
            </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
