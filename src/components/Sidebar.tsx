'use client';

import React, { useState, useEffect } from 'react';
import { 
  Building2, 
  Users, 
  FileText, 
  Terminal, 
  BarChart3, 
  Layers, 
  Zap, 
  Droplets, 
  Wind, 
  Home, 
  ShieldCheck, 
  Cpu, 
  MapPin, 
  Clock, 
  Filter, 
  PlusCircle, 
  RefreshCw, 
  ExternalLink,
  ChevronRight,
  Sparkles,
  Menu,
  X,
  TrendingDown,
  DollarSign
} from 'lucide-react';

interface SidebarProps {
  activeTab: 'procurement' | 'manpower' | 'ten_dirham_workers' | 'analytics' | 'scraper';
  setActiveTab: (tab: 'procurement' | 'manpower' | 'ten_dirham_workers' | 'analytics' | 'scraper') => void;
  selectedDomain: string;
  setSelectedDomain: (d: string) => void;
  selectedEmirate: string;
  setSelectedEmirate: (e: string) => void;
  onOpenNewRfq: () => void;
  onTriggerScrape: () => void;
  counts: {
    tendersCount: number;
    totalValueAed: number;
    agenciesCount: number;
    leadsCount: number;
    tenDirhamWorkersCount: number;
  };
  isMobileOpen: boolean;
  setIsMobileOpen: (open: boolean) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  setActiveTab,
  selectedDomain,
  setSelectedDomain,
  selectedEmirate,
  setSelectedEmirate,
  onOpenNewRfq,
  onTriggerScrape,
  counts,
  isMobileOpen,
  setIsMobileOpen
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
          hour12: true
        })
      );
      setIndiaTime(
        now.toLocaleTimeString('en-GB', {
          timeZone: 'Asia/Kolkata',
          hour: '2-digit',
          minute: '2-digit',
          hour12: true
        })
      );
    };

    updateClocks();
    const interval = setInterval(updateClocks, 1000);
    return () => clearInterval(interval);
  }, []);

  const domains = [
    { id: 'all', name: 'All 8 Service Domains', icon: Layers, count: 25 },
    { id: 'Electrical & Power', name: 'Electrical & Power', icon: Zap, count: 4 },
    { id: 'Plumbing & Drainage', name: 'Plumbing & Drainage', icon: Droplets, count: 4 },
    { id: 'Air Conditioning & Ventilation', name: 'AC & Ventilation', icon: Wind, count: 2 },
    { id: 'Smart Home & Automation', name: 'Smart Home & Auto', icon: Home, count: 5 },
    { id: 'Security & Access', name: 'Security & Access', icon: ShieldCheck, count: 2 },
    { id: 'Specialist Equipment Installation', name: 'Specialist Equipment', icon: Cpu, count: 2 },
    { id: 'Ceilings, Finishes & Fit-Out', name: 'Ceilings & Fit-Out', icon: Layers, count: 3 },
    { id: 'Documentation & Support', name: 'Documentation & Support', icon: FileText, count: 3 },
  ];

  const emirates = ['all', 'Dubai', 'Abu Dhabi', 'Sharjah', 'Ras Al Khaimah', 'Ajman'];

  return (
    <>
      {/* Mobile Backdrop */}
      {isMobileOpen && (
        <div 
          onClick={() => setIsMobileOpen(false)}
          className="fixed inset-0 z-40 bg-slate-950/70 backdrop-blur-xs md:hidden"
        />
      )}

      {/* Sidebar Container */}
      <aside className={`fixed top-0 bottom-0 left-0 z-50 w-72 bg-slate-900 border-r border-slate-700/60 shadow-soft flex flex-col transition-transform duration-200 ease-in-out md:translate-x-0 ${
        isMobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
      }`}>
        {/* Brand Header */}
        <div className="p-4 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 via-amber-600 to-amber-700 flex items-center justify-center shadow-md shadow-amber-500/20 text-white font-bold">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h1 className="text-lg font-black text-slate-50 tracking-tight font-sans">
                  aqion<span className="text-amber-400">procure</span>
                </h1>
              </div>
              <p className="text-[10px] text-slate-400 font-semibold tracking-wider uppercase">
                UAE Tender & Manpower Hub
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsMobileOpen(false)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800 md:hidden"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Navigation Body */}
        <div className="flex-1 overflow-y-auto p-3 space-y-5 text-xs text-slate-200">
          {/* Main Module Tabs */}
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider px-3 block mb-1.5">
              Core Intelligence Modules
            </span>
            <div className="space-y-1">
              {/* Tab 1: UAE Tenders & RFQs */}
              <button
                onClick={() => { setActiveTab('procurement'); setIsMobileOpen(false); }}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl font-bold transition-all ${
                  activeTab === 'procurement'
                    ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                    : 'text-slate-200 hover:bg-slate-800/80 hover:text-slate-50'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Building2 className="w-4 h-4" />
                  <span>UAE Tenders & RFQs</span>
                </div>
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold ${
                  activeTab === 'procurement' ? 'bg-slate-950/10 text-slate-950' : 'bg-amber-500/15 text-amber-300 border border-amber-500/30'
                }`}>
                  {counts.tendersCount} Live
                </span>
              </button>

              {/* NEW TAB: DHS <= 10/hr Technical Workers (ORJ Supply Radar) */}
              <button
                onClick={() => { setActiveTab('ten_dirham_workers'); setIsMobileOpen(false); }}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl font-bold transition-all ${
                  activeTab === 'ten_dirham_workers'
                    ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/25'
                    : 'text-slate-200 hover:bg-slate-800/80 hover:text-slate-50 bg-slate-800/30 border border-amber-500/20'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Zap className="w-4 h-4 text-amber-400" />
                  <span className="font-extrabold text-amber-300">DHS ≤10/hr Labor (ORJ)</span>
                </div>
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold ${
                  activeTab === 'ten_dirham_workers' ? 'bg-slate-950/20 text-slate-950' : 'bg-amber-500/20 text-amber-300 border border-amber-400/40 animate-pulse'
                }`}>
                  {counts.tenDirhamWorkersCount} Leads
                </span>
              </button>

              {/* Tab 2: Overseas Manpower (India / Kerala) */}
              <button
                onClick={() => { setActiveTab('manpower'); setIsMobileOpen(false); }}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl font-bold transition-all ${
                  activeTab === 'manpower'
                    ? 'bg-sky-500 text-slate-950 shadow-md shadow-sky-600/20'
                    : 'text-slate-200 hover:bg-slate-800/80 hover:text-slate-50'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Users className="w-4 h-4" />
                  <span>Manpower (India / Kerala)</span>
                </div>
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold ${
                  activeTab === 'manpower' ? 'bg-slate-950/10 text-slate-950' : 'bg-sky-500/15 text-sky-300 border border-sky-500/30'
                }`}>
                  {counts.agenciesCount + counts.leadsCount} Leads
                </span>
              </button>

              {/* Tab 3: UAE Tender Analytics */}
              <button
                onClick={() => { setActiveTab('analytics'); setIsMobileOpen(false); }}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl font-bold transition-all ${
                  activeTab === 'analytics'
                    ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/25'
                    : 'text-slate-200 hover:bg-slate-800/80 hover:text-slate-50'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <BarChart3 className="w-4 h-4 text-emerald-400" />
                  <span>UAE Tender Analytics</span>
                </div>
                <span className={`text-[10px] ${activeTab === 'analytics' ? 'text-slate-950/70' : 'text-slate-400'}`}>L1 Benchmarks</span>
              </button>

              {/* Tab 4: Scraper Engine Hub */}
              <button
                onClick={() => { setActiveTab('scraper'); setIsMobileOpen(false); }}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl font-bold transition-all ${
                  activeTab === 'scraper'
                    ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/25'
                    : 'text-slate-200 hover:bg-slate-800/80 hover:text-slate-50'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Terminal className="w-4 h-4 text-amber-500" />
                  <span>Scraper Engine Hub</span>
                </div>
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              </button>
            </div>
          </div>

          {/* Quick Domain Filters (Active during Procurement Tab) */}
          {activeTab === 'procurement' && (
            <div>
              <div className="flex items-center justify-between px-3 mb-2">
                <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                  Filter by Service Domain
                </span>
                {selectedDomain !== 'all' && (
                  <button 
                    onClick={() => setSelectedDomain('all')}
                    className="text-[10px] text-amber-400 hover:underline font-bold"
                  >
                    Reset
                  </button>
                )}
              </div>
              <div className="space-y-0.5">
                {domains.map(d => {
                  const Icon = d.icon;
                  const isSelected = selectedDomain === d.id;
                  return (
                    <button
                      key={d.id}
                      onClick={() => setSelectedDomain(d.id)}
                      className={`w-full flex items-center justify-between px-3 py-1.5 rounded-lg text-left transition-all ${
                        isSelected
                          ? 'bg-amber-500/10 text-amber-200 font-bold border border-amber-500/30'
                          : 'text-slate-300 hover:bg-slate-800/70 hover:text-slate-50'
                      }`}
                    >
                      <div className="flex items-center gap-2 truncate">
                        <Icon className={`w-3.5 h-3.5 shrink-0 ${isSelected ? 'text-amber-400' : 'text-slate-400'}`} />
                        <span className="truncate text-xs">{d.name}</span>
                      </div>
                      <span className="text-[10px] text-slate-400 font-mono font-medium shrink-0 ml-1">
                        {d.count}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Quick Emirate Filter */}
          {(activeTab === 'procurement' || activeTab === 'ten_dirham_workers') && (
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider px-3 block mb-1.5">
                Emirate Region
              </span>
              <div className="flex flex-wrap gap-1 px-1">
                {emirates.map(em => (
                  <button
                    key={em}
                    onClick={() => setSelectedEmirate(em)}
                    className={`px-2.5 py-1 rounded-md text-[11px] font-semibold transition-all ${
                      selectedEmirate.toLowerCase() === em.toLowerCase()
                        ? 'bg-amber-500 text-slate-950 shadow-2xs'
                        : 'bg-slate-800 text-slate-300 hover:text-slate-50 border border-slate-700/60'
                    }`}
                  >
                    {em === 'all' ? 'All Emirates' : em}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quick Actions */}
          <div className="p-3 bg-slate-800/50 rounded-2xl border border-slate-700/60 space-y-2">
            <button
              onClick={onOpenNewRfq}
              className="w-full flex items-center justify-center gap-1.5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold shadow-xs transition-all"
            >
              <PlusCircle className="w-3.5 h-3.5 text-current" />
              <span>Post UAE Requirement</span>
            </button>

            <button
              onClick={onTriggerScrape}
              className="w-full flex items-center justify-center gap-1.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 text-xs font-semibold border border-slate-700/60 shadow-2xs transition-all"
            >
              <RefreshCw className="w-3.5 h-3.5 text-amber-400" />
              <span>Rescrape All Portals</span>
            </button>
          </div>
        </div>

        {/* Sidebar Footer / Dual Clocks & Port Indicator */}
        <div className="p-3 bg-slate-800/50 border-t border-slate-700/60 space-y-2">
          <div className="grid grid-cols-2 gap-2 text-center">
            <div className="bg-slate-900 p-2 rounded-xl border border-slate-700/60 shadow-2xs">
              <span className="text-[10px] text-slate-400 font-bold block">🇦🇪 DUBAI</span>
              <span className="text-xs font-mono font-bold text-amber-300">{uaeTime || '04:00 PM'}</span>
            </div>
            <div className="bg-slate-900 p-2 rounded-xl border border-slate-700/60 shadow-2xs">
              <span className="text-[10px] text-slate-400 font-bold block">🇮🇳 INDIA</span>
              <span className="text-xs font-mono font-bold text-sky-300">{indiaTime || '05:30 PM'}</span>
            </div>
          </div>

          <div className="flex items-center justify-between text-[11px] px-1 text-slate-400">
            <span className="inline-flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
              Port 3007 Active
            </span>
            <span className="font-mono font-semibold text-slate-200">v5.0 ORJ</span>
          </div>
        </div>
      </aside>
    </>
  );
};
