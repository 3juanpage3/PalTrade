# PalTrade Overlay - Complete Setup Guide

## Overview

This guide walks you through building and deploying the PalTrade overlay for Palworld.

The architecture consists of:

1. **Overlay App** - Desktop app that runs on top of Palworld (React + Vite)
2. **Backend API** - Next.js endpoints to support overlay features
3. **Real-time Updates** - WebSocket or SSE for notifications

## Quick Start

### Step 1: Install Overlay Dependencies

```bash
cd overlay
npm install
```

### Step 2: Build the Overlay

```bash
npm run build
```

This creates a `dist/` folder with HTML, JS, and CSS ready for deployment.

### Step 3: Deploy to Overwolf

1. **Create Overwolf Account**

   - Go to https://overwolf.com
   - Apply as a developer
   - Select "Palworld" as your target game

2. **Upload to Overwolf Store**

   - Log in to Overwolf Developer Console
   - Create a new app project
   - Upload the `overlay/dist/` folder
   - Update `manifest.json` with your Overwolf app ID
   - Submit for review

3. **Alternative: Local Testing**
   ```bash
   npm run dev
   # Then load as unpacked extension in Overwolf
   ```

## Architecture Deep Dive

### 1. Overlay Frontend (`overlay/src/`)

**Structure:**

- `overlay.tsx` - Main overlay window with floating button
- `main.tsx` - Background service for WebSocket connection
- `notifications.tsx` - Toast notification renderer
- `components/` - React components

**Key Features:**

- Floating button in bottom-right corner
- Quick "List Pal" modal
- Real-time notifications
- OAuth login popup

**API Integration:**

- `POST /api/overlay/quick-list` - Create listing
- `GET /api/overlay/listings` - User's listings
- `GET /api/overlay/notifications` - Notification feed

### 2. Backend API Endpoints

**Authentication:**

```
POST /api/overlay/auth
  - Exchange OAuth code for token
  - Returns JWT for overlay

GET /api/overlay/auth
  - OAuth authorization endpoint
```

**Quick Listing:**

```
POST /api/overlay/quick-list
  - Create a Pal listing in seconds
  - Requires: name, price, type, stats
  - Returns: listing ID and confirmation

GET /api/overlay/listings
  - Get user's active listings
  - Used to show quick view in overlay
```

**Notifications:**

```
GET /api/overlay/notifications
  - SSE stream for real-time updates
  - Sends notifications as they happen

POST /api/overlay/notifications
  - Create notification (internal API)
```

### 3. Real-Time Updates

**Current Implementation: Server-Sent Events (SSE)**

- Located in `/app/api/overlay/ws/route.ts`
- Polls database every 5 seconds
- Streams notifications to overlay

**Production Upgrade Options:**

Option A: **Supabase Realtime** (Recommended)

```typescript
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(url, key);

supabase
  .channel("notifications")
  .on(
    "postgres_changes",
    { event: "INSERT", schema: "public", table: "notifications" },
    (payload) => console.log(payload)
  )
  .subscribe();
```

Option B: **Socket.io** (Node.js separate server)

```bash
npm install socket.io socket.io-client
```

Option C: **Pusher.com** (Third-party service)

```typescript
import Pusher from "pusher-js";

const pusher = new Pusher("YOUR_KEY", {
  cluster: "mt1",
});

const channel = pusher.subscribe("trades");
channel.bind("new_offer", (data) => {
  console.log(data);
});
```

## Configuration

### Environment Variables

Create `.env.local` in the project root:

```env
# Database
DATABASE_URL=postgresql://user:password@localhost:5432/paltrade

# NextAuth
NEXTAUTH_SECRET=your-secret-key
NEXTAUTH_URL=https://paltrade.vercel.app

# OAuth (if using external providers)
GITHUB_ID=xxx
GITHUB_SECRET=xxx

# Overlay API
OVERLAY_JWT_SECRET=your-overlay-secret
OVERLAY_API_URL=https://paltrade.vercel.app
```

