
import React, { useState } from 'react';
import { 
  ChevronDown, 
  ChevronUp, 
  Globe, 
  Video, 
  Music, 
  Link as LinkIcon, 
  Sparkles,
  Settings2,
  Check
} from 'lucide-react';
import { ContentType, GenerationSettings, AppStatus } from '../../types';

interface InputPanelProps {
  status: AppStatus;
  selectedTypes: ContentType[];
  setSelectedTypes: React.Dispatch<React.SetStateAction<ContentType[]>>;
  settings: GenerationSettings;
  setSettings: React.Dispatch<React.SetStateAction<GenerationSettings>>;
  onGenerate: (url: string) => void;
}

const InputPanel: React.FC<InputPanelProps> = ({ 
  status, 
  selectedTypes, 
  setSelectedTypes, 
  settings, 
  setSettings, 
  onGenerate 
}) => {
  const [url, setUrl] = useState('');
  const [isAdvancedOpen, setIsAdvancedOpen] = useState(false);

  const contentOptions: { id: ContentType; label: string; icon: string }[] = [
    { id: 'tiktok_shorts', label: 'TikTok Shorts', icon: '🎬' },
    { id: 'instagram_reels', label: 'Instagram Reels', icon: '📱' },
    { id: 'youtube_shorts', label: 'YouTube Shorts', icon: '▶' },
    { id: 'twitter_threads', label: 'X Threads', icon: '🧵' },
    { id: 'linkedin_posts', label: 'LinkedIn Posts', icon: '💼' },
    { id: 'newsletter', label: 'Newsletter', icon: '📰' },
    { id: 'blog_post', label: 'Blog Post', icon: '📝' },
    { id: 'seo_content', label: 'SEO Content', icon: '🧠' },
    { id: 'distribution_plan', label: 'Distribution', icon: '📈' },
    { id: 'monetization', label: 'Monetization', icon: '💰' },
  ];

  const toggleType = (id: ContentType) => {
    setSelectedTypes(prev => 
      prev.includes(id) ? prev.filter(t => t !== id) : [...prev, id]
    );
  };

  return (
    <div className="p-6 h-full flex flex-col">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900 mb-1">L2C AI</h1>
        <p className="text-sm text-slate-500">Turn any content into a content business.</p>
      </div>

      <div className="space-y-6 flex-1">
        {/* Link Input */}
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Paste your content link
          </label>
          <div className="relative">
            <input
              type="text"
              className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-4 pl-12 pr-4 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all outline-none"
              placeholder="YouTube / Spotify / Google Drive link..."
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
            <LinkIcon className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
          </div>
        </div>

        {/* Content Type Selector */}
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-3">
            What should we generate?
          </label>
          <div className="grid grid-cols-2 gap-3">
            {contentOptions.map((opt) => (
              <button
                key={opt.id}
                onClick={() => toggleType(opt.id)}
                className={`flex items-center gap-2 p-3 rounded-xl border text-left transition-all ${
                  selectedTypes.includes(opt.id)
                    ? 'bg-indigo-50 border-indigo-200 ring-1 ring-indigo-200'
                    : 'bg-white border-slate-200 hover:border-slate-300'
                }`}
              >
                <span className="text-lg">{opt.icon}</span>
                <span className={`text-xs font-medium ${selectedTypes.includes(opt.id) ? 'text-indigo-700' : 'text-slate-600'}`}>
                  {opt.label}
                </span>
                {selectedTypes.includes(opt.id) && <Check className="w-3 h-3 ml-auto text-indigo-600" />}
              </button>
            ))}
          </div>
        </div>

        {/* Advanced Options */}
        <div className="border-t border-slate-100 pt-4">
          <button
            onClick={() => setIsAdvancedOpen(!isAdvancedOpen)}
            className="flex items-center justify-between w-full text-slate-600 hover:text-slate-900 transition-colors py-2"
          >
            <div className="flex items-center gap-2 font-medium text-sm">
              <Settings2 className="w-4 h-4" />
              Advanced Settings
            </div>
            {isAdvancedOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>

          {isAdvancedOpen && (
            <div className="mt-4 space-y-4 pb-4 animate-in fade-in slide-in-from-top-2 duration-300">
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Tone of Voice</label>
                <select 
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-sm outline-none focus:border-indigo-500"
                  value={settings.tone}
                  onChange={(e) => setSettings({...settings, tone: e.target.value as any})}
                >
                  <option>Viral</option>
                  <option>Professional</option>
                  <option>Casual</option>
                  <option>Educational</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Aspect Ratio</label>
                  <select 
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-sm outline-none"
                    value={settings.aspectRatio}
                    onChange={(e) => setSettings({...settings, aspectRatio: e.target.value as any})}
                  >
                    <option>9:16 (Phone)</option>
                    <option>1:1 (Square)</option>
                    <option>16:9 (Widescreen)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Max Length</label>
                  <select 
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-sm outline-none"
                    value={settings.clipLength}
                    onChange={(e) => setSettings({...settings, clipLength: e.target.value as any})}
                  >
                    <option>15s</option>
                    <option>30s</option>
                    <option>60s</option>
                  </select>
                </div>
              </div>
              
              <div className="flex items-center justify-between py-1">
                <span className="text-sm text-slate-600">Auto Captions</span>
                <input 
                  type="checkbox" 
                  checked={settings.autoCaptions}
                  onChange={(e) => setSettings({...settings, autoCaptions: e.target.checked})}
                  className="w-4 h-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500" 
                />
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="pt-6 sticky bottom-0 bg-white border-t border-slate-100">
        <button
          onClick={() => onGenerate(url)}
          disabled={status !== 'idle' || !url}
          className={`w-full py-4 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all shadow-lg ${
            status === 'idle' && url
              ? 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-indigo-200'
              : 'bg-slate-100 text-slate-400 cursor-not-allowed shadow-none'
          }`}
        >
          <Sparkles className="w-5 h-5" />
          {status === 'idle' ? 'Generate Content' : 'AI Agent Working...'}
        </button>
      </div>
    </div>
  );
};

export default InputPanel;
