
import React from 'react';
import { Sparkles, Brain, Mic2, Layout, Plus, Check } from 'lucide-react';

const AgentsView: React.FC = () => {
  const agents = [
    { 
      name: 'Viral Vera', 
      role: 'Short-form Specialist', 
      icon: Sparkles, 
      color: 'bg-pink-500', 
      desc: 'Optimizes for high retention and viral potential on TikTok and Reels.',
      capabilities: ['Auto-reframe', 'Dynamic Captions', 'Hook Engine']
    },
    { 
      name: 'SaaS Sam', 
      role: 'Growth Strategist', 
      icon: Brain, 
      color: 'bg-indigo-500', 
      desc: 'Expert in turning long videos into educational LinkedIn posts and X threads.',
      capabilities: ['B2B Tone', 'Thread Formatting', 'CTA Generator']
    },
    { 
      name: 'Newsletter Ned', 
      role: 'Content Curator', 
      icon: Mic2, 
      color: 'bg-orange-500', 
      desc: 'Specializes in long-form writing, newsletters, and blog posts.',
      capabilities: ['SEO Optimization', 'Summary Logic', 'Link Inclusion']
    },
  ];

  return (
    <div className="flex-1 flex flex-col h-full bg-[#FBFBFD] overflow-y-auto p-8">
      <div className="max-w-6xl mx-auto w-full">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">AI Agents</h1>
            <p className="text-slate-500 mt-1">Customize your creative workforce for different platforms.</p>
          </div>
          <button className="flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-2xl text-sm font-bold shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition-all">
            <Plus className="w-5 h-5" /> Hire New Agent
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {agents.map((agent) => (
            <div key={agent.name} className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm hover:shadow-md transition-all flex flex-col group">
              <div className="flex items-start justify-between mb-6">
                <div className={`w-14 h-14 rounded-2xl ${agent.color} flex items-center justify-center text-white shadow-lg shadow-${agent.color}/20`}>
                  <agent.icon className="w-8 h-8" />
                </div>
                <div className="flex flex-col items-end">
                  <span className="bg-green-100 text-green-700 text-[10px] font-bold px-2 py-1 rounded-lg uppercase tracking-wider">Active</span>
                </div>
              </div>
              
              <h3 className="text-xl font-bold text-slate-900 mb-1">{agent.name}</h3>
              <p className="text-indigo-600 text-sm font-medium mb-4">{agent.role}</p>
              <p className="text-slate-500 text-sm leading-relaxed mb-6">{agent.desc}</p>
              
              <div className="space-y-3 mt-auto">
                <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Capabilities</h4>
                <div className="flex flex-wrap gap-2">
                  {agent.capabilities.map(cap => (
                    <span key={cap} className="flex items-center gap-1 text-[11px] font-bold text-slate-600 bg-slate-50 px-2 py-1 rounded-md">
                      <Check className="w-3 h-3 text-green-500" /> {cap}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-slate-50">
                <button className="w-full py-3 rounded-xl border border-slate-200 text-sm font-bold text-slate-600 hover:bg-slate-50 hover:border-slate-300 transition-all">
                  Configure Personality
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AgentsView;
