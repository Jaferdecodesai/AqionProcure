'use client';

import React, { useState } from 'react';
import { 
  Building2, 
  MapPin, 
  Clock, 
  DollarSign, 
  Calendar, 
  CheckCircle2, 
  ExternalLink, 
  Phone, 
  Mail, 
  MessageSquare, 
  Download, 
  Search, 
  Filter, 
  ShieldCheck, 
  Zap, 
  Droplets, 
  Wind, 
  Home, 
  Cpu, 
  Layers, 
  FileText, 
  ArrowUpRight,
  Sparkles,
  ChevronRight,
  List,
  LayoutGrid,
  TrendingUp,
  AlertCircle,
  RefreshCw,
  Radar,
  Globe,
  Terminal
} from 'lucide-react';
import { UaeTenderRfq } from '../types';

interface ProcurementTabProps {
  tenders: UaeTenderRfq[];
  onSelectTender: (tender: UaeTenderRfq) => void;
  searchQuery: string;
  selectedDomain: string;
  selectedEmirate: string;
  setSelectedDomain: (d: string) => void;
  setSelectedEmirate: (e: string) => void;
}

export const ProcurementTab: React.FC<ProcurementTabProps> = ({
  tenders,
  onSelectTender,
  searchQuery,
  selectedDomain,
  selectedEmirate,
  setSelectedDomain,
  setSelectedEmirate
}) => {
  const [viewMode, setViewMode] = useState<'cards' | 'table'>('cards');
  const [urgencyFilter, setUrgencyFilter] = useState<string>('all');
  const [clientTypeFilter, setClientTypeFilter] = useState<string>('all');

  // --- UAE Portal Web Scraper ---
  const portalOptions = React.useMemo(() => {
    const counts = new Map<string, number>();
    tenders.forEach(t => counts.set(t.sourcePortal, (counts.get(t.sourcePortal) || 0) + 1));
    return Array.from(counts.entries()).sort((a, b) => b[1] - a[1]);
  }, [tenders]);

  const [targetPortal, setTargetPortal] = useState<string>('all');
  const [scrapeKeyword, setScrapeKeyword] = useState<string>('');
  const [isScraping, setIsScraping] = useState(false);
  const [scrapeError, setScrapeError] = useState<string | null>(null);
  const [lastCrawl, setLastCrawl] = useState<{
    crawlId: string; portal: string; recordsFound: number; urgentCount: number;
    verifiedDirectContacts: number; portalsCrawled: number; latencyMs: number;
    totalValueAed: number; timestamp: string; message: string;
  } | null>(null);

  const runPortalScrape = async () => {
    setIsScraping(true);
    setScrapeError(null);
    try {
      const res = await fetch('/api/scrape', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          portal: targetPortal,
          searchKeyword: scrapeKeyword.trim(),
          domain: selectedDomain,
          emirate: selectedEmirate,
        }),
      });
      if (!res.ok) throw new Error(`Gateway responded ${res.status}`);
      const json = await res.json();
      if (json.status !== 'success') throw new Error(json.message || 'Scrape failed');
      setLastCrawl(json);
    } catch (err: any) {
      setScrapeError(err?.message || 'Scraper job failed. Check gateway connectivity.');
    } finally {
      setIsScraping(false);
    }
  };

  // Filter Tenders
  const filteredTenders = tenders.filter(tender => {
    const matchesSearch = !searchQuery ||
      tender.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tender.clientEntity.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tender.specificService.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tender.domainCategory.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tender.siteLocation.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tender.tenderRefNo.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesDomain = selectedDomain === 'all' || tender.domainCategory.toLowerCase() === selectedDomain.toLowerCase();
    const matchesEmirate = selectedEmirate === 'all' || tender.emirate.toLowerCase() === selectedEmirate.toLowerCase();
    const matchesUrgency = urgencyFilter === 'all' || tender.urgency.toLowerCase().includes(urgencyFilter.toLowerCase());
    const matchesClient = clientTypeFilter === 'all' || tender.clientType.toLowerCase().includes(clientTypeFilter.toLowerCase());
    const matchesPortal = targetPortal === 'all' || tender.sourcePortal === targetPortal;

    return matchesSearch && matchesDomain && matchesEmirate && matchesUrgency && matchesClient && matchesPortal;
  });

  const totalValueAed = filteredTenders.reduce((acc, t) => acc + t.estimatedBudgetAed, 0);

  // Icon Helper
  const renderDomainIcon = (domain: string) => {
    switch (domain) {
      case 'Electrical & Power': return <Zap className="w-3.5 h-3.5 text-amber-400" />;
      case 'Plumbing & Drainage': return <Droplets className="w-3.5 h-3.5 text-blue-400" />;
      case 'Air Conditioning & Ventilation': return <Wind className="w-3.5 h-3.5 text-cyan-400" />;
      case 'Smart Home & Automation': return <Home className="w-3.5 h-3.5 text-purple-400" />;
      case 'Security & Access': return <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />;
      case 'Specialist Equipment Installation': return <Cpu className="w-3.5 h-3.5 text-orange-400" />;
      case 'Ceilings, Finishes & Fit-Out': return <Layers className="w-3.5 h-3.5 text-rose-400" />;
      case 'Documentation & Support': return <FileText className="w-3.5 h-3.5 text-teal-400" />;
      default: return <Building2 className="w-3.5 h-3.5 text-slate-300" />;
    }
  };

  const handleExportCsv = () => {
    const csvRows = [
      ['Ref No', 'Tender Title', 'Client Entity', 'Service Domain', 'Sub-Service', 'Emirate', 'Site Location', 'Estimated AED', 'Deadline', 'Source Portal', 'Contact Person', 'Phone', 'Email'].join(',')
    ];
    filteredTenders.forEach(t => {
      csvRows.push([
        `"${t.tenderRefNo}"`,
        `"${t.title}"`,
        `"${t.clientEntity}"`,
        `"${t.domainCategory}"`,
        `"${t.specificService}"`,
        `"${t.emirate}"`,
        `"${t.siteLocation}"`,
        t.estimatedBudgetAed,
        `"${t.submissionDeadline}"`,
        `"${t.sourcePortal}"`,
        `"${t.contactPerson}"`,
        `"${t.phone}"`,
        `"${t.email}"`
      ].join(','));
    });

    const csvContent = 'data:text/csv;charset=utf-8,' + encodeURIComponent(csvRows.join('\n'));
    const link = document.createElement('a');
    link.setAttribute('href', csvContent);
    link.setAttribute('download', `aqionprocure_UAE_Tenders_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  return (
    <div className="space-y-6">
      {/* Top Banner / Scraped Live Sources & Pipeline Stats */}
      <div className="p-5 rounded-2xl bg-slate-900 bg-gradient-to-r from-amber-500/15 via-slate-900/60 to-sky-500/10 border border-slate-700/60 shadow-soft flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-500 text-slate-950 shadow-2xs">
              LIVE UAE TENDER RADAR
            </span>
            <span className="text-xs text-slate-400 font-medium">Scraped across UAE Public & Private Gateways</span>
          </div>
          <h2 className="text-lg font-black text-slate-50 tracking-tight font-sans">
            UAE Company Procurement Requirements Feed
          </h2>
          <p className="text-xs text-slate-300">
            Live RFQs from Tejari, Etisalat e-Procurement, Wasl Properties, Dubai Municipality, DEWA, Dubizzle Pro & Abu Dhabi ERP.
          </p>
        </div>

        <div className="flex items-center gap-4 text-xs shrink-0">
          <div className="bg-slate-900 px-4 py-2.5 rounded-xl border border-slate-700/60 shadow-2xs text-center">
            <span className="text-[10px] text-slate-400 font-bold uppercase block">Active Tenders</span>
            <span className="text-lg font-black text-slate-50 font-mono">{filteredTenders.length}</span>
          </div>
          <div className="bg-slate-900 px-4 py-2.5 rounded-xl border border-amber-500/30 shadow-2xs text-center">
            <span className="text-[10px] text-slate-400 font-bold uppercase block">Pipeline Value</span>
            <span className="text-lg font-black text-amber-300 font-mono">
              {(totalValueAed / 1000).toFixed(0)}k AED
            </span>
          </div>
        </div>
      </div>

      {/* UAE PORTAL WEB SCRAPER */}
      <div className="rounded-2xl bg-slate-900 border border-slate-700/60 shadow-soft overflow-hidden">
        <div className="px-4 py-3 border-b border-slate-700/60 flex items-center justify-between gap-3 flex-wrap">
          <div className="flex items-center gap-2">
            <Radar className={`w-4 h-4 text-amber-400 ${isScraping ? 'animate-spin' : ''}`} />
            <div>
              <h3 className="text-sm font-bold text-slate-50">UAE Portal Web Scraper</h3>
              <p className="text-[11px] text-slate-400">
                Target a specific gateway and re-crawl live procurement requirements on demand.
              </p>
            </div>
          </div>
          <span className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-emerald-300 bg-emerald-500/10 border border-emerald-500/30 px-2.5 py-1 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            {portalOptions.length} Gateways Indexed
          </span>
        </div>

        <div className="p-4 flex flex-wrap items-end gap-3">
          <div className="flex flex-col gap-1.5 min-w-[240px] flex-1">
            <label htmlFor="scraper-portal" className="text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <Globe className="w-3 h-3" /> Target Portal
            </label>
            <select
              id="scraper-portal"
              value={targetPortal}
              onChange={(e) => setTargetPortal(e.target.value)}
              className="bg-slate-800/50 border border-slate-700/60 rounded-lg px-3 py-2 text-xs text-slate-100 font-medium focus:outline-none focus:border-amber-500 min-h-touch"
            >
              <option value="all">All UAE Portals ({tenders.length} live postings)</option>
              {portalOptions.map(([name, count]) => (
                <option key={name} value={name}>{name} ({count})</option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-1.5 min-w-[200px] flex-1">
            <label htmlFor="scraper-keyword" className="text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <Search className="w-3 h-3" /> Crawl Keywords <span className="font-medium normal-case tracking-normal text-slate-400">(optional)</span>
            </label>
            <input
              id="scraper-keyword"
              type="text"
              value={scrapeKeyword}
              onChange={(e) => setScrapeKeyword(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter' && !isScraping) runPortalScrape(); }}
              placeholder="e.g. chiller, MDB retrofit, CCTV"
              className="bg-slate-800/50 border border-slate-700/60 rounded-lg px-3 py-2 text-xs text-slate-100 placeholder-slate-400 focus:outline-none focus:border-amber-500 min-h-touch"
            />
          </div>

          <button
            onClick={runPortalScrape}
            disabled={isScraping}
            aria-busy={isScraping}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all min-h-touch ${
              isScraping
                ? 'bg-slate-800 text-slate-400 cursor-not-allowed'
                : 'bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-md shadow-amber-500/25 active:scale-[0.98]'
            }`}
          >
            <RefreshCw className={`w-4 h-4 text-current ${isScraping ? 'animate-spin' : ''}`} />
            <span>{isScraping ? 'Crawling Portal...' : 'Rescrape Portal'}</span>
          </button>
        </div>

        {/* Crawl result strip */}
        <div aria-live="polite" className="px-4 pb-4">
          {scrapeError && (
            <div className="flex items-center gap-2 rounded-xl border border-rose-500/30 bg-rose-500/10 px-3 py-2.5 text-[11px] font-medium text-rose-300">
              <AlertCircle className="w-3.5 h-3.5 shrink-0" />
              <span>{scrapeError}</span>
            </div>
          )}

          {!scrapeError && lastCrawl && (
            <div className="rounded-xl border border-slate-700/60 bg-slate-950 px-3.5 py-3 font-mono text-[11px] text-slate-300 space-y-1.5">
              <div className="flex items-center gap-2 text-emerald-300">
                <Terminal className="w-3.5 h-3.5 shrink-0" />
                <span className="font-bold">{lastCrawl.message}</span>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-1.5 pt-1">
                <span>Target: <b className="text-amber-300">{lastCrawl.portal === 'all' ? 'All Portals' : lastCrawl.portal}</b></span>
                <span>Postings: <b className="text-slate-50">{lastCrawl.recordsFound}</b></span>
                <span>Urgent (&le;5d): <b className="text-rose-300">{lastCrawl.urgentCount}</b></span>
                <span>Direct contacts: <b className="text-sky-300">{lastCrawl.verifiedDirectContacts}</b></span>
                <span>Gateways: <b className="text-slate-50">{lastCrawl.portalsCrawled}</b></span>
                <span>Pipeline: <b className="text-amber-300">{(lastCrawl.totalValueAed / 1000).toFixed(0)}k AED</b></span>
                <span>Latency: <b className="text-slate-50">{lastCrawl.latencyMs}ms</b></span>
                <span className="truncate" title={lastCrawl.crawlId}>ID: <b className="text-slate-400">{lastCrawl.crawlId}</b></span>
              </div>
              <div className="text-slate-400 pt-0.5">
                Last run {new Date(lastCrawl.timestamp).toLocaleString()}
              </div>
            </div>
          )}

          {!scrapeError && !lastCrawl && (
            <p className="text-[11px] text-slate-400">
              Feed below is filtered to the selected portal. Run a crawl to refresh gateway counts and contact verification.
            </p>
          )}
        </div>
      </div>

      {/* Filter & View Controls Bar */}
      <div className="p-4 bg-slate-900 rounded-2xl border border-slate-700/60 shadow-soft flex flex-wrap items-center justify-between gap-4 text-xs">
        <div className="flex flex-wrap items-center gap-3">
          {/* Urgency Filter */}
          <div className="flex items-center gap-1.5">
            <span className="text-slate-400 font-bold uppercase tracking-wider text-[10px]">Urgency:</span>
            <select
              value={urgencyFilter}
              onChange={(e) => setUrgencyFilter(e.target.value)}
              className="bg-slate-800/50 border border-slate-700/60 rounded-lg px-2.5 py-1.5 text-slate-100 focus:outline-none focus:border-amber-500 font-medium"
            >
              <option value="all">All Timelines</option>
              <option value="Emergency">Emergency (24h)</option>
              <option value="Urgent">Urgent (3-5 Days)</option>
              <option value="Standard">Standard Bidding (1-2 Weeks)</option>
            </select>
          </div>

          {/* Client Type Filter */}
          <div className="flex items-center gap-1.5">
            <span className="text-slate-400 font-bold uppercase tracking-wider text-[10px]">Client:</span>
            <select
              value={clientTypeFilter}
              onChange={(e) => setClientTypeFilter(e.target.value)}
              className="bg-slate-800/50 border border-slate-700/60 rounded-lg px-2.5 py-1.5 text-slate-100 focus:outline-none focus:border-amber-500 font-medium"
            >
              <option value="all">All Client Types</option>
              <option value="Master Developer">Master Developers (Emaar, Wasl, DAMAC)</option>
              <option value="Government">Government & Municipalities (DM, DEWA)</option>
              <option value="Facility Management">Facility Management (Khidmah, Emrill)</option>
              <option value="Commercial">Commercial / Fit-Out</option>
              <option value="Private Villa">Private Luxury Villas</option>
            </select>
          </div>

          {/* Reset Filters */}
          {(selectedDomain !== 'all' || selectedEmirate !== 'all' || urgencyFilter !== 'all' || clientTypeFilter !== 'all' || targetPortal !== 'all') && (
            <button
              onClick={() => {
                setSelectedDomain('all');
                setSelectedEmirate('all');
                setUrgencyFilter('all');
                setClientTypeFilter('all');
                setTargetPortal('all');
              }}
              className="px-2.5 py-1 rounded-lg bg-amber-500/10 text-amber-200 font-bold hover:bg-amber-500/20 transition-all text-[11px]"
            >
              Reset Filters
            </button>
          )}
        </div>

        {/* View Toggle & CSV Export */}
        <div className="flex items-center gap-2">
          <div className="p-1 bg-slate-800 rounded-xl flex items-center gap-1 border border-slate-700/60">
            <button
              onClick={() => setViewMode('cards')}
              className={`p-1.5 rounded-lg transition-all ${
                viewMode === 'cards' ? 'bg-slate-900 shadow-2xs text-slate-50' : 'text-slate-400 hover:text-slate-200'
              }`}
              title="Card View"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`p-1.5 rounded-lg transition-all ${
                viewMode === 'table' ? 'bg-slate-900 shadow-2xs text-slate-50' : 'text-slate-400 hover:text-slate-200'
              }`}
              title="Table View"
            >
              <List className="w-4 h-4" />
            </button>
          </div>

          <button
            onClick={handleExportCsv}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold shadow-xs transition-all active:scale-[0.98]"
          >
            <Download className="w-3.5 h-3.5 text-current" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* VIEW 1: INDIVIDUAL TENDER CARDS FEED */}
      {viewMode === 'cards' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {filteredTenders.map(tender => {
            const cleanWhatsapp = tender.whatsapp.replace(/[^0-9]/g, '');
            const proposalMsg = encodeURIComponent(
              `Hello ${tender.contactPerson} (${tender.clientEntity}), we saw your requirement ${tender.tenderRefNo}: "${tender.title}" for ${tender.specificService} in ${tender.siteLocation} on aqionprocure. We would like to submit our quotation and technical proposal.`
            );

            return (
              <div
                key={tender.id}
                className="p-5 rounded-2xl bg-slate-900 border border-slate-700/60 hover:border-amber-400/80 transition-all shadow-card hover:shadow-card-hover flex flex-col justify-between space-y-4 group"
              >
                <div className="space-y-3">
                  {/* Top Bar: Reference + Portal Source + Urgency */}
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="px-2 py-0.5 rounded-md font-mono text-[10px] font-bold bg-slate-800 text-slate-100 border border-slate-700/60">
                          {tender.tenderRefNo}
                        </span>
                        <span className="px-2 py-0.5 rounded-md text-[10px] font-semibold bg-sky-500/15 text-sky-300 border border-sky-500/30">
                          {tender.sourcePortal}
                        </span>
                      </div>
                      <h3 className="font-bold text-slate-50 text-sm mt-1.5 group-hover:text-amber-300 transition-colors">
                        {tender.title}
                      </h3>
                    </div>

                    <div className="text-right shrink-0">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold block ${
                        tender.urgency.includes('Emergency')
                          ? 'bg-rose-500/10 text-rose-300 border border-rose-200 animate-pulse'
                          : tender.daysRemaining <= 5
                          ? 'bg-amber-500/15 text-amber-300 border border-amber-500/30'
                          : 'bg-emerald-500/10 text-emerald-300 border border-emerald-500/30'
                      }`}>
                        {tender.daysRemaining} Days Left
                      </span>
                    </div>
                  </div>

                  {/* Client & Location Details */}
                  <div className="p-3 bg-slate-800/50 rounded-xl border border-slate-800 flex items-center justify-between text-xs">
                    <div>
                      <span className="text-[10px] text-slate-400 font-bold uppercase block">Posting Entity</span>
                      <span className="font-bold text-slate-50">{tender.clientEntity}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] text-slate-400 font-bold uppercase block">Site Location</span>
                      <span className="font-medium text-slate-200">{tender.siteLocation}</span>
                    </div>
                  </div>

                  {/* Scope Description */}
                  <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
                    {tender.scopeDescription}
                  </p>

                  {/* Technical Scope Checklist */}
                  <div className="space-y-1 pt-2 border-t border-slate-800">
                    <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">
                      Scope Takeoffs & Items:
                    </span>
                    <ul className="space-y-1 text-[11px] text-slate-200">
                      {tender.scopeItems.slice(0, 2).map((item, idx) => (
                        <li key={idx} className="flex items-start gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                          <span className="line-clamp-1">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 text-[10px]">
                    <span className="flex items-center gap-1 px-2 py-0.5 rounded-md bg-slate-800 text-slate-200 border border-slate-700/60 font-semibold">
                      {renderDomainIcon(tender.domainCategory)}
                      <span>{tender.specificService}</span>
                    </span>
                    <span className="px-2 py-0.5 rounded-md bg-amber-500/15 text-amber-300 border border-amber-500/30 font-bold">
                      {tender.estimatedBudgetAed.toLocaleString()} AED Est.
                    </span>
                  </div>
                </div>

                {/* Bottom Actions */}
                <div className="pt-3 border-t border-slate-800 flex items-center justify-between gap-2 text-xs">
                  <button
                    onClick={() => onSelectTender(tender)}
                    className="text-xs font-bold text-slate-200 hover:text-amber-300 flex items-center gap-1 transition-colors"
                  >
                    <span>View BoQ Specs</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onSelectTender(tender)}
                      className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-100 text-xs font-bold transition-all"
                    >
                      Details
                    </button>

                    <a
                      href={`https://wa.me/${cleanWhatsapp}?text=${proposalMsg}`}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-bold text-xs shadow-xs transition-all active:scale-[0.98]"
                      title="Submit Bid via WhatsApp"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>WhatsApp Bid</span>
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* VIEW 2: COMPACT TABLE VIEW */}
      {viewMode === 'table' && (
        <div className="bg-slate-900 border border-slate-700/60 rounded-2xl overflow-hidden shadow-card">
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-800/50 text-slate-300 uppercase tracking-wider text-[10px] font-bold border-b border-slate-700/60">
                <tr>
                  <th className="p-3.5">Ref / Client</th>
                  <th className="p-3.5">Tender Title & Scope</th>
                  <th className="p-3.5">Service Category</th>
                  <th className="p-3.5">Location</th>
                  <th className="p-3.5">Est. Budget</th>
                  <th className="p-3.5">Deadline</th>
                  <th className="p-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 text-slate-200">
                {filteredTenders.map(tender => {
                  const cleanWhatsapp = tender.whatsapp.replace(/[^0-9]/g, '');
                  const proposalMsg = encodeURIComponent(
                    `Hello ${tender.contactPerson} (${tender.clientEntity}), we saw your requirement ${tender.tenderRefNo}: "${tender.title}" on aqionprocure.`
                  );

                  return (
                    <tr key={tender.id} className="hover:bg-slate-800/50 transition-colors">
                      <td className="p-3.5">
                        <span className="font-mono text-[10px] font-bold bg-slate-800 text-slate-100 px-1.5 py-0.5 rounded border border-slate-700/60 block w-max">
                          {tender.tenderRefNo}
                        </span>
                        <span className="font-bold text-slate-50 block mt-1">{tender.clientEntity}</span>
                        <span className="text-[10px] text-slate-400 block">{tender.sourcePortal}</span>
                      </td>
                      <td className="p-3.5 max-w-xs">
                        <button
                          onClick={() => onSelectTender(tender)}
                          className="font-bold text-slate-50 hover:text-amber-300 text-left line-clamp-1 transition-colors"
                        >
                          {tender.title}
                        </button>
                        <p className="text-[11px] text-slate-400 line-clamp-1 mt-0.5">{tender.scopeDescription}</p>
                      </td>
                      <td className="p-3.5">
                        <span className="px-2 py-0.5 rounded-md bg-slate-800 text-slate-200 border border-slate-700/60 font-medium block w-max">
                          {tender.specificService}
                        </span>
                      </td>
                      <td className="p-3.5 font-medium text-slate-200 whitespace-nowrap">
                        {tender.siteLocation}
                      </td>
                      <td className="p-3.5 font-mono font-bold text-amber-300 whitespace-nowrap">
                        {tender.estimatedBudgetAed.toLocaleString()} AED
                      </td>
                      <td className="p-3.5 whitespace-nowrap">
                        <span className="font-bold text-slate-50 block">{tender.submissionDeadline}</span>
                        <span className={`text-[10px] font-semibold ${tender.daysRemaining <= 5 ? 'text-amber-300' : 'text-emerald-300'}`}>
                          {tender.daysRemaining}d remaining
                        </span>
                      </td>
                      <td className="p-3.5 text-right whitespace-nowrap">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => onSelectTender(tender)}
                            className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold"
                          >
                            BoQ
                          </button>
                          <a
                            href={`https://wa.me/${cleanWhatsapp}?text=${proposalMsg}`}
                            target="_blank"
                            rel="noreferrer"
                            className="p-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-slate-950 shadow-2xs transition-all"
                            title="WhatsApp Bid"
                          >
                            <MessageSquare className="w-3.5 h-3.5" />
                          </a>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
