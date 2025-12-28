'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { format } from 'date-fns'
import { Coins, Package, User, Trash2, Edit, TrendingUp, Heart, Sword, Shield, Zap, Gauge } from 'lucide-react'

interface Listing {
  id: string
  type: string
  name: string
  description?: string
  price: number
  quantity: number
  image?: string
  category?: string
  stats?: string
  createdAt: string
  user: {
    id: string
    name?: string
    email?: string
    image?: string
  }
}

export default function ListingDetailPage() {
  const params = useParams()
  const router = useRouter()
  const { data: session } = useSession()
  const [listing, setListing] = useState<Listing | null>(null)
  const [loading, setLoading] = useState(true)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    fetch(`/api/listings/${params.id}`)
      .then((res) => res.json())
      .then((data) => {
        setListing(data)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [params.id])

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this listing?')) return

    setDeleting(true)
    try {
      const response = await fetch(`/api/listings/${params.id}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        router.push('/browse')
      }
    } catch (err) {
      alert('Failed to delete listing')
    } finally {
      setDeleting(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center">
        <div className="text-gray-600">Loading...</div>
      </div>
    )
  }

  if (!listing) {
    return (
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Listing Not Found</h2>
          <p className="text-gray-600 mb-4">This listing doesn&apos;t exist or has been removed.</p>
          <button
            onClick={() => router.push('/browse')}
            className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
          >
            Browse Listings
          </button>
        </div>
      </div>
    )
  }

  const isOwner = session?.user?.id === listing.user.id
  let stats = null
  if (listing.stats) {
    try {
      stats = JSON.parse(listing.stats)
    } catch (e) {
      // Invalid JSON, ignore
    }
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="md:flex">
          <div className="md:w-1/2 relative h-64 md:h-auto bg-gradient-to-br from-primary-100 to-primary-200 overflow-hidden">
            {listing.image ? (
              <img
                src={listing.image}
                alt={listing.name}
                className="absolute inset-0 w-full h-full object-cover"
                onError={(e) => {
                  console.error('Image failed to load:', listing.image)
                }}
                onLoad={() => {
                  console.log('Image loaded successfully:', listing.image)
                }}
              />
            ) : (
              <div className="flex items-center justify-center h-full">
                <Package className="h-24 w-24 text-primary-400" />
              </div>
            )}
            <div className="absolute top-4 left-4">
              <span className="px-3 py-1 text-sm font-semibold rounded-full bg-primary-600 text-white">
                {listing.type === 'pal' ? 'Pal' : 'Item'}
              </span>
            </div>
          </div>

          <div className="md:w-1/2 p-8">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{listing.name}</h1>
                {listing.category && (
                  <span className="inline-block px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                    {listing.category}
                  </span>
                )}
              </div>
              {isOwner && (
                <div className="flex space-x-2">
                  <button
                    onClick={handleDelete}
                    disabled={deleting}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    title="Delete listing"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              )}
            </div>

            <div className="mb-6">
              <div className="flex items-center space-x-2 mb-4">
                <Coins className="h-6 w-6 text-primary-600" />
                <span className="text-3xl font-bold text-primary-600">
                  {listing.price.toFixed(2)}
                </span>
              </div>
              <p className="text-gray-600 mb-2">Quantity: {listing.quantity}</p>
            </div>

            {listing.description && (
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Description</h3>
                <p className="text-gray-700 whitespace-pre-wrap">{listing.description}</p>
              </div>
            )}

            {stats && (
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Pal Stats</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {stats.level !== undefined && (
                    <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-4 border border-blue-200">
                      <div className="flex items-center space-x-2 mb-1">
                        <TrendingUp className="h-4 w-4 text-blue-600" />
                        <span className="text-xs font-medium text-blue-700 uppercase">Level</span>
                      </div>
                      <p className="text-2xl font-bold text-blue-900">{stats.level}</p>
                    </div>
                  )}
                  {stats.hp !== undefined && (
                    <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-lg p-4 border border-red-200">
                      <div className="flex items-center space-x-2 mb-1">
                        <Heart className="h-4 w-4 text-red-600" />
                        <span className="text-xs font-medium text-red-700 uppercase">HP</span>
                      </div>
                      <p className="text-2xl font-bold text-red-900">{stats.hp.toLocaleString()}</p>
                    </div>
                  )}
                  {stats.attack !== undefined && (
                    <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg p-4 border border-orange-200">
                      <div className="flex items-center space-x-2 mb-1">
                        <Sword className="h-4 w-4 text-orange-600" />
                        <span className="text-xs font-medium text-orange-700 uppercase">Attack</span>
                      </div>
                      <p className="text-2xl font-bold text-orange-900">{stats.attack}</p>
                    </div>
                  )}
                  {stats.defense !== undefined && (
                    <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-4 border border-purple-200">
                      <div className="flex items-center space-x-2 mb-1">
                        <Shield className="h-4 w-4 text-purple-600" />
                        <span className="text-xs font-medium text-purple-700 uppercase">Defense</span>
                      </div>
                      <p className="text-2xl font-bold text-purple-900">{stats.defense}</p>
                    </div>
                  )}
                  {stats.workSpeed !== undefined && (
                    <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-4 border border-green-200">
                      <div className="flex items-center space-x-2 mb-1">
                        <Zap className="h-4 w-4 text-green-600" />
                        <span className="text-xs font-medium text-green-700 uppercase">Work Speed</span>
                      </div>
                      <p className="text-2xl font-bold text-green-900">{stats.workSpeed}</p>
                    </div>
                  )}
                  {stats.moveSpeed !== undefined && (
                    <div className="bg-gradient-to-br from-cyan-50 to-cyan-100 rounded-lg p-4 border border-cyan-200">
                      <div className="flex items-center space-x-2 mb-1">
                        <Gauge className="h-4 w-4 text-cyan-600" />
                        <span className="text-xs font-medium text-cyan-700 uppercase">Move Speed</span>
                      </div>
                      <p className="text-2xl font-bold text-cyan-900">{stats.moveSpeed}</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            <div className="border-t border-gray-200 pt-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center">
                  <User className="h-6 w-6 text-primary-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">
                    {listing.user.name || 'Anonymous'}
                  </p>
                  <p className="text-sm text-gray-500">
                    Listed {format(new Date(listing.createdAt), 'MMM d, yyyy')}
                  </p>
                </div>
              </div>

              {!isOwner && (
                <button className="w-full py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-medium">
                  Contact Seller
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

