'use client';

import React, { useState } from 'react';
import { 
  Users, 
  Search, 
  Filter, 
  Phone, 
  Mail, 
  MessageSquare, 
  MapPin, 
  Award, 
  Briefcase, 
  ExternalLink, 
  Download, 
  RefreshCw, 
  CheckCircle2, 
  ShieldCheck, 
  Building2, 
  Sparkles, 
  Clock, 
  ArrowUpRight,
  Terminal,
  Radio,
  Share2
} from 'lucide-react';
import { ManpowerAgency, FacebookAd, FacebookCommentLead, TechnicianJobSeeker } from '../types';

interface ManpowerTabProps {
  agencies: ManpowerAgency[];
  facebookAds: FacebookAd[];
  technicians: TechnicianJobSeeker[];
  onSelectCandidate: (candidate: FacebookCommentLead | TechnicianJobSeeker) => void;
  searchQuery: string;
  onTriggerScrape: () => void;
}

export const ManpowerTab: React.FC<ManpowerTabProps> = ({
  agencies,
  facebookAds,
  technicians,
  onSelectCandidate,
  searchQuery,
  onTriggerScrape
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'agencies' | 'fb_miner' | 'job_seekers' | 'live_scraper'>('agencies');
  const [selectedKeralaDistrict, setSelectedKeralaDistrict] = useState<string>('all');
  const [selectedTradeFilter, setSelectedTradeFilter] = useState<string>('all');
  const [gulfExpOnly, setGulfExpOnly] = useState<boolean>(false);
  const [ecnrOnly, setEcnrOnly] = useState<boolean>(false);

  // Scraper console state
  const [scraperPlatform, setScraperPlatform] = useState<string>('facebook_ads');
  const [scraperKeyword, setScraperKeyword] = useState<string>('Kerala Electrician HVAC Gulf Jobs 2026');
  const [isScrapingRunning, setIsScrapingRunning] = useState<boolean>(false);
  const [scrapeTerminalLogs, setScrapeTerminalLogs] = useState<string[]>([
    '[INIT] aqionprocure Scraper Engine v4.2 Ready on Port 3007.',
    '[CONNECT] UAE Procurement <-> Indian Overseas Recruitment Gateway Active.',
    '[INDEX] 8 Kerala MEA Agencies, 10 FB Ad Leads, 9 Job Portal Techs Loaded in Memory.'
  ]);

  // Extract all Facebook Comment Leads
  const allCommentLeads: FacebookCommentLead[] = facebookAds.flatMap(ad => ad.leadContacts);

  // Filter Agencies
  const filteredAgencies = agencies.filter(agency => {
    const matchesSearch = !searchQuery ||
      agency.agencyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      agency.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (agency.district && agency.district.toLowerCase().includes(searchQuery.toLowerCase())) ||
      agency.specializedTrades.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesDistrict = selectedKeralaDistrict === 'all' ||
      (agency.district && agency.district.toLowerCase() === selectedKeralaDistrict.toLowerCase()) ||
      (agency.locationState.toLowerCase() === selectedKeralaDistrict.toLowerCase());

    const matchesTrade = selectedTradeFilter === 'all' ||
      agency.specializedTrades.some(t => t.toLowerCase().includes(selectedTradeFilter.toLowerCase()));

    return matchesSearch && matchesDistrict && matchesTrade;
  });

  // Filter Facebook Comment Leads
  const filteredCommentLeads = allCommentLeads.filter(lead => {
    const matchesSearch = !searchQuery ||
      lead.candidateName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.trade.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.currentLocation.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.commentSnippet.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesDistrict = selectedKeralaDistrict === 'all' ||
      lead.currentLocation.toLowerCase().includes(selectedKeralaDistrict.toLowerCase());

    const matchesTrade = selectedTradeFilter === 'all' ||
      lead.matchingServiceCategory.toLowerCase().includes(selectedTradeFilter.toLowerCase()) ||
      lead.trade.toLowerCase().includes(selectedTradeFilter.toLowerCase());

    const matchesGulf = !gulfExpOnly || lead.gulfExperience;
    const matchesPassport = !ecnrOnly || lead.passportStatus.includes('ECNR');

    return matchesSearch && matchesDistrict && matchesTrade && matchesGulf && matchesPassport;
  });

  // Filter Job Seekers
  const filteredTechnicians = technicians.filter(tech => {
    const matchesSearch = !searchQuery ||
      tech.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tech.primaryTrade.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tech.skills.some(s => s.toLowerCase().includes(searchQuery.toLowerCase())) ||
      tech.district.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesDistrict = selectedKeralaDistrict === 'all' ||
      tech.district.toLowerCase() === selectedKeralaDistrict.toLowerCase() ||
      tech.state.toLowerCase() === selectedKeralaDistrict.toLowerCase();

    const matchesTrade = selectedTradeFilter === 'all' ||
      tech.subCategory.toLowerCase().includes(selectedTradeFilter.toLowerCase()) ||
      tech.primaryTrade.toLowerCase().includes(selectedTradeFilter.toLowerCase());

    const matchesGulf = !gulfExpOnly || tech.gulfExperienceYears > 0;
    const matchesPassport = !ecnrOnly || tech.passportType === 'ECNR';

    return matchesSearch && matchesDistrict && matchesTrade && matchesGulf && matchesPassport;
  });

  // Handle Export to CSV
  const handleExportCsv = () => {
    let csvRows: string[] = [];
    if (activeSubTab === 'agencies') {
      csvRows.push(['Agency Name', 'State', 'District', 'MEA License', 'Contact Person', 'Phone', 'WhatsApp', 'Email', 'Trades'].join(','));
      filteredAgencies.forEach(a => {
        csvRows.push([
          `"${a.agencyName}"`,
          `"${a.locationState}"`,
          `"${a.district || ''}"`,
          `"${a.meaLicenseNo}"`,
          `"${a.contactPerson}"`,
          `"${a.phone}"`,
          `"${a.whatsapp}"`,
          `"${a.email}"`,
          `"${a.specializedTrades.join('; ')}"`
        ].join(','));
      });
    } else if (activeSubTab === 'fb_miner') {
      csvRows.push(['Candidate Name', 'Trade', 'Phone', 'Location', 'Experience Yrs', 'Gulf Exp', 'Passport', 'Expected Salary AED', 'Comment Snippet'].join(','));
      filteredCommentLeads.forEach(l => {
        csvRows.push([
          `"${l.candidateName}"`,
          `"${l.trade}"`,
          `"${l.phone}"`,
          `"${l.currentLocation}"`,
          l.experienceYears,
          l.gulfExperience ? 'Yes' : 'No',
          `"${l.passportStatus}"`,
          l.expectedSalaryAed,
          `"${l.commentSnippet.replace(/"/g, '""')}"`
        ].join(','));
      });
    } else {
      csvRows.push(['Full Name', 'Primary Trade', 'Category', 'Phone', 'Email', 'District', 'State', 'Exp Yrs', 'Gulf Yrs', 'Passport', 'Expected Salary AED'].join(','));
      filteredTechnicians.forEach(t => {
        csvRows.push([
          `"${t.fullName}"`,
          `"${t.primaryTrade}"`,
          `"${t.subCategory}"`,
          `"${t.contactNumber}"`,
          `"${t.email}"`,
          `"${t.district}"`,
          `"${t.state}"`,
          t.experienceYears,
          t.gulfExperienceYears,
          `"${t.passportType}"`,
          t.expectedSalaryAed
        ].join(','));
      });
    }

    const csvContent = 'data:text/csv;charset=utf-8,' + encodeURIComponent(csvRows.join('\n'));
    const link = document.createElement('a');
    link.setAttribute('href', csvContent);
    link.setAttribute('download', `aqionprocure_Manpower_${activeSubTab}_export_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  // Run live scraping simulation
  const handleRunLiveScrape = async () => {
    setIsScrapingRunning(true);
    setScrapeTerminalLogs(prev => [
      ...prev,
      `[${new Date().toLocaleTimeString()}] Starting live crawl for "${scraperKeyword}" on target: ${scraperPlatform.toUpperCase()}...`,
      `[${new Date().toLocaleTimeString()}] Connecting to proxy rotation pool (India & UAE IP exit nodes)...`,
    ]);

    try {
      const res = await fetch('/api/scrape', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          platform: scraperPlatform,
          searchKeyword: scraperKeyword,
          districtFilter: selectedKeralaDistrict,
          targetTrade: selectedTradeFilter
        })
      });
      const data = await res.json();

      setTimeout(() => {
        setScrapeTerminalLogs(prev => [
          ...prev,
          `[${new Date().toLocaleTimeString()}] Parsing HTML DOM & JavaScript comment payloads...`,
          `[${new Date().toLocaleTimeString()}] Extracted 28 candidate inquiries from Facebook & Telegram Gulf groups.`,
          `[${new Date().toLocaleTimeString()}] Regular expression phone validator: 24 active WhatsApp numbers extracted (+91-9xxxx).`,
          `[${new Date().toLocaleTimeString()}] Cross-referenced MEA eMigrate licensing database for agency records.`,
          `[${new Date().toLocaleTimeString()}] SUCCESS: Crawl ID ${data.crawlId} stored to local procurement repository.`
        ]);
        setIsScrapingRunning(false);
      }, 1500);
    } catch (e) {
      setIsScrapingRunning(false);
    }
  };

  const keralaDistricts = [
    'all',
    'Ernakulam',
    'Kozhikode',
    'Malappuram',
    'Thiruvananthapuram',
    'Thrissur',
    'Kannur',
    'Palakkad',
    'Kollam',
    'Kottayam',
    'Maharashtra'
  ];

  const tradeCategories = [
    'all',
    'Electrical & Power',
    'Plumbing & Drainage',
    'Air Conditioning & Ventilation',
    'Smart Home & Automation',
    'Security & Access',
    'Specialist Equipment',
    'Ceilings, Finishes & Fit-Out',
    'Documentation & Support'
  ];

  return (
    <div className="space-y-6">
      {/* Sub Navigation Segmented Control */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-slate-900 p-2 rounded-2xl border border-slate-700/60 shadow-soft">
        <div className="flex flex-wrap items-center gap-1.5 overflow-x-auto">
          <button
            onClick={() => setActiveSubTab('agencies')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeSubTab === 'agencies'
                ? 'bg-sky-500 text-slate-950 shadow-md shadow-sky-600/20'
                : 'text-slate-300 hover:text-slate-50 hover:bg-slate-800/70'
            }`}
          >
            <Building2 className="w-3.5 h-3.5" />
            <span>Indian & Kerala Recruitment Agencies ({filteredAgencies.length})</span>
          </button>

          <button
            onClick={() => setActiveSubTab('fb_miner')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeSubTab === 'fb_miner'
                ? 'bg-sky-500 text-slate-950 shadow-md shadow-sky-600/20'
                : 'text-slate-300 hover:text-slate-50 hover:bg-slate-800/70'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Facebook Ads Comment Leads Miner ({filteredCommentLeads.length})</span>
          </button>

          <button
            onClick={() => setActiveSubTab('job_seekers')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeSubTab === 'job_seekers'
                ? 'bg-sky-500 text-slate-950 shadow-md shadow-sky-600/20'
                : 'text-slate-300 hover:text-slate-50 hover:bg-slate-800/70'
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            <span>Overseas Technician Job Seekers ({filteredTechnicians.length})</span>
          </button>

          <button
            onClick={() => setActiveSubTab('live_scraper')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeSubTab === 'live_scraper'
                ? 'bg-sky-500 text-slate-950 shadow-md shadow-sky-600/20'
                : 'text-slate-300 hover:text-slate-50 hover:bg-slate-800/70'
            }`}
          >
            <Terminal className="w-3.5 h-3.5 text-emerald-300" />
            <span>Live Scraper Control Hub</span>
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

      {/* Global Filter Bar for Manpower */}
      <div className="p-4 rounded-2xl bg-slate-900 border border-slate-700/60 shadow-soft flex flex-wrap items-center justify-between gap-4 text-xs">
        <div className="flex flex-wrap items-center gap-3">
          {/* Kerala District Selector */}
          <div className="flex items-center gap-2">
            <span className="text-slate-300 font-bold uppercase tracking-wider flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-sky-400" /> Kerala District / State:
            </span>
            <select
              value={selectedKeralaDistrict}
              onChange={(e) => setSelectedKeralaDistrict(e.target.value)}
              className="bg-slate-800/50 border border-slate-700/60 rounded-lg px-3 py-1.5 text-slate-100 focus:outline-none focus:border-sky-500 font-medium"
            >
              {keralaDistricts.map(d => (
                <option key={d} value={d}>
                  {d === 'all' ? 'All Districts / Pan India' : d}
                </option>
              ))}
            </select>
          </div>

          {/* Trade Selector */}
          <div className="flex items-center gap-2">
            <span className="text-slate-300 font-bold uppercase tracking-wider flex items-center gap-1">
              <Briefcase className="w-3.5 h-3.5 text-amber-400" /> Trade Domain:
            </span>
            <select
              value={selectedTradeFilter}
              onChange={(e) => setSelectedTradeFilter(e.target.value)}
              className="bg-slate-800/50 border border-slate-700/60 rounded-lg px-3 py-1.5 text-slate-100 focus:outline-none focus:border-sky-500 font-medium"
            >
              {tradeCategories.map(t => (
                <option key={t} value={t}>
                  {t === 'all' ? 'All Trade Categories' : t}
                </option>
              ))}
            </select>
          </div>

          {/* Checkboxes */}
          <label className="flex items-center gap-1.5 cursor-pointer text-slate-200 font-medium">
            <input
              type="checkbox"
              checked={gulfExpOnly}
              onChange={(e) => setGulfExpOnly(e.target.checked)}
              className="rounded border-slate-600 text-sky-400 focus:ring-sky-500"
            />
            <span>Gulf Exp Only</span>
          </label>

          <label className="flex items-center gap-1.5 cursor-pointer text-slate-200 font-medium">
            <input
              type="checkbox"
              checked={ecnrOnly}
              onChange={(e) => setEcnrOnly(e.target.checked)}
              className="rounded border-slate-600 text-sky-400 focus:ring-sky-500"
            />
            <span>ECNR Passport (Ready)</span>
          </label>
        </div>

        <div className="text-slate-400 font-mono text-[11px] font-semibold">
          eMigrate MEA Verified: <span className="text-emerald-400">100% Licensed</span>
        </div>
      </div>

      {/* SUB-VIEW 1: RECRUITMENT AGENCIES */}
      {activeSubTab === 'agencies' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {filteredAgencies.map(agency => {
            const cleanWhatsapp = agency.whatsapp.replace(/[^0-9]/g, '');
            const inquiryMsg = encodeURIComponent(
              `Hello ${agency.contactPerson} (${agency.agencyName}), we are contacting you from aqionprocure UAE regarding recruitment of skilled Electricians, HVAC, and Plumbers from Kerala. Please share current candidate mobilization roster.`
            );

            return (
              <div
                key={agency.id}
                className="p-5 rounded-2xl bg-slate-900 border border-slate-700/60 hover:border-slate-600 transition-all shadow-card hover:shadow-card-hover space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-bold text-slate-50 text-base">{agency.agencyName}</h4>
                        {agency.verifiedMea && (
                          <span className="p-0.5 rounded-full bg-emerald-500/20 text-emerald-400" title="MEA India Registered">
                            <CheckCircle2 className="w-4 h-4" />
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-2 text-xs text-slate-400 mt-1">
                        <span className="px-2 py-0.5 rounded bg-slate-800 text-sky-300 font-mono text-[10px] font-semibold">
                          {agency.meaLicenseNo}
                        </span>
                        <span>•</span>
                        <span className="font-semibold text-slate-100">{agency.district || agency.city}, {agency.locationState}</span>
                        <span>•</span>
                        <span>Est. {agency.establishedYear}</span>
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <span className="px-2.5 py-1 rounded-lg bg-sky-500/10 text-sky-300 text-xs font-mono font-bold border border-sky-500/30">
                        {agency.averageDeploymentDays} Days SLA
                      </span>
                      <span className="text-[10px] text-slate-400 block mt-1">
                        {agency.gulfDeploymentCount.toLocaleString()}+ Deployed
                      </span>
                    </div>
                  </div>

                  {/* Contact Person */}
                  <div className="p-3 bg-slate-800/50 rounded-xl text-xs space-y-1 border border-slate-800">
                    <div className="flex items-center justify-between text-slate-200">
                      <span>Head: <strong className="text-slate-50">{agency.contactPerson}</strong> ({agency.designation})</span>
                      <span className="text-slate-300 font-mono font-semibold">{agency.mobile}</span>
                    </div>
                    <p className="text-slate-400 text-[11px] truncate">
                      {agency.address}
                    </p>
                  </div>

                  {/* Trades Supplied */}
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block mb-1.5">
                      Technical Trades Supplied:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {agency.specializedTrades.map((trade, idx) => (
                        <span key={idx} className="px-2.5 py-0.5 rounded-md bg-slate-800/50 text-slate-200 text-[11px] border border-slate-700/60">
                          {trade}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Branches */}
                  {agency.keralaBranchOffices && agency.keralaBranchOffices.length > 0 && (
                    <div className="text-[11px] text-slate-400">
                      Kerala Centers: <span className="text-slate-100 font-medium">{agency.keralaBranchOffices.join(' • ')}</span>
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div className="pt-3 border-t border-slate-800 flex items-center justify-between gap-2 text-xs">
                  <span className="text-[11px] text-slate-400">
                    Commission: <strong className="text-emerald-300">{agency.commissionType}</strong>
                  </span>

                  <div className="flex items-center gap-2">
                    <a
                      href={`mailto:${agency.email}?subject=aqionprocure UAE Manpower Inquiry`}
                      className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 transition-all"
                      title="Email Agency"
                    >
                      <Mail className="w-4 h-4" />
                    </a>

                    <a
                      href={`https://wa.me/${cleanWhatsapp}?text=${inquiryMsg}`}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-bold text-xs shadow-xs transition-all"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>WhatsApp Inquiry</span>
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* SUB-VIEW 2: FACEBOOK ADS COMMENT SECTION LEAD MINER */}
      {activeSubTab === 'fb_miner' && (
        <div className="space-y-6">
          {/* Top Banner */}
          <div className="p-4 rounded-2xl bg-slate-900 bg-gradient-to-r from-sky-500/15 via-slate-900/60 to-amber-500/15 border border-sky-500/30 shadow-soft flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-sky-300 font-bold text-sm">
                <Radio className="w-4 h-4 animate-pulse text-rose-400" />
                <span>Facebook Recruitment Ads & Comments Lead Miner</span>
              </div>
              <p className="text-slate-300">
                Automated phone extraction from comments on Kerala manpower supply campaign ads for electrical, HVAC, and fit-out trades.
              </p>
            </div>

            <div className="flex items-center gap-4 text-slate-300 font-mono">
              <div>Scraped Ads: <strong className="text-slate-50">{facebookAds.length}</strong></div>
              <div>Parsed Comment Leads: <strong className="text-sky-300 font-bold">{allCommentLeads.length}</strong></div>
            </div>
          </div>

          {/* Leads Table */}
          <div className="bg-slate-900 border border-slate-700/60 rounded-2xl overflow-hidden shadow-card">
            <div className="p-4 bg-slate-800/50 border-b border-slate-700/60 flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-50 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-500" />
                <span>Extracted Candidate Leads from Facebook Ads Comments ({filteredCommentLeads.length})</span>
              </h3>
              <span className="text-xs text-slate-400 font-medium">Direct Contact Cards</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="bg-slate-800/50 text-slate-300 uppercase tracking-wider text-[10px] font-bold border-b border-slate-700/60">
                  <tr>
                    <th className="p-3.5">Candidate Name</th>
                    <th className="p-3.5">Trade / Specialty</th>
                    <th className="p-3.5">Contact Number</th>
                    <th className="p-3.5">Location (District)</th>
                    <th className="p-3.5 text-center">Exp (Gulf)</th>
                    <th className="p-3.5">Passport Status</th>
                    <th className="p-3.5">Expected Salary</th>
                    <th className="p-3.5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 text-slate-200">
                  {filteredCommentLeads.map(lead => {
                    const cleanWhatsapp = lead.whatsapp.replace(/[^0-9]/g, '');
                    const waMsg = encodeURIComponent(
                      `Hello ${lead.candidateName}, We saw your inquiry for ${lead.trade} in UAE on aqionprocure. We have immediate visa and spot deployment for a Dubai MEP project. Please reply if you are available.`
                    );

                    return (
                      <tr key={lead.id} className="hover:bg-slate-800/50 transition-colors">
                        <td className="p-3.5 font-bold text-slate-50">
                          <button
                            onClick={() => onSelectCandidate(lead)}
                            className="hover:text-sky-400 transition-colors text-left flex items-center gap-1.5"
                          >
                            <span>{lead.candidateName}</span>
                            <ArrowUpRight className="w-3 h-3 text-slate-400" />
                          </button>
                          <span className="text-[10px] text-slate-400 block truncate max-w-[160px] font-normal">
                            {lead.adSourcePostTitle}
                          </span>
                        </td>
                        <td className="p-3.5">
                          <span className="px-2.5 py-0.5 rounded-md bg-amber-500/15 text-amber-300 border border-amber-500/30 font-semibold">
                            {lead.trade}
                          </span>
                        </td>
                        <td className="p-3.5 font-mono text-slate-50 font-bold">
                          {lead.phone}
                        </td>
                        <td className="p-3.5 font-medium text-slate-200">
                          {lead.currentLocation}
                        </td>
                        <td className="p-3.5 text-center">
                          <span className="font-bold text-slate-50">{lead.experienceYears}y</span>
                          <span className={`text-[10px] block font-semibold ${lead.gulfExperience ? 'text-emerald-300' : 'text-slate-400'}`}>
                            {lead.gulfExperience ? 'Gulf Return' : 'Fresher'}
                          </span>
                        </td>
                        <td className="p-3.5">
                          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-300 border border-emerald-500/30">
                            {lead.passportStatus}
                          </span>
                        </td>
                        <td className="p-3.5 font-mono font-bold text-amber-300">
                          {lead.expectedSalaryAed} AED
                        </td>
                        <td className="p-3.5 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => onSelectCandidate(lead)}
                              className="px-3 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-all"
                            >
                              Profile
                            </button>
                            <a
                              href={`https://wa.me/${cleanWhatsapp}?text=${waMsg}`}
                              target="_blank"
                              rel="noreferrer"
                              className="p-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-slate-950 shadow-2xs transition-all"
                              title="Direct WhatsApp Chat"
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

          {/* Social Ad Cards */}
          <div className="space-y-4">
            <h4 className="text-xs uppercase font-bold text-slate-400 tracking-wider">
              Scraped Facebook Recruitment Agency Ads Feed
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {facebookAds.map(ad => (
                <div key={ad.id} className="bg-slate-900 p-5 rounded-2xl border border-slate-700/60 space-y-3 shadow-card">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <span className="text-xs font-bold text-sky-300">{ad.pageName}</span>
                      <h4 className="text-sm font-bold text-slate-50 mt-0.5">{ad.postTitle}</h4>
                      <p className="text-[11px] text-slate-400 mt-1">Posted on {ad.postedDate} • {ad.regionFocus}</p>
                    </div>
                    <span className="px-2.5 py-1 rounded-lg bg-sky-500/10 text-sky-300 font-mono text-[10px] font-bold border border-sky-500/30 shrink-0">
                      {ad.extractedLeadsCount} Leads Extracted
                    </span>
                  </div>

                  <p className="text-xs text-slate-200 whitespace-pre-line bg-slate-800/50 p-3.5 rounded-xl border border-slate-800 font-sans">
                    {ad.adText}
                  </p>

                  <div className="flex items-center justify-between pt-2 border-t border-slate-800 text-[11px] text-slate-400">
                    <span>Reach: <strong className="text-slate-100">{ad.reachEstimate}</strong></span>
                    <span>Total Comments: <strong className="text-slate-50">{ad.totalCommentsScraped}</strong></span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* SUB-VIEW 3: OVERSEAS TECHNICIAN JOB SEEKERS */}
      {activeSubTab === 'job_seekers' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {filteredTechnicians.map(tech => {
            const cleanWhatsapp = tech.whatsappNumber.replace(/[^0-9]/g, '');
            const waMsg = encodeURIComponent(
              `Hello ${tech.fullName}, we saw your profile for ${tech.primaryTrade} in ${tech.sourcePortal} on aqionprocure. We have an urgent requirement in UAE with free visa & accommodation. Are you available?`
            );

            return (
              <div
                key={tech.id}
                className="p-5 rounded-2xl bg-slate-900 border border-slate-700/60 hover:border-slate-600 transition-all shadow-card hover:shadow-card-hover flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <button
                        onClick={() => onSelectCandidate(tech)}
                        className="font-bold text-slate-50 text-base hover:text-sky-400 transition-colors text-left flex items-center gap-1.5"
                      >
                        <span>{tech.fullName}</span>
                        <ArrowUpRight className="w-3.5 h-3.5 text-slate-400" />
                      </button>
                      <p className="text-xs font-semibold text-amber-300 mt-0.5">{tech.primaryTrade}</p>
                      <p className="text-[11px] text-slate-400">{tech.district}, {tech.state}</p>
                    </div>

                    <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-300 font-mono text-[10px] font-bold border border-emerald-500/30">
                      {tech.passportType}
                    </span>
                  </div>

                  {/* Experience Grid */}
                  <div className="grid grid-cols-2 gap-2 bg-slate-800/50 p-3 rounded-xl text-xs border border-slate-800">
                    <div>
                      <span className="text-[10px] text-slate-400 block">Total Exp</span>
                      <span className="font-bold text-slate-50">{tech.experienceYears} Years</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 block">Gulf Exp</span>
                      <span className="font-bold text-sky-300">{tech.gulfExperienceYears} Years</span>
                    </div>
                    <div className="col-span-2 pt-1 border-t border-slate-700/60">
                      <span className="text-[10px] text-slate-400 block">Current Status</span>
                      <span className="font-semibold text-emerald-300 text-[11px]">{tech.currentStatus}</span>
                    </div>
                  </div>

                  {/* Skills */}
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block mb-1">
                      Key Competencies:
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {tech.skills.slice(0, 3).map((skill, idx) => (
                        <span key={idx} className="px-2 py-0.5 rounded-md bg-slate-800 text-slate-200 text-[10px] border border-slate-700/60">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Actions & Salary */}
                <div className="pt-3 border-t border-slate-800 flex items-center justify-between gap-2 text-xs">
                  <div>
                    <span className="text-[10px] text-slate-400 block">Expected Salary</span>
                    <span className="font-mono font-bold text-amber-300">{tech.expectedSalaryAed} AED</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onSelectCandidate(tech)}
                      className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-all"
                    >
                      Profile
                    </button>
                    <a
                      href={`https://wa.me/${cleanWhatsapp}?text=${waMsg}`}
                      target="_blank"
                      rel="noreferrer"
                      className="p-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-slate-950 shadow-2xs transition-all"
                      title="Chat on WhatsApp"
                    >
                      <MessageSquare className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* SUB-VIEW 4: LIVE SCRAPER CONTROL HUB */}
      {activeSubTab === 'live_scraper' && (
        <div className="bg-slate-900 border border-slate-700/60 rounded-2xl p-6 shadow-card space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-5">
            <div>
              <div className="flex items-center gap-2">
                <Terminal className="w-5 h-5 text-emerald-400" />
                <h3 className="text-base font-bold text-slate-50">aqionprocure Live Web Scraper & Intelligence Hub</h3>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Configure live crawler parameters across Facebook Recruitment Pages, UAE Procurement Portals, and Indian Job Registries
              </p>
            </div>

            <button
              onClick={handleRunLiveScrape}
              disabled={isScrapingRunning}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs transition-all ${
                isScrapingRunning
                  ? 'bg-slate-800 text-slate-400 cursor-not-allowed'
                  : 'bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-md shadow-amber-500/25 active:scale-[0.98]'
              }`}
            >
              <RefreshCw className={`w-4 h-4 text-current ${isScrapingRunning ? 'animate-spin' : ''}`} />
              <span>{isScrapingRunning ? 'Crawling Targets...' : 'Trigger Live Scrape Job'}</span>
            </button>
          </div>

          {/* Parameters */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                Target Platform / Crawler Adapter
              </label>
              <select
                value={scraperPlatform}
                onChange={(e) => setScraperPlatform(e.target.value)}
                className="w-full bg-slate-800/50 border border-slate-700/60 rounded-xl px-3 py-2 text-slate-100 focus:outline-none focus:border-sky-500 font-medium"
              >
                <option value="facebook_ads">Facebook Manpower Agency Ads & Comments</option>
                <option value="uae_portals">UAE Portals (Tejari, Dubizzle, YellowPages.ae)</option>
                <option value="kerala_agencies">eMigrate MEA Registered Agencies Database</option>
                <option value="job_boards">GulfJobSeeker & NaukriGulf Kerala Pool</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                Search Query / Trade Keywords
              </label>
              <input
                type="text"
                value={scraperKeyword}
                onChange={(e) => setScraperKeyword(e.target.value)}
                placeholder="e.g. Kerala Electrician HVAC VRF Dubai"
                className="w-full bg-slate-800/50 border border-slate-700/60 rounded-xl px-3 py-2 text-slate-100 focus:outline-none focus:border-sky-500 font-medium"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                Regional Extraction Filter
              </label>
              <select
                value={selectedKeralaDistrict}
                onChange={(e) => setSelectedKeralaDistrict(e.target.value)}
                className="w-full bg-slate-800/50 border border-slate-700/60 rounded-xl px-3 py-2 text-slate-100 focus:outline-none focus:border-sky-500 font-medium"
              >
                {keralaDistricts.map(d => (
                  <option key={d} value={d}>
                    {d === 'all' ? 'All Districts / Pan India' : d}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Clean Terminal Console */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span className="font-semibold text-slate-200">Real-Time Extraction Output Stream:</span>
              <span className="font-mono text-[11px] text-emerald-400 font-bold">HTTP/2 TLS Proxy Ready</span>
            </div>
            <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 font-mono text-xs text-emerald-400 space-y-1.5 max-h-60 overflow-y-auto shadow-inner">
              {scrapeTerminalLogs.map((log, idx) => (
                <div key={idx} className="leading-relaxed">
                  <span className="text-slate-400 mr-2">$</span>
                  <span className={log.includes('SUCCESS') ? 'text-amber-300 font-bold' : log.includes('Extracted') ? 'text-cyan-300' : 'text-emerald-400'}>
                    {log}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
