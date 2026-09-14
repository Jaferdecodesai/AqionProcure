'use client';

import React from 'react';
import { 
  X, 
  Building2, 
  MapPin, 
  Clock, 
  DollarSign, 
  CheckCircle2, 
  ExternalLink, 
  Phone, 
  Mail, 
  MessageSquare, 
  Download, 
  Printer, 
  ShieldCheck, 
  FileText,
  Calendar,
  AlertCircle
} from 'lucide-react';
import { UaeTenderRfq } from '../types';

interface TenderModalProps {
  tender: UaeTenderRfq | null;
  isOpen: boolean;
  onClose: () => void;
}

export const TenderModal: React.FC<TenderModalProps> = ({
  tender,
  isOpen,
  onClose
}) => {
  if (!isOpen || !tender) return null;

  const cleanWhatsapp = tender.whatsapp.replace(/[^0-9]/g, '');
  const proposalMsg = encodeURIComponent(
    `Hello ${tender.contactPerson} (${tender.clientEntity}), we are contacting you from aqionprocure regarding ${tender.tenderRefNo}: "${tender.title}" in ${tender.siteLocation}. We would like to submit our formal commercial proposal and technical compliance submittal.`
  );

  const handlePrint = () => {
    window.print();
  };

  const handleExportJson = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(tender, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `${tender.tenderRefNo}_Scope_Document.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm overflow-y-auto">
      <div className="bg-slate-900 border border-slate-700/60 rounded-2xl w-full max-w-3xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Modal Header */}
        <div className="px-6 py-4 bg-slate-800/50 border-b border-slate-700/60 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-amber-500/15 text-amber-300 border border-amber-500/30">
                {tender.tenderRefNo}
              </span>
              <span className="text-xs text-slate-400 font-medium">Scraped from {tender.sourcePortal}</span>
            </div>
            <h2 className="text-base font-bold text-slate-50 mt-1">{tender.title}</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-200 hover:bg-slate-700/60 transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-5 text-xs text-slate-200">
          {/* Key Metrics Banner */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 bg-slate-800/50 p-4 rounded-xl border border-slate-700/60">
            <div>
              <span className="text-[10px] text-slate-400 uppercase font-bold block">Client Entity</span>
              <span className="font-bold text-slate-50 text-xs truncate block">{tender.clientEntity}</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 uppercase font-bold block">Site Location</span>
              <span className="font-bold text-slate-50 text-xs truncate block">{tender.siteLocation}</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 uppercase font-bold block">Estimated Value</span>
              <span className="font-bold text-amber-300 font-mono text-sm block">
                {tender.estimatedBudgetAed.toLocaleString()} AED
              </span>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 uppercase font-bold block">Submission Deadline</span>
              <span className="font-bold text-emerald-300 text-xs block">
                {tender.submissionDeadline} ({tender.daysRemaining}d left)
              </span>
            </div>
          </div>

          {/* Scope Description */}
          <div className="space-y-2">
            <h3 className="text-xs font-bold text-slate-50 uppercase tracking-wider">Detailed Scope of Work</h3>
            <p className="text-xs text-slate-300 bg-slate-800/50 p-3.5 rounded-xl border border-slate-700/60 leading-relaxed font-sans">
              {tender.scopeDescription}
            </p>
          </div>

          {/* BoQ Technical Takeoffs */}
          <div className="space-y-2">
            <h3 className="text-xs font-bold text-slate-50 uppercase tracking-wider">BoQ Line Items & Technical Standards</h3>
            <div className="bg-slate-900 border border-slate-700/60 rounded-xl divide-y divide-slate-800">
              {tender.scopeItems.map((item, idx) => (
                <div key={idx} className="p-3 flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span className="text-xs text-slate-200">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Mandatory Approvals & Certifications */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-slate-800/50 p-3.5 rounded-xl border border-slate-700/60 space-y-1.5">
              <span className="font-bold text-slate-50 text-xs flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-amber-400" /> Mandatory Authority Approvals
              </span>
              <ul className="space-y-1 text-[11px] text-slate-300">
                {tender.mandatoryApprovals.map((appr, idx) => (
                  <li key={idx}>• {appr}</li>
                ))}
              </ul>
            </div>

            <div className="bg-slate-800/50 p-3.5 rounded-xl border border-slate-700/60 space-y-1.5">
              <span className="font-bold text-slate-50 text-xs flex items-center gap-1.5">
                <FileText className="w-4 h-4 text-sky-400" /> Required Trade Certifications
              </span>
              <ul className="space-y-1 text-[11px] text-slate-300">
                {tender.requiredCertifications.map((cert, idx) => (
                  <li key={idx}>• {cert}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Client Official Contact */}
          <div className="p-4 bg-amber-500/10 rounded-xl border border-amber-500/30 flex flex-wrap items-center justify-between gap-3">
            <div>
              <span className="text-[10px] uppercase font-bold text-amber-200 block">Official Submission Contact</span>
              <div className="font-bold text-slate-50 text-xs mt-0.5">
                {tender.contactPerson} • <span className="text-slate-300 font-normal">{tender.contactDesignation}</span>
              </div>
              <div className="text-[11px] text-slate-400 font-mono mt-0.5">
                {tender.phone} • {tender.email}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <a
                href={`tel:${tender.phone}`}
                className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 text-xs font-semibold border border-slate-700/60 shadow-2xs transition-all"
              >
                <Phone className="w-3.5 h-3.5 inline mr-1" /> Call Client
              </a>

              <a
                href={`https://wa.me/${cleanWhatsapp}?text=${proposalMsg}`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 px-4 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-bold text-xs shadow-xs transition-all"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>WhatsApp Bid Submission</span>
              </a>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 bg-slate-800/50 border-t border-slate-700/60 flex items-center justify-between">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-300 hover:text-slate-50 hover:bg-slate-700 transition-all"
          >
            Close
          </button>
          <div className="flex items-center gap-2">
            <button
              onClick={handleExportJson}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 text-xs font-semibold border border-slate-700/60 transition-all"
            >
              <Download className="w-3.5 h-3.5 text-amber-400" />
              <span>Export Scope JSON</span>
            </button>
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 text-xs font-semibold border border-slate-700/60 transition-all"
            >
              <Printer className="w-3.5 h-3.5 text-sky-400" />
              <span>Print RFP Brief</span>
            </button>
            <a
              href={`mailto:${tender.email}?subject=Commercial Proposal: ${tender.tenderRefNo} - ${tender.title}`}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold shadow-xs transition-all"
            >
              <Mail className="w-3.5 h-3.5 text-current" />
              <span>Email Proposal</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
