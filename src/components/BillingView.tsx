
import React from 'react';
import { CreditCard, Check, Zap, ArrowRight, Download } from 'lucide-react';

const BillingView: React.FC = () => {
  const plans = [
    { name: 'Starter', price: '$29', desc: 'Perfect for new creators', features: ['5 Video Generations/mo', 'LinkedIn & X Exports', '1 AI Agent', 'Standard Support'], current: false },
    { name: 'Pro', price: '$79', desc: 'Our most popular plan', features: ['Unlimited Video Generations', 'All Platform Exports', 'All AI Agents', 'Priority Support', 'Team Collaboration'], current: true },
    { name: 'Business', price: '$249', desc: 'For content agencies', features: ['Custom AI Training', 'White-label Reports', 'Dedicated Account Manager', 'API Access', 'Enterprise Security'], current: false },
  ];

  return (
    <div className="flex-1 flex flex-col h-full bg-[#FBFBFD] overflow-y-auto p-8">
      <div className="max-w-6xl mx-auto w-full">
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-slate-900">Plans & Billing</h1>
          <p className="text-slate-500 mt-1">Manage your subscription, usage, and invoices.</p>
        </div>

        {/* Usage Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Video Minutes</p>
            <p className="text-3xl font-black text-slate-900">452 <span className="text-sm font-medium text-slate-400">/ 1,000</span></p>
            <div className="mt-4 h-2 bg-slate-100 rounded-full overflow-hidden">
              <div className="bg-indigo-600 w-[45%] h-full"></div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">AI Cycles</p>
            <p className="text-3xl font-black text-slate-900">12,400 <span className="text-sm font-medium text-slate-400">used</span></p>
            <p className="text-xs text-green-600 mt-2 font-semibold">Resets in 12 days</p>
          </div>
          <div className="bg-indigo-600 p-6 rounded-3xl shadow-lg shadow-indigo-100 text-white">
            <p className="text-xs font-bold text-indigo-200 uppercase tracking-widest mb-2">Next Billing</p>
            <p className="text-3xl font-black">July 04, 2025</p>
            <p className="text-sm text-indigo-100 mt-2 flex items-center gap-1">Manage Payment <ArrowRight className="w-4 h-4" /></p>
          </div>
        </div>

        {/* Plans */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {plans.map((plan) => (
            <div key={plan.name} className={`relative bg-white rounded-3xl border p-8 flex flex-col ${plan.current ? 'border-indigo-600 ring-4 ring-indigo-50 shadow-xl' : 'border-slate-200 shadow-sm'}`}>
              {plan.current && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-indigo-600 text-white text-[10px] font-bold px-4 py-1.5 rounded-full uppercase tracking-widest">
                  Current Plan
                </div>
              )}
              <h3 className="text-xl font-bold text-slate-900 mb-1">{plan.name}</h3>
              <div className="flex items-baseline gap-1 mb-4">
                <span className="text-3xl font-black text-slate-900">{plan.price}</span>
                <span className="text-slate-400 text-sm">/ month</span>
              </div>
              <p className="text-slate-500 text-sm mb-6">{plan.desc}</p>
              
              <ul className="space-y-4 mb-8 flex-1">
                {plan.features.map(f => (
                  <li key={f} className="flex items-start gap-3 text-sm text-slate-600">
                    <Check className="w-5 h-5 text-indigo-600 shrink-0" /> {f}
                  </li>
                ))}
              </ul>

              <button className={`w-full py-4 rounded-2xl font-bold text-sm transition-all ${
                plan.current 
                  ? 'bg-slate-100 text-slate-400 cursor-not-allowed' 
                  : 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-lg shadow-indigo-100'
              }`}>
                {plan.current ? 'Your Plan' : 'Select Plan'}
              </button>
            </div>
          ))}
        </div>

        {/* History */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-8">
          <h3 className="font-bold text-slate-900 mb-6">Payment History</h3>
          <div className="space-y-4">
            {[
              { date: 'June 04, 2025', amount: '$79.00', id: 'INV-4521' },
              { date: 'May 04, 2025', amount: '$79.00', id: 'INV-3982' },
              { date: 'April 04, 2025', amount: '$29.00', id: 'INV-3120' },
            ].map(inv => (
              <div key={inv.id} className="flex items-center justify-between py-3 border-b border-slate-50 last:border-0">
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-slate-50 rounded-lg"><CreditCard className="w-5 h-5 text-slate-400" /></div>
                  <div>
                    <p className="text-sm font-bold text-slate-800">{inv.id}</p>
                    <p className="text-xs text-slate-400">{inv.date}</p>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <span className="text-sm font-bold text-slate-900">{inv.amount}</span>
                  <button className="p-2 text-slate-400 hover:text-indigo-600 transition-colors"><Download className="w-5 h-5" /></button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BillingView;
