'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { format } from 'date-fns'
import Image from 'next/image'
import { Coins, Package, User, Trash2, Edit, TrendingUp, Heart, Sword, Shield, Zap, Gauge, Send, Check, X } from 'lucide-react'

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
  isActive: boolean
  user: {
    id: string
    name?: string
    email?: string
    image?: string
  }
}

interface Offer {
  id: string
  offerType: string
  offerPrice: number
  offerName?: string
  offerImage?: string
  status: string
  createdAt: string
  bidder: {
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
  const [offers, setOffers] = useState<Offer[]>([])
  const [loading, setLoading] = useState(true)
  const [deleting, setDeleting] = useState(false)
  const [submittingOffer, setSubmittingOffer] = useState(false)
  const [offerType, setOfferType] = useState('coin')
  const [offerPrice, setOfferPrice] = useState('')
  const [offerName, setOfferName] = useState('')
  const [offerImage, setOfferImage] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      try {
        const listingRes = await fetch(`/api/listings/${params.id}`)
        const listingData = await listingRes.json()
        setListing(listingData)

        const offersRes = await fetch(`/api/offers?listingId=${params.id}`)
        const offersData = await offersRes.json()
        setOffers(offersData)
      } catch (err) {
        console.error('Error fetching data:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchData()

    // Poll for new bids every 5 seconds
    const interval = setInterval(fetchData, 5000)
    return () => clearInterval(interval)
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

  const handleSubmitOffer = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!offerPrice || (offerType !== 'coin' && !offerName)) {
      alert('Please fill in all required fields')
      return
    }

    setSubmittingOffer(true)
    try {
      const response = await fetch('/api/offers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          listingId: params.id,
          offerType,
          offerPrice: parseFloat(offerPrice),
          offerName: offerType !== 'coin' ? offerName : null,
          offerImage: offerType !== 'coin' ? offerImage : null,
        }),
      })

