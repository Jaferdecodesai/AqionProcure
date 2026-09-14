'use client';

import React from 'react';
import { 
  X, 
  User, 
  Phone, 
  Mail, 
  MapPin, 
  Award, 
  Briefcase, 
  CheckCircle2, 
  Globe, 
  MessageSquare, 
  FileCheck 
} from 'lucide-react';
import { TechnicianJobSeeker, FacebookCommentLead } from '../types';

interface CandidateModalProps {
  candidate: TechnicianJobSeeker | FacebookCommentLead | null;
  isOpen: boolean;
  onClose: () => void;
}

export const CandidateModal: React.FC<CandidateModalProps> = ({
  candidate,
  isOpen,
  onClose
}) => {
  if (!isOpen || !candidate) return null;

  // Determine if it's a TechnicianJobSeeker or FacebookCommentLead
  const isJobSeeker = 'skills' in candidate;
  const jobSeeker = isJobSeeker ? (candidate as TechnicianJobSeeker) : null;
  const fbLead = !isJobSeeker ? (candidate as FacebookCommentLead) : null;

  const name = jobSeeker ? jobSeeker.fullName : (fbLead?.candidateName || '');
  const trade = jobSeeker ? jobSeeker.primaryTrade : (fbLead?.trade || '');
  const phone = jobSeeker ? jobSeeker.contactNumber : (fbLead?.phone || '');
  const whatsapp = jobSeeker ? jobSeeker.whatsappNumber : (fbLead?.whatsapp || '');
  const cleanWhatsapp = whatsapp.replace(/[^0-9]/g, '');
  const location = jobSeeker ? `${jobSeeker.district}, ${jobSeeker.state}` : (fbLead?.currentLocation || '');
  const passport = jobSeeker ? jobSeeker.passportType : (fbLead?.passportStatus || 'ECNR');
  const salary = candidate.expectedSalaryAed;

  const whatsappMessage = encodeURIComponent(
    `Hello ${name}, We found your technical profile for ${trade} on aqionprocure UAE. We have an immediate requirement for a Dubai MEP project. Are you available for a brief discussion?`
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm overflow-y-auto">
      <div className="bg-slate-900 border border-slate-700/60 rounded-2xl w-full max-w-2xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Modal Header */}
        <div className="px-6 py-4 bg-slate-800/50 border-b border-slate-700/60 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-sky-500/20 text-sky-300 flex items-center justify-center font-bold text-lg border border-sky-500/30 shadow-2xs">
              {name.charAt(0)}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-bold text-slate-50 font-sans">{name}</h2>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase bg-emerald-500/10 text-emerald-300 border border-emerald-500/30">
                  {passport}
                </span>
              </div>
              <p className="text-xs text-slate-400 font-medium">
                {trade}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-200 hover:bg-slate-700/60 transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-5 text-sm text-slate-200">
          {/* Quick Contact Bar */}
          <div className="p-4 rounded-xl bg-slate-800/50 border border-slate-700/60 flex flex-wrap items-center justify-between gap-3">
            <div className="space-y-1">
              <span className="text-[11px] text-slate-400 uppercase tracking-wider block font-bold">Candidate Contact</span>
              <div className="flex items-center gap-2 font-mono text-sm text-slate-50 font-bold">
                <Phone className="w-4 h-4 text-emerald-400" />
                <span>{phone}</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <a
                href={`tel:${phone}`}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 text-xs font-semibold border border-slate-700/60 shadow-2xs transition-all"
              >
                <Phone className="w-3.5 h-3.5 text-slate-300" />
                <span>Call Phone</span>
              </a>

              <a
                href={`https://wa.me/${cleanWhatsapp}?text=${whatsappMessage}`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-slate-950 text-xs font-bold shadow-md shadow-emerald-600/20 transition-all"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Key Metrics Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div className="bg-slate-800/50 p-3 rounded-xl border border-slate-700/60">
              <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-semibold">Total Experience</span>
              <span className="text-base font-bold text-slate-50">{candidate.experienceYears} Years</span>
            </div>

            <div className="bg-slate-800/50 p-3 rounded-xl border border-slate-700/60">
              <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-semibold">Gulf Experience</span>
              <span className="text-base font-bold text-sky-300">
                {jobSeeker 
                  ? `${jobSeeker.gulfExperienceYears} Years` 
                  : fbLead?.gulfExperience ? 'Yes (Verified)' : 'Fresher'}
              </span>
            </div>

            <div className="bg-slate-800/50 p-3 rounded-xl border border-slate-700/60">
              <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-semibold">Expected Salary</span>
              <span className="text-base font-bold text-amber-300 font-mono">
                {salary ? `${salary} AED` : '2,500 AED'}
              </span>
            </div>

            <div className="bg-slate-800/50 p-3 rounded-xl border border-slate-700/60">
              <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-semibold">Home Location</span>
              <span className="text-xs font-bold text-slate-50 truncate block">
                {location || 'Kerala, India'}
              </span>
            </div>
          </div>

          {/* FB Comment Snippet */}
          {fbLead && (
            <div className="bg-sky-500/10 p-4 rounded-xl border border-sky-500/30 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-sky-200">Scraped Facebook Ad Comment Lead</span>
                <span className="text-slate-400 text-[11px]">{fbLead.commentTimestamp}</span>
              </div>
              <p className="text-xs text-slate-200 italic bg-slate-900 p-3 rounded-xl border border-sky-100 shadow-2xs">
                &ldquo;{fbLead.commentSnippet}&rdquo;
              </p>
              <div className="text-[11px] text-slate-400">
                Source Ad: <span className="text-slate-100 font-medium">{fbLead.adSourcePostTitle}</span>
              </div>
            </div>
          )}

          {/* Job Seeker Skills & Education */}
          {jobSeeker && (
            <div className="space-y-4">
              <div>
                <h4 className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                  Technical Skills & Competencies
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {jobSeeker.skills.map((skill, idx) => (
                    <span key={idx} className="px-2.5 py-1 rounded-md bg-slate-800 text-xs text-slate-200 border border-slate-700/60 font-medium">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                  Trade Certifications & Education
                </h4>
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2 text-xs text-slate-200">
                    <Award className="w-3.5 h-3.5 text-amber-400" />
                    <span>Education: <strong className="text-slate-50">{jobSeeker.education}</strong></span>
                  </div>
                  {jobSeeker.certifications.map((cert, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs text-slate-200">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      <span>{cert}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-slate-800/50 p-3 rounded-xl border border-slate-700/60 text-xs text-slate-400">
                Registry: <strong className="text-slate-50">{jobSeeker.sourcePortal}</strong> • Updated: {jobSeeker.profileUpdated}
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 bg-slate-800/50 border-t border-slate-700/60 flex items-center justify-between">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-300 hover:text-slate-50 hover:bg-slate-700 transition-all"
          >
            Close
          </button>
          <button
            onClick={() => {
              alert(`aqionprocure: Candidate ${name} shortlisted for technical interview!`);
              onClose();
            }}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold shadow-md shadow-amber-500/25 transition-all active:scale-[0.98]"
          >
            <CheckCircle2 className="w-3.5 h-3.5 text-current" />
            <span>Shortlist for UAE Deployment</span>
          </button>
        </div>
      </div>
    </div>
  );
};
