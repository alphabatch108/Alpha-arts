import React from 'react';
import { useApp } from '../context/AppContext';
import { Home, GraduationCap, Award, BookOpen } from 'lucide-react';

export const MobileBottomNav = () => {
  const { activeTab, setActiveTab } = useApp();

  const tabs = [
    { id: 'home', label: 'Home', icon: Home, classId: 'all' },
    { id: 'class-10', label: 'Class 10', icon: GraduationCap, classId: 'class-10' },
    { id: 'class-12', label: 'Class 12', icon: Award, classId: 'class-12-arts' },
    { id: 'notes', label: 'All Notes', icon: BookOpen, classId: null },
  ];

  const handleTabClick = (tab) => {
    setActiveTab(tab.id, tab.classId);
  };

  return (
    <nav className="mobile-bottom-nav">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;
        
        return (
          <button
            key={tab.id}
            onClick={() => handleTabClick(tab)}
            className={`nav-tab-item ${isActive ? 'active' : ''}`}
            aria-label={tab.label}
          >
            {isActive && <div className="nav-tab-indicator" />}
            <div className="tab-icon-wrapper">
              <Icon size={20} />
            </div>
            <span>{tab.label}</span>
          </button>
        );
      })}
    </nav>
  );
};
