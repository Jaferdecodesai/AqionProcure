'use client';

import React, { useState } from 'react';
import { 
  DollarSign, 
  Users, 
  MapPin, 
  Phone, 
  MessageSquare, 
  CheckCircle2, 
  Briefcase, 
  Wrench, 
  Search, 
  Filter, 
  Download, 
  Share2, 
  Building2, 
  Clock, 
  ShieldCheck, 
  Sparkles, 
  ArrowUpRight, 
  ExternalLink,
  ChevronRight,
  TrendingDown,
  Layers,
  Check,
  Zap,
  AlertCircle
} from 'lucide-react';
import { UaeTenDirhamWorker, UaeManpowerSupplyAgency } from '../types';

interface TenDirhamWorkersTabProps {
  workers: UaeTenDirhamWorker[];
  agencies: UaeManpowerSupplyAgency[];
  onSelectWorker: (worker: UaeTenDirhamWorker) => void;
  searchQuery: string;
}

export const TenDirhamWorkersTab: React.FC<TenDirhamWorkersTabProps> = ({
  workers,
  agencies,
  onSelectWorker,
  searchQuery
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'workers' | 'social_leads' | 'agencies' | 'pipeline'>('workers');
  const [rateFilter, setRateFilter] = useState<number | 'all'>('all');
  const [tradeFilter, setTradeFilter] = useState<string>('all');
  const [visaFilter, setVisaFilter] = useState<string>('all');
  const [locationFilter, setLocationFilter] = useState<string>('all');

  // Filter Workers
  const filteredWorkers = workers.filter(worker => {
    const matchesSearch = !searchQuery ||
      worker.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      worker.trade.toLowerCase().includes(searchQuery.toLowerCase()) ||
      worker.currentLocation.toLowerCase().includes(searchQuery.toLowerCase()) ||
      worker.skills.some(s => s.toLowerCase().includes(searchQuery.toLowerCase())) ||
      worker.commentText.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesRate = rateFilter === 'all' || worker.hourlyRateAed <= rateFilter;
    const matchesTrade = tradeFilter === 'all' || worker.trade.toLowerCase() === tradeFilter.toLowerCase();
    const matchesVisa = visaFilter === 'all' || worker.visaStatus.toLowerCase().includes(visaFilter.toLowerCase());
    const matchesLocation = locationFilter === 'all' || worker.emirate.toLowerCase() === locationFilter.toLowerCase();

    return matchesSearch && matchesRate && matchesTrade && matchesVisa && matchesLocation;
  });

  // Filter Agencies
  const filteredAgencies = agencies.filter(agency => {
    const matchesSearch = !searchQuery ||
      agency.agencyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      agency.emirate.toLowerCase().includes(searchQuery.toLowerCase()) ||
      agency.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
      agency.availableTrades.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesLocation = locationFilter === 'all' || agency.emirate.toLowerCase() === locationFilter.toLowerCase();

    return matchesSearch && matchesLocation;
  });

  const lowestRate = workers.length ? Math.min(...workers.map(w => w.hourlyRateAed)) : 7;
  const immediateWorkers = workers.filter(w => w.availability.includes('Immediately')).length;
  const totalAgenciesPool = agencies.reduce((acc, a) => acc + a.currentAvailableStrength, 0);

  const handleExportCsv = () => {
    const csvRows = [
      ['Name', 'Trade', 'Hourly Rate AED', 'Daily Shift AED', 'Monthly Salary AED', 'Visa Status', 'Current Location', 'Emirate', 'Availability', 'Phone', 'WhatsApp', 'Source Platform', 'ORJ Status'].join(',')
    ];
    filteredWorkers.forEach(w => {
      csvRows.push([
        `"${w.name}"`,
        `"${w.trade}"`,
        w.hourlyRateAed,
        w.dailyRateEquivalentAed,
        w.monthlySalaryEquivalentAed,
        `"${w.visaStatus}"`,
        `"${w.currentLocation}"`,
        `"${w.emirate}"`,
        `"${w.availability}"`,
        `"${w.phone}"`,
        `"${w.whatsapp}"`,
        `"${w.sourcePlatform}"`,
        `"${w.orjContactStatus}"`
      ].join(','));
    });

    const csvContent = 'data:text/csv;charset=utf-8,' + encodeURIComponent(csvRows.join('\n'));
    const link = document.createElement('a');
    link.setAttribute('href', csvContent);
    link.setAttribute('download', `ORJ_Technical_Workers_Under_10_AED_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  return (
    <div className="space-y-6 font-sans">
      {/* Top Banner / ORJ Manpower Radar Hero */}
      <div className="p-5 rounded-2xl bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-white border border-amber-300/60 shadow-soft flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-black bg-amber-500 text-white shadow-2xs">
              ORJ TECHNICAL MANPOWER RADAR
            </span>
            <span className="text-xs text-amber-800 font-semibold">Willing to work at ≤ 10 AED/Hour</span>
          </div>
          <h2 className="text-xl font-black text-slate-900 tracking-tight">
            UAE Technical Workers & Labor Supply (DHS ≤10/Hour)
          </h2>
          <p className="text-xs text-slate-600 max-w-2xl">
            Sourcing freelance technicians, labor camp leads in Sonapur & Al Quoz, scraped TikTok & Facebook comment sections, and bulk UAE manpower agencies ready for immediate subcontract supply by ORJ.
          </p>
        </div>

        {/* Top Summary Metrics */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-center shrink-0">
          <div className="bg-white p-3 rounded-xl border border-amber-200 shadow-2xs">
            <span className="text-[10px] text-slate-400 font-bold uppercase block">Workers ≤10/hr</span>
            <span className="text-xl font-black text-amber-700 font-mono">{filteredWorkers.length}</span>
            <span className="text-[10px] text-slate-500">Live Leads</span>
          </div>

          <div className="bg-white p-3 rounded-xl border border-emerald-200 shadow-2xs">
            <span className="text-[10px] text-slate-400 font-bold uppercase block">Lowest Rate</span>
            <span className="text-xl font-black text-emerald-700 font-mono">{lowestRate} AED</span>
            <span className="text-[10px] text-slate-500">Per Hour</span>
          </div>

          <div className="bg-white p-3 rounded-xl border border-sky-200 shadow-2xs">
            <span className="text-[10px] text-slate-400 font-bold uppercase block">Immediate Today</span>
            <span className="text-xl font-black text-sky-700 font-mono">{immediateWorkers}</span>
            <span className="text-[10px] text-slate-500">Mobilization</span>
          </div>

          <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-2xs">
            <span className="text-[10px] text-slate-400 font-bold uppercase block">Agencies Pool</span>
            <span className="text-xl font-black text-slate-900 font-mono">{totalAgenciesPool}</span>
            <span className="text-[10px] text-slate-500">6 UAE Agencies</span>
          </div>
        </div>
      </div>

      {/* Sub-Tabs / View Switcher */}
      <div className="p-1.5 bg-slate-100 rounded-2xl flex flex-wrap items-center justify-between gap-2 border border-slate-200">
        <div className="flex items-center gap-1">
          <button
            onClick={() => setActiveSubTab('workers')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
              activeSubTab === 'workers'
                ? 'bg-white text-slate-900 shadow-2xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            👷 All Workers (≤10 AED/hr) ({filteredWorkers.length})
          </button>

          <button
            onClick={() => setActiveSubTab('social_leads')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeSubTab === 'social_leads'
                ? 'bg-white text-slate-900 shadow-2xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Share2 className="w-3.5 h-3.5 text-sky-600" />
            <span>TikTok & FB Comment Miner</span>
          </button>

          <button
            onClick={() => setActiveSubTab('agencies')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeSubTab === 'agencies'
                ? 'bg-white text-slate-900 shadow-2xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Building2 className="w-3.5 h-3.5 text-amber-600" />
            <span>UAE Manpower Agencies ({filteredAgencies.length})</span>
          </button>

          <button
            onClick={() => setActiveSubTab('pipeline')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeSubTab === 'pipeline'
                ? 'bg-slate-900 text-white shadow-2xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Zap className="w-3.5 h-3.5 text-amber-400" />
            <span>ORJ Dispatch Pipeline</span>
          </button>
        </div>

        <button
          onClick={handleExportCsv}
          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold shadow-xs transition-all active:scale-[0.98]"
        >
          <Download className="w-3.5 h-3.5 text-amber-400" />
          <span>Export Leads CSV</span>
        </button>
      </div>

      {/* Filter Controls Bar */}
      <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-soft flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex flex-wrap items-center gap-3">
          {/* Max Hourly Rate Filter */}
          <div className="flex items-center gap-1.5">
            <span className="text-slate-500 font-bold uppercase tracking-wider text-[10px]">Max Rate:</span>
            <div className="flex items-center gap-1">
              {[
                { label: 'All ≤ 10', val: 'all' },
                { label: '≤ 7 AED', val: 7 },
                { label: '≤ 8 AED', val: 8 },
                { label: '≤ 9 AED', val: 9 },
                { label: '10 AED', val: 10 },
              ].map(opt => (
                <button
                  key={opt.label}
                  onClick={() => setRateFilter(opt.val as any)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                    rateFilter === opt.val
                      ? 'bg-amber-500 text-white shadow-2xs'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Trade Filter */}
          <div className="flex items-center gap-1.5">
            <span className="text-slate-500 font-bold uppercase tracking-wider text-[10px]">Trade:</span>
            <select
              value={tradeFilter}
              onChange={(e) => setTradeFilter(e.target.value)}
              className="bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1 text-slate-800 focus:outline-none focus:border-amber-500 font-medium"
            >
              <option value="all">All Trades</option>
              <option value="Electrician">Electricians</option>
              <option value="Plumber">Plumbers</option>
              <option value="HVAC / AC Tech">HVAC / AC Techs</option>
              <option value="Welder / Fabricator">Welders & Fabricators</option>
              <option value="Gypsum Fixer">Gypsum Fixers</option>
              <option value="Tile Mason">Tile Masons</option>
              <option value="Ductman">Ductmen</option>
              <option value="MEP Helper / Laborer">MEP Helpers (Lowest Cost)</option>
              <option value="Painter / Finisher">Painters & Finishers</option>
            </select>
          </div>

          {/* Visa Status Filter */}
          <div className="flex items-center gap-1.5">
            <span className="text-slate-500 font-bold uppercase tracking-wider text-[10px]">Visa / Freelance:</span>
            <select
              value={visaFilter}
              onChange={(e) => setVisaFilter(e.target.value)}
              className="bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1 text-slate-800 focus:outline-none focus:border-amber-500 font-medium"
            >
              <option value="all">All Visa Types</option>
              <option value="Freelance">Freelance / Partner Visa</option>
              <option value="Own Visa">Own Visa with NOC</option>
              <option value="Visit Visa">Visit Visa (Immediate)</option>
              <option value="Cancelled">Cancelled Visa (Grace Period)</option>
            </select>
          </div>

          {/* Location Filter */}
          <div className="flex items-center gap-1.5">
            <span className="text-slate-500 font-bold uppercase tracking-wider text-[10px]">Emirate:</span>
            <select
              value={locationFilter}
              onChange={(e) => setLocationFilter(e.target.value)}
              className="bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1 text-slate-800 focus:outline-none focus:border-amber-500 font-medium"
            >
              <option value="all">All Emirates</option>
              <option value="Dubai">Dubai (Sonapur, Al Quoz, DIP)</option>
              <option value="Sharjah">Sharjah (Ind. 10, 11, 13)</option>
              <option value="Abu Dhabi">Abu Dhabi (Mussafah)</option>
              <option value="Ajman">Ajman (Jurf)</option>
            </select>
          </div>
        </div>

        {(rateFilter !== 'all' || tradeFilter !== 'all' || visaFilter !== 'all' || locationFilter !== 'all') && (
          <button
            onClick={() => {
              setRateFilter('all');
              setTradeFilter('all');
              setVisaFilter('all');
              setLocationFilter('all');
            }}
            className="text-[11px] text-amber-700 hover:underline font-bold"
          >
            Reset Filters
          </button>
        )}
      </div>

      {/* VIEW 1: ALL WORKERS GRID */}
      {activeSubTab === 'workers' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredWorkers.map(worker => {
            const cleanWhatsapp = worker.whatsapp.replace(/[^0-9]/g, '');
            const orjTemplateMsg = encodeURIComponent(
              `Hello ${worker.name}, this is ORJ Technical Manpower Supply UAE. We noticed your profile for ${worker.trade} at ${worker.hourlyRateAed} AED/hr in ${worker.currentLocation}. We have an immediate technical service project starting today. Are you ready? Please reply.`
            );

            return (
              <div
                key={worker.id}
                className="bg-white p-5 rounded-2xl border border-slate-200 hover:border-amber-400/80 transition-all shadow-card hover:shadow-card-hover flex flex-col justify-between space-y-4 group"
              >
                <div className="space-y-3">
                  {/* Top Bar: Name, Trade & Big Rate Badge */}
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-slate-100 text-slate-700 border border-slate-200">
                        {worker.trade}
                      </span>
                      <h3 className="font-bold text-slate-900 text-base mt-1 group-hover:text-amber-700 transition-colors">
                        {worker.name}
                      </h3>
                      <div className="flex items-center gap-1 text-[11px] text-slate-500 mt-0.5">
                        <MapPin className="w-3 h-3 text-rose-500 shrink-0" />
                        <span className="truncate">{worker.currentLocation}</span>
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <div className="px-2.5 py-1 rounded-xl bg-amber-50 text-amber-900 border border-amber-300 font-mono font-black text-sm">
                        {worker.hourlyRateAed} <span className="text-[10px] font-sans font-bold">AED/hr</span>
                      </div>
                      <span className="text-[10px] text-slate-400 block mt-0.5 font-medium">
                        {worker.dailyRateEquivalentAed} AED/day
                      </span>
                    </div>
                  </div>

                  {/* Visa & Availability Chips */}
                  <div className="flex flex-wrap gap-1.5 text-[10px]">
                    <span className={`px-2 py-0.5 rounded-md font-semibold border ${
                      worker.visaStatus.includes('Freelance') || worker.visaStatus.includes('Own')
                        ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                        : 'bg-sky-50 text-sky-800 border-sky-200'
                    }`}>
                      {worker.visaStatus}
                    </span>

                    <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 border border-slate-200 font-medium">
                      {worker.availability}
                    </span>

                    {worker.toolsEquipped && (
                      <span className="px-2 py-0.5 rounded-md bg-purple-50 text-purple-800 border border-purple-200 font-medium">
                        Tools Equipped
                      </span>
                    )}
                  </div>

                  {/* Scraped Comment Extract */}
                  <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-100 text-slate-600 text-[11px] font-mono leading-relaxed line-clamp-2">
                    "{worker.commentText}"
                  </div>

                  {/* Skills preview */}
                  <div className="flex flex-wrap gap-1 text-[10px]">
                    {worker.skills.slice(0, 3).map((skill, idx) => (
                      <span key={idx} className="bg-slate-100 px-1.5 py-0.5 rounded text-slate-600">
                        {skill}
                      </span>
                    ))}
                    {worker.skills.length > 3 && (
                      <span className="text-[10px] text-slate-400 self-center">
                        +{worker.skills.length - 3} more
                      </span>
                    )}
                  </div>
                </div>

                {/* Bottom Actions: 1-Click WhatsApp for ORJ & Phone Dial */}
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2 text-xs">
                  <button
                    onClick={() => onSelectWorker(worker)}
                    className="text-slate-700 hover:text-amber-700 font-bold flex items-center gap-1 transition-colors"
                  >
                    <span>Inspect Lead</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>

                  <div className="flex items-center gap-1.5">
                    <a
                      href={`tel:${worker.phone}`}
                      className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-all"
                      title="Call Worker"
                    >
                      <Phone className="w-3.5 h-3.5" />
                    </a>

                    <a
                      href={`https://wa.me/${cleanWhatsapp}?text=${orjTemplateMsg}`}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-xs transition-all active:scale-[0.98]"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>ORJ Offer</span>
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* VIEW 2: SOCIAL MEDIA COMMENT LEADS MINER (TIKTOK & FACEBOOK) */}
      {activeSubTab === 'social_leads' && (
        <div className="space-y-4">
          <div className="p-4 bg-sky-50 rounded-xl border border-sky-200 text-xs text-slate-700 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <Share2 className="w-4 h-4 text-sky-600 shrink-0" />
              <div>
                <span className="font-bold text-sky-950">Live Social Media Comments Extraction Hub</span>
                <p className="text-[11px] text-slate-600">
                  Scraping TikTok viral recruitment clips and Facebook Ads comment sections where UAE camp residents post direct phone numbers for under 10 AED/hr work.
                </p>
              </div>
            </div>
            <span className="px-3 py-1 rounded-full bg-sky-600 text-white font-bold text-[10px] shrink-0">
              16 Leads Extracted
            </span>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-card">
            <div className="divide-y divide-slate-100">
              {filteredWorkers.map(worker => {
                const cleanWhatsapp = worker.whatsapp.replace(/[^0-9]/g, '');
                const orjTemplateMsg = encodeURIComponent(
                  `Hello ${worker.name}, this is ORJ Technical Manpower Supply UAE. We saw your comment on ${worker.sourcePlatform} offering ${worker.trade} services at ${worker.hourlyRateAed} AED/hr. We have immediate work in ${worker.currentLocation}.`
                );

                return (
                  <div key={worker.id} className="p-4 hover:bg-slate-50/80 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs">
                    <div className="space-y-1.5 max-w-2xl">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          worker.sourcePlatform.includes('TikTok')
                            ? 'bg-rose-50 text-rose-700 border border-rose-200'
                            : 'bg-blue-50 text-blue-700 border border-blue-200'
                        }`}>
                          {worker.sourcePlatform}
                        </span>
                        <span className="font-bold text-slate-900">{worker.name}</span>
                        <span className="text-slate-400">•</span>
                        <span className="font-semibold text-amber-700 font-mono">{worker.hourlyRateAed} AED/hr</span>
                        <span className="text-slate-400">•</span>
                        <span className="text-slate-500">{worker.currentLocation}</span>
                      </div>

                      <div className="text-[11px] text-slate-500 font-medium">
                        Post: <span className="italic">"{worker.sourcePostOrVideoTitle}"</span>
                      </div>

                      <p className="text-xs text-slate-800 bg-slate-50 p-2.5 rounded-lg border border-slate-200 font-mono">
                        "{worker.commentText}"
                      </p>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={() => onSelectWorker(worker)}
                        className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold transition-all"
                      >
                        Inspect
                      </button>

                      <a
                        href={`https://wa.me/${cleanWhatsapp}?text=${orjTemplateMsg}`}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold shadow-2xs transition-all"
                      >
                        <MessageSquare className="w-3.5 h-3.5" />
                        <span>ORJ Offer</span>
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* VIEW 3: UAE MANPOWER AGENCIES (BULK SUPPLY) */}
      {activeSubTab === 'agencies' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {filteredAgencies.map(agency => {
            const cleanWhatsapp = agency.whatsapp.replace(/[^0-9]/g, '');
            const inquiryMsg = encodeURIComponent(
              `Hello ${agency.contactPerson} (${agency.agencyName}), this is ORJ Technical Services & Procurement UAE. We are looking for technical manpower supply (Electricians, Plumbers, HVAC, Helpers) under your hourly benchmark rate (${agency.hourlyRateBenchmarkAed}). Please share your current available roster.`
            );

            return (
              <div
                key={agency.id}
                className="bg-white p-5 rounded-2xl border border-slate-200 hover:border-amber-400/80 transition-all shadow-card hover:shadow-card-hover flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-amber-50 text-amber-800 border border-amber-200">
                        {agency.licenseType}
                      </span>
                      <h3 className="font-bold text-slate-900 text-base mt-1.5">
                        {agency.agencyName}
                      </h3>
                      <p className="text-xs text-slate-500 font-medium flex items-center gap-1 mt-0.5">
                        <MapPin className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                        <span>{agency.address} ({agency.emirate})</span>
                      </p>
                    </div>

                    <div className="text-right shrink-0">
                      <span className="px-2.5 py-1 rounded-xl bg-slate-900 text-amber-400 font-mono font-black text-xs block">
                        {agency.currentAvailableStrength} Techs
                      </span>
                      <span className="text-[10px] text-slate-400 block mt-0.5 font-medium">
                        Camp: {agency.campLocation.split(' ')[0]}
                      </span>
                    </div>
                  </div>

                  {/* Rate Benchmark Banner */}
                  <div className="p-3 bg-amber-50/50 rounded-xl border border-amber-200 text-xs">
                    <span className="text-[10px] text-slate-400 uppercase font-bold block">Hourly Rate Benchmark</span>
                    <span className="font-mono font-bold text-amber-800 text-sm">{agency.hourlyRateBenchmarkAed}</span>
                  </div>

                  {/* Available Trades */}
                  <div className="space-y-1">
                    <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">
                      Available Trades for Deployment:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {agency.availableTrades.map((t, idx) => (
                        <span key={idx} className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 text-[11px] font-medium">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Approvals & Transport */}
                  <div className="flex flex-wrap gap-2 text-[10px] text-slate-600 pt-2 border-t border-slate-100">
                    <span className="flex items-center gap-1 text-emerald-700 font-semibold">
                      <CheckCircle2 className="w-3 h-3" /> MOHRE Approved
                    </span>
                    <span className="flex items-center gap-1 text-sky-700 font-semibold">
                      <CheckCircle2 className="w-3 h-3" /> Workmen's Comp Insured
                    </span>
                    <span className="flex items-center gap-1 text-purple-700 font-semibold">
                      <CheckCircle2 className="w-3 h-3" /> AC Bus Transport Provided
                    </span>
                  </div>
                </div>

                {/* Bottom Actions */}
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2 text-xs">
                  <div>
                    <span className="text-[10px] text-slate-400 block">Contact: {agency.contactPerson}</span>
                    <span className="font-mono text-slate-700 text-[11px]">{agency.phone}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <a
                      href={`tel:${agency.phone}`}
                      className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold transition-all"
                    >
                      Call
                    </a>

                    <a
                      href={`https://wa.me/${cleanWhatsapp}?text=${inquiryMsg}`}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold shadow-xs transition-all active:scale-[0.98]"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>Inquire Bulk Roster</span>
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* VIEW 4: ORJ DISPATCH PIPELINE & TRACKER */}
      {activeSubTab === 'pipeline' && (
        <div className="space-y-4">
          <div className="p-4 bg-slate-900 text-white rounded-2xl shadow-card flex items-center justify-between">
            <div className="space-y-1">
              <h3 className="font-bold text-sm text-amber-400 flex items-center gap-2">
                <Zap className="w-4 h-4" /> ORJ Technical Manpower Supply Dispatch Engine
              </h3>
              <p className="text-xs text-slate-300">
                Track candidate leads sourced from TikTok and Facebook comments through initial outreach, skills vetting, and active deployment to client projects in UAE.
              </p>
            </div>
            <div className="text-right">
              <span className="text-xs text-slate-400 block">Total Active Leads</span>
              <span className="text-xl font-black text-amber-400 font-mono">{workers.length}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {(['New Lead', 'ORJ Contacted', 'Vetted & Ready', 'Assigned to Client'] as const).map(stage => {
              const stageWorkers = workers.filter(w => w.orjContactStatus === stage);
              return (
                <div key={stage} className="bg-white p-4 rounded-2xl border border-slate-200 shadow-card space-y-3">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                    <span className="font-bold text-xs text-slate-900">{stage}</span>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-slate-100 text-slate-700">
                      {stageWorkers.length}
                    </span>
                  </div>

                  <div className="space-y-2.5 max-h-96 overflow-y-auto pr-1">
                    {stageWorkers.map(w => (
                      <div
                        key={w.id}
                        onClick={() => onSelectWorker(w)}
                        className="p-3 bg-slate-50 hover:bg-amber-50/50 rounded-xl border border-slate-200/80 cursor-pointer transition-all space-y-1"
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-slate-900 text-xs truncate">{w.name}</span>
                          <span className="font-mono font-bold text-amber-700 text-[11px]">{w.hourlyRateAed} AED</span>
                        </div>
                        <div className="text-[11px] text-slate-500">{w.trade}</div>
                        <div className="text-[10px] text-slate-400 truncate">{w.currentLocation}</div>
                      </div>
                    ))}
                    {stageWorkers.length === 0 && (
                      <div className="text-center py-6 text-slate-400 text-xs">
                        No candidates in this stage
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
