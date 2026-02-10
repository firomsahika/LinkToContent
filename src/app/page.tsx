"use client"

import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import InputPanel from '../components/InputPanel';
import OutputPanel from '../components/OutPutPanel';
import HistoryView from '../components/HistoryView';
import AgentsView from '../components/AgentsView';
import TeamView from '../components/TeamView';
import BillingView from '../components/BillingView';
import SettingsView from '../components/SettingsView';
import DocsView from '../components/DocsView';
import { AppStatus, ContentType, GenerationSettings} from "../../types"

export type PageView = 'dashboard' | 'history' | 'agents' | 'team' | 'billing' | 'settings' | 'docs';

const App: React.FC = () => {
  const [activePage, setActivePage] = useState<PageView>('dashboard');
  const [status, setStatus] = useState<AppStatus>('idle');
  const [selectedTypes, setSelectedTypes] = useState<ContentType[]>(['tiktok_shorts', 'linkedin_posts']);
  const [settings, setSettings] = useState<GenerationSettings>({
    language: 'English',
    tone: 'Viral',
    brandVoice: true,
    autoCaptions: true,
    subtitleStyle: 'Dynamic',
    aspectRatio: '9:16',
    clipLength: '60s'
  });

  const handleGenerate = async (url: string) => {
    if (!url) return;
    setStatus('analyzing');
    
    // Simulate AI workflow
    setTimeout(() => {
      setStatus('generating');
      setTimeout(() => {
        setStatus('completed');
      }, 3000);
    }, 2000);
  };

  const renderContent = () => {
    switch (activePage) {
      case 'dashboard':
        return (
          <main className="flex-1 flex flex-col md:flex-row h-full overflow-hidden">
            <div className="w-full md:w-5/12 lg:w-[400px] xl:w-[450px] border-r border-slate-200 bg-white flex flex-col h-full z-10 shadow-sm overflow-y-auto">
              <InputPanel 
                status={status}
                selectedTypes={selectedTypes}
                setSelectedTypes={setSelectedTypes}
                settings={settings}
                setSettings={setSettings}
                onGenerate={handleGenerate}
              />
            </div>
            <div className="flex-1 bg-slate-50 flex flex-col h-full overflow-hidden">
              <OutputPanel status={status} selectedTypes={selectedTypes} />
            </div>
          </main>
        );
      case 'history':
        return <HistoryView />;
      case 'agents':
        return <AgentsView />;
      case 'team':
        return <TeamView />;
      case 'billing':
        return <BillingView />;
      case 'settings':
        return <SettingsView />;
      case 'docs':
        return <DocsView />;
      default:
        return null;
    }
  };

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      <Sidebar 
        className="hidden lg:flex" 
        activePage={activePage} 
        onPageChange={setActivePage} 
      />
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        {renderContent()}
      </div>
    </div>
  );
};

export default App;
