
import React from 'react';
import { 
  Code, 
  Cpu, 
  Database, 
  Layers, 
  Terminal, 
  Zap, 
  ArrowRight, 
  Lock, 
  Globe,
  Server,
  Workflow,
  ShieldCheck,
  Layout,
  FileCode,
  Box
} from 'lucide-react';

const DocsView: React.FC = () => {
  return (
    <div className="flex-1 flex flex-col h-full bg-[#FBFBFD] overflow-y-auto p-8 lg:p-12">
      <div className="max-w-5xl mx-auto w-full space-y-16 pb-32">
        
        {/* --- DOCUMENT HEADER --- */}
        <header className="border-b border-slate-200 pb-10">
          <div className="flex items-center gap-2 px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full text-xs font-bold uppercase tracking-widest mb-6 w-fit">
            <ShieldCheck className="w-3 h-3" /> Professional Project Specification
          </div>
          <h1 className="text-5xl font-black text-slate-900 mb-6 tracking-tight">L2C AI: Technical Blueprint</h1>
          <p className="text-xl text-slate-500 leading-relaxed max-w-3xl">
            A comprehensive guide for building a modern, 100% cost-optimized AI content automation platform using Google Gemini 3 and Browser-Edge Rendering.
          </p>
          <div className="flex gap-4 mt-8">
            <div className="bg-slate-900 text-white px-4 py-2 rounded-lg text-xs font-mono">Ver: 1.0.4</div>
            <div className="bg-slate-100 text-slate-600 px-4 py-2 rounded-lg text-xs font-mono">Status: Production Ready</div>
          </div>
        </header>

        {/* --- SECTION: THE NON-TECHNICAL VISION --- */}
        <section>
          <h2 className="text-3xl font-bold text-slate-900 mb-8 flex items-center gap-3">
            <Layout className="w-8 h-8 text-indigo-600" />
            1. Non-Technical Logic (The "Why")
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-slate-800">The Problem</h3>
              <p className="text-slate-600 leading-relaxed">
                Creators spend 90% of their time editing and distributing content rather than creating it. Hiring a video editor costs $2k-$5k/month. 
              </p>
              <h3 className="text-lg font-bold text-slate-800">The L2C Solution</h3>
              <p className="text-slate-600 leading-relaxed">
                L2C AI acts as a virtual 24/7 creative agency. It "listens" to long videos, picks the most viral moments, and writes the social media copy—all for free by leveraging the user's own computer power.
              </p>
            </div>
            <div className="bg-indigo-50 rounded-3xl p-8 border border-indigo-100">
              <h3 className="text-lg font-bold text-indigo-900 mb-4">Core User Journey</h3>
              <ol className="space-y-4 text-sm text-indigo-800">
                <li className="flex gap-3"><span className="w-6 h-6 bg-indigo-600 text-white rounded-full flex items-center justify-center shrink-0 font-bold">1</span> <strong>Paste Link:</strong> User provides a YouTube/Spotify URL.</li>
                <li className="flex gap-3"><span className="w-6 h-6 bg-indigo-600 text-white rounded-full flex items-center justify-center shrink-0 font-bold">2</span> <strong>AI Analysis:</strong> Gemini identifies viral "Golden Nuggets".</li>
                <li className="flex gap-3"><span className="w-6 h-6 bg-indigo-600 text-white rounded-full flex items-center justify-center shrink-0 font-bold">3</span> <strong>Review & Edit:</strong> User tweaks the AI's suggestions.</li>
                <li className="flex gap-3"><span className="w-6 h-6 bg-indigo-600 text-white rounded-full flex items-center justify-center shrink-0 font-bold">4</span> <strong>Auto-Render:</strong> Browser cuts and crops the video for mobile.</li>
              </ol>
            </div>
          </div>
        </section>

        {/* --- SECTION: THE AI AGENT (BRAIN) --- */}
        <section className="bg-white rounded-[40px] border border-slate-200 p-10 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 p-10 opacity-5">
            <Zap className="w-64 h-64 text-indigo-600" />
          </div>
          <h2 className="text-3xl font-bold text-slate-900 mb-8 flex items-center gap-3">
            <Zap className="w-8 h-8 text-indigo-600" />
            2. The AI Agent Layer (The "Brain")
          </h2>
          
          <div className="space-y-8 relative z-10">
            <div>
              <h4 className="font-bold text-slate-800 mb-2 uppercase tracking-widest text-xs">Technology</h4>
              <p className="text-slate-600"><strong>Google Gemini 3 Flash</strong> (Free Tier). It processes 1 million tokens of context, allowing it to analyze transcripts that are hours long without losing detail.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h4 className="font-bold text-slate-800 mb-2 border-l-4 border-indigo-600 pl-4">Agent 1: The Director</h4>
                <p className="text-sm text-slate-500">Task: Segmentation. Scans the transcript for keywords like "however", "the secret is", or high emotional shifts. Returns start/end timestamps.</p>
                <div className="bg-slate-900 rounded-xl p-4 text-[10px] font-mono text-green-400">
                  {"{ \"clips\": [{ \"start\": \"04:20\", \"end\": \"05:10\", \"hook\": \"The $0 Marketing Hack\" }] }"}
                </div>
              </div>
              <div className="space-y-4">
                <h4 className="font-bold text-slate-800 mb-2 border-l-4 border-indigo-600 pl-4">Agent 2: The Socialite</h4>
                <p className="text-sm text-slate-500">Task: Multi-format Copy. Takes a specific 60s snippet and generates a LinkedIn Post, X Thread, and Newsletter summary based on that context.</p>
                <div className="bg-slate-50 rounded-xl p-4 text-[11px] text-slate-600 italic">
                  "Generates context-aware copy using chain-of-thought prompting."
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* --- SECTION: BACKEND & INFRASTRUCTURE --- */}
        <section>
          <h2 className="text-3xl font-bold text-slate-900 mb-8 flex items-center gap-3">
            <Server className="w-8 h-8 text-indigo-600" />
            3. Backend & Infrastructure
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="p-3 bg-slate-100 rounded-2xl"><Globe className="w-6 h-6 text-slate-600" /></div>
                <div>
                  <h4 className="font-bold text-slate-800">Edge Logic (Vercel)</h4>
                  <p className="text-sm text-slate-500">Lightweight Node.js scripts that fetch YouTube metadata and transcripts. These act as the "hands" for the AI Agent.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="p-3 bg-slate-100 rounded-2xl"><Database className="w-6 h-6 text-slate-600" /></div>
                <div>
                  <h4 className="font-bold text-slate-800">Database (Supabase)</h4>
                  <p className="text-sm text-slate-500">Stores user profiles, generation history, and links to the final video assets. Uses Postgres for reliable relational data.</p>
                </div>
              </div>
            </div>
            <div className="bg-slate-900 rounded-3xl p-8 text-white">
              <h4 className="font-bold mb-4 text-indigo-400">The "Free" Secret: FFmpeg.wasm</h4>
              <p className="text-sm text-slate-300 leading-relaxed">
                Traditionally, video rendering costs $0.50 per minute of video. L2C AI avoids this by running the rendering engine <strong>inside the user's browser</strong>. 
                <br/><br/>
                We use WebAssembly to port the world-class FFmpeg C-library into JavaScript. Your users provide the compute power, so your bills stay at zero.
              </p>
            </div>
          </div>
        </section>

        {/* --- SECTION: IMPLEMENTATION ROADMAP --- */}
        <section>
          <h2 className="text-3xl font-bold text-slate-900 mb-8 flex items-center gap-3">
            <Workflow className="w-8 h-8 text-indigo-600" />
            4. Step-by-Step Implementation Guide
          </h2>
          <div className="space-y-4">
            <StepItem number="01" title="Environment Setup" desc="Initialize React with Vite. Setup Tailwind CSS. Create accounts on Supabase and Google AI Studio." />
            <StepItem number="02" title="Auth & DB Integration" desc="Connect Supabase Auth. Create 'generations' table to store AI outputs. Implement the Dashboard routing." />
            <StepItem number="03" title="Intelligence Layer" desc="Integrate @google/genai. Create the 'Director Agent' prompt. Test it with transcript strings to get clean JSON." />
            <StepItem number="04" title="The Scraper Service" desc="Build a serverless function (Vercel/Next.js) to extract transcripts from YouTube URLs via API." />
            <StepItem number="05" title="The Rendering Core" desc="Install @ffmpeg/ffmpeg. Implement the vertical-crop logic (9:16) for short-form video generation." />
            <StepItem number="06" title="UX Polishing" desc="Add the real-time status indicators and the high-fidelity results preview tabs." />
            <StepItem number="07" title="Deployment" desc="Deploy frontend to Vercel. Set up environment variables (GEMINI_API_KEY, SUPABASE_URL)." />
          </div>
        </section>

        {/* --- SECTION: DATA FLOW --- */}
        <section className="bg-indigo-600 rounded-[40px] p-12 text-white shadow-2xl shadow-indigo-200">
          <h2 className="text-3xl font-bold mb-10 flex items-center gap-3">
            <Terminal className="w-8 h-8 text-indigo-200" />
            5. Technical Data Pipeline
          </h2>
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
            <div className="flex-1 space-y-2">
              <div className="w-10 h-10 bg-indigo-500 rounded-xl flex items-center justify-center font-bold mb-4">A</div>
              <h4 className="font-bold">Input Hook</h4>
              <p className="text-xs text-indigo-100">User URL is validated and sent to the transcript extractor.</p>
            </div>
            <ArrowRight className="hidden md:block w-8 h-8 text-indigo-400" />
            <div className="flex-1 space-y-2">
              <div className="w-10 h-10 bg-indigo-500 rounded-xl flex items-center justify-center font-bold mb-4">B</div>
              <h4 className="font-bold">Gemini 3 Logic</h4>
              <p className="text-xs text-indigo-100">Transcript is summarized and segmented into timestamp markers.</p>
            </div>
            <ArrowRight className="hidden md:block w-8 h-8 text-indigo-400" />
            <div className="flex-1 space-y-2">
              <div className="w-10 h-10 bg-indigo-500 rounded-xl flex items-center justify-center font-bold mb-4">C</div>
              <h4 className="font-bold">Browser WASM</h4>
              <p className="text-xs text-indigo-100">FFmpeg cuts the video chunks locally and crops them for mobile.</p>
            </div>
            <ArrowRight className="hidden md:block w-8 h-8 text-indigo-400" />
            <div className="flex-1 space-y-2">
              <div className="w-10 h-10 bg-indigo-500 rounded-xl flex items-center justify-center font-bold mb-4">D</div>
              <h4 className="font-bold">Cloud Persistence</h4>
              <p className="text-xs text-indigo-100">Assets are saved to Supabase Storage and history updated in DB.</p>
            </div>
          </div>
        </section>

        {/* --- FINAL ACTION --- */}
        <section className="text-center pt-10 pb-20">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Download Full Project Documentation</h2>
          <div className="flex justify-center gap-6">
            <button className="flex items-center gap-2 px-8 py-4 bg-indigo-600 text-white font-bold rounded-2xl hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200">
              <FileCode className="w-5 h-5" /> Export as PDF
            </button>
            <button className="flex items-center gap-2 px-8 py-4 bg-white border border-slate-200 text-slate-600 font-bold rounded-2xl hover:bg-slate-50 transition-all">
              <Box className="w-5 h-5" /> Copy Config Schema
            </button>
          </div>
        </section>

      </div>
    </div>
  );
};

const StepItem = ({ number, title, desc }: { number: string; title: string; desc: string }) => (
  <div className="flex items-start gap-6 p-6 rounded-3xl border border-slate-100 hover:border-indigo-100 hover:bg-indigo-50/30 transition-all group">
    <div className="text-4xl font-black text-slate-200 group-hover:text-indigo-200 transition-colors leading-none">{number}</div>
    <div>
      <h4 className="text-lg font-bold text-slate-800 mb-1">{title}</h4>
      <p className="text-sm text-slate-500 leading-relaxed">{desc}</p>
    </div>
  </div>
);

export default DocsView;
