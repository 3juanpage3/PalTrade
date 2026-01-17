/\*\*

- QUICK START: How to integrate overlay notifications into your existing endpoints
-
- Copy this code and paste into your offer/trade endpoints
  \*/

// 1. Import the notification helper
import { createNotification } from "@/app/api/overlay/notification-triggers";

// 2. In your EXISTING POST /api/offers endpoint, add this after creating an offer:

export async function exampleOfferEndpoint(request: Request) {
// ... existing code ...

// After creating offer
const offer = await prisma.offer.create({
data: {
// ... offer data ...
},
include: {
listing: { include: { user: true } },
bidder: true,
},
});

// 🔥 ADD THIS: Send notification to overlay
await createNotification(
offer.listing.user.id,
"offer_received",
`${offer.bidder.name} wants your ${offer.listing.name}!`,
`Offered: ${offer.offerPrice} ${offer.offerType}`,
offer.listing.id
);

// Continue with existing response...
return NextResponse.json(offer, { status: 201 });
}

// 3. In your PATCH endpoint for accepting offers:

export async function exampleAcceptOfferEndpoint(request: Request) {
const offerId = "..."; // from URL params

const offer = await prisma.offer.update({
where: { id: offerId },
data: { status: "accepted" },
include: {
listing: true,
bidder: true,
},
});

// 🔥 ADD THIS: Notify both parties
await createNotification(
offer.bidderId,
"offer_accepted",
`Your offer was accepted!`,
`The seller accepted your offer for ${offer.listing.name}`,
offer.listing.id
);

// Also notify seller to confirm
await createNotification(
offer.listing.userId,
"offer_accepted", // or custom type
`Trade confirmed with ${offer.bidder.name}`,
`You accepted their offer for ${offer.listing.name}`,
offer.listing.id
);

return NextResponse.json(offer);
}

/\*\*

- REAL-TIME UPDATE: Using Supabase (OPTIONAL)
-
- If you want notifications to appear INSTANTLY in overlay:
- 1.  Install Supabase: npm install @supabase/supabase-js
- 2.  Create a notifications table in Supabase
- 3.  Listen for changes in overlay with:
      \*/

import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
process.env.SUPABASE_URL!,
process.env.SUPABASE_ANON_KEY!
);

// In your overlay's notifications.tsx:
/\*
useEffect(() => {
const subscription = supabase
.channel('notifications')
.on(
'postgres_changes',
{
event: 'INSERT',
schema: 'public',
table: 'notifications',
filter: `userId=eq.${userId}` // Only notifications for this user
},
(payload) => {
// New notification received!
addNotification({
type: payload.new.type,
title: payload.new.title,
description: payload.new.message,
});
}
)
.subscribe();

return () => {
subscription.unsubscribe();
};
}, [userId]);
\*/

/\*\*

- FALLBACK: Using Server-Sent Events (NO EXTRA SETUP)
-
- Already implemented in /api/overlay/ws
- Uses polling every 5 seconds
- Good enough for MVP
  \*/

/\*\*

- SOCKET.IO: For websocket (RECOMMENDED FOR PRODUCTION)
-
- 1.  Create a separate Node.js server with Socket.io
- 2.  In your Next.js API route:
      \*/

import { io } from "socket.io-client";

const socket = io(process.env.SOCKET_IO_URL);

// When creating a notification
socket.emit("notification", {
userId: offer.listing.userId,
type: "offer_received",
title: "New offer!",
data: offer,
});

// In overlay (notifications.tsx):
/\*
useEffect(() => {
const socket = io(process.env.REACT_APP_SOCKET_IO_URL);

socket.on('notification', (data) => {
if (data.userId === currentUserId) {
addNotification(data);
}
});

return () => socket.disconnect();
}, []);
\*/
