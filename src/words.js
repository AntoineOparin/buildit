// Each word maps to real aspects shown after a spin to help brainstorm:
// categories list the domains, workflows and data niches an app could touch,
// audiences list the constraints, hazards and routines of those people.

export const CATEGORY_ASPECTS = {
  // hardware / IoT-ripe environments
  'beekeeping': ['hive weight & temperature', 'swarm prediction', 'queen health tracking', 'honey flow timing', 'varroa mite counts', 'remote apiaries with no power'],
  'aquariums': ['water chemistry drift', 'feeding & dosing automation', 'heater & pump failures', 'fish disease tracking', 'coral lighting cycles', 'evaporation top-offs'],
  'hydroponics': ['pH & EC balance', 'nutrient dosing', 'light schedules', 'pump & reservoir levels', 'root rot detection', 'harvest forecasting'],
  'cold chain': ['fridge & freezer temperature logs', 'door-open alerts', 'power-cut detection', 'vaccine & food compliance', 'transport sensor gaps', 'audit-ready records'],
  'smart grids': ['solar & battery flow', 'time-of-use tariffs', 'load shedding', 'EV charging windows', 'outage detection', 'energy export to the grid'],
  'air quality': ['PM2.5 & CO2 sensors', 'indoor vs outdoor readings', 'ventilation triggers', 'wildfire smoke alerts', 'sensor calibration drift', 'neighborhood sensor maps'],
  'water monitoring': ['leak detection', 'flow & pressure sensing', 'well & tank levels', 'water quality testing', 'freeze protection', 'usage anomalies'],
  'soil science': ['moisture at depth', 'nutrient sampling', 'compaction', 'irrigation zones', 'sensor burial & corrosion', 'seasonal trends'],
  'wildlife tracking': ['camera trap triage', 'GPS collar battery life', 'animal sound identification', 'migration patterns', 'low-power radio links', 'poaching alerts'],
  'weather stations': ['backyard sensor arrays', 'wind & rain gauges', 'lightning detection', 'microclimate maps', 'sharing data with networks', 'solar-powered nodes'],
  'robotics': ['motor control & calibration', 'sensor fusion', 'path planning', 'battery management', 'remote teleoperation', 'safe stop conditions'],
  'drones': ['flight plans & geofences', 'battery & wind limits', 'aerial mapping', 'regulations & no-fly zones', 'telemetry logging', 'crash recovery'],
  'home automation': ['local-first control (no cloud)', 'presence detection', 'energy-saving scenes', 'sensor battery tracking', 'voice-free controls', 'device protocols (Zigbee, Matter, BLE)'],
  'wearables': ['heart rate & HRV', 'motion & fall detection', 'BLE sync to a phone', 'coin-cell battery life', 'haptic cues', 'raw sensor data export'],
  'bluetooth tags': ['finding lost items', 'proximity alerts', 'leave-behind warnings', 'mesh relays', 'RSSI distance guessing', 'tag battery swaps'],
  'vehicle diagnostics': ['OBD-II fault codes', 'live engine data', 'trip & fuel logging', 'battery voltage health', 'CAN bus sniffing', 'predicting breakdowns'],
  'workshops': ['tool inventory & checkout', 'machine usage hours', 'material offcuts', 'safety interlocks', 'project cost tracking', 'dust & noise exposure'],
  '3D printing': ['print failure detection', 'filament inventory', 'slicer settings per material', 'print queue & farm control', 'temperature & enclosure logging', 'remote monitoring cameras'],
  'amateur radio': ['band conditions', 'logging contacts', 'antenna tuning', 'satellite pass predictions', 'emergency nets', 'digital modes (APRS, LoRa)'],
  'astronomy': ['clear-sky forecasts', 'telescope alignment & tracking', 'observation logs', 'light pollution maps', 'satellite & ISS passes', 'dew & cold-weather gear'],

  // physical places & workflows
  'warehouses': ['pick paths', 'barcode & RFID scanning', 'shelf stock counts', 'forklift traffic', 'dock scheduling', 'damaged goods'],
  'construction sites': ['daily site logs', 'snag lists & photos', 'equipment tracking', 'safety checklists', 'weather delays', 'subcontractor coordination'],
  'food safety': ['HACCP temperature checks', 'allergen tracking', 'expiry dates & labeling', 'cleaning logs', 'supplier traceability', 'inspection prep'],
  'urban mobility': ['scooter & bike availability', 'last-mile routes', 'transit delays', 'bike lane safety', 'accessibility routing', 'parking sensors'],
  'emergency response': ['incident reporting', 'dispatch & resource maps', 'offline communication', 'checklists under stress', 'roll calls & headcounts', 'post-incident reviews'],
  'search & rescue': ['grid search coverage', 'GPS track sharing', 'mesh radios & beacons', 'volunteer check-in', 'terrain & weather risk', 'finding the last known point'],
  'maritime': ['tides & currents', 'AIS vessel tracking', 'bilge & battery monitoring', 'anchor drag alerts', 'passage planning', 'marine VHF & weather fax'],
  'aviation': ['flight logbooks', 'weather briefings (METAR/TAF)', 'weight & balance', 'currency & medical dates', 'preflight checklists', 'airspace charts'],
  'accessibility': ['screen reader friendliness', 'voice and switch control', 'tactile & audio cues', 'step-free route data', 'live captioning', 'low-vision contrast'],
  'repair culture': ['fault diagnosis trees', 'spare parts sourcing', 'schematics & teardown guides', 'repair cafe scheduling', 'tool lending', 'right-to-repair info'],
  'circular economy': ['item reuse & swaps', 'material passports', 'waste sorting', 'repair vs replace math', 'carbon footprint of things', 'deposit and return schemes'],

  // pure software / data niches
  'open data': ['public datasets', 'API rate limits', 'data cleaning', 'civic dashboards', 'versioning & provenance', 'linking datasets together'],
  'accessibility audits': ['automated contrast checks', 'keyboard-only walkthroughs', 'ARIA mistakes', 'fixing priorities', 'regression tracking', 'user testing sessions'],
  'archives': ['digitizing old documents', 'OCR & handwriting', 'metadata and tagging', 'long-term file formats', 'duplicate detection', 'family and local history'],
  'genealogy': ['family trees', 'source citations', 'DNA match clusters', 'old records & handwriting', 'conflicting dates', 'sharing with relatives'],
  'cryptography': ['key management', 'encrypted backups', 'password-less logins', 'secure messaging', 'verifying downloads', 'threat models'],
  'time series': ['sensor ingestion', 'downsampling', 'anomaly detection', 'forecasting', 'gaps & clock drift', 'cheap long-term storage'],
  'geospatial': ['GPS tracks', 'map tiles offline', 'geofencing', 'elevation & terrain', 'coordinate systems', 'heat maps'],
  'automation': ['scheduled jobs', 'webhooks & triggers', 'no-code glue', 'failure notifications', 'retry & rollback', 'human-in-the-loop approvals'],
  'local-first software': ['works offline', 'sync & conflict merging', 'data you own', 'peer-to-peer sharing', 'end-to-end encryption', 'tiny self-hosted servers'],
  'generative audio': ['procedural soundscapes', 'reacting to sensors', 'MIDI & modular control', 'live-coded music', 'field recording libraries', 'adaptive game music'],
  'creative coding': ['shaders & visuals', 'LED matrices', 'plotter drawings', 'audio-reactive art', 'interactive installations', 'sharing sketches'],
  'tabletop games': ['campaign tracking', 'dice & rules lookup', 'map and token tools', 'scheduling a group', 'house-rule balancing', 'solo play helpers'],
  'puzzles & escape rooms': ['sensor-triggered clues', 'hint timing', 'reset automation', 'team progress display', 'props with microcontrollers', 'game master dashboards'],
}

