"use client";

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
import { AppStatus, ContentType, GenerationSettings } from "../../types";

export type PageView = 'dashboard' | 'history' | 'agents' | 'team' | 'billing' | 'settings' | 'docs';

const App: React.FC = () => {
  const [activePage, setActivePage] = useState<PageView>('dashboard');
  const [status, setStatus] = useState<AppStatus>('idle');
  
  // NEW: State for the local file and AI Analysis results
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [aiData, setAiData] = useState<any>(null);

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

  // Updated handler to receive the File object
  const handleGenerate = async (file: File) => {
    if (!file) return;
    setVideoFile(file);
    setStatus('analyzing');
    
    try {
      // Step 1: Create FormData to send the file to your Next.js API
      const formData = new FormData();
      formData.append('video', file);

      // Step 2: Call your API (which will handle transcription and Groq logic)
      const response = await fetch('/api/process-video', {
        method: 'POST',
        body: formData, // Sending the actual file now!
      });

      if (!response.ok) throw new Error("Processing failed");

      const data = await response.json();
      
      // Step 3: Update state with AI results
      setAiData(data);
      setStatus('completed');
    } catch (error) {
      console.error("Error during generation:", error);
      setStatus('idle');
    }
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
                onGenerate={handleGenerate} // Now receives a File
              />
            </div>
            <div className="flex-1 bg-slate-50 flex flex-col h-full overflow-hidden">
              {/* Pass the video file and aiData to OutputPanel for Phase 2 snipping */}
              <OutputPanel 
                status={status} 
                selectedTypes={selectedTypes} 
                videoFile={videoFile} 
                aiData={aiData}
              />
            </div>
          </main>
        );
      case 'history': return <HistoryView />;
      case 'agents': return <AgentsView />;
      case 'team': return <TeamView />;
      case 'billing': return <BillingView />;
      case 'settings': return <SettingsView />;
      case 'docs': return <DocsView />;
      default: return null;
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