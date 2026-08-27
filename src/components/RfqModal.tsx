'use client';

import React, { useState } from 'react';
import { 
  X, 
  FileText, 
  Send, 
  Printer, 
  CheckCircle2, 
  Calculator, 
  Building2, 
  MapPin, 
  Clock, 
  Download,
  AlertCircle,
  Layers
} from 'lucide-react';
import { SubService, ServiceCategory, UaeVendor } from '../types';

interface RfqModalProps {
  isOpen: boolean;
  onClose: () => void;
  serviceCategories: ServiceCategory[];
  uaeVendors: UaeVendor[];
  initialService?: SubService | null;
}

export const RfqModal: React.FC<RfqModalProps> = ({
  isOpen,
  onClose,
  serviceCategories,
  uaeVendors,
  initialService
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>(
    initialService?.category || serviceCategories[0]?.title || ''
  );
  const [selectedServiceId, setSelectedServiceId] = useState<string>(
    initialService?.id || ''
  );
  const [projectTitle, setProjectTitle] = useState<string>(
    initialService ? `aqionprocure RFQ: ${initialService.name}` : 'aqionprocure RFQ - UAE Technical Works'
  );
  const [emirate, setEmirate] = useState<string>('Dubai');
  const [siteLocation, setSiteLocation] = useState<string>('Downtown Dubai / Business Bay');
  const [urgency, setUrgency] = useState<'Emergency (24h)' | 'Standard (3-5 Days)' | 'Planned Project (2 Weeks)'>('Standard (3-5 Days)');
  const [quantity, setQuantity] = useState<number>(10);
  const [customScope, setCustomScope] = useState<string>('');
  const [selectedVendorIds, setSelectedVendorIds] = useState<string[]>([]);
  const [isGenerated, setIsGenerated] = useState<boolean>(false);

  if (!isOpen) return null;

  const currentCategoryObj = serviceCategories.find(c => c.title === selectedCategory) || serviceCategories[0];
  const activeService = currentCategoryObj?.services.find(s => s.id === selectedServiceId) || currentCategoryObj?.services[0];

  const minEstimatedCost = activeService ? activeService.typicalUaeRateMinAed * quantity : 0;
  const maxEstimatedCost = activeService ? activeService.typicalUaeRateMaxAed * quantity : 0;
  const avgEstimatedCost = Math.round((minEstimatedCost + maxEstimatedCost) / 2);

  const handleCategoryChange = (catTitle: string) => {
    setSelectedCategory(catTitle);
    const newCat = serviceCategories.find(c => c.title === catTitle);
    if (newCat && newCat.services.length > 0) {
      setSelectedServiceId(newCat.services[0].id);
      setProjectTitle(`aqionprocure RFQ: ${newCat.services[0].name}`);
    }
  };

  const handleServiceChange = (serviceId: string) => {
    setSelectedServiceId(serviceId);
    const s = currentCategoryObj?.services.find(item => item.id === serviceId);
    if (s) {
      setProjectTitle(`aqionprocure RFQ: ${s.name}`);
    }
  };

  const toggleVendorSelection = (vId: string) => {
    if (selectedVendorIds.includes(vId)) {
      setSelectedVendorIds(selectedVendorIds.filter(id => id !== vId));
    } else {
      setSelectedVendorIds([...selectedVendorIds, vId]);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleExportJson = () => {
    const rfqData = {
      system: 'aqionprocure UAE',
      rfqNumber: `AQ-RFQ-${Date.now().toString().slice(-6)}`,
      projectTitle,
      category: selectedCategory,
      service: activeService?.name,
      emirate,
      siteLocation,
      urgency,
      quantity,
      unit: activeService?.unitOfMeasure,
      estimatedBudgetAed: avgEstimatedCost,
      scopeBreakdown: activeService?.scopeItems,
      customNotes: customScope,
      dispatchedVendors: selectedVendorIds,
      generatedDate: new Date().toISOString()
    };

    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(rfqData, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `aqionprocure_RFQ_${projectTitle.replace(/\s+/g, '_')}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm overflow-y-auto">
      <div className="bg-slate-900 border border-slate-700/60 rounded-2xl w-full max-w-4xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Modal Header */}
        <div className="px-6 py-4 bg-slate-800/50 border-b border-slate-700/60 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-amber-500 text-slate-950 shadow-xs">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-bold text-slate-50 font-sans">
                  {isGenerated ? 'Generated RFQ Document' : 'Create Procurement Request (BoQ RFQ)'}
                </h2>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/15 text-amber-300 border border-amber-500/30">
                  aqionprocure
                </span>
              </div>
              <p className="text-xs text-slate-400">
                UAE Technical Services Specification & Vendor Dispatch Builder
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
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-sm text-slate-200">
          {!isGenerated ? (
            <>
              {/* Category & Service Select */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                    1. Primary Service Category
                  </label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => handleCategoryChange(e.target.value)}
                    className="w-full bg-slate-800/50 border border-slate-700/60 rounded-xl px-3.5 py-2.5 text-slate-100 focus:outline-none focus:border-amber-500 font-medium"
                  >
                    {serviceCategories.map(cat => (
                      <option key={cat.id} value={cat.title}>
                        {cat.title} ({cat.services.length} services)
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                    2. Specific Sub-Service
                  </label>
                  <select
                    value={selectedServiceId}
                    onChange={(e) => handleServiceChange(e.target.value)}
                    className="w-full bg-slate-800/50 border border-slate-700/60 rounded-xl px-3.5 py-2.5 text-slate-100 focus:outline-none focus:border-amber-500 font-medium"
                  >
                    {currentCategoryObj?.services.map(s => (
                      <option key={s.id} value={s.id}>
                        {s.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Title & Emirate */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                    Project / Package Title
                  </label>
                  <input
                    type="text"
                    value={projectTitle}
                    onChange={(e) => setProjectTitle(e.target.value)}
                    className="w-full bg-slate-800/50 border border-slate-700/60 rounded-xl px-3.5 py-2 text-slate-100 focus:outline-none focus:border-amber-500 font-medium"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                    Emirate Location
                  </label>
                  <select
                    value={emirate}
                    onChange={(e) => setEmirate(e.target.value)}
                    className="w-full bg-slate-800/50 border border-slate-700/60 rounded-xl px-3.5 py-2 text-slate-100 focus:outline-none focus:border-amber-500 font-medium"
                  >
                    <option value="Dubai">Dubai</option>
                    <option value="Abu Dhabi">Abu Dhabi</option>
                    <option value="Sharjah">Sharjah</option>
                    <option value="Ajman">Ajman</option>
                    <option value="Ras Al Khaimah">Ras Al Khaimah</option>
                    <option value="Fujairah">Fujairah</option>
                  </select>
                </div>
              </div>

              {/* Quantity & Urgency */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                    Site / Area Location
                  </label>
                  <input
                    type="text"
                    value={siteLocation}
                    onChange={(e) => setSiteLocation(e.target.value)}
                    className="w-full bg-slate-800/50 border border-slate-700/60 rounded-xl px-3.5 py-2 text-slate-100 focus:outline-none focus:border-amber-500 font-medium"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                    Quantity / Scope Units
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      min="1"
                      value={quantity}
                      onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                      className="w-24 bg-slate-800/50 border border-slate-700/60 rounded-xl px-3 py-2 text-slate-100 focus:outline-none focus:border-amber-500 font-bold"
                    />
                    <span className="text-xs text-slate-400 font-medium">
                      {activeService?.unitOfMeasure}
                    </span>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                    Project Urgency
                  </label>
                  <select
                    value={urgency}
                    onChange={(e) => setUrgency(e.target.value as any)}
                    className="w-full bg-slate-800/50 border border-slate-700/60 rounded-xl px-3.5 py-2 text-slate-100 focus:outline-none focus:border-amber-500 font-medium"
                  >
                    <option value="Emergency (24h)">Emergency (24 Hours)</option>
                    <option value="Standard (3-5 Days)">Standard (3 - 5 Days)</option>
                    <option value="Planned Project (2 Weeks)">Planned Project (2 Weeks)</option>
                  </select>
                </div>
              </div>

              {/* UAE Cost Benchmark Estimator Card */}
              {activeService && (
                <div className="p-4 rounded-2xl bg-slate-900 bg-gradient-to-r from-amber-500/15 via-slate-900/60 to-amber-500/10 border border-amber-500/30 shadow-soft flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <Calculator className="w-4 h-4 text-amber-400" />
                      <span className="font-bold text-slate-50 text-sm">UAE Market Rate Benchmark Estimator</span>
                    </div>
                    <p className="text-xs text-slate-300">
                      Unit Standard Rate: <span className="text-amber-200 font-bold">{activeService.typicalUaeRateMinAed} - {activeService.typicalUaeRateMaxAed} AED</span> / {activeService.unitOfMeasure}
                    </p>
                    <p className="text-[11px] text-slate-400">
                      Required Manpower: <span className="text-sky-300 font-semibold">{activeService.manpowerProfileNeeded}</span>
                    </p>
                  </div>

                  <div className="bg-slate-900 px-5 py-3 rounded-xl border border-amber-500/30 text-right shadow-xs">
                    <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-bold">Estimated Package Value</span>
                    <span className="text-xl font-black text-amber-300 font-mono">
                      {minEstimatedCost.toLocaleString()} - {maxEstimatedCost.toLocaleString()} AED
                    </span>
                    <span className="text-[10px] text-emerald-300 block font-semibold">Avg: ~{avgEstimatedCost.toLocaleString()} AED</span>
                  </div>
                </div>
              )}

              {/* Technical Specifications */}
              {activeService && (
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                    Standard Technical Specifications & Authority Compliance
                  </label>
                  <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700/60 space-y-2">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
                      {activeService.scopeItems.map((item, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-slate-200">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                    <div className="pt-2 border-t border-slate-700/60 flex flex-wrap gap-2 text-[11px]">
                      <span className="px-2 py-0.5 rounded-md bg-slate-900 text-amber-200 border border-amber-500/30">
                        Authority Approvals: {activeService.authorityApprovals.join(', ')}
                      </span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-900 text-sky-300 border border-sky-500/30">
                        Certifications: {activeService.requiredTradeCertifications.join(', ')}
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* Select UAE Vendors */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                  Select UAE Vendors for Instant RFQ Dispatch (Optional)
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 max-h-40 overflow-y-auto p-1">
                  {uaeVendors.map(vendor => (
                    <label
                      key={vendor.id}
                      className={`flex items-center gap-3 p-2.5 rounded-xl border cursor-pointer transition-all ${
                        selectedVendorIds.includes(vendor.id)
                          ? 'bg-amber-500/10 border-amber-300 text-slate-50 shadow-2xs'
                          : 'bg-slate-800/50 border-slate-700/60 text-slate-300 hover:border-slate-600'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={selectedVendorIds.includes(vendor.id)}
                        onChange={() => toggleVendorSelection(vendor.id)}
                        className="rounded border-slate-600 text-amber-400 focus:ring-amber-500"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-slate-50 truncate">{vendor.companyName}</span>
                          <span className="text-[10px] text-amber-300 font-bold">★ {vendor.rating}</span>
                        </div>
                        <span className="text-[10px] text-slate-400 block truncate">{vendor.emirate} • {vendor.tradeLicenseNo}</span>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            </>
          ) : (
            /* Printable RFQ Document */
            <div className="bg-slate-900 p-6 rounded-xl border border-slate-700/60 space-y-6 text-slate-100">
              <div className="flex justify-between items-start border-b border-slate-700/60 pb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono text-amber-300 font-bold">aqionprocure UAE</span>
                    <span className="text-slate-300">•</span>
                    <span className="text-xs text-slate-400">Official RFQ</span>
                  </div>
                  <h3 className="text-xl font-bold text-slate-50 mt-1">{projectTitle}</h3>
                  <p className="text-xs text-slate-400">Ref: AQ-RFQ-{Date.now().toString().slice(-6)} | Issued: {new Date().toLocaleDateString('en-GB')}</p>
                </div>
                <div className="text-right">
                  <span className="inline-block px-3 py-1 rounded-full bg-amber-500/10 text-amber-200 font-mono text-xs font-bold border border-amber-500/30">
                    {urgency.toUpperCase()}
                  </span>
                </div>
              </div>

              {/* BoQ Table */}
              <div>
                <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider mb-2">Bill of Quantities (BoQ) & Technical Scope</h4>
                <div className="overflow-x-auto">
                  <table className="w-full text-xs text-left border border-slate-700/60">
                    <thead className="bg-slate-800/50 text-slate-300 font-bold">
                      <tr>
                        <th className="p-2.5 border-b border-slate-700/60">Item</th>
                        <th className="p-2.5 border-b border-slate-700/60">Scope Description</th>
                        <th className="p-2.5 border-b border-slate-700/60 text-center">Unit</th>
                        <th className="p-2.5 border-b border-slate-700/60 text-center">Qty</th>
                        <th className="p-2.5 border-b border-slate-700/60 text-right">Est. Unit (AED)</th>
                        <th className="p-2.5 border-b border-slate-700/60 text-right">Est. Total (AED)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800">
                      <tr>
                        <td className="p-2.5 font-mono font-bold">01</td>
                        <td className="p-2.5">
                          <p className="font-bold text-slate-50">{activeService?.name}</p>
                          <p className="text-slate-300 text-[11px] mt-0.5">{activeService?.description}</p>
                          <ul className="list-disc list-inside text-[10px] text-slate-400 mt-1">
                            {activeService?.scopeItems.map((item, i) => (
                              <li key={i}>{item}</li>
                            ))}
                          </ul>
                        </td>
                        <td className="p-2.5 text-center text-slate-300">{activeService?.unitOfMeasure}</td>
                        <td className="p-2.5 text-center font-bold text-slate-50">{quantity}</td>
                        <td className="p-2.5 text-right font-mono text-amber-300 font-semibold">{activeService?.typicalUaeRateMinAed} - {activeService?.typicalUaeRateMaxAed}</td>
                        <td className="p-2.5 text-right font-mono font-bold text-amber-300">{minEstimatedCost.toLocaleString()} - {maxEstimatedCost.toLocaleString()}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Project Metadata */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 bg-slate-800/50 p-3.5 rounded-xl text-xs border border-slate-700/60">
                <div>
                  <span className="text-slate-400 block">Emirate Location:</span>
                  <span className="font-bold text-slate-50">{emirate}</span>
                </div>
                <div>
                  <span className="text-slate-400 block">Site Area:</span>
                  <span className="font-bold text-slate-50">{siteLocation}</span>
                </div>
                <div>
                  <span className="text-slate-400 block">Required Manpower:</span>
                  <span className="font-bold text-sky-300">{activeService?.manpowerProfileNeeded}</span>
                </div>
                <div>
                  <span className="text-slate-400 block">Target Turnaround:</span>
                  <span className="font-bold text-emerald-300">{activeService?.slaTurnaroundHours} Hours</span>
                </div>
              </div>

              {/* Compliance Notes */}
              <div className="text-xs space-y-1 text-slate-300">
                <p><strong className="text-slate-50">Mandatory Approvals:</strong> {activeService?.authorityApprovals.join(', ')}</p>
                <p><strong className="text-slate-50">Required Trade Certifications:</strong> {activeService?.requiredTradeCertifications.join(', ')}</p>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 bg-slate-800/50 border-t border-slate-700/60 flex items-center justify-between">
          {!isGenerated ? (
            <>
              <button
                onClick={onClose}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-300 hover:text-slate-50 hover:bg-slate-700 transition-all"
              >
                Cancel
              </button>
              <button
                onClick={() => setIsGenerated(true)}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold shadow-md shadow-amber-500/25 transition-all active:scale-[0.98]"
              >
                <FileText className="w-4 h-4 text-current" />
                <span>Generate Official RFQ Document</span>
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => setIsGenerated(false)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-300 hover:text-slate-50 hover:bg-slate-700 transition-all"
              >
                ← Back to Edit
              </button>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleExportJson}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 text-xs font-semibold border border-slate-700/60 transition-all"
                >
                  <Download className="w-3.5 h-3.5 text-amber-400" />
                  <span>Download JSON</span>
                </button>
                <button
                  onClick={handlePrint}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 text-xs font-semibold border border-slate-700/60 transition-all"
                >
                  <Printer className="w-3.5 h-3.5 text-sky-400" />
                  <span>Print RFQ</span>
                </button>
                <button
                  onClick={() => {
                    alert(`aqionprocure: RFQ dispatched successfully to ${selectedVendorIds.length > 0 ? selectedVendorIds.length : 'selected'} UAE vendors!`);
                    onClose();
                  }}
                  className="flex items-center gap-1.5 px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-slate-950 text-xs font-bold shadow-md shadow-emerald-600/20 transition-all active:scale-[0.98]"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Dispatch RFQ to Vendors</span>
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
