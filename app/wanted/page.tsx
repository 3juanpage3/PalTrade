"use client";

import { useState, useEffect, useCallback } from "react";
import { Search, Plus, AlertCircle, Loader } from "lucide-react";
import Image from "next/image";

interface WantedItem {
  id: string;
  userId: string;
  user: { name: string; image?: string };
  type: "pal" | "item";
  name: string;
  description?: string;
  traits: string[];
  levelMin?: number;
  levelMax?: number;
  willingToPay: number;
  urgency: "low" | "medium" | "high";
  createdAt: string;
  _count?: { responses: number };
}

interface WantedSearchFilters {
  search: string;
  type: "all" | "pal" | "item";
  urgency: "all" | "low" | "medium" | "high";
  minPrice: number;
  maxPrice: number;
}

export default function WantedPage() {
  const [wantedItems, setWantedItems] = useState<WantedItem[]>([]);
  const [filters, setFilters] = useState<WantedSearchFilters>({
    search: "",
    type: "all",
    urgency: "all",
    minPrice: 0,
    maxPrice: 1000000,
  });
  const [loading, setLoading] = useState(true);
  const [showPostModal, setShowPostModal] = useState(false);

  const fetchWantedItems = useCallback(async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        ...(filters.type !== "all" && { type: filters.type }),
        ...(filters.urgency !== "all" && { urgency: filters.urgency }),
        ...(filters.search && { search: filters.search }),
        minPrice: filters.minPrice.toString(),
        maxPrice: filters.maxPrice.toString(),
      });

      const response = await fetch(`/api/wanted?${params}`);
      if (!response.ok) throw new Error("Failed to fetch wanted items");
      const data = await response.json();
      setWantedItems(data);
    } catch (error) {
      console.error("Error fetching wanted items:", error);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchWantedItems();
  }, [fetchWantedItems]);

  const handleSearch = (value: string) => {
    setFilters((prev) => ({ ...prev, search: value }));
  };

  const handleFilterChange = (key: string, value: any) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const filteredWanted = wantedItems.filter((item) => {
    if (
      filters.search &&
      !item.name.toLowerCase().includes(filters.search.toLowerCase()) &&
      !item.description?.toLowerCase().includes(filters.search.toLowerCase())
    ) {
      return false;
    }
    if (filters.type !== "all" && item.type !== filters.type) return false;
    if (filters.urgency !== "all" && item.urgency !== filters.urgency)
      return false;
    if (
      item.willingToPay < filters.minPrice ||
      item.willingToPay > filters.maxPrice
    )
      return false;
    return true;
  });

  const getUrgencyColor = (urgency: string) => {
    const colors = {
      high: "bg-red-100 text-red-800 border-red-300",
      medium: "bg-yellow-100 text-yellow-800 border-yellow-300",
      low: "bg-green-100 text-green-800 border-green-300",
    };
    return colors[urgency as keyof typeof colors] || colors.medium;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Wanted Items & Pals
              </h1>
              <p className="text-gray-600 mt-2">
                Help traders find what they need - post notices for items and
                pals you&apos;re looking for
              </p>
            </div>
            <button
              onClick={() => setShowPostModal(true)}
              className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
            >
              <Plus size={20} />
              Post a Want
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 space-y-6">
              {/* Search */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Search
                </label>
                <div className="relative">
                  <Search
                    size={18}
                    className="absolute left-3 top-3 text-gray-400"
                  />
                  <input
                    type="text"
                    placeholder="Search wants..."
                    value={filters.search}
                    onChange={(e) => handleSearch(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Type Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Type
                </label>
                <select
                  value={filters.type}
                  onChange={(e) => handleFilterChange("type", e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="all">All Types</option>
                  <option value="pal">Pals</option>
                  <option value="item">Items</option>
                </select>
              </div>

              {/* Urgency Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Urgency
                </label>
                <select
                  value={filters.urgency}
                  onChange={(e) =>
                    handleFilterChange("urgency", e.target.value)
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="all">All Urgencies</option>
                  <option value="high">High</option>
                  <option value="medium">Medium</option>
                  <option value="low">Low</option>
                </select>
              </div>

              {/* Price Range */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Price Range
                </label>
                <div className="space-y-2">
                  <input
                    type="number"
                    placeholder="Min"
                    value={filters.minPrice}
                    onChange={(e) =>
                      handleFilterChange(
                        "minPrice",
                        parseInt(e.target.value) || 0
                      )
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <input
                    type="number"
                    placeholder="Max"
                    value={filters.maxPrice}
                    onChange={(e) =>
                      handleFilterChange(
                        "maxPrice",
                        parseInt(e.target.value) || 1000000
                      )
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Results Count */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-sm text-blue-800">
                  <strong>{filteredWanted.length}</strong> wants found
                </p>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {loading ? (
              <div className="flex items-center justify-center py-16">
                <Loader className="animate-spin text-blue-600" size={32} />
              </div>
            ) : filteredWanted.length === 0 ? (
              <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
                <AlertCircle size={48} className="mx-auto text-gray-400 mb-4" />
                <p className="text-gray-600 text-lg">No wanted items found</p>
                <p className="text-gray-500 mt-2">
                  Try adjusting your filters or be the first to post a want!
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredWanted.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition"
                  >
                    {/* Header */}
                    <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-4">
                      <div className="flex justify-between items-start gap-2">
                        <div>
                          <h3 className="font-bold text-lg text-gray-900">
                            {item.name}
                          </h3>
                          <span className="inline-block px-2 py-1 text-xs font-semibold rounded-full bg-gray-700 text-white mt-1">
                            {item.type.toUpperCase()}
                          </span>
                        </div>
                        <span
                          className={`px-3 py-1 text-xs font-semibold rounded-full border ${getUrgencyColor(
                            item.urgency
                          )}`}
                        >
                          {item.urgency.toUpperCase()}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-4 space-y-3">
                      {item.description && (
                        <p className="text-sm text-gray-600">
                          {item.description}
                        </p>
                      )}

                      {/* Traits */}
                      {item.traits && item.traits.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {item.traits.map((trait) => (
                            <span
                              key={trait}
                              className="px-2 py-1 text-xs bg-purple-100 text-purple-800 rounded-full"
                            >
                              {trait}
                            </span>
                          ))}
                        </div>
                      )}

                      {/* Level Range */}
                      {item.levelMin && item.levelMax && (
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600">Level Range:</span>
                          <span className="font-semibold text-gray-900">
                            {item.levelMin} - {item.levelMax}
                          </span>
                        </div>
                      )}

                      {/* Price */}
                      <div className="flex items-center justify-between text-sm border-t border-gray-200 pt-3">
                        <span className="text-gray-600">Willing to Pay:</span>
                        <span className="font-bold text-blue-600">
                          ${item.willingToPay.toLocaleString()}
                        </span>
                      </div>

                      {/* Posted By */}
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        {item.user.image && (
                          <Image
                            src={item.user.image}
                            alt={item.user.name || "User"}
                            width={24}
                            height={24}
                            className="rounded-full"
                          />
                        )}
                        <span>{item.user.name || "Anonymous"}</span>
                      </div>

                      {/* Responses */}
                      <div className="bg-gray-50 px-3 py-2 rounded text-sm text-center">
                        <span className="font-semibold text-gray-700">
                          {item._count?.responses || 0} responses
                        </span>
                      </div>

                      {/* CTA Button */}
                      <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition font-medium text-sm">
                        I Have This
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Post Modal */}
      {showPostModal && (
        <PostWantedModal
          onClose={() => setShowPostModal(false)}
          onSuccess={() => {
            fetchWantedItems();
            setShowPostModal(false);
          }}
        />
      )}
    </div>
  );
}

function PostWantedModal({
  onClose,
  onSuccess,
}: {
  onClose: () => void;
  onSuccess: () => void;
}) {
  const [formData, setFormData] = useState({
    type: "pal",
    name: "",
    description: "",
    traits: "",
    levelMin: "",
    levelMax: "",
    willingToPay: "",
    urgency: "medium",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch("/api/wanted", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          traits: formData.traits.split(",").filter((t) => t.trim()),
          levelMin: formData.levelMin ? parseInt(formData.levelMin) : undefined,
          levelMax: formData.levelMax ? parseInt(formData.levelMax) : undefined,
          willingToPay: parseFloat(formData.willingToPay),
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to post wanted item");
      }

      onSuccess();
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6 flex justify-between items-center">
          <h2 className="text-xl font-bold">Post a Want</h2>
          <button
            onClick={onClose}
            className="text-2xl leading-none hover:text-blue-200 transition"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Type
            </label>
            <select
              value={formData.type}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, type: e.target.value }))
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            >
              <option value="pal">Pal</option>
              <option value="item">Item</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Name *
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, name: e.target.value }))
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  description: e.target.value,
                }))
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              rows={3}
            />
          </div>

          {formData.type === "pal" && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Traits (comma-separated)
                </label>
                <input
                  type="text"
                  placeholder="e.g., Fire, Nocturnal"
                  value={formData.traits}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, traits: e.target.value }))
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Min Level
                  </label>
                  <input
                    type="number"
                    value={formData.levelMin}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        levelMin: e.target.value,
                      }))
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Max Level
                  </label>
                  <input
                    type="number"
                    value={formData.levelMax}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        levelMax: e.target.value,
                      }))
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
            </>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Willing to Pay *
            </label>
            <input
              type="number"
              value={formData.willingToPay}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  willingToPay: e.target.value,
                }))
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Urgency
            </label>
            <select
              value={formData.urgency}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, urgency: e.target.value }))
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>

          <div className="flex gap-3 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-blue-400 transition font-medium"
            >
              {loading ? "Posting..." : "Post Want"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
