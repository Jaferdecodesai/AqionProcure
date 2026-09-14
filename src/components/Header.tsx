'use client';

import React, { useState, useEffect } from 'react';
import { 
  Building2, 
  Users, 
  Search, 
  PlusCircle, 
  RefreshCw, 
  ShieldCheck, 
  Sparkles,
  Layers,
  ArrowRight
} from 'lucide-react';

interface HeaderProps {
  activeTab: 'procurement' | 'manpower';
  setActiveTab: (tab: 'procurement' | 'manpower') => void;
  onOpenNewRfq: () => void;
  onTriggerScrape: () => void;
  globalSearch: string;
  setGlobalSearch: (s: string) => void;
  stats: {
    servicesCount: number;
    uaeVendorsCount: number;
    agenciesCount: number;
    fbLeadsCount: number;
    candidatesCount: number;
  };
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  onOpenNewRfq,
  onTriggerScrape,
  globalSearch,
  setGlobalSearch,
  stats
}) => {
  const [uaeTime, setUaeTime] = useState<string>('');
  const [indiaTime, setIndiaTime] = useState<string>('');

  useEffect(() => {
    const updateClocks = () => {
      const now = new Date();
      setUaeTime(
        now.toLocaleTimeString('en-GB', {
          timeZone: 'Asia/Dubai',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: true
        })
      );
      setIndiaTime(
        now.toLocaleTimeString('en-GB', {
          timeZone: 'Asia/Kolkata',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: true
        })
      );
    };

    updateClocks();
    const interval = setInterval(updateClocks, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="sticky top-0 z-40 bg-slate-900/90 backdrop-blur-md border-b border-slate-700/60 shadow-xs">
      {/* Top Utility Bar / Dual Timezones & Status */}
      <div className="bg-slate-900/70 border-b border-slate-700/50 px-4 py-1.5 text-xs">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-300 font-mono text-[11px] font-semibold border border-emerald-500/30">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              PORT 3007 : LIVE
            </span>
            <span className="hidden md:inline-flex items-center gap-1.5 text-slate-400 text-xs">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
              UAE Sourcing & India / Kerala Manpower Intelligence
            </span>
          </div>

          <div className="flex items-center gap-4 font-mono text-xs">
            <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-slate-900 border border-slate-700/60 shadow-2xs">
              <span className="text-sm">🇦🇪</span>
              <span className="text-slate-400 font-sans font-medium text-[11px]">DUBAI:</span>
              <span className="text-amber-300 font-bold text-[11px]">{uaeTime || '04:00 PM'}</span>
            </div>
            <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-slate-900 border border-slate-700/60 shadow-2xs">
              <span className="text-sm">🇮🇳</span>
              <span className="text-slate-400 font-sans font-medium text-[11px]">INDIA:</span>
              <span className="text-sky-300 font-bold text-[11px]">{indiaTime || '05:30 PM'}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Brand & Action Bar */}
      <div className="max-w-7xl mx-auto px-4 py-3 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 via-amber-600 to-amber-700 flex items-center justify-center shadow-md shadow-amber-500/20 text-white font-bold">
            <Layers className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-black text-slate-50 tracking-tight font-sans">
                aqion<span className="text-amber-400">procure</span>
              </h1>
              <span className="px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider bg-amber-500/10 text-amber-300 border border-amber-500/30">
                UAE & Kerala
              </span>
            </div>
            <p className="text-[11px] text-slate-400 font-medium">
              Enterprise Procurement & Technical Manpower Miner
            </p>
          </div>
        </div>

        {/* Search Bar */}
        <div className="flex-1 max-w-md mx-0 md:mx-4 relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={globalSearch}
            onChange={(e) => setGlobalSearch(e.target.value)}
            placeholder="Search UAE services, vendors, Kerala agencies, candidate leads..."
            className="w-full bg-slate-800/50 hover:bg-slate-800/70 focus:bg-slate-900 border border-slate-700/60 rounded-xl pl-9 pr-8 py-2 text-xs text-slate-100 placeholder-slate-400 focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/10 transition-all shadow-inner"
          />
          {globalSearch && (
            <button
              onClick={() => setGlobalSearch('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-200 bg-slate-700/70 hover:bg-slate-300 w-4 h-4 rounded-full flex items-center justify-center font-bold"
            >
              ✕
            </button>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={onOpenNewRfq}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold shadow-md shadow-amber-500/25 hover:shadow-lg transition-all active:scale-[0.98]"
          >
            <PlusCircle className="w-3.5 h-3.5 text-current" />
            <span>Create RFQ</span>
          </button>

          <button
            onClick={onTriggerScrape}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800/50 text-slate-200 text-xs font-semibold border border-slate-700/60 shadow-2xs hover:border-slate-600 transition-all active:scale-[0.98]"
            title="Live Web Scraper Hub"
          >
            <RefreshCw className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden sm:inline">Scraper Engine</span>
          </button>
        </div>
      </div>

      {/* iOS-Style Segmented Navigation Tabs */}
      <div className="max-w-7xl mx-auto px-4 pb-2 pt-1 flex flex-wrap items-center justify-between gap-3 border-t border-slate-800">
        <div className="p-1 bg-slate-800/70 rounded-xl flex items-center gap-1 border border-slate-700/60 shadow-inner">
          {/* Tab 1: Procurement */}
          <button
            onClick={() => setActiveTab('procurement')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-bold text-xs transition-all ${
              activeTab === 'procurement'
                ? 'bg-slate-900 text-slate-50 shadow-sm border border-slate-700/50'
                : 'text-slate-400 hover:text-slate-100 hover:bg-slate-700/50'
            }`}
          >
            <Building2 className={`w-3.5 h-3.5 ${activeTab === 'procurement' ? 'text-amber-400' : 'text-slate-400'}`} />
            <span>Procurement Request (UAE)</span>
            <span className={`px-2 py-0.5 text-[10px] rounded-full font-mono font-semibold ${
              activeTab === 'procurement' ? 'bg-amber-500/10 text-amber-300 border border-amber-500/30' : 'bg-slate-700/60 text-slate-300'
            }`}>
              {stats.servicesCount} Services • {stats.uaeVendorsCount} Vendors
            </span>
          </button>

          {/* Tab 2: Manpower */}
          <button
            onClick={() => setActiveTab('manpower')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-bold text-xs transition-all ${
              activeTab === 'manpower'
                ? 'bg-slate-900 text-slate-50 shadow-sm border border-slate-700/50'
                : 'text-slate-400 hover:text-slate-100 hover:bg-slate-700/50'
            }`}
          >
            <Users className={`w-3.5 h-3.5 ${activeTab === 'manpower' ? 'text-sky-400' : 'text-slate-400'}`} />
            <span>Manpower Data (India / Kerala)</span>
            <span className={`px-2 py-0.5 text-[10px] rounded-full font-mono font-semibold ${
              activeTab === 'manpower' ? 'bg-sky-500/10 text-sky-300 border border-sky-500/30' : 'bg-slate-700/60 text-slate-300'
            }`}>
              {stats.agenciesCount} Agencies • {stats.fbLeadsCount + stats.candidatesCount} Leads
            </span>
          </button>
        </div>

        {/* Live Index Status Indicators */}
        <div className="hidden lg:flex items-center gap-4 text-xs font-medium text-slate-400">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            <span>Tejari & Dubizzle UAE Synced</span>
          </div>
          <span className="text-slate-300">•</span>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-sky-500"></span>
            <span>Facebook Comments & Kerala Portals Active</span>
          </div>
        </div>
      </div>
    </header>
  );
};
