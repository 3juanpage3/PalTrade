# PalTrade Overlay - Visual Quick Guide

## 🎮 What It Looks Like (ASCII Preview)

### Overlay Floating Button

```
┌─────────────────┐
│  PALWORLD Game  │
│                 │
│                 │
│                 │
│      [Game]     │
│                 │
│                 │
│              🔲  ← Floating Button
└─────────────────┘
```

### Floating Button Expanded

```
┌─────────────────┐
│  PALWORLD Game  │ ┌──────────────────────┐
│                 │ │ ┌─ Quick List Pal    │
│                 │ │ ┌─ My Listings       │
│                 │ │ ┌─ Notifications ① │
│      [Game]     │ │                      │
│                 │ │                      │
│                 │ └──────────────────────┘
│                 │         🔲 Menu Closed
│                 │
└─────────────────┘
```

### Quick List Modal

```
┌─────────────────────────────────────────┐
│ PALWORLD Game                           │
│                                         │
│        ╔══════════════════════════╗    │
│        ║  Quick List Pal       ✕  ║    │
│        ╠══════════════════════════╣    │
│        ║ Pal Type: [Anubis ▼]    ║    │
│        ║                         ║    │
│        ║ Level: [40 ─●─────────] ║    │
│        ║                         ║    │
│        ║ Traits:                 ║    │
│        ║ ☑ Lucky  ☐ Swift       ║    │
│        ║ ☐ Blessed ☐ Alpha      ║    │
│        ║                         ║    │
│        ║ Price: [50000________] ║    │
│        ║                         ║    │
│        ║ [Cancel] [List Now ✓]  ║    │
│        ╚══════════════════════════╝    │
│                                         │
└─────────────────────────────────────────┘
```

### Notification Toast

```
┌─────────────────────────────────────────┐
│ PALWORLD Game                           │
│ ┌─────────────────────────────────────┐ │
│ │ 🔔 john_trader wants your Lucky    │ │
│ │    Anubis!                          │ │
│ │                                     │ │
│ │ Offered: 60000 gold                │ │
│ │                                     │ │
│ │ [View →] [Close ✕]                │ │
│ └─────────────────────────────────────┘ │
│  (Auto-closes in 5s)                    │
│                                         │
└─────────────────────────────────────────┘
```

---

## 📊 Data Flow Diagram

```
USER IN PALWORLD
        ↓
        │
        ├─ Clicks Floating Button
        │
        ├─ Sees Quick List Modal
        │
        ├─ Fills Form
        │  • Pal Type: Anubis
        │  • Level: 40
        │  • Traits: Lucky
        │  • Price: 50000
        │
        ├─ Clicks "List Now"
        │
        ├─ POST /api/overlay/quick-list
        │         ↓
        │    Backend validates
        │    Creates listing
        │    Saves to DB
        │         ↓
        │    Returns 201 OK
        │
        ├─ Toast: "Anubis listed!"
        │
        └─ Notification received when
           someone offers on your Pal

           Toast: "john_trader wants
           your Lucky Anubis!"
```

---

## 🗂️ File Structure Tree

```
PalTrade-main/
├── overlay/                          ← NEW OVERLAY APP
│   ├── src/
│   │   ├── components/
│   │   │   ├── FloatingButton.tsx     ← Animated button
│   │   │   ├── QuickListPanel.tsx     ← Form modal
│   │   │   └── NotificationToast.tsx  ← Alert toast
│   │   ├── services/
│   │   │   ├── api.ts                 ← API client
│   │   │   └── websocket.ts           ← Real-time service
│   │   ├── main.tsx                   ← Background
│   │   ├── overlay.tsx                ← Main window
│   │   ├── notifications.tsx          ← Notifications
│   │   └── overlay.css                ← Styles
│   ├── manifest.json                  ← Overwolf config
│   ├── package.json
│   └── vite.config.ts
│
├── app/api/overlay/                  ← NEW API ENDPOINTS
│   ├── auth/route.ts                 ← OAuth
│   ├── listings/route.ts             ← Get listings
│   ├── quick-list/route.ts           ← Quick list
│   ├── notifications/route.ts        ← Notifications
│   ├── ws/route.ts                   ← Real-time stream
│   └── notification-triggers.ts      ← Helpers
│
├── QUICKSTART.md                      ← START HERE
├── ARCHITECTURE.md                    ← System design
├── OVERLAY_SETUP.md                  ← Setup guide
├── OVERLAY_COMPLETE.md               ← Full summary
├── IMPLEMENTATION_ROADMAP.md         ← 10-week plan
├── NOTIFICATION_INTEGRATION_GUIDE.md ← Real-time
├── README_OVERLAY.md                 ← Master index
├── DELIVERY_REPORT.md                ← This package
└── ...existing files...
```

