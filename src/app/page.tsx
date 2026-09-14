'use client';

import React, { useState } from 'react';
import { Sidebar } from '@/components/Sidebar';
import { ProcurementTab } from '@/components/ProcurementTab';
import { ManpowerTab } from '@/components/ManpowerTab';
import { TenDirhamWorkersTab } from '@/components/TenDirhamWorkersTab';
import { AnalyticsTab } from '@/components/AnalyticsTab';
import { TenderModal } from '@/components/TenderModal';
import { CandidateModal } from '@/components/CandidateModal';
import { WorkerLeadModal } from '@/components/WorkerLeadModal';
import { RfqModal } from '@/components/RfqModal';

import { uaeTendersRfqsData } from '@/data/uaeTendersRfqs';
import { procurementServiceCategories } from '@/data/procurementServices';
import { uaeVendorsData } from '@/data/uaeVendors';
import { manpowerAgenciesData } from '@/data/manpowerAgencies';
import { facebookAdLeadsData } from '@/data/facebookAdLeads';
import { technicianJobSeekersData } from '@/data/technicianJobSeekers';
import { uaeTenDirhamWorkersData } from '@/data/uaeTenDirhamWorkers';
import { uaeManpowerSupplyAgenciesData } from '@/data/uaeManpowerSupplyAgencies';

import { 
  UaeTenderRfq, 
  FacebookCommentLead, 
  TechnicianJobSeeker, 
  UaeTenDirhamWorker, 
  UaeManpowerSupplyAgency,
  SubService 
} from '@/types';

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
  Download,
  Zap
} from 'lucide-react';

export default function Home() {
  const [activeTab, setActiveTab] = useState<'procurement' | 'manpower' | 'ten_dirham_workers' | 'analytics' | 'scraper'>('procurement');
  const [globalSearch, setGlobalSearch] = useState<string>('');
  const [selectedDomain, setSelectedDomain] = useState<string>('all');
  const [selectedEmirate, setSelectedEmirate] = useState<string>('all');
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState<boolean>(false);

  // Modals state
  const [selectedTender, setSelectedTender] = useState<UaeTenderRfq | null>(null);
  const [isTenderModalOpen, setIsTenderModalOpen] = useState<boolean>(false);

  const [selectedCandidate, setSelectedCandidate] = useState<FacebookCommentLead | TechnicianJobSeeker | null>(null);
  const [isCandidateModalOpen, setIsCandidateModalOpen] = useState<boolean>(false);

  const [selectedWorker, setSelectedWorker] = useState<UaeTenDirhamWorker | null>(null);
  const [isWorkerModalOpen, setIsWorkerModalOpen] = useState<boolean>(false);

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

  const handleSelectWorker = (worker: UaeTenDirhamWorker) => {
    setSelectedWorker(worker);
    setIsWorkerModalOpen(true);
  };

  const handleTriggerScrape = () => {
    setActiveTab('scraper');
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-800 flex font-sans">
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
          tenDirhamWorkersCount: uaeTenDirhamWorkersData.length,
        }}
        isMobileOpen={isMobileSidebarOpen}
        setIsMobileOpen={setIsMobileSidebarOpen}
      />

      {/* Main Content Area */}
      <div className="flex-1 md:ml-72 flex flex-col min-h-screen">
        {/* Top Navbar */}
        <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200/90 shadow-2xs px-4 md:px-8 py-3 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsMobileSidebarOpen(true)}
              className="p-2 rounded-xl text-slate-600 hover:bg-slate-100 md:hidden"
            >
              <Menu className="w-5 h-5" />
            </button>

            <div className="hidden sm:block">
              <span className="text-xs font-bold text-slate-900 tracking-tight block">
                {activeTab === 'procurement' && 'UAE Tender & RFQ Gateways'}
                {activeTab === 'ten_dirham_workers' && 'ORJ Manpower Radar • Technical Workers ≤ DHS 10/Hour'}
                {activeTab === 'manpower' && 'India & Kerala Manpower Intelligence'}
                {activeTab === 'analytics' && 'UAE Tender Volume & Pricing Analytics'}
                {activeTab === 'scraper' && 'Scraper Engine & Data Extraction Hub'}
              </span>
              <span className="text-[10px] text-slate-400 font-medium">
                {activeTab === 'ten_dirham_workers'
                  ? 'TikTok & Facebook Comment Miner • Sonapur & Al Quoz Camp Leads • Freelancers'
                  : 'Live Data Feed • Tejari, Etisalat, Wasl, DEWA, DM, Dubizzle Pro'}
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
              placeholder={
                activeTab === 'ten_dirham_workers'
                  ? 'Search workers ≤ 10 AED, trades, Sonapur, Al Quoz, visas...'
                  : 'Search tenders, RFQs, clients, Kerala agencies, candidate leads...'
              }
              className="w-full bg-slate-50 hover:bg-slate-100/70 focus:bg-white border border-slate-200 rounded-xl pl-9 pr-8 py-2 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/10 transition-all"
            />
            {globalSearch && (
              <button
                onClick={() => setGlobalSearch('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-700 bg-slate-200/80 w-4 h-4 rounded-full flex items-center justify-center font-bold"
              >
                ✕
              </button>
            )}
          </div>

          {/* Header Action Button */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsRfqModalOpen(true)}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold shadow-xs transition-all active:scale-[0.98]"
            >
              <PlusCircle className="w-3.5 h-3.5 text-amber-400" />
              <span className="hidden sm:inline">Post Requirement</span>
            </button>
          </div>
        </header>

        {/* Main View Area */}
        <main className="p-4 md:p-8 flex-1 max-w-7xl w-full mx-auto space-y-6">
          {/* Tab 1: UAE Tenders */}
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

          {/* NEW Tab: DHS <= 10/hr Technical Workers (ORJ Supply Engine) */}
          {activeTab === 'ten_dirham_workers' && (
            <TenDirhamWorkersTab
              workers={uaeTenDirhamWorkersData}
              agencies={uaeManpowerSupplyAgenciesData}
              onSelectWorker={handleSelectWorker}
              searchQuery={globalSearch}
            />
          )}

          {/* Tab 2: Overseas Manpower (India / Kerala) */}
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

          {/* Tab 3: UAE Tender Analytics */}
          {activeTab === 'analytics' && (
            <AnalyticsTab
              tenders={uaeTendersRfqsData}
              onSelectTender={handleOpenTender}
            />
          )}
        </main>

        {/* Footer */}
        <footer className="mt-auto border-t border-slate-200 bg-white py-5 px-6 md:px-8 text-xs text-slate-500">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
              <span className="font-bold text-slate-800">AqionProcure UAE</span>
              <span>• ORJ Technical Manpower Dispatch</span>
              <span>• Port 3007 Operational</span>
            </div>
            <div className="flex items-center gap-4 text-slate-500 font-medium">
              <span>≤ 10 AED/hr Technical Labor Radar</span>
              <span>•</span>
              <span>TikTok & Facebook Leads Miner</span>
              <span>•</span>
              <span>MOHRE UAE Licensed</span>
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

      <WorkerLeadModal
        worker={selectedWorker}
        isOpen={isWorkerModalOpen}
        onClose={() => setIsWorkerModalOpen(false)}
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
