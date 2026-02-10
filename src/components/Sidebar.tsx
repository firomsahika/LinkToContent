
import React from 'react';
import { 
  LayoutDashboard, 
  History, 
  Settings, 
  CreditCard, 
  Users, 
  HelpCircle,
  Zap,
  BookOpen
} from 'lucide-react';
import { PageView } from '../../src/app/page';

interface SidebarProps {
  className?: string;
  activePage: PageView;
  onPageChange: (page: PageView) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ className, activePage, onPageChange }) => {
  const navItems: { icon: any; label: string; id: PageView }[] = [
    { icon: LayoutDashboard, label: 'Dashboard', id: 'dashboard' },
    { icon: BookOpen, label: 'Technical SRS', id: 'docs' },
    { icon: History, label: 'Past Generations', id: 'history' },
    { icon: Zap, label: 'Agents', id: 'agents' },
    { icon: Users, label: 'Team', id: 'team' },
    { icon: CreditCard, label: 'Billing', id: 'billing' },
    { icon: Settings, label: 'Settings', id: 'settings' },
  ];

  return (
    <div className={`w-20 lg:w-64 flex flex-col border-r border-slate-200 bg-white h-full transition-all duration-300 ${className}`}>
      <div className="p-6 flex items-center gap-3">
        <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
          <Zap className="w-5 h-5 text-white" />
        </div>
        <span className="font-bold text-xl tracking-tight hidden lg:block">L2C AI</span>
      </div>

      <nav className="flex-1 px-4 space-y-1 mt-4">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onPageChange(item.id)}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl transition-all ${
              activePage === item.id 
                ? 'bg-indigo-50 text-indigo-700 font-medium' 
                : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
            }`}
          >
            <item.icon className={`w-5 h-5 ${activePage === item.id ? 'text-indigo-600' : 'text-slate-400'}`} />
            <span className="hidden lg:block">{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="p-4 border-t border-slate-100">
        <div className="bg-indigo-600 rounded-2xl p-4 text-white hidden lg:block">
          <p className="text-xs font-semibold uppercase tracking-wider opacity-80 mb-1">Current Plan</p>
          <p className="text-sm font-bold mb-3">Startup Pro</p>
          <div className="w-full bg-indigo-400 h-1.5 rounded-full mb-3">
            <div className="bg-white w-3/4 h-full rounded-full"></div>
          </div>
          <button 
            onClick={() => onPageChange('billing')}
            className="w-full bg-white text-indigo-600 text-xs font-bold py-2 rounded-lg hover:bg-indigo-50 transition-colors"
          >
            Upgrade Plan
          </button>
        </div>
        <a href="#" className="flex items-center gap-3 px-3 py-2 mt-4 text-slate-500 hover:text-slate-900 transition-colors">
          <HelpCircle className="w-5 h-5" />
          <span className="hidden lg:block text-sm">Support</span>
        </a>
      </div>
    </div>
  );
};

export default Sidebar;
