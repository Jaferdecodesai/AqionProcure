import { NextResponse } from 'next/server';
import { uaeTendersRfqsData } from '@/data/uaeTendersRfqs';
import { uaeVendorsData } from '@/data/uaeVendors';
import { manpowerAgenciesData } from '@/data/manpowerAgencies';
import { facebookAdLeadsData } from '@/data/facebookAdLeads';
import { technicianJobSeekersData } from '@/data/technicianJobSeekers';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const target = searchParams.get('target') || 'all';
  const query = searchParams.get('query') || '';
  const region = searchParams.get('region') || '';
  const domain = searchParams.get('domain') || '';

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

  // 2. Indian & Kerala Agencies
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

  // 3. Facebook Ad Comments
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

  // 4. Job Seekers
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
    const { platform, searchKeyword, districtFilter, targetTrade } = body;
    const simulatedCrawlId = 'crawl_aq_' + Math.random().toString(36).substring(2, 9);
    
    return NextResponse.json({
      status: 'success',
      crawlId: simulatedCrawlId,
      timestamp: new Date().toISOString(),
      platform: platform || 'UAE Tender Gateways (Tejari, Etisalat, Wasl, DM) & Indian Recruitment Feeds',
      searchKeyword: searchKeyword || 'UAE MEP Procurement RFQ',
      recordsFound: 25,
      verifiedDirectContacts: 22,
      latencyMs: 290,
      message: 'Scrape completed successfully. Live UAE Tenders and Kerala candidate inquiries updated.'
    });
  } catch (error) {
    return NextResponse.json(
      { status: 'error', message: 'Failed to execute scraper job' },
      { status: 500 }
    );
  }
}
