
import React, { useState } from 'react';
import { 
  Video, 
  FileText, 
  Mail, 
  Share2, 
  BarChart3, 
  Download, 
  Edit3, 
  Copy,
  Calendar,
  CheckCircle2,
  Clock,
  ExternalLink
} from 'lucide-react';
import { AppStatus, ContentType } from '../../types';

interface OutputPanelProps {
  status: AppStatus;
  selectedTypes: ContentType[];
}

const OutputPanel: React.FC<OutputPanelProps> = ({ status, selectedTypes }) => {
  const [activeTab, setActiveTab] = useState('shorts');

  const tabs = [
    { id: 'shorts', label: 'Shorts', icon: Video },
    { id: 'posts', label: 'Posts', icon: FileText },
    { id: 'newsletter', label: 'Newsletter', icon: Mail },
    { id: 'strategy', label: 'Strategy', icon: Share2 },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
  ];

  if (status === 'idle') {
    return (
      <div className="flex-1 flex flex-col items-center justify-center text-center p-10">
        <div className="w-20 h-20 bg-indigo-50 rounded-3xl flex items-center justify-center mb-6">
          <SparklesIcon className="w-10 h-10 text-indigo-400" />
        </div>
        <h2 className="text-xl font-bold text-slate-800 mb-2">Ready to transform your content?</h2>
        <p className="text-slate-500 max-w-sm">Paste a link on the left to start generating viral shorts, threads, and newsletters automatically.</p>
      </div>
    );
  }

  if (status === 'analyzing' || status === 'generating') {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-10 bg-white">
        <div className="relative w-24 h-24 mb-8">
          <div className="absolute inset-0 border-4 border-indigo-100 rounded-full"></div>
          <div className="absolute inset-0 border-4 border-indigo-600 rounded-full border-t-transparent animate-spin"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <ZapIcon className="w-8 h-8 text-indigo-600 animate-pulse" />
          </div>
        </div>
        <h2 className="text-2xl font-bold text-slate-800 mb-2">
          {status === 'analyzing' ? 'Analyzing Source Content...' : 'AI Agent is Crafting Assets...'}
        </h2>
        <div className="flex flex-col gap-3 w-full max-w-md mt-6">
          <StatusRow label="Scanning key moments" done={status === 'generating'} active={status === 'analyzing'} />
          <StatusRow label="Generating viral scripts" active={status === 'generating'} />
          <StatusRow label="Designing SEO distribution plan" />
          <StatusRow label="Assembling final newsletter" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden">
      {/* Tab Navigation */}
      <div className="bg-white border-b border-slate-200 px-6 pt-6 sticky top-0 z-20">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" />
              Generation Complete
            </div>
            <span className="text-xs text-slate-400">Analysis of "The Future of AI" Podcast</span>
          </div>
          <div className="flex items-center gap-2">
            <button className="text-xs font-bold text-slate-600 hover:bg-slate-50 px-3 py-2 rounded-lg border border-slate-200 flex items-center gap-2">
              <Share2 className="w-4 h-4" /> Share Results
            </button>
            <button className="text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-lg flex items-center gap-2 shadow-md shadow-indigo-100">
              <Download className="w-4 h-4" /> Export All
            </button>
          </div>
        </div>
        
        <div className="flex gap-8">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`pb-4 text-sm font-semibold flex items-center gap-2 transition-all border-b-2 ${
                activeTab === tab.id 
                  ? 'border-indigo-600 text-indigo-600' 
                  : 'border-transparent text-slate-400 hover:text-slate-600'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-y-auto p-6 bg-[#FBFBFD]">
        <div className="max-w-5xl mx-auto animate-in fade-in duration-500">
          {activeTab === 'shorts' && <ShortsGrid />}
          {activeTab === 'posts' && <PostsList />}
          {activeTab === 'newsletter' && <NewsletterView />}
          {activeTab === 'strategy' && <DistributionPlan />}
          {activeTab === 'analytics' && <AnalyticsMock />}
        </div>
      </div>
    </div>
  );
};

// --- Helper Components ---

const StatusRow = ({ label, done, active }: { label: string; done?: boolean; active?: boolean }) => (
  <div className={`flex items-center gap-3 p-3 rounded-xl border ${active ? 'bg-indigo-50 border-indigo-100 ring-1 ring-indigo-200' : 'bg-slate-50 border-slate-100'}`}>
    {done ? (
      <CheckCircle2 className="w-5 h-5 text-green-500" />
    ) : active ? (
      <div className="w-5 h-5 border-2 border-indigo-600 border-t-transparent animate-spin rounded-full"></div>
    ) : (
      <div className="w-5 h-5 border-2 border-slate-200 rounded-full"></div>
    )}
    <span className={`text-sm font-medium ${active ? 'text-indigo-700' : done ? 'text-slate-600' : 'text-slate-400'}`}>
      {label}
    </span>
  </div>
);

const ShortsGrid = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {[1, 2, 3, 4, 5, 6].map(i => (
      <div key={i} className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow group">
        <div className="aspect-[9/16] bg-slate-900 relative">
          <img src={`https://picsum.photos/seed/${i + 20}/400/700`} alt="Preview" className="w-full h-full object-cover opacity-80" />
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/20">
            <button className="bg-white/90 p-4 rounded-full text-indigo-600 shadow-xl scale-90 group-hover:scale-100 transition-transform">
              <Video className="w-6 h-6 fill-current" />
            </button>
          </div>
          <div className="absolute top-4 left-4 flex gap-2">
            <span className="bg-black/60 backdrop-blur-md text-white text-[10px] font-bold px-2 py-1 rounded-lg">59s</span>
            <span className="bg-indigo-600 text-white text-[10px] font-bold px-2 py-1 rounded-lg">Viral Potential</span>
          </div>
        </div>
        <div className="p-4">
          <h4 className="font-bold text-slate-800 text-sm mb-2 line-clamp-1">Clip #{i}: The Secret to Scale</h4>
          <p className="text-xs text-slate-500 mb-4 line-clamp-2">"When you think about growth, don't focus on the destination. Focus on the..."</p>
          <div className="flex items-center justify-between border-t border-slate-100 pt-4">
            <div className="flex gap-2">
              <button className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors">
                <Edit3 className="w-4 h-4" />
              </button>
              <button className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors">
                <Download className="w-4 h-4" />
              </button>
            </div>
            <button className="text-[10px] font-bold text-indigo-600 bg-indigo-50 px-3 py-1.5 rounded-lg hover:bg-indigo-100 transition-colors">
              Post to Reels
            </button>
          </div>
        </div>
      </div>
    ))}
  </div>
);