      if (response.ok) {
        const newOffer = await response.json()
        setOffers([newOffer, ...offers])
        setOfferPrice('')
        setOfferName('')
        setOfferImage('')
        alert('Bid placed successfully!')
      } else {
        const error = await response.json()
        alert(error.error || 'Failed to place bid')
      }
    } catch (err) {
      alert('Error placing bid')
    } finally {
      setSubmittingOffer(false)
    }
  }

  const handleAcceptOffer = async (offerId: string) => {
    if (!confirm('Accept this bid? Other bids will be rejected.')) return

    try {
      const response = await fetch(`/api/offers/${offerId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'accepted' }),
      })

      if (response.ok) {
        const updatedOffer = await response.json()
        setOffers(offers.map(o => o.id === offerId ? updatedOffer : o))
        setListing(listing ? { ...listing, isActive: false } : null)
        alert('Bid accepted!')
      }
    } catch (err) {
      alert('Error accepting bid')
    }
  }

  const handleRejectOffer = async (offerId: string) => {
    if (!confirm('Reject this bid?')) return

    try {
      const response = await fetch(`/api/offers/${offerId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'rejected' }),
      })

      if (response.ok) {
        const updatedOffer = await response.json()
        setOffers(offers.map(o => o.id === offerId ? updatedOffer : o))
      }
    } catch (err) {
      alert('Error rejecting bid')
    }
  }

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
              <Image
                src={listing.image}
                alt={listing.name}
                fill
                className="object-cover"
                unoptimized
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

              {!isOwner && listing.isActive && (
                <div className="mt-8">
                  <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <p className="text-blue-800 text-sm">
                      💡 <strong>Tip:</strong> Check the bell icon 🔔 in the header for bid notifications!
                    </p>
                  </div>

                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Place a Bid</h3>
                  <form onSubmit={handleSubmitOffer} className="space-y-4 bg-gray-50 p-6 rounded-lg border border-gray-200">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Bid Type
                      </label>
                      <select
                        value={offerType}
                        onChange={(e) => setOfferType(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      >
                        <option value="coin">Coins 🪙</option>
                        <option value="item">Item 📦</option>
                        <option value="pal">Pal 👾</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {offerType === 'coin' ? 'Coin Amount' : 'Price/Value'}
                      </label>
                      <input
                        type="number"
                        step="0.01"
                        value={offerPrice}
                        onChange={(e) => setOfferPrice(e.target.value)}
                        placeholder="Enter amount"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        required
                      />
                    </div>

                    {offerType !== 'coin' && (
                      <>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            {offerType === 'pal' ? 'Pal Name' : 'Item Name'}
                          </label>
                          <input
                            type="text"
                            value={offerName}
                            onChange={(e) => setOfferName(e.target.value)}
                            placeholder={`Enter ${offerType} name`}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                            required
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Image URL (optional)
                          </label>
                          <input
                            type="url"
                            value={offerImage}
                            onChange={(e) => setOfferImage(e.target.value)}
                            placeholder="https://example.com/image.jpg"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                          />
                        </div>
                      </>
                    )}

                    <button
                      type="submit"
                      disabled={submittingOffer}
                      className="w-full py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-medium flex items-center justify-center space-x-2 disabled:opacity-50"
                    >
                      <Send className="h-4 w-4" />
                      <span>{submittingOffer ? 'Submitting...' : 'Place Bid'}</span>
                    </button>
                  </form>
                </div>
              )}

              {listing.isActive && (
                <div className="mt-8 p-4 bg-green-50 border border-green-200 rounded-lg">
                  <p className="text-green-800 text-sm">✓ This listing is active and accepting bids</p>
                </div>
              )}

              {!listing.isActive && (
                <div className="mt-8 p-4 bg-gray-50 border border-gray-200 rounded-lg">
                  <p className="text-gray-800 text-sm">This listing is no longer active</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {offers.length > 0 && (
          <div className="border-t border-gray-200 p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Bids ({offers.length})</h2>
            <div className="space-y-4">
              {offers.map((offer) => (
                <div
                  key={offer.id}
                  className={`p-4 rounded-lg border-2 ${
                    offer.status === 'accepted'
                      ? 'bg-green-50 border-green-300'
                      : offer.status === 'rejected'
                      ? 'bg-gray-50 border-gray-300'
                      : 'bg-white border-gray-200'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-3">
                        <div className="h-8 w-8 rounded-full bg-primary-100 flex items-center justify-center">
                          <User className="h-5 w-5 text-primary-600" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">
                            {offer.bidder.name || 'Anonymous'}
                          </p>
                          <p className="text-xs text-gray-500">
                            {format(new Date(offer.createdAt), 'MMM d, yyyy HH:mm')}
                          </p>
                        </div>
                      </div>

                      <div className="ml-11 space-y-2">
                        <p className="text-sm text-gray-600">
                          Offering: <span className="font-semibold text-gray-900">{offer.offerType.toUpperCase()}</span>
                        </p>
                        <div className="flex items-center space-x-2">
                          <Coins className="h-4 w-4 text-primary-600" />
                          <span className="font-bold text-lg text-primary-600">
                            {offer.offerPrice.toFixed(2)}
                          </span>
                        </div>

                        {offer.offerName && (
                          <div>
                            <p className="text-sm text-gray-600">
                              Item: <span className="font-semibold text-gray-900">{offer.offerName}</span>
                            </p>
                            {offer.offerImage && (
                              <Image
                                src={offer.offerImage}
                                alt={offer.offerName}
                                width={100}
                                height={100}
                                className="mt-2 rounded h-24 w-24 object-cover"
                                unoptimized
                              />
                            )}
                          </div>
                        )}

                        {offer.status === 'accepted' && (
                          <p className="text-sm font-semibold text-green-700">✓ Accepted</p>
                        )}
                        {offer.status === 'rejected' && (
                          <p className="text-sm font-semibold text-gray-700">✗ Rejected</p>
                        )}
                      </div>
                    </div>

                    {isOwner && offer.status === 'pending' && (
                      <div className="flex space-x-2 ml-4">
                        <button
                          onClick={() => handleAcceptOffer(offer.id)}
                          className="p-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                          title="Accept bid"
                        >
                          <Check className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleRejectOffer(offer.id)}
                          className="p-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                          title="Reject bid"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

