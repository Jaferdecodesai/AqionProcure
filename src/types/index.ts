export interface UaeTenderRfq {
  id: string;
  tenderRefNo: string;
  title: string;
  clientEntity: string;
  clientType: 'Government / Municipality' | 'Master Developer' | 'Facility Management' | 'Commercial / Fit-Out' | 'Private Villa Client';
  domainCategory: string;
  specificService: string;
  emirate: 'Dubai' | 'Abu Dhabi' | 'Sharjah' | 'Ajman' | 'Ras Al Khaimah' | 'Fujairah';
  siteLocation: string;
  scopeDescription: string;
  scopeItems: string[];
  estimatedBudgetAed: number;
  submissionDeadline: string;
  daysRemaining: number;
  urgency: 'Emergency (24h)' | 'Urgent (3-5 Days)' | 'Standard Bidding (1-2 Weeks)' | 'Extended Tender (30 Days)';
  sourcePortal: 'Tejari Dubai Supply Authority' | 'Etisalat e-Procurement (e&)' | 'Wasl Properties RFP Gateway' | 'Emaar Subcontractor Sourcing' | 'DEWA Tender Portal' | 'Dubizzle Pro Business Requests' | 'Abu Dhabi ERP & Tenders' | 'Dubai Municipality e-Services' | 'Khidmah FM Procurement' | 'DAMAC Tenders' | 'YellowPages.ae Leads' | 'Nakheel Tender Portal';
  sourceUrl: string;
  contactPerson: string;
  contactDesignation: string;
  phone: string;
  whatsapp: string;
  email: string;
  mandatoryApprovals: string[];
  requiredCertifications: string[];
  status: 'Active Bidding' | 'Immediate Subcontracting' | 'Pre-qualification Open' | 'Urgent Callout';
  postedDate: string;
  unitOfMeasure?: string;
  quantity?: number;
}

export interface SubService {
  id: string;
  name: string;
  category: string;
  description: string;
  scopeItems: string[];
  unitOfMeasure: string;
  typicalUaeRateMinAed: number;
  typicalUaeRateMaxAed: number;
  requiredTradeCertifications: string[];
  authorityApprovals: string[];
  slaTurnaroundHours: number;
  manpowerProfileNeeded: string;
}

export interface ServiceCategory {
  id: string;
  title: string;
  icon: string;
  serviceCount: number;
  description: string;
  services: SubService[];
}

export interface UaeVendor {
  id: string;
  companyName: string;
  emirate: 'Dubai' | 'Abu Dhabi' | 'Sharjah' | 'Ajman' | 'Ras Al Khaimah' | 'Fujairah' | 'UAW';
  tradeLicenseNo: string;
  categorySpecialty: string[];
  servicesOffered: string[];
  rating: number;
  reviewCount: number;
  phone: string;
  whatsapp: string;
  email: string;
  website: string;
  address: string;
  dewaApproved: boolean;
  civilDefenceApproved: boolean;
  isoCertified: boolean;
  yearsInUae: number;
  manpowerStrength: number;
  sourcePortal: string;
  verifiedBadge: boolean;
}

export interface ManpowerAgency {
  id: string;
  agencyName: string;
  locationState: 'Kerala' | 'Maharashtra' | 'Delhi NCR' | 'Tamil Nadu' | 'Telangana' | 'Punjab' | 'Karnataka';
  district?: string;
  city: string;
  meaLicenseNo: string;
  recruitingCapacityAnnual: number;
  establishedYear: number;
  contactPerson: string;
  designation: string;
  phone: string;
  mobile: string;
  whatsapp: string;
  email: string;
  website?: string;
  address: string;
  specializedTrades: string[];
  averageDeploymentDays: number;
  gulfDeploymentCount: number;
  verifiedMea: boolean;
  commissionType: 'Client-Paid' | 'Candidate-Service' | 'Government-Subsidized';
  keralaBranchOffices?: string[];
}

