'use client';

import React, { useState } from 'react';
import { Sidebar } from '@/components/Sidebar';
import { ProcurementTab } from '@/components/ProcurementTab';
import { ManpowerTab } from '@/components/ManpowerTab';
import { AnalyticsTab } from '@/components/AnalyticsTab';
import { TenderModal } from '@/components/TenderModal';
import { CandidateModal } from '@/components/CandidateModal';
import { RfqModal } from '@/components/RfqModal';

import { uaeTendersRfqsData } from '@/data/uaeTendersRfqs';
import { procurementServiceCategories } from '@/data/procurementServices';
import { uaeVendorsData } from '@/data/uaeVendors';
import { manpowerAgenciesData } from '@/data/manpowerAgencies';
import { facebookAdLeadsData } from '@/data/facebookAdLeads';
import { technicianJobSeekersData } from '@/data/technicianJobSeekers';

import { UaeTenderRfq, FacebookCommentLead, TechnicianJobSeeker, SubService } from '@/types';
import { 
  Menu, 
  Search, 
  PlusCircle, 
  RefreshCw, 
  ShieldCheck, 
  Sparkles, 
  Building2, 
  Users, 
  Layers, 
  Download
} from 'lucide-react';

export default function Home() {
  const [activeTab, setActiveTab] = useState<'procurement' | 'manpower' | 'analytics' | 'scraper'>('procurement');
  const [globalSearch, setGlobalSearch] = useState<string>('');
  const [selectedDomain, setSelectedDomain] = useState<string>('all');
  const [selectedEmirate, setSelectedEmirate] = useState<string>('all');
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState<boolean>(false);

  // Modals state
  const [selectedTender, setSelectedTender] = useState<UaeTenderRfq | null>(null);
  const [isTenderModalOpen, setIsTenderModalOpen] = useState<boolean>(false);

  const [selectedCandidate, setSelectedCandidate] = useState<FacebookCommentLead | TechnicianJobSeeker | null>(null);
  const [isCandidateModalOpen, setIsCandidateModalOpen] = useState<boolean>(false);

  const [isRfqModalOpen, setIsRfqModalOpen] = useState<boolean>(false);

  const totalFbLeads = facebookAdLeadsData.reduce((acc, ad) => acc + ad.leadContacts.length, 0);
  const totalPipelineValue = uaeTendersRfqsData.reduce((acc, t) => acc + t.estimatedBudgetAed, 0);

  const handleOpenTender = (tender: UaeTenderRfq) => {
    setSelectedTender(tender);
    setIsTenderModalOpen(true);
  };

  const handleSelectCandidate = (candidate: FacebookCommentLead | TechnicianJobSeeker) => {
    setSelectedCandidate(candidate);
    setIsCandidateModalOpen(true);
  };

  const handleTriggerScrape = () => {
    setActiveTab('scraper');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex font-sans">
      {/* Left Sidebar */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        selectedDomain={selectedDomain}
        setSelectedDomain={setSelectedDomain}
        selectedEmirate={selectedEmirate}
        setSelectedEmirate={setSelectedEmirate}
        onOpenNewRfq={() => setIsRfqModalOpen(true)}
        onTriggerScrape={handleTriggerScrape}
        counts={{
          tendersCount: uaeTendersRfqsData.length,
          totalValueAed: totalPipelineValue,
          agenciesCount: manpowerAgenciesData.length,
          leadsCount: totalFbLeads + technicianJobSeekersData.length,
        }}
        isMobileOpen={isMobileSidebarOpen}
        setIsMobileOpen={setIsMobileSidebarOpen}
      />

      {/* Main Content Area */}
      <div className="flex-1 min-w-0 md:ml-72 flex flex-col min-h-screen">
        {/* Top Navbar */}
        <header className="sticky top-0 z-30 bg-slate-900/90 backdrop-blur-md border-b border-slate-700/60 shadow-2xs px-4 md:px-8 py-3 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsMobileSidebarOpen(true)}
              className="p-2 rounded-xl text-slate-300 hover:bg-slate-800 md:hidden"
            >
              <Menu className="w-5 h-5" />
            </button>

            <div className="hidden sm:block">
              <span className="text-xs font-bold text-slate-50 tracking-tight block">
                {activeTab === 'procurement' && 'UAE Tender & RFQ Gateways'}
                {activeTab === 'manpower' && 'India & Kerala Manpower Intelligence'}
                {activeTab === 'analytics' && 'UAE Tender Volume & Pricing Analytics'}
                {activeTab === 'scraper' && 'Scraper Engine & Data Extraction Hub'}
              </span>
              <span className="text-[10px] text-slate-400 font-medium">
                Live Data Feed • Tejari, Etisalat, Wasl, DEWA, DM, Dubizzle Pro
              </span>
            </div>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-md relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={globalSearch}
              onChange={(e) => setGlobalSearch(e.target.value)}
              placeholder="Search tenders, RFQs, clients, Kerala agencies, candidate leads..."
              className="w-full bg-slate-800/50 hover:bg-slate-800/70 focus:bg-slate-900 border border-slate-700/60 rounded-xl pl-9 pr-8 py-2 text-xs text-slate-100 placeholder-slate-400 focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/10 transition-all"
            />
            {globalSearch && (
              <button
                onClick={() => setGlobalSearch('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-200 bg-slate-700/70 w-4 h-4 rounded-full flex items-center justify-center font-bold"
              >
                ✕
              </button>
            )}
          </div>

          {/* Header Action Button */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsRfqModalOpen(true)}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold shadow-xs transition-all active:scale-[0.98]"
            >
              <PlusCircle className="w-3.5 h-3.5 text-current" />
              <span className="hidden sm:inline">Post Requirement</span>
            </button>
          </div>
        </header>

        {/* Main View Area */}
        <main className="p-4 md:p-8 flex-1 max-w-7xl w-full mx-auto space-y-6">
          {activeTab === 'procurement' && (
            <ProcurementTab
              tenders={uaeTendersRfqsData}
              onSelectTender={handleOpenTender}
              searchQuery={globalSearch}
              selectedDomain={selectedDomain}
              selectedEmirate={selectedEmirate}
              setSelectedDomain={setSelectedDomain}
              setSelectedEmirate={setSelectedEmirate}
            />
          )}

          {(activeTab === 'manpower' || activeTab === 'scraper') && (
            <ManpowerTab
              agencies={manpowerAgenciesData}
              facebookAds={facebookAdLeadsData}
              technicians={technicianJobSeekersData}
              onSelectCandidate={handleSelectCandidate}
              searchQuery={globalSearch}
              onTriggerScrape={handleTriggerScrape}
            />
          )}

          {activeTab === 'analytics' && (
            <AnalyticsTab
              tenders={uaeTendersRfqsData}
              onSelectTender={handleOpenTender}
            />
          )}
        </main>

        {/* Footer */}
        <footer className="mt-auto border-t border-slate-700/60 bg-slate-900 py-5 px-6 md:px-8 text-xs text-slate-400">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
              <span className="font-bold text-slate-100">aqionprocure UAE</span>
              <span>• Port 3007 Operational</span>
            </div>
            <div className="flex items-center gap-4 text-slate-400 font-medium">
              <span>Tejari & e-Procurement Gateways</span>
              <span>•</span>
              <span>eMigrate MEA Licensed</span>
              <span>•</span>
              <span>SIRA Security Norms</span>
            </div>
          </div>
        </footer>
      </div>

      {/* Modals */}
      <TenderModal
        tender={selectedTender}
        isOpen={isTenderModalOpen}
        onClose={() => setIsTenderModalOpen(false)}
      />

      <CandidateModal
        candidate={selectedCandidate}
        isOpen={isCandidateModalOpen}
        onClose={() => setIsCandidateModalOpen(false)}
      />

      <RfqModal
        isOpen={isRfqModalOpen}
        onClose={() => setIsRfqModalOpen(false)}
        serviceCategories={procurementServiceCategories}
        uaeVendors={uaeVendorsData}
        initialService={null}
      />
    </div>
  );
}
