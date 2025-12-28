'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import ListingCard from '@/components/ListingCard'
import { ShoppingBag, TrendingUp, Users, Shield } from 'lucide-react'

interface Listing {
  id: string
  type: string
  name: string
  description?: string
  price: number
  quantity: number
  image?: string
  category?: string
  createdAt: string
  user: {
    name?: string
    image?: string
  }
}

export default function Home() {
  const [listings, setListings] = useState<Listing[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/listings?isActive=true')
      .then((res) => res.json())
      .then((data) => {
        setListings(data.slice(0, 6))
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-5xl font-bold text-gray-900 mb-4">
          Welcome to <span className="text-primary-600">PALTRADE</span>
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          The premier marketplace for trading Palworld items and Pals. Buy, sell, and trade with players worldwide.
        </p>
        <div className="flex justify-center space-x-4">
          <Link
            href="/browse"
            className="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-medium"
          >
            Browse Listings
          </Link>
          <Link
            href="/login"
            className="px-6 py-3 bg-white text-primary-600 border-2 border-primary-600 rounded-lg hover:bg-primary-50 transition-colors font-medium"
          >
            Get Started
          </Link>
        </div>
      </div>

      {/* Features */}
      <div className="grid md:grid-cols-3 gap-8 mb-16">
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <ShoppingBag className="h-12 w-12 text-primary-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">Easy Trading</h3>
          <p className="text-gray-600">
            List your items and Pals in seconds. Simple, fast, and secure.
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <Users className="h-12 w-12 text-primary-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">Active Community</h3>
          <p className="text-gray-600">
            Connect with thousands of Palworld players worldwide.
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <Shield className="h-12 w-12 text-primary-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">Secure Platform</h3>
          <p className="text-gray-600">
            Your data and transactions are safe with our secure platform.
          </p>
        </div>
      </div>

      {/* Recent Listings */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold text-gray-900 flex items-center">
            <TrendingUp className="h-8 w-8 mr-2 text-primary-600" />
            Recent Listings
          </h2>
          <Link
            href="/browse"
            className="text-primary-600 hover:text-primary-700 font-medium"
          >
            View All →
          </Link>
        </div>

        {loading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="bg-white rounded-lg shadow-md h-64 animate-pulse"
              />
            ))}
          </div>
        ) : listings.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {listings.map((listing) => (
              <ListingCard key={listing.id} listing={listing} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-lg shadow-md">
            <p className="text-gray-600">No listings available yet.</p>
            <Link
              href="/create"
              className="mt-4 inline-block text-primary-600 hover:text-primary-700 font-medium"
            >
              Create the first listing →
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}