export interface FacebookCommentLead {
  id: string;
  candidateName: string;
  phone: string;
  whatsapp: string;
  trade: string;
  matchingServiceCategory: string;
  experienceYears: number;
  gulfExperience: boolean;
  gulfCountries?: string[];
  currentLocation: string;
  state: string;
  passportStatus: 'ECNR (Ready)' | 'ECR (Ready)' | 'Under Renewal';
  expectedSalaryAed: number;
  availableDate: string;
  commentSnippet: string;
  commentTimestamp: string;
  adSourcePostTitle: string;
  sentiment: 'Hot Lead' | 'Follow-up Needed' | 'Interview Scheduled';
}

export interface FacebookAd {
  id: string;
  pageName: string;
  postTitle: string;
  headline: string;
  postedDate: string;
  targetTrades: string[];
  regionFocus: string;
  reachEstimate: string;
  totalCommentsScraped: number;
  extractedLeadsCount: number;
  adText: string;
  postUrl: string;
  leadContacts: FacebookCommentLead[];
}

export interface TechnicianJobSeeker {
  id: string;
  fullName: string;
  primaryTrade: string;
  subCategory: string;
  education: string;
  experienceYears: number;
  gulfExperienceYears: number;
  homeCity: string;
  district: string;
  state: string;
  country: string;
  currentStatus: 'Ready for UAE Deployment' | 'In UAE on Visit Visa' | 'Serving Notice in India' | 'Available in 15 Days';
  passportType: 'ECNR' | 'ECR';
  contactNumber: string;
  whatsappNumber: string;
  email: string;
  expectedSalaryAed: number;
  skills: string[];
  certifications: string[];
  sourcePortal: string;
  profileUpdated: string;
}

// NEW INTERFACES FOR DHS <= 10/HR WORKERS & UAE AGENCIES
export interface UaeTenDirhamWorker {
  id: string;
  name: string;
  trade: 'Electrician' | 'Plumber' | 'HVAC / AC Tech' | 'Welder / Fabricator' | 'Gypsum Fixer' | 'Tile Mason' | 'Ductman' | 'MEP Helper / Laborer' | 'Painter / Finisher';
  hourlyRateAed: number; // <= 10 AED/hr
  dailyRateEquivalentAed: number; // 8-10 hr day
  monthlySalaryEquivalentAed: number;
  visaStatus: 'Freelance Visa (Green/Partner)' | 'Own Visa with NOC' | 'Visit Visa (Immediate)' | 'Cancelled Visa (Grace Period)' | 'Company Visa (NOC Available)';
  currentLocation: string; // e.g. Sonapur, Al Quoz, Sharjah Industrial, Mussafah, Ajman Jurf, DIP
  emirate: 'Dubai' | 'Sharjah' | 'Abu Dhabi' | 'Ajman';
  availability: 'Available Immediately Today' | 'Available in 24 Hours' | 'Available this Weekend';
  isFreelance: boolean;
  sourcePlatform: 'TikTok Video Comments' | 'Facebook Ads Comments' | 'Dubizzle Freelance Technical' | 'Camp Direct Referral';
  sourcePostOrVideoTitle: string;
  commentText: string;
  commentTimestamp: string;
  phone: string;
  whatsapp: string;
  experienceYearsUae: number;
  skills: string[];
  nationality: string;
  toolsEquipped: boolean; // Has own basic hand tools
  orjContactStatus: 'New Lead' | 'ORJ Contacted' | 'Vetted & Ready' | 'Assigned to Client';
  orjNotes?: string;
  postedDate: string;
  isLiveScraped?: boolean;
}

export interface UaeManpowerSupplyAgency {
  id: string;
  agencyName: string;
  emirate: 'Dubai' | 'Sharjah' | 'Abu Dhabi' | 'Ajman';
  licenseType: 'MOHRE Licensed Manpower Supply' | 'DED Technical Services' | 'Labor Supply Subcontractor';
  licenseNo: string;
  hourlyRateBenchmarkAed: string; // e.g. "8 - 10 AED/hr (Bulk >= 20 Techs)"
  minHourlyRateAed: number;
  availableTrades: string[];
  currentAvailableStrength: number;
  contactPerson: string;
  designation: string;
  phone: string;
  whatsapp: string;
  email: string;
  address: string;
  campLocation: string;
  mohreApproved: boolean;
  workmenCompInsured: boolean;
  transportProvided: boolean;
  minContractPeriod: 'Daily / On-Call' | 'Monthly' | 'Annual Subcontract';
  notes: string;
}
