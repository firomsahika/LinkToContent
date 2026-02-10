
import React from 'react';
import { User, Bell, Key, Globe, LogOut, ChevronRight } from 'lucide-react';

const SettingsView: React.FC = () => {
  const sections = [
    { 
      title: 'Account Profile', 
      desc: 'Update your personal details and public presence.', 
      icon: User, 
      color: 'text-blue-600', 
      bg: 'bg-blue-50' 
    },
    { 
      title: 'Security & Access', 
      desc: 'Change passwords and manage multi-factor auth.', 
      icon: Key, 
      color: 'text-indigo-600', 
      bg: 'bg-indigo-50' 
    },
    { 
      title: 'API Integrations', 
      desc: 'Manage connections to YouTube, TikTok, and X.', 
      icon: Globe, 
      color: 'text-green-600', 
      bg: 'bg-green-50' 
    },
    { 
      title: 'Notification Settings', 
      desc: 'Control which emails and alerts you receive.', 
      icon: Bell, 
      color: 'text-orange-600', 
      bg: 'bg-orange-50' 
    },
  ];

  return (
    <div className="flex-1 flex flex-col h-full bg-[#FBFBFD] overflow-y-auto p-8">
      <div className="max-w-4xl mx-auto w-full">
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-slate-900">Settings</h1>
          <p className="text-slate-500 mt-1">Configure your workspace and individual preferences.</p>
        </div>

        <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm mb-8">
          <div className="p-8 border-b border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-6">
              <img src="https://i.pravatar.cc/150?u=alex" alt="Profile" className="w-20 h-20 rounded-3xl object-cover shadow-xl border-4 border-white ring-1 ring-slate-100" />
              <div>
                <h3 className="text-xl font-bold text-slate-900">Alex Rivera</h3>
                <p className="text-slate-500 text-sm">Pro Creator • Joined Jan 2025</p>
              </div>
            </div>
            <button className="px-6 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50 transition-all">
              Edit Photo
            </button>
          </div>

          <div className="divide-y divide-slate-100">
            {sections.map(item => (
              <button key={item.title} className="w-full flex items-center justify-between p-8 hover:bg-slate-50 transition-all group">
                <div className="flex items-center gap-5 text-left">
                  <div className={`w-12 h-12 rounded-2xl ${item.bg} ${item.color} flex items-center justify-center`}>
                    <item.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">{item.title}</h4>
                    <p className="text-sm text-slate-500">{item.desc}</p>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-slate-600 transition-colors" />
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-4 items-center justify-between px-8 py-6 bg-red-50 rounded-3xl border border-red-100">
          <div>
            <h4 className="font-bold text-red-900">Danger Zone</h4>
            <p className="text-xs text-red-700 mt-1">Permanently delete your account and all generated assets.</p>
          </div>
          <div className="flex gap-3">
             <button className="px-6 py-2 rounded-xl text-xs font-bold text-red-700 bg-white border border-red-200 hover:bg-red-50 transition-all flex items-center gap-2">
              <LogOut className="w-4 h-4" /> Logout
            </button>
            <button className="px-6 py-2 rounded-xl text-xs font-bold text-white bg-red-600 hover:bg-red-700 shadow-md shadow-red-100 transition-all">
              Delete Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsView;