### Overlay Configuration

In `overlay/src/services/api.ts`:

```typescript
const API_BASE_URL =
  process.env.REACT_APP_API_URL || "https://paltrade.vercel.app";
```

Change `paltrade.vercel.app` to your domain in production.

## Testing Locally

### Test Backend Endpoints

```bash
# Get your user's listings
curl -H "Authorization: Bearer YOUR_JWT" \
  https://localhost:3000/api/overlay/listings

# Create a quick listing
curl -X POST \
  -H "Authorization: Bearer YOUR_JWT" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Anubis",
    "price": 50000,
    "type": "pal",
    "category": "Anubis"
  }' \
  https://localhost:3000/api/overlay/quick-list
```

### Test Overlay Locally

```bash
cd overlay
npm run dev
# Opens at http://localhost:5173
```

## Database Migration

After adding the Notification model, run:

```bash
npx prisma migrate dev --name add_notifications
npx prisma generate
```

This creates the `notifications` table in your database.

## Monetization Strategy

Once overlay is live, consider:

1. **Free Tier**

   - 5 listings/day
   - Basic notifications
   - 24hr listing duration

2. **Premium ($2.99/month)**

   - Unlimited listings
   - Priority notifications
   - 7-day listing duration
   - Featured badge

3. **Featured Listing ($0.99/listing)**

   - Top of search results
   - Highlighted in notifications
   - 2x visibility

4. **Verified Trader Badge ($4.99/month)**
   - Increased buyer confidence
   - Priority support
   - Analytics dashboard

## Anti-Abuse Measures

### Implemented:

- Trade confirmation required (both parties must confirm)
- User reputation system
- Listing cooldowns
- Dispute handling

### Future:

- Fraud detection ML model
- Automated refund system
- Appeal process

## Troubleshooting

### Overlay not showing up in Palworld?

1. Ensure Palworld is running
2. Check Overwolf is installed
3. Verify app is enabled in Overwolf settings
4. Restart Overwolf

### Notifications not appearing?

1. Check browser console for errors (F12)
2. Verify JWT token is valid
3. Check database has notifications table
4. Ensure websocket/SSE connection is open

### Listings not saving?

1. Verify you're authenticated (check token in localStorage)
2. Check API returns 201 status code
3. Verify listing data passes validation
4. Check database connection

## Performance Optimization

### Overlay Size

- Minified: ~45KB
- Gzipped: ~15KB

### API Response Times (Target)

- Quick list: < 500ms
- Get listings: < 200ms
- Notifications: < 100ms

### Database Queries

- Add indexes on `userId` and `createdAt`
- Archive old notifications after 30 days
- Cache user listings in overlay

## Security

### Token Management

```typescript
// Stored in browser localStorage
localStorage.setItem('paltrade_token', jwt);

// Sent in Authorization header
headers: {
  'Authorization': 'Bearer ' + token
}
```

### CORS Configuration

```typescript
// Allow overlay origin
CORS_ORIGINS=https://paltrade.vercel.app,overwolf://app

// Only in development
// DEV_CORS_ORIGINS=http://localhost:5173
```

## Deployment Checklist

- [ ] Build overlay: `npm run build`
- [ ] Update manifest.json with app ID
- [ ] Set environment variables
- [ ] Run database migration
- [ ] Deploy Next.js app to Vercel
- [ ] Test OAuth flow
- [ ] Test quick listing
- [ ] Verify notifications work
- [ ] Submit to Overwolf Store
- [ ] Monitor error logs

## Support & Resources

- **Overwolf Docs**: https://dev.overwolf.com
- **Next.js Docs**: https://nextjs.org/docs
- **Prisma Docs**: https://www.prisma.io/docs
- **WebSocket vs SSE**: https://developer.mozilla.org/en-US/docs/Web/API/WebSocket

---

**Need help?** Check the `/overlay/README.md` for quick reference or open an issue on GitHub.
