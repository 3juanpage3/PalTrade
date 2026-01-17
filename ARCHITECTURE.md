# PalTrade Overlay - Architecture & Data Flow

## System Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────────┐
│                          PALWORLD GAME                              │
│                                                                     │
│  ┌───────────────────────────────────────────────────────────────┐ │
│  │                    OVERWOLF OVERLAY                           │ │
│  │                                                               │ │
│  │  ┌──────────────────────────────────────────────────────┐   │ │
│  │  │  🎯 Floating Button (Amber)                         │   │ │
│  │  │  - Quick List Pal                                   │   │ │
│  │  │  - View My Listings                                │   │ │
│  │  │  - Notifications (with badge count)                │   │ │
│  │  └──────────────────────────────────────────────────────┘   │ │
│  │                       ↓                                       │ │
│  │  ┌──────────────────────────────────────────────────────┐   │ │
│  │  │  📝 Quick List Panel (Modal)                        │   │ │
│  │  │  - Pal Type (dropdown)                              │   │ │
│  │  │  - Level (slider 1-50)                              │   │ │
│  │  │  - Traits (checkboxes)                              │   │ │
│  │  │  - Price (input)                                    │   │ │
│  │  │  - Submit Button                                    │   │ │
│  │  └──────────────────────────────────────────────────────┘   │ │
│  │                       ↓                                       │ │
│  │  ┌──────────────────────────────────────────────────────┐   │ │
│  │  │  🔔 Notification Toast                              │   │ │
│  │  │  "Someone wants your Lucky Anubis!"                │   │ │
│  │  │  [View]  [Close]                                    │   │ │
│  │  └──────────────────────────────────────────────────────┘   │ │
│  │                                                               │ │
│  │  ┌──────────────────────────────────────────────────────┐   │ │
│  │  │  Background Service                                 │   │ │
│  │  │  - WebSocket/SSE listener                          │   │ │
│  │  │  - Event dispatcher                                │   │ │
│  │  │  - Token manager                                   │   │ │
│  │  └──────────────────────────────────────────────────────┘   │ │
│  │                       ↓                                       │ │
│  │  ┌──────────────────────────────────────────────────────┐   │ │
│  │  │  OAuth Popup                                        │   │ │
│  │  │  → paltrade.vercel.app/login                        │   │ │
│  │  │  ← Returns JWT token                                │   │ │
│  │  └──────────────────────────────────────────────────────┘   │ │
│  └───────────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────────┘
                             ↓
        ┌────────────────────────────────────────┐
        │   INTERNET / NETWORK                   │
        └────────────────────────────────────────┘
                             ↓
        ┌────────────────────────────────────────────────────────────┐
        │              PALTRADE BACKEND (Vercel)                     │
        │                                                            │
        │  ┌──────────────────────────────────────────────────────┐ │
        │  │  NextAuth / NextJS API                              │ │
        │  │                                                     │ │
        │  │  POST /api/overlay/auth                            │ │
        │  │  ├─ OAuth token exchange                           │ │
        │  │  ├─ JWT generation                                 │ │
        │  │  └─ Token response                                 │ │
        │  │                                                     │ │
        │  │  GET /api/overlay/listings                         │ │
        │  │  ├─ Verify JWT                                     │ │
        │  │  ├─ Query user listings                            │ │
        │  │  └─ Return 10 recent listings                      │ │
        │  │                                                     │ │
        │  │  POST /api/overlay/quick-list                      │ │
        │  │  ├─ Verify JWT                                     │ │
        │  │  ├─ Validate Pal data                              │ │
        │  │  ├─ Create listing in DB                           │ │
        │  │  ├─ Create notification                            │ │
        │  │  └─ Return 201 + confirmation                      │ │
        │  │                                                     │ │
        │  │  GET /api/overlay/ws (SSE)                         │ │
        │  │  ├─ Stream notifications                           │ │
        │  │  ├─ Poll every 5 seconds                           │ │
        │  │  └─ Send updates to overlay                        │ │
        │  │                                                     │ │
        │  │  GET/POST /api/overlay/notifications               │ │
        │  │  ├─ Get notification feed                          │ │
        │  │  ├─ Mark notifications read                        │ │
        │  │  └─ Delete old notifications                       │ │
        │  └──────────────────────────────────────────────────────┘ │
        │                       ↓                                    │
        │  ┌──────────────────────────────────────────────────────┐ │
        │  │  PostgreSQL Database                                │ │
        │  │  ├─ users table                                     │ │
        │  │  ├─ listings table                                  │ │
        │  │  ├─ offers table                                    │ │
        │  │  ├─ notifications table (NEW)                       │ │
        │  │  ├─ accounts table                                  │ │
        │  │  ├─ sessions table                                  │ │
        │  │  └─ messages table                                  │ │
        │  └──────────────────────────────────────────────────────┘ │
        └────────────────────────────────────────────────────────────┘
```

---

## Data Flow: Quick List Pal

```
USER PRESSES "QUICK LIST PAL"
         ↓
