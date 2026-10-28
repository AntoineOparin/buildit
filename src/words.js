// Three reels aimed at vertical SaaS: a business type that pays, a painful
// recurring workflow it pays to fix, and an angle that makes the product win.
// Business facts are rough starting points to check, not research.

export const FACT_LABELS = {
  buyer: 'Who buys',
  today: 'Uses today',
  spend: 'Software spend',
  reach: 'Where to find them',
  risk: 'Watch out',
}

export const BUSINESS_FACTS = {
  // clinics & appointments
  'dental clinics': {
    buyer: 'owner dentist or practice manager',
    today: 'dated practice software, phone & paper recalls',
    spend: 'high, several tools at once',
    reach: 'dental associations, supply reps, practice-manager groups',
    risk: 'patient data rules, entrenched incumbents',
  },
  'vet clinics': {
    buyer: 'practice owner or office manager',
    today: 'practice software, texts sent by hand',
    spend: 'high, used to monthly fees',
    reach: 'vet conferences, practice-manager communities',
    risk: 'consolidation into large chains',
  },
  'physio clinics': {
    buyer: 'clinic owner',
    today: 'booking tool + spreadsheets for exercise plans',
    spend: 'medium',
    reach: 'professional bodies, CPD courses, LinkedIn',
    risk: 'insurance billing rules differ by country',
  },
  'dog groomers': {
    buyer: 'solo owner or salon owner',
    today: 'paper diary, Instagram DMs, generic booking apps',
    spend: 'low to medium',
    reach: 'Facebook groups, grooming shows, supply shops',
    risk: 'many one-person businesses, price-sensitive',
  },

  // trades & field service
  'HVAC contractors': {
    buyer: 'owner or office manager',
    today: 'field-service suites, whiteboards, paper job sheets',
    spend: 'medium to high',
    reach: 'trade associations, supplier counters, YouTube',
    risk: 'big field-service platforms already sell here',
  },
  'electricians': {
    buyer: 'owner of a 1–20 person firm',
    today: 'spreadsheets, paper certificates, WhatsApp',
    spend: 'low to medium',
    reach: 'wholesalers, trade forums, certification bodies',
    risk: 'owners work on site and rarely sit at a desk',
  },
  'plumbers': {
    buyer: 'owner, often also the main worker',
    today: 'phone, notebook, invoicing app',
    spend: 'low to medium',
    reach: 'merchants, Facebook trade groups',
    risk: 'emergency work makes schedules chaotic',
  },
  'solar installers': {
    buyer: 'owner or operations lead',
    today: 'CRM + spreadsheets for permits and installs',
    spend: 'medium to high',
    reach: 'industry shows, distributor programs',
    risk: 'demand swings with subsidies and rates',
  },
  'general contractors': {
    buyer: 'owner or project manager',
    today: 'spreadsheets, email chains, site photos on phones',
    spend: 'medium to high',
    reach: 'builder associations, LinkedIn, supplier events',
    risk: 'construction suites target bigger firms already',
  },
  'cleaning companies': {
    buyer: 'owner',
    today: 'WhatsApp rotas, paper checklists',
    spend: 'low to medium',
    reach: 'Facebook groups, franchise networks',
    risk: 'thin margins, high staff turnover',
  },
  'landscaping companies': {
    buyer: 'owner',
    today: 'paper routes, invoicing app, texts',
    spend: 'medium',
    reach: 'equipment dealers, trade shows, YouTube',
    risk: 'seasonal cash flow',
  },
  'pest control companies': {
    buyer: 'owner or office manager',
    today: 'paper service reports, chemical logs',
    spend: 'medium',
    reach: 'pest associations, chemical suppliers',
    risk: 'strict chemical record rules by region',
  },
  'auto repair shops': {
    buyer: 'shop owner',
    today: 'shop software, phone calls to approve work',
    spend: 'medium',
    reach: 'parts suppliers, garage owner forums',
    risk: 'owners are wary of switching systems',
  },

  // properties & venues
  'property managers': {
    buyer: 'owner of a small management firm',
    today: 'spreadsheets, email, generic property software',
    spend: 'medium to high, priced per unit',
    reach: 'landlord associations, BiggerPockets-style forums',
    risk: 'crowded market at the top end',
  },
  'wedding venues': {
    buyer: 'owner or events manager',
    today: 'email threads, spreadsheets, shared calendars',
    spend: 'medium',
    reach: 'wedding fairs, venue associations, Instagram',
    risk: 'very seasonal, each venue works differently',
  },
  'campgrounds & RV parks': {
    buyer: 'owner-operator',
    today: 'paper maps, phone bookings, OTA extranets',
    spend: 'low to medium',
    reach: 'park associations, trade shows',
    risk: 'unreliable internet on site',
  },
  'marinas': {
    buyer: 'harbor master or owner',
    today: 'spreadsheets, paper berth plans',
    spend: 'medium',
    reach: 'marina associations, boat shows',
    risk: 'small number of sites per region',
  },
  'coworking spaces': {
    buyer: 'operator',
    today: 'coworking software + Slack + door access app',
    spend: 'medium',
    reach: 'coworking conferences, operator communities',
    risk: 'several tools already compete here',
  },

  // fitness & learning
  'independent gyms': {
    buyer: 'owner',
    today: 'membership software, WhatsApp groups',
    spend: 'medium',
    reach: 'fitness events, equipment suppliers, Instagram',
    risk: 'high churn among small gyms',
  },
  'yoga & pilates studios': {
    buyer: 'studio owner',
    today: 'class-booking apps, Instagram',
    spend: 'medium',
    reach: 'teacher trainings, studio owner groups',
    risk: 'booking marketplaces already own the space',
  },
  'driving schools': {
    buyer: 'owner or solo instructor',
    today: 'paper diaries, texts, cash payments',
    spend: 'low',
    reach: 'instructor associations, Facebook groups',
    risk: 'many solo instructors, low budgets',
  },
  'tutoring centers': {
    buyer: 'center owner',
    today: 'spreadsheets, school-style software, email',
    spend: 'medium',
    reach: 'franchise networks, education fairs',
    risk: 'term-time cash flow',
  },
  'music schools': {
    buyer: 'owner',
    today: 'spreadsheets for lessons, rooms and teachers',
    spend: 'low to medium',
    reach: 'music teacher associations, instrument shops',
    risk: 'small budgets',
  },
  'childcare centers': {
    buyer: 'owner or center director',
    today: 'paper registers, parent apps, spreadsheets',
    spend: 'medium',
    reach: 'childcare associations, local authority networks',
    risk: 'strict safeguarding and data rules',
  },

  // food & drink
  'restaurants': {
    buyer: 'owner or general manager',
    today: 'POS, paper temperature logs, spreadsheets',
    spend: 'medium to high, mostly POS',
    reach: 'restaurant associations, suppliers, food shows',
    risk: 'high closure rate, many POS add-ons',
  },
  'food trucks': {
    buyer: 'owner-operator',
    today: 'POS app, Instagram for locations',
    spend: 'low',
    reach: 'food truck associations, event organizers',
    risk: 'tiny teams, tight budgets',
  },
  'craft breweries': {
    buyer: 'head brewer or owner',
    today: 'spreadsheets for batches, tanks and duty',
    spend: 'medium',
    reach: 'brewers guilds, ingredient suppliers',
    risk: 'tax and duty reporting differs by country',
  },
  'vineyards & wineries': {
    buyer: 'owner or vineyard manager',
    today: 'notebooks, weather apps, spreadsheets',
    spend: 'medium',
    reach: 'grower associations, wine trade fairs',
    risk: 'once-a-year harvest makes feedback slow',
  },

  // operations & sensors
  'commercial greenhouses': {
    buyer: 'grower or operations manager',
    today: 'climate controllers + spreadsheets',
    spend: 'medium to high',
    reach: 'horticulture shows, grower cooperatives',
    risk: 'controller vendors guard their data',
  },
  'cold storage': {
    buyer: 'site or quality manager',
    today: 'data loggers, paper temperature checks',
    spend: 'medium to high',
    reach: 'cold chain associations, logistics shows',
    risk: 'audit requirements must be exactly right',
  },
  'trucking fleets': {
    buyer: 'fleet owner or dispatcher',
    today: 'telematics, ELDs, spreadsheets, phone calls',
    spend: 'high, priced per truck',
    reach: 'trucking associations, fuel card partners',
    risk: 'telematics giants dominate',
  },
  '3PL warehouses': {
    buyer: 'operations or site manager',
    today: 'WMS + spreadsheets + email',
    spend: 'high',
    reach: 'logistics shows, LinkedIn, e-commerce partners',
    risk: 'long integration projects',
  },
  'small manufacturers': {
    buyer: 'owner or plant manager',
    today: 'ERP pieces, spreadsheets, whiteboards',
    spend: 'medium to high',
    reach: 'manufacturing associations, machine dealers',
    risk: 'every shop floor is different',
  },
  'testing labs': {
    buyer: 'lab manager',
    today: 'LIMS or spreadsheets, paper chain-of-custody',
    spend: 'high',
    reach: 'accreditation bodies, scientific suppliers',
    risk: 'accreditation slows changes',
  },
  'commercial beekeepers': {
    buyer: 'owner-operator',
    today: 'notebooks, hive scales, spreadsheets',
    spend: 'low to medium',
    reach: 'beekeeping associations, pollination brokers',
    risk: 'small market, very seasonal',
  },
  'aquaculture farms': {
    buyer: 'farm or site manager',
    today: 'sensor dashboards + paper logs',
    spend: 'high',
    reach: 'aquaculture shows, feed suppliers',
    risk: 'remote sites, few but large customers',
  },

  // care & professional services
  'home care agencies': {
    buyer: 'agency owner or care coordinator',
    today: 'rostering software, phone calls, paper care notes',
    spend: 'medium to high',
    reach: 'care associations, regulator events',
    risk: 'heavily regulated, staff shortages',
  },
  'funeral homes': {
    buyer: 'owner or director',
    today: 'paper files, spreadsheets, email',
    spend: 'medium',
    reach: 'funeral director associations',
    risk: 'traditional buyers, slow to switch',
  },
  'accounting firms': {
    buyer: 'partner or practice manager',
    today: 'practice software, email for client documents',
    spend: 'high',
    reach: 'accounting bodies, software partner programs',
    risk: 'crowded, trust and security matter a lot',
  },
}

