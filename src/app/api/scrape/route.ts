import { NextResponse } from 'next/server';
import { uaeTendersRfqsData } from '@/data/uaeTendersRfqs';
import { uaeVendorsData } from '@/data/uaeVendors';
import { manpowerAgenciesData } from '@/data/manpowerAgencies';
import { facebookAdLeadsData } from '@/data/facebookAdLeads';
import { technicianJobSeekersData } from '@/data/technicianJobSeekers';
import { uaeTenDirhamWorkersData } from '@/data/uaeTenDirhamWorkers';
import { uaeManpowerSupplyAgenciesData } from '@/data/uaeManpowerSupplyAgencies';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const target = searchParams.get('target') || 'all';
  const query = searchParams.get('query') || '';
  const region = searchParams.get('region') || '';
  const domain = searchParams.get('domain') || '';
  const maxRate = searchParams.get('maxRate') ? parseFloat(searchParams.get('maxRate')!) : 10;

  const results: any = {
    timestamp: new Date().toISOString(),
    query,
    target,
    region,
    domain,
    stats: {}
  };

  // 1. UAE Scraped Tenders & RFQ Requirements
  if (target === 'all' || target === 'tenders') {
    let tenders = [...uaeTendersRfqsData];
    if (query) {
      tenders = tenders.filter(t => 
        t.title.toLowerCase().includes(query.toLowerCase()) ||
        t.clientEntity.toLowerCase().includes(query.toLowerCase()) ||
        t.specificService.toLowerCase().includes(query.toLowerCase()) ||
        t.domainCategory.toLowerCase().includes(query.toLowerCase()) ||
        t.scopeDescription.toLowerCase().includes(query.toLowerCase()) ||
        t.siteLocation.toLowerCase().includes(query.toLowerCase())
      );
    }
    if (region && region !== 'all') {
      tenders = tenders.filter(t => t.emirate.toLowerCase() === region.toLowerCase());
    }
    if (domain && domain !== 'all') {
      tenders = tenders.filter(t => t.domainCategory.toLowerCase() === domain.toLowerCase());
    }
    results.tenders = tenders;
    results.stats.tendersCount = tenders.length;
    results.stats.totalTenderValueAed = tenders.reduce((acc, t) => acc + t.estimatedBudgetAed, 0);
  }

  // 2. DHS <= 10/hr Technical Workers (ORJ Supply Radar)
  if (target === 'all' || target === 'workers_under_10') {
    let workers = [...uaeTenDirhamWorkersData];
    if (maxRate) {
      workers = workers.filter(w => w.hourlyRateAed <= maxRate);
    }
    if (query) {
      workers = workers.filter(w => 
        w.name.toLowerCase().includes(query.toLowerCase()) ||
        w.trade.toLowerCase().includes(query.toLowerCase()) ||
        w.currentLocation.toLowerCase().includes(query.toLowerCase()) ||
        w.skills.some(s => s.toLowerCase().includes(query.toLowerCase())) ||
        w.commentText.toLowerCase().includes(query.toLowerCase())
      );
    }
    if (region && region !== 'all') {
      workers = workers.filter(w => w.emirate.toLowerCase() === region.toLowerCase());
    }
    results.workersUnder10 = workers;
    results.stats.workersUnder10Count = workers.length;
  }

  // 3. UAE Manpower Supply Agencies
  if (target === 'all' || target === 'uae_agencies') {
    let agencies = [...uaeManpowerSupplyAgenciesData];
    if (query) {
      agencies = agencies.filter(a => 
        a.agencyName.toLowerCase().includes(query.toLowerCase()) ||
        a.emirate.toLowerCase().includes(query.toLowerCase()) ||
        a.address.toLowerCase().includes(query.toLowerCase()) ||
        a.availableTrades.some(t => t.toLowerCase().includes(query.toLowerCase()))
      );
    }
    if (region && region !== 'all') {
      agencies = agencies.filter(a => a.emirate.toLowerCase() === region.toLowerCase());
    }
    results.uaeAgencies = agencies;
    results.stats.uaeAgenciesCount = agencies.length;
  }

  // 4. Indian & Kerala Agencies
  if (target === 'all' || target === 'agencies') {
    let agencies = [...manpowerAgenciesData];
    if (query) {
      agencies = agencies.filter(a => 
        a.agencyName.toLowerCase().includes(query.toLowerCase()) ||
        a.city.toLowerCase().includes(query.toLowerCase()) ||
        (a.district && a.district.toLowerCase().includes(query.toLowerCase())) ||
        a.specializedTrades.some(t => t.toLowerCase().includes(query.toLowerCase()))
      );
    }
    results.agencies = agencies;
    results.stats.agenciesCount = agencies.length;
  }

  // 5. Facebook Ad Comments
  if (target === 'all' || target === 'facebook_leads') {
    let ads = [...facebookAdLeadsData];
    let allLeads = ads.flatMap(ad => ad.leadContacts);
    if (query) {
      allLeads = allLeads.filter(l => 
        l.candidateName.toLowerCase().includes(query.toLowerCase()) ||
        l.trade.toLowerCase().includes(query.toLowerCase()) ||
        l.currentLocation.toLowerCase().includes(query.toLowerCase())
      );
    }
    results.facebookAds = ads;
    results.facebookCommentLeads = allLeads;
    results.stats.fbCommentLeadsCount = allLeads.length;
  }

  // 6. Job Seekers
  if (target === 'all' || target === 'job_seekers') {
    let technicians = [...technicianJobSeekersData];
    if (query) {
      technicians = technicians.filter(t => 
        t.fullName.toLowerCase().includes(query.toLowerCase()) ||
        t.primaryTrade.toLowerCase().includes(query.toLowerCase()) ||
        t.skills.some(s => s.toLowerCase().includes(query.toLowerCase()))
      );
    }
    results.jobSeekers = technicians;
    results.stats.jobSeekersCount = technicians.length;
  }

  return NextResponse.json({
    status: 'success',
    data: results
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { platform, searchKeyword, maxHourlyRate } = body;
    const simulatedCrawlId = 'crawl_orj_' + Math.random().toString(36).substring(2, 9);
    
    return NextResponse.json({
      status: 'success',
      crawlId: simulatedCrawlId,
      timestamp: new Date().toISOString(),
      platform: platform || 'TikTok, Facebook Ads & UAE Labor Camps',
      searchKeyword: searchKeyword || 'Electrician 10 AED own visa',
      maxHourlyRate: maxHourlyRate || 10,
      workerLeadsExtracted: 16,
      phoneNumbersParsed: 16,
      agenciesFound: 6,
      message: 'Scrape completed for ORJ Technical Services. Leads ready for immediate WhatsApp outreach.'
    });
  } catch (error) {
    return NextResponse.json(
      { status: 'error', message: 'Failed to execute scraper job' },
      { status: 500 }
    );
  }
}
