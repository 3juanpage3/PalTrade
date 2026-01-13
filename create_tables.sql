-- Create User table
CREATE TABLE IF NOT EXISTS "User" (
  id TEXT PRIMARY KEY,
  name TEXT,
  email TEXT UNIQUE,
  "emailVerified" TIMESTAMP(3),
  image TEXT,
  password TEXT,
  "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3)
);

-- Create Account table
CREATE TABLE IF NOT EXISTS "Account" (
  id TEXT PRIMARY KEY,
  "userId" TEXT NOT NULL,
  type TEXT NOT NULL,
  provider TEXT NOT NULL,
  "providerAccountId" TEXT NOT NULL,
  refresh_token TEXT,
  access_token TEXT,
  expires_at INTEGER,
  token_type TEXT,
  scope TEXT,
  id_token TEXT,
  session_state TEXT,
  "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3),
  FOREIGN KEY ("userId") REFERENCES "User"(id) ON DELETE CASCADE,
  UNIQUE(provider, "providerAccountId")
);

-- Create Session table
CREATE TABLE IF NOT EXISTS "Session" (
  id TEXT PRIMARY KEY,
  "sessionToken" TEXT UNIQUE NOT NULL,
  "userId" TEXT NOT NULL,
  expires TIMESTAMP(3) NOT NULL,
  FOREIGN KEY ("userId") REFERENCES "User"(id) ON DELETE CASCADE
);

-- Create VerificationToken table
CREATE TABLE IF NOT EXISTS "VerificationToken" (
  identifier TEXT NOT NULL,
  token TEXT UNIQUE NOT NULL,
  expires TIMESTAMP(3) NOT NULL,
  UNIQUE(identifier, token)
);

-- Create Listing table
CREATE TABLE IF NOT EXISTS "Listing" (
  id TEXT PRIMARY KEY,
  "userId" TEXT NOT NULL,
  type TEXT NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  price DOUBLE PRECISION NOT NULL,
  quantity INTEGER DEFAULT 1,
  image TEXT,
  category TEXT,
  stats TEXT,
  "tradeOptions" TEXT,
  "isActive" BOOLEAN DEFAULT true,
  "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3),
  FOREIGN KEY ("userId") REFERENCES "User"(id) ON DELETE CASCADE
);

-- Create Offer table (for bidding system)
CREATE TABLE IF NOT EXISTS "Offer" (
  id TEXT PRIMARY KEY,
  "listingId" TEXT NOT NULL,
  "bidderId" TEXT NOT NULL,
  "offerType" TEXT NOT NULL,
  "offerPrice" DOUBLE PRECISION NOT NULL,
  "offerName" TEXT,
  "offerImage" TEXT,
  status TEXT DEFAULT 'pending',
  "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3),
  FOREIGN KEY ("listingId") REFERENCES "Listing"(id) ON DELETE CASCADE,
  FOREIGN KEY ("bidderId") REFERENCES "User"(id) ON DELETE CASCADE
);

-- Create Notification table
CREATE TABLE IF NOT EXISTS "Notification" (
  id TEXT PRIMARY KEY,
  "userId" TEXT NOT NULL,
  type TEXT NOT NULL,
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  "relatedId" TEXT,
  read BOOLEAN DEFAULT false,
  "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY ("userId") REFERENCES "User"(id) ON DELETE CASCADE
);

-- Create indexes for foreign keys
CREATE INDEX IF NOT EXISTS "Account_userId_idx" ON "Account"("userId");
CREATE INDEX IF NOT EXISTS "Session_userId_idx" ON "Session"("userId");
CREATE INDEX IF NOT EXISTS "Listing_userId_idx" ON "Listing"("userId");
CREATE INDEX IF NOT EXISTS "Offer_listingId_idx" ON "Offer"("listingId");
CREATE INDEX IF NOT EXISTS "Offer_bidderId_idx" ON "Offer"("bidderId");
CREATE INDEX IF NOT EXISTS "Notification_userId_idx" ON "Notification"("userId");
