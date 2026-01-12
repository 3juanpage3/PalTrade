'use client'

import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'
import { ShoppingBag, Plus, User, LogOut, LogIn } from 'lucide-react'

export default function Header() {
  const { data: session } = useSession()

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center space-x-2">
            <ShoppingBag className="h-8 w-8 text-primary-600" />
            <span className="text-2xl font-bold text-gray-900">PALTRADE</span>
          </Link>

          <nav className="hidden md:flex items-center space-x-6">
            <Link
              href="/browse"
              className="text-gray-700 hover:text-primary-600 transition-colors"
            >
              Browse
            </Link>
            {session && (
              <Link
                href="/create"
                className="flex items-center space-x-1 text-gray-700 hover:text-primary-600 transition-colors"
              >
                <Plus className="h-4 w-4" />
                <span>Create Listing</span>
              </Link>
            )}
            {session && (
              <Link
                href="/profile"
                className="flex items-center space-x-1 text-gray-700 hover:text-primary-600 transition-colors"
              >
                <User className="h-4 w-4" />
                <span>Profile</span>
              </Link>
            )}
          </nav>

          <div className="flex items-center space-x-4">
            {session ? (
              <>
                <span className="text-sm text-gray-600 hidden sm:inline">
                  {session.user?.name || session.user?.email}
                </span>
                <button
                  onClick={() => signOut()}
                  className="flex items-center space-x-1 px-4 py-2 text-sm font-medium text-gray-700 hover:text-primary-600 transition-colors"
                >
                  <LogOut className="h-4 w-4" />
                  <span className="hidden sm:inline">Sign Out</span>
                </button>
              </>
            ) : (
              <Link
                href="/login"
                className="flex items-center space-x-1 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
              >
                <LogIn className="h-4 w-4" />
                <span>Sign In</span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}