export const WORKFLOW_ASPECTS = {
  'no-shows': ['last-minute cancellations', 'reminders sent by hand', 'deposits & cancellation fees', 'filling gaps from a waitlist', 'double bookings', 'lost revenue nobody tracks'],
  'quotes': ['site visits before pricing', 'copy-pasted templates', 'slow follow-ups', 'price changes from suppliers', 'quote-to-job handoff', 'win rate nobody measures'],
  'chasing payments': ['awkward reminder calls', 'invoices lost in email', 'cash vs card vs transfer', 'partial payments', 'late fees', 'cash flow surprises'],
  'shift rotas': ['last-minute sick calls', 'shift swaps in group chats', 'overtime rules', 'skills needed per shift', 'holiday requests', 'payroll mismatches'],
  'compliance logs': ['paper checklists', 'missed checks', 'inspector visits', 'proof of who did what and when', 'rules changing yearly', 'fines for gaps'],
  'equipment upkeep': ['service intervals', 'breakdowns at the worst time', 'warranty dates', 'spare parts', 'who used it last', 'repair vs replace'],
  'reordering stock': ['running out mid-week', 'over-ordering', 'supplier price changes', 'minimum order sizes', 'expiry dates', 'stock counts by hand'],
  'job dispatch': ['who is closest', 'emergency call-outs', 'travel time', 'skills per job', 'customer arrival windows', 'end-of-day job status'],
  'client onboarding': ['forms filled twice', 'chasing missing documents', 'ID and consent', 'welcome info nobody reads', 'setting expectations', 'first-week drop-off'],
  'staff certifications': ['expiry dates', 'training records', 'who is allowed to do what', 'audits', 'onboarding new hires', 'renewal costs'],
  'review requests': ['asking at the right moment', 'unhappy customers caught early', 'replying to reviews', 'referral rewards', 'local search ranking', 'testimonials for the website'],
  'inspections': ['checklists on clipboards', 'photos as evidence', 'reports for clients', 'follow-up fixes', 'repeat issues', 'signed off by whom'],
  'sensor monitoring': ['alerts at 3 a.m.', 'false alarms', 'mixed sensor brands', 'gaps in readings', 'audit-ready history', 'who responds and how fast'],
  'memberships': ['failed card payments', 'freezes and pauses', 'churn warning signs', 'upgrades and add-ons', 'class or visit limits', 'win-back offers'],
  'timesheets': ['forgotten clock-ins', 'paper timesheets', 'job costing', 'overtime approval', 'travel time', 'payroll export'],
  'safety incidents': ['near misses nobody reports', 'incident forms', 'root causes', 'insurance claims', 'toolbox talks', 'trend reports'],
  'customer messages': ['WhatsApp, SMS, email, calls', 'messages to personal phones', 'after-hours questions', 'the same questions daily', 'team handoffs', 'nothing on record'],
  'job photos': ['before & after shots', 'photos lost in camera rolls', 'proof for disputes', 'progress updates to clients', 'tagging by job', 'reports with photos'],
  'waitlists': ['full classes or slots', 'first-come vs priority', 'auto-offering openings', 'no-response timeouts', 'demand signals for new slots', 'fairness complaints'],
  'lead follow-up': ['slow first response', 'leads from many channels', 'forgotten callbacks', 'who owns the lead', 'lost-deal reasons', 'seasonal spikes'],
  'subcontractors': ['availability', 'insurance and paperwork', 'payment terms', 'quality issues', 'site access', 'who is on site today'],
  'keys & assets': ['who has which key', 'lost equipment', 'check-out & return', 'location of shared tools', 'damage reports', 'replacement costs'],
  'contract renewals': ['renewal dates missed', 'price increases', 'auto-renew surprises', 'signatures', 'contract versions', 'upsell timing'],
}

export const ANGLES = [
  'replaces a spreadsheet',
  'mobile-first for field staff',
  'AI does the paperwork',
  'uses sensors they already own',
  'works offline on site',
  'syncs with their accounting',
  'runs on WhatsApp & SMS',
  'customer self-service portal',
  'five-minute setup',
  'built for 1–10 person teams',
  'voice-first for busy hands',
  'snap a photo, done',
  'automatic compliance reports',
  'multi-location dashboard',
  'benchmarks vs similar businesses',
  'priced per job, not per seat',
]

export const BUSINESSES = Object.keys(BUSINESS_FACTS)
export const WORKFLOWS = Object.keys(WORKFLOW_ASPECTS)