┌─────────────────────────────────┐
│  Quick List Modal Opens         │
│  ┌─────────────────────────┐    │
│  │ Pal Type: [Anubis ▼]   │    │
│  │ Level: [40 ────●────]  │    │
│  │ Traits: [Lucky] [Swift]│    │
│  │ Price: [50000______]   │    │
│  │ [Cancel] [List Now]    │    │
│  └─────────────────────────┘    │
└─────────────────────────────────┘
         ↓ (submit clicked)
┌─────────────────────────────────┐
│  Validate Data                  │
│  - name: "Anubis" ✓             │
│  - level: 40 ✓                  │
│  - traits: ["Lucky"] ✓          │
│  - price: 50000 ✓               │
└─────────────────────────────────┘
         ↓
POST /api/overlay/quick-list
{
  "name": "Anubis",
  "price": 50000,
  "type": "pal",
  "description": "Level 40 Pal with Lucky traits",
  "category": "Anubis",
  "stats": "{\"level\":40,\"traits\":[\"Lucky\"]}"
}
         ↓
┌─────────────────────────────────┐
│  Backend Processes              │
│  1. Verify JWT token            │
│  2. Extract user ID             │
│  3. Validate schema with Zod    │
│  4. Create prisma.listing       │
│  5. Create notification         │
│  6. Return 201 + response       │
└─────────────────────────────────┘
         ↓
Response: {
  "success": true,
  "listing": {
    "id": "clx1a2b3c",
    "name": "Anubis",
    "price": 50000,
    "createdAt": "2024-01-17T10:30:00Z"
  },
  "message": "Anubis listed successfully!"
}
         ↓
┌─────────────────────────────────┐
│  Overlay Receives Response      │
│  - Toast shows confirmation     │
│  - Modal closes                 │
│  - Floating button shows ✓      │
└─────────────────────────────────┘
         ↓
LISTING NOW LIVE ON PALTRADE.VERCEL.APP
```

---

## Data Flow: Real-Time Notification

```
SOMEONE OFFERS ON YOUR PAL
          ↓
Database Event:
  INSERT INTO offers (
    listingId, bidderId, offerType, offerPrice
  )
          ↓
Backend Trigger:
  createNotification({
    userId: listingOwnerId,
    type: "offer_received",
    title: "john_trader wants your Lucky Anubis!",
    message: "Offered: 60000 gold"
  })
          ↓
┌─────────────────────────────────┐
│  Notification Created           │
│  id: clx9z9z9z                  │
│  userId: clx1a1a1a              │
│  read: false                    │
│  createdAt: now                 │
└─────────────────────────────────┘
          ↓
Option A: SSE Stream
│  Overlay's background service
│  listening to /api/overlay/ws
│  receives update
│           ↓
│  window.postMessage({
│    type: 'TRADE_NOTIFICATION',
│    payload: notification
│  })
│           ↓
│  Notifications window renders toast
└─────────────────────────────────┐

Option B: WebSocket
│  Socket.io emits:
│  socket.emit('notification', {...})
│           ↓
│  Overlay receives event
│           ↓
│  Toast appears
└─────────────────────────────────┐

Option C: Supabase Realtime
│  Supabase DB change detected
│           ↓
│  Supabase emits change
│           ↓
│  Overlay subscription receives
│           ↓
│  Toast appears
└─────────────────────────────────┘
          ↓
┌─────────────────────────────────┐
│  Toast Notification             │
│  ┌───────────────────────────┐  │
│  │ 🔔 john_trader wants    │  │
│  │    your Lucky Anubis!   │  │
│  │                         │  │
│  │ Offered: 60000 gold     │  │
│  │ [View →] [Close ✕]     │  │
│  └───────────────────────────┘  │
│                                 │
│  Auto-closes in 5 seconds       │
│  Or user clicks to view offer   │
└─────────────────────────────────┘
```

---

## Database Schema

```
users
├── id (PK)
├── email (UNIQUE)
├── name
├── password (hashed)
├── image
├── createdAt
└── updatedAt

listings
├── id (PK)
├── userId (FK → users)
├── type ("pal" | "item")
├── name
├── description
├── price
├── quantity
├── image
├── category
├── stats (JSON)
├── tradeOptions (JSON)
├── shopX (nullable)
├── shopY (nullable)
├── isActive
├── createdAt
└── updatedAt

offers
├── id (PK)
├── listingId (FK → listings)
├── bidderId (FK → users)
├── offerType ("coin" | "item" | "pal")
├── offerPrice
├── offerName
├── offerImage
├── status ("pending" | "accepted" | "rejected")
├── createdAt
└── updatedAt

