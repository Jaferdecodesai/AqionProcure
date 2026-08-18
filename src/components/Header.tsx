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
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/90 shadow-xs">
      {/* Top Utility Bar / Dual Timezones & Status */}
      <div className="bg-slate-50/90 border-b border-slate-200/60 px-4 py-1.5 text-xs">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-mono text-[11px] font-semibold border border-emerald-200">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              PORT 3007 : LIVE
            </span>
            <span className="hidden md:inline-flex items-center gap-1.5 text-slate-500 text-xs">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-600" />
              UAE Sourcing & India / Kerala Manpower Intelligence
            </span>
          </div>

          <div className="flex items-center gap-4 font-mono text-xs">
            <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-white border border-slate-200 shadow-2xs">
              <span className="text-sm">🇦🇪</span>
              <span className="text-slate-500 font-sans font-medium text-[11px]">DUBAI:</span>
              <span className="text-amber-700 font-bold text-[11px]">{uaeTime || '04:00 PM'}</span>
            </div>
            <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-white border border-slate-200 shadow-2xs">
              <span className="text-sm">🇮🇳</span>
              <span className="text-slate-500 font-sans font-medium text-[11px]">INDIA:</span>
              <span className="text-sky-700 font-bold text-[11px]">{indiaTime || '05:30 PM'}</span>
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
              <h1 className="text-xl font-black text-slate-900 tracking-tight font-sans">
                aqion<span className="text-amber-600">procure</span>
              </h1>
              <span className="px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider bg-amber-50 text-amber-700 border border-amber-200/80">
                UAE & Kerala
              </span>
            </div>
            <p className="text-[11px] text-slate-500 font-medium">
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
            className="w-full bg-slate-50 hover:bg-slate-100/70 focus:bg-white border border-slate-200 rounded-xl pl-9 pr-8 py-2 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/10 transition-all shadow-inner"
          />
          {globalSearch && (
            <button
              onClick={() => setGlobalSearch('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-700 bg-slate-200/80 hover:bg-slate-300 w-4 h-4 rounded-full flex items-center justify-center font-bold"
            >
              ✕
            </button>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={onOpenNewRfq}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold shadow-md shadow-slate-900/10 hover:shadow-lg transition-all active:scale-[0.98]"
          >
            <PlusCircle className="w-3.5 h-3.5 text-amber-400" />
            <span>Create RFQ</span>
          </button>

          <button
            onClick={onTriggerScrape}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold border border-slate-200 shadow-2xs hover:border-slate-300 transition-all active:scale-[0.98]"
            title="Live Web Scraper Hub"
          >
            <RefreshCw className="w-3.5 h-3.5 text-amber-600" />
            <span className="hidden sm:inline">Scraper Engine</span>
          </button>
        </div>
      </div>

      {/* iOS-Style Segmented Navigation Tabs */}
      <div className="max-w-7xl mx-auto px-4 pb-2 pt-1 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100">
        <div className="p-1 bg-slate-100/90 rounded-xl flex items-center gap-1 border border-slate-200/80 shadow-inner">
          {/* Tab 1: Procurement */}
          <button
            onClick={() => setActiveTab('procurement')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-bold text-xs transition-all ${
              activeTab === 'procurement'
                ? 'bg-white text-slate-900 shadow-sm border border-slate-200/60'
                : 'text-slate-500 hover:text-slate-800 hover:bg-slate-200/50'
            }`}
          >
            <Building2 className={`w-3.5 h-3.5 ${activeTab === 'procurement' ? 'text-amber-600' : 'text-slate-400'}`} />
            <span>Procurement Request (UAE)</span>
            <span className={`px-2 py-0.5 text-[10px] rounded-full font-mono font-semibold ${
              activeTab === 'procurement' ? 'bg-amber-50 text-amber-700 border border-amber-200/70' : 'bg-slate-200/70 text-slate-600'
            }`}>
              {stats.servicesCount} Services • {stats.uaeVendorsCount} Vendors
            </span>
          </button>

          {/* Tab 2: Manpower */}
          <button
            onClick={() => setActiveTab('manpower')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-bold text-xs transition-all ${
              activeTab === 'manpower'
                ? 'bg-white text-slate-900 shadow-sm border border-slate-200/60'
                : 'text-slate-500 hover:text-slate-800 hover:bg-slate-200/50'
            }`}
          >
            <Users className={`w-3.5 h-3.5 ${activeTab === 'manpower' ? 'text-sky-600' : 'text-slate-400'}`} />
            <span>Manpower Data (India / Kerala)</span>
            <span className={`px-2 py-0.5 text-[10px] rounded-full font-mono font-semibold ${
              activeTab === 'manpower' ? 'bg-sky-50 text-sky-700 border border-sky-200/70' : 'bg-slate-200/70 text-slate-600'
            }`}>
              {stats.agenciesCount} Agencies • {stats.fbLeadsCount + stats.candidatesCount} Leads
            </span>
          </button>
        </div>

        {/* Live Index Status Indicators */}
        <div className="hidden lg:flex items-center gap-4 text-xs font-medium text-slate-500">
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
