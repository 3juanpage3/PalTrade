import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'
import { z } from 'zod'

const registerSchema = z.object({
  name: z.string().min(2).max(50),
  email: z.string().email(),
  password: z.string().min(6),
})

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, password } = registerSchema.parse(body)

    const existingUser = await prisma.user.findUnique({
      where: { email },
    })

    if (existingUser) {
      return NextResponse.json(
        { error: 'User already exists' },
        { status: 400 }
      )
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    })

    return NextResponse.json(
      { message: 'User created successfully', userId: user.id },
      { status: 201 }
    )
  } catch (error) {
    console.error('Registration error:', error)
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid input', details: error.errors },
        { status: 400 }
      )
    }
    
    // Database connection errors
    if (error instanceof Error) {
      if (error.message.includes('P1001') || error.message.includes('connect')) {
        return NextResponse.json(
          { error: 'Database connection error. Please check your DATABASE_URL.' },
          { status: 500 }
        )
      }
      
      // Table doesn't exist error
      if (error.message.includes('does not exist') || error.message.includes('P2021')) {
        return NextResponse.json(
          { error: 'Database tables not found. Please run migrations: npx prisma migrate deploy' },
          { status: 500 }
        )
      }
      
      // Unique constraint violation (user already exists)
      if (error.message.includes('Unique constraint') || error.message.includes('P2002')) {
        return NextResponse.json(
          { error: 'User with this email already exists' },
          { status: 400 }
        )
      }
    }
    
    return NextResponse.json(
      { error: 'Internal server error', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}

