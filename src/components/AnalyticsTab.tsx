'use client';

import React from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  DollarSign, 
  Building2, 
  PieChart, 
  ShieldCheck, 
  Zap, 
  Droplets, 
  Wind, 
  Home, 
  Cpu, 
  Layers, 
  FileText,
  Clock,
  ArrowUpRight
} from 'lucide-react';
import { UaeTenderRfq } from '../types';

interface AnalyticsTabProps {
  tenders: UaeTenderRfq[];
  onSelectTender: (tender: UaeTenderRfq) => void;
}

export const AnalyticsTab: React.FC<AnalyticsTabProps> = ({
  tenders,
  onSelectTender
}) => {
  const totalPipelineValue = tenders.reduce((acc, t) => acc + t.estimatedBudgetAed, 0);
  const avgTenderValue = Math.round(totalPipelineValue / (tenders.length || 1));

  // Category breakdown
  const categoryStats: { [key: string]: { count: number; totalAed: number } } = {};
  tenders.forEach(t => {
    if (!categoryStats[t.domainCategory]) {
      categoryStats[t.domainCategory] = { count: 0, totalAed: 0 };
    }
    categoryStats[t.domainCategory].count += 1;
    categoryStats[t.domainCategory].totalAed += t.estimatedBudgetAed;
  });

  // Emirate breakdown
  const emirateStats: { [key: string]: number } = {};
  tenders.forEach(t => {
    emirateStats[t.emirate] = (emirateStats[t.emirate] || 0) + 1;
  });

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="p-5 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white shadow-soft flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-500 text-slate-950">
              UAE MARKET RADAR
            </span>
            <span className="text-xs text-slate-300 font-medium">Procurement Sourcing & Market Intelligence</span>
          </div>
          <h2 className="text-lg font-black text-white tracking-tight">
            UAE Tender Sourcing Volume & Value Analytics
          </h2>
          <p className="text-xs text-slate-400">
            Real-time analytics aggregated across Tejari, Wasl, Etisalat, DM, DEWA, and Dubizzle Pro tenders.
          </p>
        </div>

        <div className="flex items-center gap-4 text-xs shrink-0">
          <div className="bg-white/10 px-4 py-2.5 rounded-xl border border-white/10 text-center">
            <span className="text-[10px] text-slate-300 uppercase block font-bold">Total Tender Value</span>
            <span className="text-xl font-black text-amber-400 font-mono">
              {(totalPipelineValue / 1000000).toFixed(2)}M AED
            </span>
          </div>
          <div className="bg-white/10 px-4 py-2.5 rounded-xl border border-white/10 text-center">
            <span className="text-[10px] text-slate-300 uppercase block font-bold">Avg Package Value</span>
            <span className="text-xl font-black text-cyan-400 font-mono">
              {(avgTenderValue / 1000).toFixed(0)}k AED
            </span>
          </div>
        </div>
      </div>

      {/* Domain Breakdown Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Domain Distribution */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-card space-y-4">
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <BarChart3 className="w-4 h-4 text-amber-600" />
            <span>Tender Value by Service Domain (AED)</span>
          </h3>

          <div className="space-y-3">
            {Object.entries(categoryStats).map(([category, data]) => {
              const percentage = Math.round((data.totalAed / totalPipelineValue) * 100);
              return (
                <div key={category} className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-slate-800">{category} ({data.count})</span>
                    <span className="font-mono font-bold text-amber-700">{data.totalAed.toLocaleString()} AED ({percentage}%)</span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-amber-500 to-amber-600 rounded-full"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Emirate & Client Distribution */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-card space-y-4">
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <Building2 className="w-4 h-4 text-sky-600" />
            <span>Geographic & Regional Tender Distribution</span>
          </h3>

          <div className="grid grid-cols-2 gap-3">
            {Object.entries(emirateStats).map(([emirate, count]) => (
              <div key={emirate} className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 text-center">
                <span className="text-xs text-slate-500 font-bold uppercase block">{emirate}</span>
                <span className="text-xl font-black text-slate-900 font-mono mt-1 block">{count}</span>
                <span className="text-[10px] text-slate-400">Active RFQ Postings</span>
              </div>
            ))}
          </div>

          <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-xs space-y-1 text-slate-700">
            <span className="font-bold text-amber-900 block">L1 Procurement Insight</span>
            <p className="text-[11px] text-slate-600">
              Dubai accounts for over 80% of all active MEP and Fit-Out subcontractor packages, with peak activity in Downtown Dubai, Business Bay, and Dubai South logistics hubs.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
