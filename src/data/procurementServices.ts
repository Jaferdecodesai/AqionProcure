import { ServiceCategory } from '../types';

export const procurementServiceCategories: ServiceCategory[] = [
  {
    "id": "electrical-power",
    "title": "Electrical & Power",
    "icon": "Zap",
    "serviceCount": 4,
    "description": "Comprehensive electrical installations, distribution boards, lighting circuits, and DEWA/DM testing.",
    "services": [
      {
        "id": "elec-install-wiring",
        "name": "Electrical Installation & Wiring",
        "category": "Electrical & Power",
        "description": "New circuits, rewiring and dedicated supplies for heavy equipment. Cable sizing and load calculations done properly.",
        "scopeItems": [
          "Main and sub-main cable pulling (XLPE/SWA/LSF)",
          "Dedicated 3-phase and single-phase supplies for chillers, pumps, machinery",
          "Full villa and commercial unit rewiring with conduit embedding",
          "Cable sizing, voltage drop and short circuit calculations per DEWA regulations",
          "Containment installation (GI trunking, cable tray, basket and conduits)"
        ],
        "unitOfMeasure": "Per Point / Linear Metre",
        "typicalUaeRateMinAed": 85,
        "typicalUaeRateMaxAed": 160,
        "requiredTradeCertifications": [
          "DEWA Wireman License",
          "Diploma in Electrical Eng.",
          "BS 7671 IET"
        ],
        "authorityApprovals": [
          "DEWA NOC",
          "Dubai Municipality",
          "SEWA (Sharjah)"
        ],
        "slaTurnaroundHours": 24,
        "manpowerProfileNeeded": "Licensed Electricians & Wiremen"
      },
      {
        "id": "db-works",
        "name": "Distribution Board Works",
        "category": "Electrical & Power",
        "description": "New boards, upgrades, breaker changes, load balancing across phases, correct labelling and schedules.",
        "scopeItems": [
          "Main Distribution Board (MDB) & Sub-Main (SMDB) assembly and replacement",
          "MCB/MCCB breaker retrofits, RCCB/RCBO earth leakage sensitivity upgrades",
          "3-Phase load balancing and thermal imaging diagnostics",
          "Busbar chamber modifications and phase identification",
          "Up-to-date circuit directories, directory charts and warning hazard labelling"
        ],
        "unitOfMeasure": "Per DB Unit",
        "typicalUaeRateMinAed": 450,
        "typicalUaeRateMaxAed": 2200,
        "requiredTradeCertifications": [
          "DEWA Master Electrician",
          "Switchgear Specialist"
        ],
        "authorityApprovals": [
          "DEWA Inspection Approved",
          "ADDC Compliance"
        ],
        "slaTurnaroundHours": 12,
        "manpowerProfileNeeded": "DB Switchgear Specialist & Senior Electrician"
      },
      {
        "id": "lighting-installation",
        "name": "Lighting Installation",
        "category": "Electrical & Power",
        "description": "Indoor, outdoor and landscape lighting. LED upgrades, dimming and controls.",
        "scopeItems": [
          "Architectural magnetic track, recessed downlights, cove LED strips (IP65/IP68)",
          "Landscape bollard, spike, facade uplighting and water feature illuminations",
          "DALI, 0-10V, Phase cut dimming modules and driver enclosures",
          "LED retrofits for energy reduction (ESCO compliant)",
          "Emergency lighting and exit signage with battery backup autonomy testing"
        ],
        "unitOfMeasure": "Per Fixture / Set",
        "typicalUaeRateMinAed": 45,
        "typicalUaeRateMaxAed": 180,
        "requiredTradeCertifications": [
          "Lighting Control Tech",
          "Certified Electrician"
        ],
        "authorityApprovals": [
          "Dubai Civil Defence (Emergency lights)"
        ],
        "slaTurnaroundHours": 24,
        "manpowerProfileNeeded": "Lighting Installation Electrician"
      },
      {
        "id": "testing-certification",
        "name": "Testing & Certification",
        "category": "Electrical & Power",
        "description": "Insulation resistance, earth continuity, loop impedance and RCD testing, with written results you can keep.",
        "scopeItems": [
          "500V/1000V Megger insulation resistance testing on all sub-circuits",
          "Earth pit resistance testing (target < 1.0 Ohm) and continuity verification",
          "Earth fault loop impedance (Zs/Ze) measurement and prospective fault current (PFC)",
          "RCD tripping time and current ramp testing (10mA / 30mA / 100mA / 300mA)",
          "Comprehensive Periodic Inspection Report (PIR) signed by certified DEWA engineer"
        ],
        "unitOfMeasure": "Per Report / Installation",
        "typicalUaeRateMinAed": 650,
        "typicalUaeRateMaxAed": 3500,
        "requiredTradeCertifications": [
          "DEWA Approved Testing Engineer",
          "NICEIC / City & Guilds 2391 equivalent"
        ],
        "authorityApprovals": [
          "DEWA Completion Certificate",
          "Trakhees Approval"
        ],
        "slaTurnaroundHours": 24,
        "manpowerProfileNeeded": "QA/QC Electrical Testing Engineer"
      }
    ]
  },
  {
    "id": "plumbing-drainage",
    "title": "Plumbing & Drainage",
    "icon": "Droplets",
    "serviceCount": 4,
    "description": "Potable water piping, commercial drainage, sanitary fitting installation, and acoustic leak detection.",
    "services": [
      {
        "id": "water-supply-installation",
        "name": "Water Supply Installation",
        "category": "Plumbing & Drainage",
        "description": "Cold and hot water pipework, valves, filters and pressure systems using potable-approved materials.",
        "scopeItems": [
          "PPR, PEX-a, Copper and multilayer composite pipework networks",
          "Booster pump sets, variable frequency drives (VFD) and pressure vessel installation",
          "Central solar and electric water heater manifolds with return circulation loops",
          "Whole-building cartridge, sand and UV water filtration systems",
          "Hydrostatic pressure testing at 1.5x working pressure with digital gauge log"
        ],
        "unitOfMeasure": "Per Point / System",
        "typicalUaeRateMinAed": 95,
        "typicalUaeRateMaxAed": 220,
        "requiredTradeCertifications": [
          "ITI Plumber",
          "PPR Welding Certified"
        ],
        "authorityApprovals": [
          "Dubai Municipality Water Approval",
          "WRAS compliant"
        ],
        "slaTurnaroundHours": 24,
        "manpowerProfileNeeded": "Certified Plumbers & Pipe Fitters"
      },
      {
        "id": "drainage-waste-systems",
        "name": "Drainage & Waste Systems",
        "category": "Plumbing & Drainage",
        "description": "HDPE and uPVC waste, traps and floor drains, including F&B specification work for commercial kitchens.",
        "scopeItems": [
          "Electrofusion welded HDPE soil and waste discharge stacks per EN 1519",
          "Solvent-weld uPVC drainage runs with anti-siphon air admittance valves",
          "Stainless steel 304/316 channel drains, gullies and kitchen floor drains",
          "Commercial grease interceptor (grease trap) integration with sampling chambers",
          "Smoke and air leak testing for foul odour elimination"
        ],
        "unitOfMeasure": "Per Linear Metre / Point",
        "typicalUaeRateMinAed": 110,
        "typicalUaeRateMaxAed": 280,
        "requiredTradeCertifications": [
          "HDPE Butt-Fusion / Electrofusion Welder",
          "Commercial Drainage Tech"
        ],
        "authorityApprovals": [
          "DM Drainage Section NOC",
          "Food Control Approval (F&B)"
        ],
        "slaTurnaroundHours": 24,
        "manpowerProfileNeeded": "Specialized Drainage Plumbers"
      },
      {
        "id": "sanitaryware-mixers",
        "name": "Taps, Mixers & Sanitaryware",
        "category": "Plumbing & Drainage",
        "description": "Supply and installation of taps, mixers, showers, WCs, basins and water heaters. Replacing worn or leaking fittings and re-piping where needed.",
        "scopeItems": [
          "Concealed cisterns (Geberit, Grohe) and wall-hung WC pan mounting frames",
          "Thermostatic shower valves, rain showers, freestanding bath mixers and diverters",
          "Vanity basins, under-mount sinks, sensor taps and touchless hygiene fittings",
          "Instantaneous and storage water heater replacement with safety pressure relief valves",
          "Silicone sealing, isolator valve replacement and flow rate balancing"
        ],
        "unitOfMeasure": "Per Fixture",
        "typicalUaeRateMinAed": 120,
        "typicalUaeRateMaxAed": 450,
        "requiredTradeCertifications": [
          "Sanitaryware Technician",
          "Plumber"
        ],
        "authorityApprovals": [
          "Dubai Estidama Water Saver Compliance"
        ],
        "slaTurnaroundHours": 12,
        "manpowerProfileNeeded": "Finishing Plumbers"
      },
      {
        "id": "leak-detection-repair",
        "name": "Leak Detection & Repair",
        "category": "Plumbing & Drainage",
        "description": "Tracing hidden leaks, repairing the cause, and making the finishes good afterwards.",
        "scopeItems": [
          "Acoustic frequency leak tracing and ultrasonic pipe listening",
          "FLIR thermal imaging camera inspections behind tiles, ceilings and underground",
          "Helium/nitrogen tracer gas pressure testing for micro-leaks",
          "Targeted non-destructive breakout and localized pipe repair / clamp replacement",
          "Substrate drying, plastering, waterproofing membrane reinstatement and tile matching"
        ],
        "unitOfMeasure": "Per Investigation / Repair",
        "typicalUaeRateMinAed": 450,
        "typicalUaeRateMaxAed": 1800,
        "requiredTradeCertifications": [
          "Non-Destructive Testing (NDT) Tech",
          "Senior Plumber"
        ],
        "authorityApprovals": [
          "Insurance Approved Report Format"
        ],
        "slaTurnaroundHours": 6,
        "manpowerProfileNeeded": "Leak Detection Specialist & Making-Good Mason"
      }
    ]
  },
  {
    "id": "ac-ventilation",
    "title": "Air Conditioning & Ventilation",
    "icon": "Wind",
    "serviceCount": 2,
    "description": "HVAC systems, ducted/split/VRF servicing, kitchen ecology units, and ventilation balancing.",
    "services": [
      {
        "id": "air-conditioning",
        "name": "Air Conditioning",
        "category": "Air Conditioning & Ventilation",
        "description": "Supply, installation, servicing and repair of split, ducted and VRF systems.",
        "scopeItems": [
          "VRV/VRF multi-split systems (Daikin, Mitsubishi Electric, O-General, Carrier)",
          "Ducted split indoor FCU suspended installation with vibration isolators and drain pans",
          "Refrigerant piping (copper R410A/R32) brazing with nitrogen purging, vacuuming (<500 microns)",
          "Compressor replacements, inverter PCB troubleshooting, coil acid wash and chemical decontamination",
          "Thermostat upgrades (Nest, Ecobee, CoolAutomation BMS gateways)"
        ],
        "unitOfMeasure": "Per Unit / Ton of Refrigeration",
        "typicalUaeRateMinAed": 350,
        "typicalUaeRateMaxAed": 1500,
        "requiredTradeCertifications": [
          "HVAC Technician Diploma",
          "Refrigerant Handling Certified (EPA/UAE)"
        ],
        "authorityApprovals": [
          "DEWA HVAC Load Approval",
          "Dubai Municipality"
        ],
        "slaTurnaroundHours": 12,
        "manpowerProfileNeeded": "HVAC Chiller/VRF Technicians"
      },
      {
        "id": "kitchen-extract-ventilation",
        "name": "Kitchen & Extract Ventilation",
        "category": "Air Conditioning & Ventilation",
        "description": "Extract hoods, ducting, fans and air balancing for kitchens and plant rooms.",
        "scopeItems": [
          "Stainless steel 304 extract canopy hoods with baffle filters and UV odour control",
          "GI fire-rated ductwork fabrication (DW144 / SMACNA standards) with access doors",
          "Inline centrifugal exhaust blowers and roof-mounted extract fans",
          "Kitchen ecology units (ESP electrostatic precipitators + carbon filters)",
          "Airflow velocity measurement, anemometer CFM logging and static pressure balancing"
        ],
        "unitOfMeasure": "Per System / Linear Metre",
        "typicalUaeRateMinAed": 850,
        "typicalUaeRateMaxAed": 4800,
        "requiredTradeCertifications": [
          "Duct Fabricator",
          "Ventilation Balancing Tech"
        ],
        "authorityApprovals": [
          "Dubai Civil Defence Fire Dampers",
          "DM Environmental NOC"
        ],
        "slaTurnaroundHours": 24,
        "manpowerProfileNeeded": "Duct Fabricators & Ventilation Techs"
      }
    ]
  },
  {
    "id": "smart-home-automation",
    "title": "Smart Home & Automation",
    "icon": "Home",
    "serviceCount": 5,
    "description": "Intelligent living automation, motorized shading, access control, and environmental telemetry.",
    "services": [
      {
        "id": "home-automation",
        "name": "Home Automation",
        "category": "Smart Home & Automation",
        "description": "Lighting, climate, curtains and access controlled from your phone or a wall panel. We can integrate with what you already have.",
        "scopeItems": [
          "KNX, Control4, Crestron, Lutron and Zigbee 3.0/Matter multi-protocol integration",
          "Centralized automation rack wiring, DIN-rail relay and 0-10V dimmer actuators",
          "Custom touchscreen wall panel installation and iPad in-wall mount configuration",
          "Mobile app scene programming (Away, Welcome, Night, Entertainment modes)",
          "BMS gateway linking VRF AC, lighting, and audio-video sub-systems"
        ],
        "unitOfMeasure": "Per Room / Project Setup",
        "typicalUaeRateMinAed": 1200,
        "typicalUaeRateMaxAed": 8500,
        "requiredTradeCertifications": [
          "KNX Certified Partner",
          "Control4 / Crestron Programmer"
        ],
        "authorityApprovals": [
          "TDRA UAE Wireless Compliance"
        ],
        "slaTurnaroundHours": 24,
        "manpowerProfileNeeded": "Smart Home Automation Engineers & ELV Techs"
      },
      {
        "id": "automatic-curtains-blinds",
        "name": "Automatic Curtains & Blinds",
        "category": "Smart Home & Automation",
        "description": "Motorised tracks with remote, app or scheduled control. Quiet operation, tidy cabling, linked to your automation system.",
        "scopeItems": [
          "Somfy / Dooya / Tuya ultra-quiet AC and DC motorized curtain tracks",
          "Custom track bending for bay windows and double-height ceiling voids",
          "Concealed power cabling into pelmets and ceiling pockets",
          "Dual roller blinds (blackout + sheer) with synchronized wireless remotes",
          "Sun-tracking and astronomical clock automated closing schedules"
        ],
        "unitOfMeasure": "Per Window / Linear Metre",
        "typicalUaeRateMinAed": 280,
        "typicalUaeRateMaxAed": 950,
        "requiredTradeCertifications": [
          "Somfy Certified Installer",
          "Fit-out Specialist"
        ],
        "authorityApprovals": [
          "CE / UAE Standard Conformity"
        ],
        "slaTurnaroundHours": 24,
        "manpowerProfileNeeded": "Motorized Track Installers"
      },
      {
        "id": "automatic-garage-doors",
        "name": "Automatic Garage Doors",
        "category": "Smart Home & Automation",
        "description": "Motorised doors with safety sensors that stop on obstruction. Remote, keypad and phone access.",
        "scopeItems": [
          "Overhead sectional, roller shutter and cantilever sliding gate operators (BFT, Came, Somfy)",
          "Safety infrared photocell beam installation for zero-impact pinch prevention",
          "Emergency battery backup units (UPS) and manual clutch override mechanisms",
          "Wireless digital keypads, long-range RFID tag readers and smartphone triggers",
          "Torsion spring balancing and track alignment"
        ],
        "unitOfMeasure": "Per Door Unit",
        "typicalUaeRateMinAed": 950,
        "typicalUaeRateMaxAed": 3600,
        "requiredTradeCertifications": [
          "Electro-Mechanical Gate Technician"
        ],
        "authorityApprovals": [
          "Dubai Municipality Safety Compliant"
        ],
        "slaTurnaroundHours": 24,
        "manpowerProfileNeeded": "Garage Door & Gate Technicians"
      },
      {
        "id": "door-window-sensors",
        "name": "Door & Window Sensors",
        "category": "Smart Home & Automation",
        "description": "Magnetic contacts that tell you the moment a door or window opens. Alerts straight to your phone, and can trigger lights or alarms.",
        "scopeItems": [
          "Concealed recessed reed magnetic contacts for wooden and aluminium profiles",
          "Ultra-low latency Zigbee/Z-Wave/Hardwired dry-contact sensors",
          "Automated AC shut-off triggers upon patio door opening (Energy saver)",
          "Instant push notifications and chime broadcast on perimeter breach",
          "Tamper-proof casing and multi-year battery telemetry monitoring"
        ],
        "unitOfMeasure": "Per Sensor Point",
        "typicalUaeRateMinAed": 85,
        "typicalUaeRateMaxAed": 240,
        "requiredTradeCertifications": [
          "ELV Security Technician"
        ],
        "authorityApprovals": [
          "SIRA Compliant Hardware"
        ],
        "slaTurnaroundHours": 12,
        "manpowerProfileNeeded": "ELV Technician"
      },
      {
        "id": "house-control-sensors",
        "name": "House Control Sensors",
        "category": "Smart Home & Automation",
        "description": "Motion, presence, temperature, humidity, water leak and smoke sensors. Lights that come on as you walk in, and a warning before a small problem becomes a big one.",
        "scopeItems": [
          "mmWave radar true human presence sensors (no false timeouts when sitting)",
          "Sub-floor and riser water flood probes with automated motorized main valve shutoff",
          "Precision VOC, CO2, PM2.5 air quality transmitters tied to ventilation booster fans",
          "Ambient lux light sensors for dynamic day-harvesting light dimming",
          "Multi-zone temperature & humidity telemetry logging with threshold warnings"
        ],
        "unitOfMeasure": "Per Sensor Point",
        "typicalUaeRateMinAed": 120,
        "typicalUaeRateMaxAed": 380,
        "requiredTradeCertifications": [
          "Sensor Integration Tech",
          "Instrumentation Tech"
        ],
        "authorityApprovals": [
          "UAE TDRA Certified Sensors"
        ],
        "slaTurnaroundHours": 12,
        "manpowerProfileNeeded": "Instrumentation & ELV Technician"
      }
    ]
  },
  {
    "id": "security-access",
    "title": "Security & Access",
    "icon": "ShieldCheck",
    "serviceCount": 2,
    "description": "SIRA compliant CCTV networks, access control biometric terminals, and video door entry systems.",
    "services": [
      {
        "id": "cctv-cameras",
        "name": "CCTV Cameras",
        "category": "Security & Access",
        "description": "Indoor and outdoor cameras with night vision and recording. Watch live on your phone from anywhere. We handle cabling, mounting, recorder and setup.",
        "scopeItems": [
          "4K Ultra HD IP turret, dome and PTZ optical zoom cameras (Hikvision, Dahua, Axis)",
          "Structured Cat6 UTP/STP cabling, patch panel termination and PoE Gigabit switches",
          "Network Video Recorder (NVR) sizing (SIRA 31-day recording retention compliance)",
          "AI human/vehicle perimeter detection, tripwire zones and ColorVu 24/7 night vision",
          "Secure cloud P2P mobile viewing configuration and on-premise monitoring workstation"
        ],
        "unitOfMeasure": "Per Camera Point",
        "typicalUaeRateMinAed": 220,
        "typicalUaeRateMaxAed": 650,
        "requiredTradeCertifications": [
          "SIRA Security Engineer / Technician (Dubai)",
          "ADMCC Approved (Abu Dhabi)"
        ],
        "authorityApprovals": [
          "SIRA Audit Approved",
          "Dubai Police NOC"
        ],
        "slaTurnaroundHours": 24,
        "manpowerProfileNeeded": "SIRA Certified CCTV Technicians"
      },
      {
        "id": "access-control-intercom",
        "name": "Access Control & Intercom",
        "category": "Security & Access",
        "description": "Video intercom, keypad and card entry, and gate automation.",
        "scopeItems": [
          "IP Video door intercom with touchscreen indoor monitors and mobile app answering (2N, Akuvox, Hikvision)",
          "Biometric facial recognition, RFID MIFARE card and PIN access terminals",
          "Magnetic shear locks (1200 lbs) and electric strikes with emergency break-glass units",
          "Pedestrian turnstiles, speed gates and automatic sliding glass doors",
          "Centralized time-attendance software configuration and visitor log auditing"
        ],
        "unitOfMeasure": "Per Door / Access Point",
        "typicalUaeRateMinAed": 450,
        "typicalUaeRateMaxAed": 1900,
        "requiredTradeCertifications": [
          "SIRA Access Control Tech",
          "ELV Commissioning Tech"
        ],
        "authorityApprovals": [
          "SIRA Certified Installation",
          "Civil Defence Fail-Safe Integration"
        ],
        "slaTurnaroundHours": 24,
        "manpowerProfileNeeded": "Access Control & Intercom Specialist"
      }
    ]
  },
  {
    "id": "specialist-equipment",
    "title": "Specialist Equipment Installation",
    "icon": "Cpu",
    "serviceCount": 2,
    "description": "Imported wellness plant, cryotherapy, saunas, and commercial kitchen catering equipment.",
    "services": [
      {
        "id": "imported-specialist-equipment",
        "name": "Imported & Specialist Equipment",
        "category": "Specialist Equipment Installation",
        "description": "Assembly, hardwiring, testing and commissioning of equipment that arrives without an installation team. Wellness and therapy chambers, saunas, gym plant.",
        "scopeItems": [
          "Hyperbaric oxygen chambers (HBOT), cryo-cabins and sensory floatation pods",
          "Finnish sauna stoves, steam bath generators and infrared wellness cabins",
          "Commercial fitness machine multi-station assembly, cable calibration and anchoring",
          "Custom step-up/step-down transformers, 50Hz/60Hz frequency converters and power stabilizers",
          "Manufacturer commissioning checklist sign-off and warranty protection logs"
        ],
        "unitOfMeasure": "Per Plant / Machine Setup",
        "typicalUaeRateMinAed": 1200,
        "typicalUaeRateMaxAed": 6500,
        "requiredTradeCertifications": [
          "Electro-Mechanical Specialist",
          "Specialized Plant Tech"
        ],
        "authorityApprovals": [
          "Dubai Municipality Health & Safety",
          "Factory Commissioning Signoff"
        ],
        "slaTurnaroundHours": 48,
        "manpowerProfileNeeded": "Senior Electro-Mechanical Fitters"
      },
      {
        "id": "commercial-kitchen-equipment",
        "name": "Commercial Kitchen Equipment",
        "category": "Specialist Equipment Installation",
        "description": "Positioning and connection of water, drainage and power to catering equipment, to F&B specification.",
        "scopeItems": [
          "Combi steamers (Rational, Convotherm), heavy-duty gas ranges and induction bratt pans",
          "Commercial conveyor dishwashers with water softener and chemical dosing integration",
          "Walk-in cold rooms and blast freezers with remote condensing unit pipework",
          "Gas leak detection interlock systems and automated solenoid gas shut-off valves",
          "Stainless steel worktables, salamanders, fryers and grease trap hard-plumbing"
        ],
        "unitOfMeasure": "Per Station / Appliance",
        "typicalUaeRateMinAed": 350,
        "typicalUaeRateMaxAed": 1800,
        "requiredTradeCertifications": [
          "F&B Kitchen Equipment Tech",
          "Gas Safe / LPG Certified"
        ],
        "authorityApprovals": [
          "Dubai Municipality Food Safety NOC",
          "Civil Defence LPG Approval"
        ],
        "slaTurnaroundHours": 24,
        "manpowerProfileNeeded": "Commercial Kitchen Technicians & Plumbers"
      }
    ]
  },
  {
    "id": "ceilings-finishes-fitout",
    "title": "Ceilings, Finishes & Fit-Out",
    "icon": "Layers",
    "serviceCount": 3,
    "description": "Architectural gypsum partitions, seamless epoxy floors, core drilling, and builder reinstatement.",
    "services": [
      {
        "id": "gypsum-ceilings-partitions",
        "name": "Gypsum Ceilings & Partitions",
        "category": "Ceilings, Finishes & Fit-Out",
        "description": "Suspended ceilings, bulkheads, coves and partition walls. We cut in for lights, AC grilles and speakers, then tape, skim and paint to a finished surface.",
        "scopeItems": [
          "GI metal stud framing (50mm/70mm/100mm) and resilient acoustic channels",
          "Moisture resistant (green) and fire rated (pink) gypsum board fixing",
          "Precision shadow gaps, stepped pelmets, linear slot diffuser cut-outs and access panels",
          "Joint paper taping, 3-coat compound skimming, sanding and touch-up primer",
          "Topcoat spray and roller emulsion painting to flawless Level 5 finish"
        ],
        "unitOfMeasure": "Per Square Metre (sqm)",
        "typicalUaeRateMinAed": 55,
        "typicalUaeRateMaxAed": 135,
        "requiredTradeCertifications": [
          "Gypsum Carpenter / Board Fixer",
          "Painter / Finisher"
        ],
        "authorityApprovals": [
          "Civil Defence Fire-Rated Partition Test"
        ],
        "slaTurnaroundHours": 48,
        "manpowerProfileNeeded": "Gypsum Carpenters & Finishing Painters"
      },
      {
        "id": "epoxy-resin-flooring",
        "name": "Epoxy Resin Flooring",
        "category": "Ceilings, Finishes & Fit-Out",
        "description": "Seamless resin floors for garages, kitchens, plant rooms and terraces. Hard wearing, chemical and slip resistant, easy to clean.",
        "scopeItems": [
          "Mechanical diamond grinding, vacuum shot blasting and moisture vapor testing",
          "High-penetration epoxy primer and crack stitching with epoxy mortar",
          "Self-leveling 2-part and 3-part polyurethane/epoxy body coats (2mm to 4mm)",
          "Quartz broadcast anti-slip broadcast coatings for plant rooms and wash bays",
          "UV-stable aliphatic polyurethane topcoat and chemical resistant sealing"
        ],
        "unitOfMeasure": "Per Square Metre (sqm)",
        "typicalUaeRateMinAed": 65,
        "typicalUaeRateMaxAed": 190,
        "requiredTradeCertifications": [
          "Certified Epoxy Applicator",
          "Flooring Specialist"
        ],
        "authorityApprovals": [
          "HACCP Approved (F&B / Kitchens)"
        ],
        "slaTurnaroundHours": 48,
        "manpowerProfileNeeded": "Epoxy Flooring Technicians"
      },
      {
        "id": "builders-work-making-good",
        "name": "Builders Work & Making Good",
        "category": "Ceilings, Finishes & Fit-Out",
        "description": "Core drilling, penetrations, fire-stopping, joinery adjustment and reinstatement of finishes.",
        "scopeItems": [
          "Diamond core drilling (25mm to 300mm dia) through reinforced concrete slabs and walls",
          "Intumescent fire-stopping, fire wraps, collars and acoustic mastic sealing per Civil Defence",
          "Wall chasing, lintel insertions and masonry breakout for MEP services",
          "Floor screed repair, tile cutting, grouting and seamless junction matching",
          "Joinery trimming, architectural architrave reinstatement and sealant caulking"
        ],
        "unitOfMeasure": "Per Core / Location",
        "typicalUaeRateMinAed": 150,
        "typicalUaeRateMaxAed": 750,
        "requiredTradeCertifications": [
          "Core Drilling Operator",
          "Civil Defence Approved Fire-stopping Tech"
        ],
        "authorityApprovals": [
          "Dubai Civil Defence Firestopping Compliance"
        ],
        "slaTurnaroundHours": 24,
        "manpowerProfileNeeded": "Core Drillers, Masons & Joiners"
      }
    ]
  },
  {
    "id": "documentation-support",
    "title": "Documentation & Support",
    "icon": "FileText",
    "serviceCount": 3,
    "description": "Engineering shop drawings, consultant material approval requests, PPM maintenance, and skilled manpower supply.",
    "services": [
      {
        "id": "shop-drawings-submittals",
        "name": "Shop Drawings & Submittals",
        "category": "Documentation & Support",
        "description": "Installation drawings, material approval requests and method statements prepared for consultant and authority approval.",
        "scopeItems": [
          "AutoCAD 2D and Revit BIM 3D MEP coordinated shop drawings and clash detection",
          "Material Approval Requests (MAR) with manufacturer datasheets, test certs and compliance sheets",
          "Method Statement for Installation (MSI) and Inspection & Test Plans (ITP)",
          "As-Built drawing redline updates and Operation & Maintenance (O&M) manuals",
          "Authority submission packages for DEWA, DM, SEWA, Civil Defence"
        ],
        "unitOfMeasure": "Per Sheet / Package",
        "typicalUaeRateMinAed": 450,
        "typicalUaeRateMaxAed": 3200,
        "requiredTradeCertifications": [
          "BSc Mechanical/Electrical Engineering",
          "Autodesk Certified Professional"
        ],
        "authorityApprovals": [
          "Consultant Approved Format"
        ],
        "slaTurnaroundHours": 48,
        "manpowerProfileNeeded": "MEP Draftsmen & QA/QC Engineers"
      },
      {
        "id": "maintenance-contracts",
        "name": "Maintenance Contracts",
        "category": "Documentation & Support",
        "description": "Scheduled preventive maintenance for villas and commercial premises, with call-out cover.",
        "scopeItems": [
          "Quarterly and bi-monthly Scheduled Preventive Maintenance (PPM) visits",
          "24/7 365-day emergency callout support with guaranteed 90-minute SLA response in UAE",
          "Comprehensive MEP health checks: AC filter/gas/drain, electrical thermal scan, plumbing pressure",
          "Consumables replacement, pump lubrication, damper cycling and sensor calibrations",
          "Digital portal maintenance logs, asset tagging and condition tracking"
        ],
        "unitOfMeasure": "Annual Contract (AMC)",
        "typicalUaeRateMinAed": 2500,
        "typicalUaeRateMaxAed": 28000,
        "requiredTradeCertifications": [
          "Certified FM Engineer",
          "Multi-skilled MEP Technicians"
        ],
        "authorityApprovals": [
          "ISO 9001/41001 FM Standards"
        ],
        "slaTurnaroundHours": 2,
        "manpowerProfileNeeded": "Multi-skilled Facility Maintenance Technicians"
      },
      {
        "id": "manpower-supply-requirement",
        "name": "Manpower Supply requirement",
        "category": "Documentation & Support",
        "description": "Skilled technicians and helpers supplied daily, monthly or by project.",
        "scopeItems": [
          "Skilled tradesmen: Licensed Electricians, Plumbers, HVAC Techs, Gypsum Fixers, ELV Techs",
          "Semi-skilled and general construction helpers for site support and material handling",
          "Flexible mobilization: Daily hire (8h/10h), monthly deputation, or lump-sum project subcontracting",
          "All personnel compliant with UAE Labor Law, Workmen's Compensation, Medical & EID",
          "Dedicated site supervisors, daily timesheet tracking and replacement guarantee within 24 hours"
        ],
        "unitOfMeasure": "Per Man-Hour / Per Month",
        "typicalUaeRateMinAed": 18,
        "typicalUaeRateMaxAed": 42,
        "requiredTradeCertifications": [
          "MOHRE Work Permits",
          "Trade Test Passed"
        ],
        "authorityApprovals": [
          "Ministry of Human Resources & Emiratisation (MOHRE)"
        ],
        "slaTurnaroundHours": 24,
        "manpowerProfileNeeded": "Full Trade Roster (Electrician, Plumber, HVAC, ELV, Mason, Helper)"
      }
    ]
  }
];
