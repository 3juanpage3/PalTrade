import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const prisma = globalForPrisma.prisma ?? new PrismaClient({
  log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
})

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

// Verify DATABASE_URL is set (check at runtime, not import time)
if (!process.env.DATABASE_URL) {
  console.error('⚠️  DATABASE_URL environment variable is not set!')
  console.error('Please configure it in your Vercel project settings.')
}

