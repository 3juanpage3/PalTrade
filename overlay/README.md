# PalTrade Overlay

A companion overlay for Palworld that integrates with PalTrade.vercel.app for in-game trading.

## Features

- 🎮 In-game overlay for Palworld
- ⚡ Quick Pal listing with hotkeys
- 🔔 Real-time trade notifications
- 💬 In-game message alerts
- 🔐 Secure OAuth authentication
- 📊 Live listing updates

## Setup

### Prerequisites

- Node.js 18+
- npm or yarn
- Overwolf account (apply at https://overwolf.com)

### Installation

1. Install dependencies:

```bash
npm install
```

2. Build the overlay:

```bash
npm run build
```

3. Create a `.env.local` file:

```
REACT_APP_API_URL=https://paltrade.vercel.app
```

### Development

Run in development mode:

```bash
npm run dev
```

### Deployment to Overwolf

1. Apply at https://overwolf.com and select Palworld as your target game
2. Create a developer account
3. Upload the built `dist/` folder to Overwolf Store
4. Configure manifest.json with your app ID

## Architecture

```
overlay/
├── src/
│   ├── components/       # React components (FloatingButton, QuickListPanel)
│   ├── services/         # API & WebSocket services
│   ├── main.tsx         # Background service worker
│   ├── overlay.tsx      # Main overlay window
│   └── notifications.tsx # Notification toasts
├── manifest.json        # Overwolf app configuration
└── vite.config.ts      # Build configuration
```

## How It Works

### Flow

1. **Authentication**

   - User clicks overlay button
   - OAuth popup opens to paltrade.vercel.app
   - Token stored locally in browser storage

2. **Quick Listing**

   - User clicks "Quick List Pal"
   - Form appears with Pal selection
   - Can add traits, level, price
   - Listing posted to PalTrade backend

3. **Real-Time Updates**
   - WebSocket connects to PalTrade backend
   - Receives trade notifications
   - Toast notifications appear in-game
   - Click to view offer details

## API Integration

The overlay connects to your PalTrade backend:

- `POST /api/listings` - Create new listing
- `POST /api/overlay/quick-list` - Quick list a Pal
- `GET /api/notifications` - Fetch notifications
- `WS /api/ws` - WebSocket for real-time updates

## Monetization

- Cosmetic themes (later)
- Featured listing badges
- Analytics dashboard
- Verified trader badges

## Anti-Abuse

- Trade confirmation required
- Reputation system
- Cooldowns on listing
- Manual dispute handling

## License

MIT
