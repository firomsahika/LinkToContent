
import React from 'react';
import { Search, Filter, MoreHorizontal, Video, FileText, Mail, Calendar } from 'lucide-react';

const HistoryView: React.FC = () => {
  const generations = [
    { id: 1, title: 'The Future of AI Podcast #42', date: '2 hours ago', status: 'Completed', types: ['Video', 'Thread'], url: 'youtube.com/watch?v=...' },
    { id: 2, title: 'How to Scale SaaS in 2025', date: 'Yesterday', status: 'Completed', types: ['Newsletter', 'Blog'], url: 'spotify.com/episode/...' },
    { id: 3, title: 'Productivity Secrets for Creators', date: '3 days ago', status: 'Completed', types: ['Video', 'Post'], url: 'vimeo.com/...' },
    { id: 4, title: 'The Solopreneur Journey', date: 'June 01, 2025', status: 'Failed', types: ['Video'], url: 'youtube.com/...' },
  ];

  return (
    <div className="flex-1 flex flex-col h-full bg-[#FBFBFD] overflow-y-auto p-8">
      <div className="max-w-6xl mx-auto w-full">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Past Generations</h1>
            <p className="text-slate-500 mt-1">Manage and access your historical content transformations.</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <input 
                type="text" 
                placeholder="Search history..." 
                className="pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none w-64"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            </div>
            <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-medium text-slate-600 hover:bg-slate-50">
              <Filter className="w-4 h-4" /> Filter
            </button>
          </div>
        </div>

        <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-100">
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Content Source</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Generated Assets</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Date</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Status</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {generations.map((gen) => (
                <tr key={gen.id} className="hover:bg-slate-50/30 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="font-semibold text-slate-800">{gen.title}</span>
                      <span className="text-xs text-slate-400 mt-0.5">{gen.url}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      {gen.types.map(type => (
                        <span key={type} className="flex items-center gap-1.5 px-2.5 py-1 bg-indigo-50 text-indigo-600 rounded-lg text-[10px] font-bold">
                          {type === 'Video' ? <Video className="w-3 h-3" /> : <FileText className="w-3 h-3" />}
                          {type}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-sm text-slate-500">
                      <Calendar className="w-4 h-4" />
                      {gen.date}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      gen.status === 'Completed' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                    }`}>
                      {gen.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="p-2 text-slate-400 hover:text-slate-600 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">
                      <MoreHorizontal className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default HistoryView;