---

## 🔄 Component Interaction Flow

```
┌────────────────────────────────────────────────────┐
│              OVERLAY (React App)                   │
│                                                    │
│  ┌──────────────────────────────────────────┐    │
│  │ main.tsx (Background Service)            │    │
│  │ • Connects to WebSocket/SSE              │    │
│  │ • Listens for notifications              │    │
│  │ • Broadcasts to other windows            │    │
│  └──────────────────────────────────────────┘    │
│           ↑                           ↓           │
│           └───────────────────────────┘           │
│           (postMessage)                          │
│                                                    │
│  ┌──────────────────────────────────────────┐    │
│  │ overlay.tsx (Main Window)                │    │
│  │ • FloatingButton component               │    │
│  │ • QuickListPanel (modal)                 │    │
│  │ • Handles user clicks                    │    │
│  └──────────────────────────────────────────┘    │
│           ↓                                       │
│   ┌───────────────────┐                          │
│   │ api.ts service    │                          │
│   │ • Calls backend   │                          │
│   │ • Manages token   │                          │
│   └───────────────────┘                          │
│           ↓                                       │
│  /api/overlay/quick-list (POST)                  │
│                                                    │
│  ┌──────────────────────────────────────────┐    │
│  │ notifications.tsx (Notification Window)  │    │
│  │ • Receives messages from main.tsx        │    │
│  │ • Renders toast notifications            │    │
│  │ • Auto-dismisses or user closes          │    │
│  └──────────────────────────────────────────┘    │
└────────────────────────────────────────────────────┘
                      ↓
            Next.js Backend API
                      ↓
            PostgreSQL Database
```

---

## 📈 Request Timeline (Quick List)

```
User clicks "List Now"
│
├─ 0ms: Form validation
│
├─ 50ms: API request sent
│        POST /api/overlay/quick-list
│        {
│          name: "Anubis",
│          price: 50000,
│          type: "pal",
│          stats: {...}
│        }
│
├─ 150ms: Backend receives
│         • Verify JWT token ✓
│         • Validate schema ✓
│         • Query user ID ✓
│
├─ 250ms: Database operations
│         • Create listing ✓
│         • Create notification ✓
│         • Return response ✓
│
├─ 300ms: Response received
│         {
│           success: true,
│           listing: {...},
│           message: "Anubis listed successfully!"
│         }
│
└─ 350ms: UI updated
          Toast shows confirmation
          Modal closes
          ✅ DONE!

Total time: ~350ms (target: <500ms) ✓
```

---

## 🔐 Authentication Flow (Diagram)

```
Step 1: User Clicks "Login"
        ↓
        Overlay: initiateOAuth()
        ↓
        Opens popup to paltrade.vercel.app

Step 2: User Enters Credentials
        ↓
        paltrade.vercel.app/login
        ├─ Email: [____________]
        ├─ Password: [________]
        └─ [Sign In]

Step 3: Backend Validates
        ├─ Check email exists
        ├─ Verify password hash
        ├─ Generate JWT token
        └─ Return token in URL

Step 4: Overlay Receives Token
        ↓
        Popup closes
        Token extracted from URL hash
        Token stored in localStorage

Step 5: Future Requests Include Token
        ↓
        Authorization: Bearer eyJhbGc...
        ↓
        ✅ Authenticated!
```

---

## 💾 Database Schema (Simplified)