const PostsList = () => (
  <div className="space-y-6">
    {['LinkedIn', 'Twitter (X)', 'Instagram'].map((platform, idx) => (
      <div key={idx} className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
              platform === 'LinkedIn' ? 'bg-blue-50 text-blue-600' :
              platform === 'Twitter (X)' ? 'bg-slate-900 text-white' : 'bg-pink-50 text-pink-600'
            }`}>
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-slate-900">{platform} Post</h4>
              <p className="text-xs text-slate-500">Optimized for high engagement</p>
            </div>
          </div>
          <div className="flex gap-2">
            <button className="p-2 border border-slate-200 rounded-xl text-slate-500 hover:bg-slate-50">
              <Copy className="w-4 h-4" />
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-slate-800 transition-colors">
              <Calendar className="w-4 h-4" /> Schedule
            </button>
          </div>
        </div>
        <div className="bg-slate-50 rounded-2xl p-6 text-sm text-slate-700 leading-relaxed border border-slate-100 italic">
          {platform === 'Twitter (X)' ? (
            <div className="space-y-4">
              <p>1/ I just spent 4 hours analyzing how SaaS founders are using AI in 2025. 🧵</p>
              <p>2/ The common theme? It's not about replacing humans. It's about augmenting the creative process.</p>
              <p>3/ Specifically, these 3 tactics are changing everything...</p>
              <div className="text-indigo-600 font-medium cursor-pointer">#SaaS #AI #Entrepreneurship</div>
            </div>
          ) : (
            <p>
              Most founders think that content is a chore. But the reality is that content is your most scalable salesperson.<br/><br/>
              After talking to 100+ creators, I found a pattern: those who win aren't working harder. They are leveraging AI agents to multiply their presence.<br/><br/>
              Here's the framework we used to turn a single podcast into 45 pieces of content...
            </p>
          )}
        </div>
      </div>
    ))}
  </div>
);

const NewsletterView = () => (
  <div className="bg-white rounded-3xl border border-slate-200 p-10 shadow-sm max-w-3xl mx-auto">
    <div className="text-center mb-10">
      <h2 className="text-3xl font-extrabold text-slate-900 mb-4">The Content Automation Edge</h2>
      <div className="flex items-center justify-center gap-2 text-slate-500 text-sm">
        <Clock className="w-4 h-4" /> 5 min read
        <span className="mx-2">•</span>
        <Calendar className="w-4 h-4" /> Generated June 12, 2025
      </div>
    </div>
    
    <div className="prose prose-slate max-w-none space-y-6">
      <div className="bg-indigo-50 border-l-4 border-indigo-600 p-6 rounded-r-xl">
        <h4 className="text-indigo-900 font-bold mb-2">Executive Summary</h4>
        <p className="text-indigo-800 text-sm leading-relaxed">
          This episode dives deep into the transformation of the creator economy. We explore why traditional content silos are failing and how "Liquid Content" strategies are becoming the gold standard for top-tier brands.
        </p>
      </div>
      
      <h3 className="text-xl font-bold text-slate-800">1. The Death of Single-Platform Strategy</h3>
      <p className="text-slate-600 text-sm leading-relaxed">
        We're entering an era where platform-specific content is too expensive to produce manually. The ROI of creating a video solely for YouTube is diminishing compared to a multi-platform distribution engine.
      </p>

      <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
        <h4 className="font-bold text-slate-800 mb-3">Key Takeaways</h4>
        <ul className="space-y-2">
          {['Leverage AI for initial structure', 'Focus on "Hook" variations', 'Emotional connection > High production'].map((item, i) => (
            <li key={i} className="flex items-start gap-3 text-slate-600 text-sm">
              <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-indigo-500 shrink-0"></div>
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>

    <div className="mt-10 pt-10 border-t border-slate-100 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <button className="text-xs font-bold text-slate-600 border border-slate-200 px-4 py-2 rounded-xl hover:bg-slate-50">Save as Draft</button>
        <button className="text-xs font-bold text-slate-600 border border-slate-200 px-4 py-2 rounded-xl hover:bg-slate-50">Send Test Email</button>
      </div>
      <button className="bg-indigo-600 text-white px-6 py-2 rounded-xl text-xs font-bold hover:bg-indigo-700 transition-colors flex items-center gap-2">
        Publish Everywhere <ExternalLink className="w-3 h-3" />
      </button>
    </div>
  </div>
);

const DistributionPlan = () => (
  <div className="space-y-6">
    <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm">
      <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
        <Calendar className="w-5 h-5 text-indigo-600" />
        7-Day Distribution Strategy
      </h3>
      
      <div className="grid grid-cols-7 gap-4">
        {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, i) => (
          <div key={day} className={`rounded-2xl border p-4 flex flex-col items-center ${i === 0 ? 'bg-indigo-50 border-indigo-200' : 'bg-slate-50 border-slate-100'}`}>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">{day}</span>
            <div className="space-y-1.5 w-full">
              <div className="w-full h-1 bg-indigo-400 rounded-full"></div>
              {i % 2 === 0 && <div className="w-2/3 h-1 bg-pink-400 rounded-full mx-auto"></div>}
              {i % 3 === 0 && <div className="w-1/2 h-1 bg-green-400 rounded-full mx-auto"></div>}
            </div>
            <div className="mt-3 text-[10px] font-bold text-slate-500">{3 - (i % 3)} Assets</div>
          </div>
        ))}
      </div>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm">
        <h4 className="font-bold text-slate-800 mb-4">Platform-Wise Optimization</h4>
        <div className="space-y-4">
          {[
            { p: 'LinkedIn', time: '8:45 AM', advice: 'Focus on insightful hook' },
            { p: 'TikTok', time: '11:00 AM', advice: 'Use trending audio "Hyper-Loop"' },
            { p: 'Instagram', time: '6:30 PM', advice: 'Reply to comments in 1st hour' }
          ].map(row => (
            <div key={row.p} className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
              <div>
                <p className="text-sm font-bold text-slate-800">{row.p}</p>
                <p className="text-[10px] text-slate-500 uppercase tracking-wider">{row.advice}</p>
              </div>
              <div className="text-right">
                <p className="text-xs font-bold text-indigo-600">{row.time}</p>
                <p className="text-[10px] text-slate-400">Peak hour</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm">
        <h4 className="font-bold text-slate-800 mb-4">Monetization Checklist</h4>
        <div className="space-y-3">
          {[
            'Embed affiliate link in YT description',
            'Mention "Creator Pro" course in Newsletter',
            'Link to lead magnet in X Thread'
          ].map((item, i) => (
            <label key={i} className="flex items-center gap-3 cursor-pointer group">
              <div className="w-5 h-5 rounded border border-slate-300 flex items-center justify-center group-hover:border-indigo-400">
                <Check className="w-3 h-3 text-indigo-600 opacity-0 group-hover:opacity-40" />
              </div>
              <span className="text-xs text-slate-600">{item}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  </div>
);

const AnalyticsMock = () => (
  <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm text-center">
    <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
      <BarChart3 className="w-8 h-8 text-slate-300" />
    </div>
    <h3 className="font-bold text-slate-800 mb-2">Predictive Performance Analytics</h3>
    <p className="text-sm text-slate-500 max-w-sm mx-auto mb-6">
      Based on your past results, this content is predicted to reach <span className="text-indigo-600 font-bold">12k - 18k people</span> across all platforms.
    </p>
    <div className="w-full h-32 bg-slate-50 rounded-2xl flex items-end justify-center gap-4 px-10">
      {[40, 70, 45, 90, 65, 80, 55].map((h, i) => (
        <div key={i} className="flex-1 bg-indigo-200 rounded-t-lg transition-all hover:bg-indigo-600" style={{ height: `${h}%` }}></div>
      ))}
    </div>
    <div className="mt-8 grid grid-cols-3 gap-4">
      <div className="text-center">
        <p className="text-2xl font-black text-slate-900">82%</p>
        <p className="text-[10px] text-slate-400 uppercase font-bold tracking-widest">Viral Score</p>
      </div>
      <div className="text-center">
        <p className="text-2xl font-black text-slate-900">4.2x</p>
        <p className="text-[10px] text-slate-400 uppercase font-bold tracking-widest">Efficiency</p>
      </div>
      <div className="text-center">
        <p className="text-2xl font-black text-slate-900">+12%</p>
        <p className="text-[10px] text-slate-400 uppercase font-bold tracking-widest">Growth Forecast</p>
      </div>
    </div>
  </div>
);

// --- Custom Icons ---

const SparklesIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
  </svg>
);

const ZapIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
  </svg>
);

const Check = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
  </svg>
);


export default OutputPanel;
