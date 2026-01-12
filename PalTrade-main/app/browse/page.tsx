'use client'

import { useEffect, useState } from 'react'
import ListingCard from '@/components/ListingCard'
import { Search, Filter } from 'lucide-react'

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

export default function BrowsePage() {
  const [listings, setListings] = useState<Listing[]>([])
  const [loading, setLoading] = useState(true)
  const [filters, setFilters] = useState({
    type: '',
    category: '',
    search: '',
  })

  useEffect(() => {
    const params = new URLSearchParams()
    if (filters.type) params.append('type', filters.type)
    if (filters.category) params.append('category', filters.category)
    if (filters.search) params.append('search', filters.search)
    params.append('isActive', 'true')

    setLoading(true)
    fetch(`/api/listings?${params.toString()}`)
      .then((res) => res.json())
      .then((data) => {
        setListings(data)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [filters])

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold text-gray-900 mb-8">Browse Listings</h1>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="flex items-center mb-4">
          <Filter className="h-5 w-5 text-gray-600 mr-2" />
          <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Search
            </label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search items or pals..."
                value={filters.search}
                onChange={(e) =>
                  setFilters({ ...filters, search: e.target.value })
                }
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Type
            </label>
            <select
              value={filters.type}
              onChange={(e) => setFilters({ ...filters, type: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="">All Types</option>
              <option value="item">Items</option>
              <option value="pal">Pals</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Category
            </label>
            <select
              value={filters.category}
              onChange={(e) =>
                setFilters({ ...filters, category: e.target.value })
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="">All Categories</option>
              <option value="Material">Material</option>
              <option value="Food">Food</option>
              <option value="Weapon">Weapon</option>
              <option value="Armor">Armor</option>
              <option value="Accessory">Accessory</option>
              <option value="Tool">Tool</option>
              <option value="Ammunition">Ammunition</option>
              <option value="Seed">Seed</option>
            </select>
          </div>
        </div>
      </div>

      {/* Listings Grid */}
      {loading ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(9)].map((_, i) => (
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
          <p className="text-gray-600 text-lg">No listings found.</p>
          <p className="text-gray-500 mt-2">Try adjusting your filters.</p>
        </div>
      )}
    </div>
  )
}

