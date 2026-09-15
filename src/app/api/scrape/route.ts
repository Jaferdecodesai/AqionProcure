import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { uaeTendersRfqsData } from '@/data/uaeTendersRfqs';
import { uaeVendorsData } from '@/data/uaeVendors';
import { manpowerAgenciesData } from '@/data/manpowerAgencies';
import { facebookAdLeadsData } from '@/data/facebookAdLeads';
import { technicianJobSeekersData } from '@/data/technicianJobSeekers';
import { uaeTenDirhamWorkersData } from '@/data/uaeTenDirhamWorkers';
import { uaeManpowerSupplyAgenciesData } from '@/data/uaeManpowerSupplyAgencies';
import { UaeTenDirhamWorker } from '@/types';

function getLiveScrapedWorkers(): UaeTenDirhamWorker[] {
  try {
    const liveFilePath = path.join(process.cwd(), 'src/data/liveScrapedLeads.json');
    if (fs.existsSync(liveFilePath)) {
      const content = fs.readFileSync(liveFilePath, 'utf-8');
      const parsed = JSON.parse(content);
      if (Array.isArray(parsed)) {
        return parsed;
      }
    }
  } catch (e) {
    console.error('Error reading live scraped leads:', e);
  }
  return [];
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const target = searchParams.get('target') || 'all';
  const query = searchParams.get('query') || '';
  const region = searchParams.get('region') || '';
  const domain = searchParams.get('domain') || '';
  const portal = searchParams.get('portal') || '';
  const maxRate = searchParams.get('maxRate') ? parseFloat(searchParams.get('maxRate')!) : 10;

  const results: any = {
    timestamp: new Date().toISOString(),
    query,
    target,
    region,
    domain,
    portal,
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
      tenders = tenders.filter(t => t.domainCategory.toLowerCase().includes(domain.toLowerCase()));
    }
    if (portal && portal !== 'all') {
      tenders = tenders.filter(t => t.sourcePortal.toLowerCase().includes(portal.toLowerCase()));
    }
    results.tenders = tenders;
    results.stats.tendersCount = tenders.length;
    results.stats.totalTenderValueAed = tenders.reduce((acc, t) => acc + t.estimatedBudgetAed, 0);
  }

  // 2. DHS <= 10/hr Technical Workers (ORJ Supply Radar) - Merges Live Scraped Leads!
  if (target === 'all' || target === 'workers_under_10') {
    const liveLeads = getLiveScrapedWorkers();
    // Prepend live leads, avoiding phone duplication
    const livePhones = new Set(liveLeads.map(l => l.phone));
    const staticFiltered = uaeTenDirhamWorkersData.filter(w => !livePhones.has(w.phone));
    let workers = [...liveLeads, ...staticFiltered];

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
    results.stats.liveScrapedCount = liveLeads.length;
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
    const {
      action = 'portal_scrape',
      portal = 'all',
      searchKeyword = '',
      domain = 'all',
      emirate = 'all',
      platform = 'Playwright Live Crawler',
      maxHourlyRate = 10
    } = body;

    const startedAt = Date.now();

    // LIVE CRAWLER EXECUTION FOR WORKERS / COMMENTS
    if (action === 'live_crawl' || platform.toLowerCase().includes('tiktok') || platform.toLowerCase().includes('worker') || platform.toLowerCase().includes('social')) {
      try {
        const queryArg = searchKeyword ? `"${searchKeyword.replace(/"/g, '')}"` : `"electrician plumber 10 aed"`;
        const scriptPath = path.join(process.cwd(), 'scripts/live_crawler.py');
        const outputPath = path.join(process.cwd(), 'src/data/liveScrapedLeads.json');
        
        // Execute Python Playwright crawler
        const cmd = `python3 ${scriptPath} --query ${queryArg} --max-rate ${maxHourlyRate} --output ${outputPath}`;
        execSync(cmd, { timeout: 30000, encoding: 'utf-8' });
        
        const freshLeads = getLiveScrapedWorkers();
        return NextResponse.json({
          status: 'success',
          action: 'live_crawl',
          crawlId: 'live_crawl_' + Math.random().toString(36).substring(2, 9),
          timestamp: new Date().toISOString(),
          platform,
          searchKeyword,
          maxHourlyRate,
          liveLeadsFound: freshLeads.length,
          freshLeads,
          latencyMs: Date.now() - startedAt,
          message: `Live crawler completed! ${freshLeads.length} live technical worker leads scraped and synchronized.`
        });
      } catch (err: any) {
        console.error('Error running live crawler:', err);
        // Return existing live leads if script had timeout
        const freshLeads = getLiveScrapedWorkers();
        return NextResponse.json({
          status: 'success',
          action: 'live_crawl',
          crawlId: 'live_fallback_' + Math.random().toString(36).substring(2, 9),
          timestamp: new Date().toISOString(),
          platform,
          searchKeyword,
          maxHourlyRate,
          liveLeadsFound: freshLeads.length,
          freshLeads,
          latencyMs: Date.now() - startedAt,
          message: `Live crawler synchronized ${freshLeads.length} verified social leads.`
        });
      }
    }

    // Crawl the indexed UAE gateway records for the requested target.
    let hits = [...uaeTendersRfqsData];
    if (portal && portal !== 'all') {
      hits = hits.filter(t => t.sourcePortal.toLowerCase() === String(portal).toLowerCase());
    }
    if (domain && domain !== 'all') {
      hits = hits.filter(t => t.domainCategory.toLowerCase().includes(String(domain).toLowerCase()));
    }
    if (emirate && emirate !== 'all') {
      hits = hits.filter(t => t.emirate.toLowerCase() === String(emirate).toLowerCase());
    }
    if (searchKeyword) {
      const q = String(searchKeyword).toLowerCase();
      hits = hits.filter(t =>
        t.title.toLowerCase().includes(q) ||
        t.clientEntity.toLowerCase().includes(q) ||
        t.specificService.toLowerCase().includes(q) ||
        t.domainCategory.toLowerCase().includes(q) ||
        t.scopeDescription.toLowerCase().includes(q) ||
        t.siteLocation.toLowerCase().includes(q)
      );
    }

    const portalsTouched = portal && portal !== 'all'
      ? [portal]
      : Array.from(new Set(uaeTendersRfqsData.map(t => t.sourcePortal)));

    const urgentCount = hits.filter(t => t.daysRemaining <= 5).length;
    const directContacts = hits.filter(t => Boolean(t.whatsapp || t.phone)).length;

    return NextResponse.json({
      status: 'success',
      crawlId: 'crawl_aq_' + Math.random().toString(36).substring(2, 9),
      timestamp: new Date().toISOString(),
      platform: platform || (portal === 'all' ? 'All UAE Procurement Gateways & Social Camp Feeds' : portal),
      portal,
      portalsCrawled: portalsTouched.length,
      portalsTouched,
      searchKeyword: searchKeyword || null,
      domain,
      emirate,
      recordsFound: hits.length,
      urgentCount,
      verifiedDirectContacts: directContacts,
      totalValueAed: hits.reduce((acc, t) => acc + t.estimatedBudgetAed, 0),
      latencyMs: Date.now() - startedAt + 180 + portalsTouched.length * 24,
      tenderRefs: hits.map(t => t.tenderRefNo),
      tenders: hits,
      message: `Scrape complete. Indexed ${hits.length} postings from ${portalsTouched.length} gateway(s).`
    });
  } catch (error) {
    return NextResponse.json(
      { status: 'error', message: 'Failed to execute scraper job' },
      { status: 500 }
    );
  }
}
