
import React from 'react';
import { UserPlus, Shield, Mail, MoreVertical } from 'lucide-react';

const TeamView: React.FC = () => {
  const members = [
    { name: 'Alex Rivera', email: 'alex@l2c.ai', role: 'Owner', avatar: 'https://i.pravatar.cc/150?u=alex' },
    { name: 'Sarah Chen', email: 'sarah@l2c.ai', role: 'Admin', avatar: 'https://i.pravatar.cc/150?u=sarah' },
    { name: 'Jordan Smith', email: 'jordan@creators.com', role: 'Editor', avatar: 'https://i.pravatar.cc/150?u=jordan' },
  ];

  return (
    <div className="flex-1 flex flex-col h-full bg-[#FBFBFD] overflow-y-auto p-8">
      <div className="max-w-4xl mx-auto w-full">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Team Management</h1>
            <p className="text-slate-500 mt-1">Invite collaborators and manage access roles.</p>
          </div>
          <button className="flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-2xl text-sm font-bold shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition-all">
            <UserPlus className="w-5 h-5" /> Invite Member
          </button>
        </div>

        <div className="grid grid-cols-1 gap-4">
          <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm">
            <div className="flex items-center justify-between mb-8 pb-6 border-b border-slate-100">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center">
                  <Shield className="w-6 h-6 text-indigo-600" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900">Workspace Settings</h3>
                  <p className="text-sm text-slate-500">Only Admins can invite new users to the workspace.</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-slate-400 mr-2">3 / 5 Seats Used</span>
                <div className="w-24 bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div className="bg-indigo-600 w-3/5 h-full rounded-full"></div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              {members.map((member) => (
                <div key={member.email} className="flex items-center justify-between group">
                  <div className="flex items-center gap-4">
                    <img src={member.avatar} alt={member.name} className="w-12 h-12 rounded-2xl object-cover ring-2 ring-white shadow-md" />
                    <div>
                      <h4 className="font-bold text-slate-900">{member.name}</h4>
                      <div className="flex items-center gap-2 text-xs text-slate-500">
                        <Mail className="w-3 h-3" /> {member.email}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <span className={`px-3 py-1 rounded-lg text-xs font-bold ${
                      member.role === 'Owner' ? 'bg-indigo-50 text-indigo-700' :
                      member.role === 'Admin' ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-600'
                    }`}>
                      {member.role}
                    </span>
                    <button className="p-2 text-slate-300 hover:text-slate-600 transition-colors">
                      <MoreVertical className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-amber-50 rounded-3xl border border-amber-100 p-6 flex items-start gap-4">
            <div className="p-2 bg-amber-100 rounded-xl">
              <Shield className="w-5 h-5 text-amber-600" />
            </div>
            <div>
              <h4 className="font-bold text-amber-900 text-sm">Upgrade to Enterprise</h4>
              <p className="text-amber-800 text-xs mt-1 leading-relaxed">
                Need more seats or custom SAML SSO for your team? Contact our sales department to get a tailored workspace solution.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamView;
