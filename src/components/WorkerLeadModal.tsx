'use client';

import React, { useState } from 'react';
import { 
  X, 
  User, 
  MapPin, 
  Phone, 
  MessageSquare, 
  CheckCircle2, 
  DollarSign, 
  Briefcase, 
  Wrench, 
  FileText, 
  Share2, 
  Copy, 
  Check, 
  Clock, 
  ExternalLink,
  ShieldCheck,
  Zap,
  Building2
} from 'lucide-react';
import { UaeTenDirhamWorker } from '../types';

interface WorkerLeadModalProps {
  worker: UaeTenDirhamWorker | null;
  isOpen: boolean;
  onClose: () => void;
  onStatusChange?: (workerId: string, status: UaeTenDirhamWorker['orjContactStatus']) => void;
}

export const WorkerLeadModal: React.FC<WorkerLeadModalProps> = ({
  worker,
  isOpen,
  onClose,
  onStatusChange
}) => {
  const [copied, setCopied] = useState(false);
  const [currentStatus, setCurrentStatus] = useState<UaeTenDirhamWorker['orjContactStatus']>(
    worker ? worker.orjContactStatus : 'New Lead'
  );

  if (!isOpen || !worker) return null;

  const cleanWhatsapp = worker.whatsapp.replace(/[^0-9]/g, '');
  const orjTemplateMsg = encodeURIComponent(
    `Hello ${worker.name}, this is ORJ Technical Services & Manpower Supply UAE. We saw your profile regarding ${worker.trade} (Rate: ${worker.hourlyRateAed} AED/hr, Location: ${worker.currentLocation}). We have an immediate project deployment starting today. Are you ready to mobilize? Please confirm your availability.`
  );

  const handleCopyPhone = () => {
    navigator.clipboard.writeText(worker.phone);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleStatusUpdate = (status: UaeTenDirhamWorker['orjContactStatus']) => {
    setCurrentStatus(status);
    if (onStatusChange) {
      onStatusChange(worker.id, status);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white border border-slate-200/90 rounded-2xl w-full max-w-2xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Modal Header */}
        <div className="px-6 py-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center font-bold text-base shadow-xs">
              {worker.name.charAt(0)}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-bold text-slate-900">{worker.name}</h2>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 text-amber-900 border border-amber-200">
                  {worker.hourlyRateAed} AED / HOUR
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium">
                {worker.trade} • {worker.currentLocation}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-5 text-xs text-slate-700">
          {/* Rate & Wage Breakdown Grid */}
          <div className="grid grid-cols-3 gap-3 bg-amber-50/50 p-4 rounded-xl border border-amber-200 text-center">
            <div>
              <span className="text-[10px] text-slate-400 uppercase font-bold block">Hourly Rate</span>
              <span className="text-xl font-black text-amber-700 font-mono block mt-0.5">
                {worker.hourlyRateAed} AED
              </span>
              <span className="text-[10px] text-slate-500">Willing ≤ 10 AED</span>
            </div>
            <div className="border-x border-amber-200/60 px-2">
              <span className="text-[10px] text-slate-400 uppercase font-bold block">Daily Shift Equivalent</span>
              <span className="text-xl font-black text-slate-900 font-mono block mt-0.5">
                {worker.dailyRateEquivalentAed} AED
              </span>
              <span className="text-[10px] text-slate-500">8-10h site shift</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 uppercase font-bold block">Monthly Equivalent</span>
              <span className="text-xl font-black text-emerald-700 font-mono block mt-0.5">
                {worker.monthlySalaryEquivalentAed} AED
              </span>
              <span className="text-[10px] text-slate-500">ORJ supply cost</span>
            </div>
          </div>

          {/* Social Lead Origin / Comment Section Snapshot */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                <Share2 className="w-3.5 h-3.5 text-sky-600" />
                <span>Scraped Social Comment Lead</span>
              </span>
              <span className="text-[10px] text-slate-400 font-mono">
                {worker.sourcePlatform} • {worker.commentTimestamp}
              </span>
            </div>

            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
              <div className="text-[11px] font-semibold text-slate-500 italic">
                Source Post: "{worker.sourcePostOrVideoTitle}"
              </div>
              <p className="text-xs text-slate-800 font-mono bg-white p-3 rounded-lg border border-slate-200 leading-relaxed">
                "{worker.commentText}"
              </p>
            </div>
          </div>

          {/* Key Qualifications & Visa Details */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 space-y-2">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Visa & Availability</span>
              <div className="space-y-1">
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="font-semibold text-slate-800">{worker.visaStatus}</span>
                </div>
                <div className="flex items-center gap-1.5 text-slate-600">
                  <Clock className="w-3.5 h-3.5 text-amber-600" />
                  <span>{worker.availability}</span>
                </div>
                <div className="flex items-center gap-1.5 text-slate-600">
                  <Briefcase className="w-3.5 h-3.5 text-sky-600" />
                  <span>{worker.experienceYearsUae} Years UAE Experience</span>
                </div>
              </div>
            </div>

            <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 space-y-2">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Tools & Mobilization</span>
              <div className="space-y-1">
                <div className="flex items-center gap-1.5">
                  <Wrench className="w-3.5 h-3.5 text-amber-600" />
                  <span className="font-semibold text-slate-800">
                    {worker.toolsEquipped ? 'Has Personal Hand Tools' : 'Needs Site Tool Kit'}
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-slate-600">
                  <MapPin className="w-3.5 h-3.5 text-rose-500" />
                  <span>{worker.currentLocation}</span>
                </div>
                <div className="text-[11px] text-slate-500">
                  Nationality: <span className="font-medium text-slate-700">{worker.nationality}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Trade Skills */}
          <div className="space-y-1.5">
            <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">
              Verified Technical Skills
            </span>
            <div className="flex flex-wrap gap-1.5">
              {worker.skills.map((skill, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-slate-100 text-slate-700 border border-slate-200"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* ORJ Internal Recruitment Status Selector */}
          <div className="p-3.5 bg-slate-100/70 rounded-xl border border-slate-200 flex items-center justify-between gap-3">
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-500 block">ORJ Dispatch Status</span>
              <span className="text-xs font-bold text-slate-800">{currentStatus}</span>
            </div>

            <div className="flex items-center gap-1.5">
              {(['New Lead', 'ORJ Contacted', 'Vetted & Ready', 'Assigned to Client'] as const).map(status => (
                <button
                  key={status}
                  onClick={() => handleStatusUpdate(status)}
                  className={`px-2 py-1 rounded-md text-[10px] font-bold transition-all ${
                    currentStatus === status
                      ? 'bg-slate-900 text-white shadow-2xs'
                      : 'bg-white text-slate-600 hover:bg-slate-200 border border-slate-200'
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer / 1-Click Outreach Buttons */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-200 transition-all"
          >
            Close
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyPhone}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white hover:bg-slate-100 text-slate-700 text-xs font-semibold border border-slate-200 shadow-2xs transition-all"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-slate-500" />}
              <span>{copied ? 'Copied!' : 'Copy Mobile'}</span>
            </button>

            <a
              href={`tel:${worker.phone}`}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold shadow-xs transition-all active:scale-[0.98]"
            >
              <Phone className="w-3.5 h-3.5 text-amber-400" />
              <span>Call Worker</span>
            </a>

            <a
              href={`https://wa.me/${cleanWhatsapp}?text=${orjTemplateMsg}`}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-xs transition-all active:scale-[0.98]"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>ORJ WhatsApp Offer</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