```
USERS
├─ id
├─ email
├─ name
├─ password_hash
└─ created_at

LISTINGS
├─ id
├─ user_id (FK → USERS)
├─ name (e.g., "Anubis")
├─ price
├─ level
├─ traits (JSON)
├─ is_active
└─ created_at

OFFERS
├─ id
├─ listing_id (FK → LISTINGS)
├─ bidder_id (FK → USERS)
├─ offer_price
├─ offer_item
├─ status (pending/accepted/rejected)
└─ created_at

NOTIFICATIONS (NEW)
├─ id
├─ user_id (FK → USERS)
├─ type (offer_received/accepted)
├─ title
├─ message
├─ read (boolean)
└─ created_at
```

---

## 🚀 Deployment Architecture

```
Your Computer
    ↓ (git push)
    │
    ├─→ GitHub
         ↓ (webhook)
         │
         ├─→ Vercel (Backend)
         │   ├─ Build
         │   ├─ Deploy
         │   ├─ Update DB migrations
         │   └─ LIVE at paltrade.vercel.app
         │
         └─→ Overwolf Store (Overlay)
             ├─ dist/ folder uploaded
             ├─ Review pending
             ├─ Approval (1-2 weeks)
             └─ Users install from store

User's PC
    ├─ Palworld running
    ├─ Overwolf installed
    ├─ Overlay app from Overwolf Store
    │   ↓ (overlay communicates)
    ├─ ← → paltrade.vercel.app
    │   ↓ (API calls + WebSocket)
    └─ ← → PostgreSQL Database
```

---

## 📊 Performance Dashboard (Target)

```
╔═══════════════════════════════════════════╗
║         PalTrade Overlay Metrics          ║
╠═══════════════════════════════════════════╣
║                                           ║
║ Bundle Size:                              ║
║   Uncompressed:  ████████░░  45KB         ║
║   Gzipped:       ███░░░░░░░  15KB ✓       ║
║                                           ║
║ API Response Times:                       ║
║   Quick List:    ████░░░░░░  250ms ✓      ║
║   Get Listings:  ██░░░░░░░░  100ms ✓      ║
║   Notifications: █░░░░░░░░░   50ms ✓      ║
║                                           ║
║ Memory Usage:                             ║
║   Overlay:       ██████░░░░   50MB        ║
║   Per WebSocket: █░░░░░░░░░    8MB        ║
║                                           ║
║ Uptime Target:   ██████████  99.9%        ║
║                                           ║
╚═══════════════════════════════════════════╝
```

---

## 🎯 Success Path (Timeline)

```
Week 1: SETUP
├─ Day 1-2: Review docs & code
├─ Day 3-4: Build & test locally
├─ Day 5-7: Deploy backend
└─ Status: ✅ Ready

Week 2: SUBMISSION
├─ Day 1-2: Create Overwolf account
├─ Day 3-4: Submit app for review
├─ Day 5-7: Wait for approval
└─ Status: ⏳ In Review

Week 3: LAUNCH
├─ Day 1: Get approval
├─ Day 2: Announce to community
├─ Day 3-7: Monitor & optimize
└─ Status: 🚀 LIVE!

Week 4+: GROWTH
├─ Add more features
├─ Premium tier
├─ Monetization
└─ Scale users
```

---

## 💡 Key Metrics

```
MVP Success Criteria:
├─ ✅ Overlay builds without errors
├─ ✅ Can login via OAuth
├─ ✅ Quick list creates listings
├─ ✅ Notifications appear
├─ ✅ API response < 500ms
├─ ✅ No console errors
└─ ✅ Works in Palworld

Growth Targets:
├─ Month 1: 50-100 users
├─ Month 2: 200-300 users
├─ Month 3: 500+ users
├─ Month 6: 2,000+ users
└─ Month 12: 5,000+ users

Revenue Targets:
├─ Month 1: $0 (free MVP)
├─ Month 3: $50-100/month
├─ Month 6: $200-400/month
└─ Month 12: $500-1,000/month
```

---

**Questions?** See documentation files for details.
**Ready?** Start with QUICKSTART.md →
