'use client'

import Link from 'next/link'
import { format } from 'date-fns'
import { Coins, Package } from 'lucide-react'

interface ListingCardProps {
  listing: {
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
}

export default function ListingCard({ listing }: ListingCardProps) {
  return (
    <Link href={`/listings/${listing.id}`}>
      <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden border border-gray-200">
        <div className="relative h-48 bg-gradient-to-br from-primary-100 to-primary-200 overflow-hidden">
          {listing.image ? (
            <>
              {/* Use regular img for external URLs to avoid Next.js Image issues */}
              <img
                src={listing.image}
                alt={listing.name}
                className="absolute inset-0 w-full h-full object-cover"
                onError={(e) => {
                  console.error('Image failed to load:', listing.image, 'for listing:', listing.name)
                }}
                onLoad={() => {
                  console.log('Image loaded successfully:', listing.image)
                }}
              />
            </>
          ) : (
            <div className="flex items-center justify-center h-full">
              <Package className="h-16 w-16 text-primary-400" />
            </div>
          )}
          <div className="absolute top-2 right-2">
            <span className="px-2 py-1 text-xs font-semibold rounded-full bg-primary-600 text-white">
              {listing.type === 'pal' ? 'Pal' : 'Item'}
            </span>
          </div>
        </div>
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-1 truncate">
            {listing.name}
          </h3>
          {listing.description && (
            <p className="text-sm text-gray-600 mb-2 line-clamp-2">
              {listing.description}
            </p>
          )}
          <div className="flex items-center justify-between mt-3">
            <div className="flex items-center space-x-1 text-primary-600">
              <Coins className="h-5 w-5" />
              <span className="text-xl font-bold">{listing.price.toFixed(2)}</span>
            </div>
            <span className="text-xs text-gray-500">
              Qty: {listing.quantity}
            </span>
          </div>
          {listing.category && (
            <div className="mt-2">
              <span className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded">
                {listing.category}
              </span>
            </div>
          )}
          <div className="mt-3 pt-3 border-t border-gray-200">
            <p className="text-xs text-gray-500">
              Listed {format(new Date(listing.createdAt), 'MMM d, yyyy')}
            </p>
          </div>
        </div>
      </div>
    </Link>
  )
}

