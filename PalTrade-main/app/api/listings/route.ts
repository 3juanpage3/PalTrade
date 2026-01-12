import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

const listingSchema = z.object({
  type: z.enum(['item', 'pal']),
  name: z.string().min(1),
  description: z.string().optional(),
  price: z.number().positive(),
  quantity: z.number().int().positive().default(1),
  image: z.string().url().optional().or(z.literal('')),
  category: z.string().optional(),
  stats: z.string().optional(),
})

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const type = searchParams.get('type')
    const category = searchParams.get('category')
    const search = searchParams.get('search')
    const userId = searchParams.get('userId')
    const isActive = searchParams.get('isActive') !== 'false'

    const where: any = { isActive }
    if (type) where.type = type
    if (category) where.category = category
    if (userId) where.userId = userId
    if (search) {
      where.OR = [
        { name: { contains: search } },
        { description: { contains: search } },
      ]
    }

    const listings = await prisma.listing.findMany({
      where,
      include: {
        user: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    })

    return NextResponse.json(listings)
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const data = listingSchema.parse(body)

    const listing = await prisma.listing.create({
      data: {
        ...data,
        userId: session.user.id,
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },
      },
    })

    return NextResponse.json(listing, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid input', details: error.errors },
        { status: 400 }
      )
    }
    
    // Log the actual error for debugging
    console.error('Error creating listing:', error)
    
    // Provide more specific error messages
    if (error instanceof Error) {
      // Database connection errors
      if (error.message.includes('DATABASE_URL') || error.message.includes('database')) {
        return NextResponse.json(
          { error: 'Database connection error. Please check your DATABASE_URL environment variable.' },
          { status: 500 }
        )
      }
      
      // Prisma errors
      if (error.message.includes('P1001') || error.message.includes('connect')) {
        return NextResponse.json(
          { error: 'Unable to connect to database. Please verify your database is running and accessible.' },
          { status: 500 }
        )
      }
    }
    
    return NextResponse.json(
      { error: 'Internal server error', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}

