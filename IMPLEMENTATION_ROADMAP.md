# Implementation Roadmap

## Phase 1: MVP (Weeks 1-2) ✅ [CURRENT]

### Backend

- [x] Create `/api/overlay/quick-list` endpoint for fast Pal listing
- [x] Add `/api/overlay/auth` for overlay OAuth
- [x] Add `/api/overlay/notifications` for notification feed
- [x] Create Notification model in Prisma schema

### Overlay App

- [x] Set up Vite + React project structure
- [x] Create manifest.json for Overwolf
- [x] Build FloatingButton component
- [x] Build QuickListPanel component
- [x] Build NotificationToast component
- [x] Implement API service layer
- [x] Add WebSocket/SSE service
- [x] Setup OAuth flow

### Deploy

- [ ] Submit to Overwolf Store for review
- [ ] Test in Palworld
- [ ] Get initial user feedback

---

## Phase 2: Polish & Optimization (Weeks 3-4)

### Real-Time Updates

- [ ] Implement Supabase Realtime or Socket.io
- [ ] Add WebSocket reconnection logic
- [ ] Optimize notification batching
- [ ] Add sound/screen flash alerts

### UI/UX

- [ ] Add settings panel (hotkeys, theme)
- [ ] Implement draggable floating button
- [ ] Add listing history panel
- [ ] Create trade chat in overlay

### Performance

- [ ] Cache user listings locally
- [ ] Lazy load images
- [ ] Reduce overlay bundle size
- [ ] Optimize API queries

---

## Phase 3: Smart Features (Weeks 5-6)

### Auto-Listing (without mods)

- [ ] Pal template saving
- [ ] Quick duplicate listing
- [ ] Preset prices based on market data
- [ ] OCR screenshot parsing (optional)

### Analytics

- [ ] Track listing success rate
- [ ] Show earnings dashboard
- [ ] Price recommendations
- [ ] Popular Pals this week

### Social

- [ ] Wishlist Pals
- [ ] Follow traders
- [ ] Share listings
- [ ] Trading statistics

---

## Phase 4: Monetization (Weeks 7-8)

### Freemium Model

- [ ] Implement listing limits
- [ ] Create premium features
- [ ] Add Stripe integration
- [ ] Premium overlay themes

### Premium Features

- [ ] Featured listings boost
- [ ] Verified trader badge
- [ ] Priority notifications
- [ ] Advanced analytics

---

## Phase 5: Modding Support (Weeks 9-10)

### Optional Mod Framework

- [ ] Create mod API reference
- [ ] Build inventory exporter mod (UE5 plugin)
- [ ] Auto-sync inventory to overlay
- [ ] Save file parser tool

### Mod Distribution

- [ ] Publish to Nexus Mods
- [ ] Create installer script
- [ ] Safety & signature verification
- [ ] Update notification system

---

## Success Metrics

### MVP Goals

- 100+ overlay installs
- 50+ active traders
- <1s quick list time
- 99% notification delivery

### Phase 2+ Goals

- 1,000+ installs
- 10,000 listings
- $500/mo revenue
- <100ms API response time

---

## Tech Stack Summary

```
Frontend Overlay:
├── React 18
├── TypeScript
├── Vite (build)
├── Tailwind CSS
└── Lucide icons

Backend:
├── Next.js 14
├── Prisma ORM
├── PostgreSQL
├── NextAuth v4
└── Supabase (realtime, optional)

Deployment:
├── Vercel (API)
├── Overwolf Store (overlay)
└── PostgreSQL (Vercel/external)
```

---

## Risk Mitigation

| Risk                           | Likelihood | Impact | Mitigation                  |
| ------------------------------ | ---------- | ------ | --------------------------- |
| Palworld update breaks overlay | High       | High   | Version compatibility layer |
| Overwolf review rejection      | Medium     | High   | Follow guidelines strictly  |
| Database scale issues          | Medium     | High   | Add caching + CDN           |
| Mod incompatibility            | Medium     | Medium | Provide mod API docs        |
| Fraud on platform              | Low        | High   | Reputation + manual review  |

---

## Next Steps

1. **Build & Test**

   ```bash
   cd overlay && npm install && npm run build
   ```

2. **Setup Overwolf Dev Account**

   - Apply at https://overwolf.com/developers
   - Wait for approval (~1 week)

3. **Test Locally**

   ```bash
   npm run dev  # Run at localhost:5173
   ```

4. **Setup Backend**

   - Deploy to Vercel
   - Update environment variables
   - Run database migration

5. **Submit to Overwolf**
   - Upload built files
   - Write description & screenshots
   - Submit for review

---

**Questions?** Refer to OVERLAY_SETUP.md for detailed configuration.