export const AUDIENCE_ASPECTS = {
  // extreme environments
  'night-shift workers': ['sleeping through daylight', 'blackout rooms & noise', 'skipped meals', 'few services open', 'isolation from family', 'shifting body clocks'],
  'wildland firefighters': ['smoke and heat', 'weeks in the backcountry', 'radio-only communication', 'heavy packs', 'unpredictable winds', 'long fatigue shifts'],
  'deep-sea divers': ['limited bottom time', 'dive tables & gas planning', 'no signal underwater', 'low light and cold', 'equipment checks', 'logging dives'],
  'cave explorers': ['total darkness', 'no GPS or signal', 'tight and wet passages', 'rope and gear checks', 'surveying passages', 'call-out times for rescue'],
  'polar researchers': ['extreme cold', 'batteries dying fast', 'months of isolation', 'satellite-only internet', 'limited resupply', 'data that cannot be lost'],
  'offshore wind technicians': ['climbing in high winds', 'boat transfers', 'sea sickness', 'harness and safety rules', 'long rotations away', 'remote fault diagnosis'],
  'mountain guides': ['avalanche and weather risk', 'client safety decisions', 'pre-dawn starts', 'no cell coverage', 'gear for groups', 'changing conditions by the hour'],
  'sailors on long passages': ['weeks without land', 'tiny power budgets', 'watch schedules', 'salt and moisture', 'weather routing offline', 'fixing things at sea'],
  'desert rally drivers': ['dust and heat', 'paper roadbooks', 'navigating without maps', 'vehicle breakdowns', 'tight fuel stops', 'co-driver communication'],
  'bush pilots': ['unprepared airstrips', 'sudden weather', 'heavy loads and balance', 'remote refuel', 'daylight-only flying', 'long flights alone'],
  'storm chasers': ['fast-changing radar', 'dangerous roads', 'spotty data in rural zones', 'long drives', 'safe distance calls', 'documenting events'],
  'space-station analogue crews': ['sealed habitats', 'delayed communication', 'strict schedules', 'resource rationing', 'team conflicts', 'procedures for everything'],

  // trades & hands-busy workers
  'wet-handed bakers': ['flour and dough on hands', 'proofing timers', 'pre-dawn starts', 'scaling recipes', 'oven hot spots', 'selling out by noon'],
  'welders': ['bright arc and gloves', 'fumes and heat', 'heavy helmets', 'weld settings per material', 'job quotes', 'sparks near electronics'],
  'electricians': ['working in crawlspaces', 'safe isolation checklists', 'code compliance', 'testing and certificates', 'dark ceilings', 'one hand holding the torch'],
  'rooftop solar installers': ['heat on roofs', 'working at height', 'site surveys', 'weather windows', 'grid permits', 'commissioning checks'],
  'long-haul truckers': ['hours-of-service rules', 'no phone while driving', 'finding safe parking', 'irregular sleep', 'loading delays', 'weeks away from home'],
  'ambulance paramedics': ['seconds to act', 'gloved hands', 'moving vehicles', 'handover notes', 'night calls', 'emotional load'],
  'lab technicians': ['sterile gloves', 'sample tracking', 'timed incubations', 'calibration logs', 'cold storage', 'strict protocols'],
  'farm hands': ['early mornings', 'no signal in fields', 'muddy gear', 'animal health checks', 'seasonal peaks', 'machinery downtime'],
  'greenhouse growers': ['humidity and heat swings', 'daily climate checks', 'pest outbreaks', 'harvest timing', 'irrigation zones', 'labor at peak season'],
  'shepherds': ['remote pastures', 'predator risk', 'counting flocks', 'lambing nights', 'weather shelter', 'solar power only'],
  'beach lifeguards': ['sun and glare', 'watching crowds nonstop', 'tide and rip conditions', 'quick radio alerts', 'wet equipment', 'incident logs'],
  'sound engineers': ['dark venues', 'tight load-ins', 'fixing feedback live', 'cable chaos', 'noise exposure', 'recalling scene settings'],

  // routines, constraints & subcultures
  'ultra runners': ['100-mile nights', 'headlamp batteries', 'aid-station logistics', 'sleep deprivation', 'remote trails', 'pacing and fueling'],
  'bikepackers': ['multi-day routes offline', 'charging on the move', 'weight obsession', 'weather-proof gear', 'resupply planning', 'camp spots'],
  'van lifers': ['limited power and water', 'stealth parking', 'tiny space', 'variable internet', 'maintenance on the road', 'seasonal moves'],
  'live-aboard boaters': ['bilge and battery checks', 'tide-dependent plans', 'limited water', 'damp everywhere', 'marina fees', 'weather sensitivity'],
  'off-grid homesteaders': ['solar and battery limits', 'well water', 'rural slow internet', 'preserving food', 'DIY repairs', 'seasonal workload'],
  'urban beekeepers': ['rooftop hive access', 'neighbor worries', 'swarm season', 'inspections in veils', 'honey logistics', 'city regulations'],
  'amateur astronomers': ['nights in the cold', 'red-light only', 'clouds ruin plans', 'fragile optics', 'dew and batteries', 'remote dark sites'],
  'ham radio operators': ['contest weekends', 'antenna work outdoors', 'callsign logs', 'emergency drills', 'noisy bands', 'building their own gear'],
  'makers & tinkerers': ['half-finished projects', 'drawers of components', 'datasheet hunting', 'soldering at odd hours', 'sharing builds', 'limited workshop time'],
  'speedrunners': ['frame-perfect routes', 'timer splits', 'practice grinding', 'recording runs', 'tool-assisted comparisons', 'community leaderboards'],
  'sleep-shift parents': ['broken nights', 'one hand free', 'unpredictable naps', 'baby monitors', 'feeding logs', 'shared handoffs'],
  'deaf and hard-of-hearing people': ['visual alerts', 'captions everywhere', 'vibration cues', 'sign language video', 'noisy-room misses', 'phone calls that are hard'],
  'blind and low-vision people': ['screen readers', 'tactile labels', 'audio navigation', 'finding things at home', 'poor app contrast', 'independent travel'],
  'wheelchair users': ['step-free routes', 'broken lifts', 'reach limits', 'accessible venue info', 'transfer planning', 'battery range'],
  'people with chronic illness': ['symptom flares', 'fatigue budgeting', 'medication timing', 'many appointments', 'invisible limits', 'tracking triggers'],
  'long-term hospital patients': ['little privacy', 'hours of waiting', 'limited mobility', 'visiting hours', 'sleep interruptions', 'staying connected to home'],
  'night-owl coders': ['3 a.m. flow states', 'caffeine tracking', 'broken sleep schedules', 'side projects abandoned', 'noisy neighbors', 'meetings at dawn'],
}

export const CATEGORIES = Object.keys(CATEGORY_ASPECTS)
export const AUDIENCES = Object.keys(AUDIENCE_ASPECTS)
