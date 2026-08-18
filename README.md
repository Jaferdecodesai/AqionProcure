# AqionProcure 🇦🇪 🇮🇳
> **UAE Tender & RFQ Sourcing Intelligence & Indian (Kerala) Manpower Radar**

AqionProcure is a modern procurement intelligence web application portal dedicated to UAE MEP, Fit-out, and facilities procurement teams. It indexes and aggregates live requirement postings and RFQs across UAE developer, government, and commercial portals, coupled with an overseas manpower sourcing engine targeting Indian and Kerala recruitment agencies and technician candidate pools.

---

## 🌟 Key Capabilities

### 1. 📋 UAE Tenders & RFQs Feed (25+ Live Postings)
Aggregates live procurement requests from top UAE gateways (Tejari, Etisalat e& e-Procurement, Wasl Properties, Dubai Municipality, DEWA, Dubizzle Pro Requests, Abu Dhabi ERP, DAMAC, Nakheel, YellowPages.ae) across **8 core domains & 23 specialized sub-services**:
* **⚡ Electrical & Power**: Electrical Installation & Wiring, Distribution Board Works, Lighting Installation, Testing & Certification (PIR).
* **💧 Plumbing & Drainage**: Water Supply Installation, Drainage & Waste Systems, Taps/Mixers/Sanitaryware, Leak Detection & Repair.
* **❄️ Air Conditioning & Ventilation**: VRF/Split/Ducted AC Installation & Chemical Servicing, Kitchen & Extract Ventilation.
* **🏠 Smart Home & Automation**: Whole-Home Automation (KNX/Control4), Motorised Curtains & Blinds, Automatic Garage Doors, Door & Window Sensors, House Control Sensors.
* **🛡️ Security & Access**: SIRA-Compliant CCTV Systems, Biometric Access Control & Video Intercom.
* **⚙️ Specialist Equipment Installation**: Imported & Therapy Equipment (HBOT, Saunas), Commercial Kitchen Equipment (Rational, Cold Rooms).
* **🏗️ Ceilings, Finishes & Fit-Out**: Fire-Rated Gypsum Ceilings & Partitions, Industrial Epoxy Resin Flooring, Builders Work & Making Good.
* **📄 Documentation & Support**: BIM Coordinated Shop Drawings & Submittals, Annual Preventive Maintenance Contracts (AMC), Manpower Supply Deputations.

**Features**:
* **1-Click WhatsApp Bid Submission**: Pre-formatted proposal dispatch directly to the client's procurement contact.
* **BoQ Specs & RFP Brief Viewer**: Full technical scope, material approvals (DEWA, Civil Defence, DM, SIRA), and JSON/Print export.
* **Timeline Urgency Badges**: Countdown days, Emergency 24h callouts, and L1 bid benchmarks.

---

### 2. 👷 Manpower Data (India / Kerala Overseas Recruitment Radar)
* **MEA / eMigrate Registered Agencies Directory**: Comprehensive directory across Kerala districts (Ernakulam, Kozhikode, Malappuram, Thiruvananthapuram, Thrissur, Kannur, Palakkad, Kollam) and Indian metro hubs.
* **Facebook Ads & Comments Lead Miner**: Extracted candidate mobile numbers, trades, Gulf experience, passport readiness (ECNR/ECR), and expected AED salaries from social media recruitment posts.
* **Overseas Technician Candidate Pool**: Verified profiles of electricians, plumbers, HVAC technicians, ELV specialists, and MEP supervisors.
* **Scraper Engine Hub**: Simulated live crawler console with real-time logs and bulk CSV export.

---

### 3. 🎨 UI / UX Pro Max Design
* **Enterprise Left Sidebar**: Sleek navigation with real-time UAE (GST) & India (IST) clocks, instant domain filters, and live stats.
* **Aesthetic Light Theme**: Built with Tailwind CSS, soft card shadows, high-contrast slate typography, and warm gold/amber accents.
* **Responsive Layout**: Desktop sidebar and mobile drawer with touch-friendly controls.

---

## 🛠️ Tech Stack

* **Framework**: [Next.js 14 (App Router)](https://nextjs.org/)
* **Language**: TypeScript
* **Styling**: Tailwind CSS, PostCSS, Lucide Icons
* **Port**: Runs on Port `3007` by default

---

## 🚀 Getting Started

### 1. Clone & Install Dependencies
```bash
git clone https://github.com/jafernazeer/AqionProcure.git
cd AqionProcure
npm install
```

### 2. Run the Development Server
```bash
npm run dev -- -p 3007
```

### 3. Build & Run Production
```bash
npm run build
npm run start -- -p 3007
```

Open [http://localhost:3007](http://localhost:3007) in your browser.

---

## 📡 API Endpoints

* `GET /api/scrape?target=all` - Fetches all UAE tenders, Kerala agencies, FB leads, and technicians.
* `GET /api/scrape?target=tenders&domain=Electrical` - Filters tenders by domain or region.
* `POST /api/scrape` - Triggers a live crawler query against UAE portals and recruitment feeds.

---

## 📄 License
MIT License. Created for UAE Procurement & Engineering teams.