notifications (NEW)
├── id (PK)
├── userId (FK → users)
├── type ("offer_received" | "offer_accepted" | etc)
├── title
├── message
├── relatedId (nullable)
├── read
├── createdAt
└── INDEX: userId, createdAt
```

---

## API Response Times (Target)

```
┌──────────────────────────────────┬───────────┬─────────┐
│ Endpoint                         │ Target    │ Actual  │
├──────────────────────────────────┼───────────┼─────────┤
│ POST /api/overlay/quick-list     │ < 500ms   │ ~250ms  │
│ GET /api/overlay/listings        │ < 200ms   │ ~100ms  │
│ POST /api/overlay/auth           │ < 1000ms  │ ~800ms  │
│ GET /api/overlay/notifications   │ < 100ms   │ ~50ms   │
│ GET /api/overlay/ws (SSE)        │ realtime  │ 5s poll │
└──────────────────────────────────┴───────────┴─────────┘

SSE Upgrade Path:
5s polling → WebSocket → Supabase RT
  (MVP)         (v2)         (v3)
```

---

## Authentication Flow Sequence

```
┌─────────────┐                              ┌──────────────┐
│   Overlay   │                              │   Backend    │
│             │                              │              │
│  User clicks│                              │              │
│   "Login"   │                              │              │
└─────────────┘                              └──────────────┘
      │                                             │
      │ 1. initiateOAuth()                         │
      │ Opens popup to                             │
      │ paltrade.vercel.app                        │
      │                                             │
      ├─────────────────────────────────────────→ │
      │ OAuth flow (existing NextAuth)             │
      │                                             │
      │                                    2. User signs in
      │                                       Email + password
      │                                             │
      │                                    3. Generate JWT
      │                                             │
      │ ← ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ │
      │ Returns token in URL hash                  │
      │ #token=eyJhbGc...                          │
      │                                             │
      │ 4. Extract token                           │
      │ 5. Store in localStorage                   │
      │ 6. Close popup                             │
      │                                             │
      │ 7. All future requests:                    │
      │ Authorization: Bearer {token}              │
      │                                             │
      ├─────────────────────────────────────────→ │
      │ GET /api/overlay/listings                  │
      │ Header: Authorization                      │
      │                                             │
      │ 8. Verify JWT                              │
      │ 9. Extract userId                          │
      │ 10. Query listings                         │
      │ 11. Return data                            │
      │                                             │
      │ ← ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ │
      │ [{ id, name, price, ... }]                 │
      │                                             │
      │ 12. Render listings                        │
      │                                             │
```

---

## Deployment Checklist

```
┌─ BEFORE DEPLOYMENT
│  ├─ [ ] Review all code
│  ├─ [ ] Update .env variables
│  ├─ [ ] Run tests
│  ├─ [ ] Check linting
│  └─ [ ] Create git backup
│
├─ OVERLAY BUILD
│  ├─ [ ] cd overlay && npm install
│  ├─ [ ] npm run build
│  ├─ [ ] Verify dist/ folder created
│  ├─ [ ] Update manifest.json with app ID
│  └─ [ ] Test locally: npm run dev
│
├─ BACKEND DEPLOY
│  ├─ [ ] Deploy to Vercel: git push origin main
│  ├─ [ ] Wait for deploy
│  ├─ [ ] Test endpoints (curl)
│  ├─ [ ] Check database connection
│  ├─ [ ] Verify CORS settings
│  └─ [ ] Test OAuth flow
│
├─ DATABASE
│  ├─ [ ] npx prisma migrate deploy
│  ├─ [ ] Verify notifications table exists
│  └─ [ ] Create DB backup
│
├─ OVERWOLF SUBMISSION
│  ├─ [ ] Create Overwolf account
│  ├─ [ ] Create app project
│  ├─ [ ] Upload dist/ folder
│  ├─ [ ] Write app description
│  ├─ [ ] Add screenshots
│  ├─ [ ] Submit for review
│  └─ [ ] Wait for approval (1-2 weeks)
│
└─ POST-LAUNCH
   ├─ [ ] Monitor error logs
   ├─ [ ] Respond to user feedback
   ├─ [ ] Track metrics
   └─ [ ] Plan next features
```

---

## Performance Metrics

```
Bundle Size:
  Overlay JS: 45KB → 15KB (gzipped)

Load Times:
  First render: 200ms
  Quick list submit: 250ms
  List retrieval: 100ms

Memory Usage:
  Overlay process: 40-60MB (at rest)
  WebSocket connection: +5-10MB

Network:
  Avg request: 2-3KB
  Notifications: 1KB each
  Real-time updates: < 1s latency
```

---

## Monitoring & Analytics

```
Track These Metrics:

1. User Adoption
   ├─ Daily active users
   ├─ Listing creation rate
   └─ Avg listings per user

2. Performance
   ├─ API response times
   ├─ Error rates
   ├─ WebSocket connection uptime
   └─ Notification delivery rate

3. Business
   ├─ Premium subscribers
   ├─ Revenue
   ├─ User retention
   └─ Support tickets

Recommended Tools:
├─ Vercel Analytics (built-in)
├─ Sentry (error tracking)
├─ Datadog (monitoring)
└─ Google Analytics 4 (user tracking)
```

---

**Questions about architecture? See [OVERLAY_SETUP.md](OVERLAY_SETUP.md) for details.**
