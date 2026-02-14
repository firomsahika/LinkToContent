"use client";
import React, { useState, useRef, useEffect } from 'react';
import { 
  Video, FileText, Mail, Share2, BarChart3, Download, Edit3, 
  Copy, Calendar, CheckCircle2, Clock, ExternalLink, Scissors, Loader2, Sparkles
} from 'lucide-react';
import { AppStatus, ContentType } from '../../types';
import { FFmpeg } from '@ffmpeg/ffmpeg';
import { fetchFile, toBlobURL } from '@ffmpeg/util';

interface OutputPanelProps {
  status: AppStatus;
  selectedTypes: ContentType[];
  videoFile: File | null; // Received from Root Page
  aiData: any;           // Received from Root Page (JSON with viral_clips)
}

const OutputPanel: React.FC<OutputPanelProps> = ({ status, videoFile, aiData }) => {
  const [activeTab, setActiveTab] = useState('shorts');
  const [processingIdx, setProcessingIdx] = useState<number | null>(null);
  const [generatedClips, setGeneratedClips] = useState<{ [key: number]: string }>({});
  const ffmpegRef = useRef(new FFmpeg());

  // Initialize FFmpeg
  const loadFFmpeg = async () => {
    const ffmpeg = ffmpegRef.current;
    if (ffmpeg.loaded) return;
    
    const baseURL = 'https://unpkg.com/@ffmpeg/core@0.12.6/dist/umd';
    await ffmpeg.load({
      coreURL: await toBlobURL(`${baseURL}/ffmpeg-core.js`, 'text/javascript'),
      wasmURL: await toBlobURL(`${baseURL}/ffmpeg-core.wasm`, 'application/wasm'),
    });
  };

  const handleSnip = async (index: number, start: string, end: string) => {
    if (!videoFile) return;
    setProcessingIdx(index);
    
    try {
      const ffmpeg = ffmpegRef.current;
      await loadFFmpeg();

      // Write source to virtual memory
      await ffmpeg.writeFile('input.mp4', await fetchFile(videoFile));

      // FFmpeg Command: Cut + 9:16 Center Crop
      await ffmpeg.exec([
        '-i', 'input.mp4',
        '-ss', start,
        '-to', end,
        '-vf', "crop=ih*(9/16):ih:(iw-ow)/2:0", 
        '-c:v', 'libx264', '-preset', 'ultrafast', 'output.mp4'
      ]);

      const data = await ffmpeg.readFile('output.mp4');
      const url = URL.createObjectURL(new Blob([(data as any).buffer], { type: 'video/mp4' }));
      
      setGeneratedClips(prev => ({ ...prev, [index]: url }));
    } catch (err) {
      console.error("FFmpeg Error:", err);
    } finally {
      setProcessingIdx(null);
    }
  };

  // --- Render Logic ---

  if (status === 'idle') {
    return (
      <div className="flex-1 flex flex-col items-center justify-center text-center p-10">
        <div className="w-20 h-20 bg-indigo-50 rounded-3xl flex items-center justify-center mb-6">
          <Sparkles className="w-10 h-10 text-indigo-400" />
        </div>
        <h2 className="text-xl font-bold text-slate-800 mb-2">Upload a video to start</h2>
        <p className="text-slate-500 max-w-sm">Your AI-generated shorts, posts, and newsletters will appear here after processing.</p>
      </div>
    );
  }

  if (status === 'analyzing' || status === 'generating') {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-10 bg-white">
        <div className="relative w-24 h-24 mb-8">
          <div className="absolute inset-0 border-4 border-indigo-100 rounded-full"></div>
          <div className="absolute inset-0 border-4 border-indigo-600 rounded-full border-t-transparent animate-spin"></div>
        </div>
        <h2 className="text-2xl font-bold text-slate-800 mb-2">
          {status === 'analyzing' ? 'Extracting Audio & Transcribing...' : 'AI is finding viral hooks...'}
        </h2>
        <p className="text-slate-400 text-sm">This takes about 30-60 seconds depending on video length.</p>
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
              <CheckCircle2 className="w-3 h-3" /> Ready to Snip
            </div>
            <span className="text-xs text-slate-400 truncate max-w-[200px] font-medium">
               {videoFile?.name}
            </span>
          </div>
        </div>
        
        <div className="flex gap-8">
          {[
            { id: 'shorts', label: 'Shorts', icon: Video },
            { id: 'posts', label: 'Posts', icon: FileText },
            { id: 'newsletter', label: 'Newsletter', icon: Mail },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`pb-4 text-sm font-semibold flex items-center gap-2 transition-all border-b-2 ${
                activeTab === tab.id ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-slate-400 hover:text-slate-600'
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
        <div className="max-w-6xl mx-auto animate-in fade-in duration-500">
          {activeTab === 'shorts' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {aiData?.viral_clips?.map((clip: any, i: number) => (
                <div key={i} className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm flex flex-col">
                  <div className="aspect-[9/16] bg-slate-900 relative">
                    {generatedClips[i] ? (
                      <video src={generatedClips[i]} controls className="w-full h-full object-cover" />
                    ) : (
                      <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6">
                        <Video className="w-8 h-8 text-slate-700 mb-2 opacity-20" />
                        <p className="text-[10px] text-slate-500 uppercase tracking-widest">Preview {clip.start_timestamp}</p>
                      </div>
                    )}
                    {processingIdx === i && (
                      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex flex-col items-center justify-center text-white">
                        <Loader2 className="w-8 h-8 animate-spin mb-2" />
                        <span className="text-[10px] font-bold uppercase">Processing...</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="p-4 flex-1 flex flex-col">
                    <h4 className="font-bold text-slate-800 text-sm mb-2 line-clamp-2">{clip.hook}</h4>
                    <p className="text-[10px] text-slate-500 mb-4 flex-1">{clip.why_it_is_viral}</p>
                    
                    <button 
                      onClick={() => handleSnip(i, clip.start_timestamp, clip.end_timestamp)}
                      disabled={processingIdx !== null}
                      className="w-full py-3 bg-indigo-600 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 hover:bg-indigo-700 transition-colors"
                    >
                      {generatedClips[i] ? <Download className="w-4 h-4" /> : <Scissors className="w-4 h-4" />}
                      {generatedClips[i] ? 'Download Clip' : 'Snip & Crop 9:16'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
          {activeTab === 'posts' && <p className="text-center text-slate-400 p-20">Posts content goes here...</p>}
          {activeTab === 'newsletter' && <p className="text-center text-slate-400 p-20">Newsletter content goes here...</p>}
        </div>
      </div>
    </div>
  );
};

export default OutputPanel;