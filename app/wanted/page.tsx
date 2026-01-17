"use client";

import { useState, useEffect } from "react";
import { Search, Plus, Trash2, ChevronDown, Bell } from "lucide-react";
import { palworldItems, palworldPals } from "@/data/palworld-data";

interface Order {
  id: string;
  type: "pal" | "item";
  name: string;
  description?: string;
  traits: string[];
  levelMin?: number;
  levelMax?: number;
  willingToPay: number;
  urgency: "low" | "medium" | "high";
  createdAt: string;
  userName: string;
}

interface OrderResponse {
  id: string;
  orderId: string;
  respondentName: string;
  message: string;
  createdAt: string;
}

interface OrderFilters {
  search: string;
  type: "all" | "pal" | "item";
  urgency: "all" | "low" | "medium" | "high";
  minPrice: number;
  maxPrice: number;
}

const STORAGE_KEY = "paltrade_orders";
const RESPONSES_STORAGE_KEY = "paltrade_responses";

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [filters, setFilters] = useState<OrderFilters>({
    search: "",
    type: "all",
    urgency: "all",
    minPrice: 0,
    maxPrice: 1000000,
  });
  const [showPostModal, setShowPostModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [showAcceptModal, setShowAcceptModal] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  // Load orders from localStorage on mount
  useEffect(() => {
    setIsMounted(true);
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setOrders(JSON.parse(stored));
      }
    } catch (error) {
      console.error("Error loading orders:", error);
    }
  }, []);

  // Filter orders
  const filteredOrders = orders.filter((order) => {
    if (filters.type !== "all" && order.type !== filters.type) return false;
    if (filters.urgency !== "all" && order.urgency !== filters.urgency)
      return false;
    if (order.willingToPay < filters.minPrice) return false;
    if (order.willingToPay > filters.maxPrice) return false;
    if (filters.search) {
      const search = filters.search.toLowerCase();
      return (
        order.name.toLowerCase().includes(search) ||
        (order.description?.toLowerCase().includes(search) ?? false)
      );
    }
    return true;
  });

  const deleteOrder = (id: string) => {
    setOrders((prev) => {
      const updated = prev.filter((o) => o.id !== id);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  };

  const getUrgencyColor = (urgency: string) => {
    const colors: any = {
      high: "bg-red-100 text-red-800 border-red-300",
      medium: "bg-yellow-100 text-yellow-800 border-yellow-300",
      low: "bg-green-100 text-green-800 border-green-300",
    };
    return colors[urgency] || colors.medium;
  };

  if (!isMounted) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Orders</h1>
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
              Post an Order
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 space-y-6 bg-white p-6 rounded-lg border border-gray-200">
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
                    placeholder="Search orders..."
                    value={filters.search}
                    onChange={(e) =>
                      setFilters((prev) => ({ ...prev, search: e.target.value }))
                    }
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
                  onChange={(e) =>
                    setFilters((prev) => ({ ...prev, type: e.target.value as any }))
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="all">All Types</option>
                  <option value="pal">Pal</option>
                  <option value="item">Item</option>
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
                    setFilters((prev) => ({
                      ...prev,
                      urgency: e.target.value as any,
                    }))
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="all">All Urgencies</option>
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>

              {/* Price Range */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Price Range
                </label>
                <input
                  type="number"
                  placeholder="Min"
                  value={filters.minPrice}
                  onChange={(e) =>
                    setFilters((prev) => ({
                      ...prev,
                      minPrice: parseInt(e.target.value) || 0,
                    }))
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg mb-2"
                />
                <input
                  type="number"
                  placeholder="Max"
                  value={filters.maxPrice}
                  onChange={(e) =>
                    setFilters((prev) => ({
                      ...prev,
                      maxPrice: parseInt(e.target.value) || 1000000,
                    }))
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                />
              </div>

              {/* Results Count */}
              <div className="bg-blue-50 px-4 py-3 rounded-lg">
                <p className="text-sm font-semibold text-blue-900">
                  {filteredOrders.length} orders found
                </p>
              </div>
            </div>
          </div>

          {/* Orders Grid */}
          <div className="lg:col-span-3">
            {filteredOrders.length === 0 ? (
              <div className="text-center py-16">
                <div className="text-6xl mb-4">📋</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  No orders found
                </h3>
                <p className="text-gray-600">
                  {orders.length === 0
                    ? "Be the first to post an order!"
                    : "Try adjusting your filters"}
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredOrders.map((order) => (
                  <div
                    key={order.id}
                    className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition"
                  >
                    <div className="p-4 space-y-3">
                      {/* Type Badge */}
                      <div className="flex items-start justify-between">
                        <span className="inline-block px-2 py-1 bg-blue-100 text-blue-800 text-xs font-semibold rounded">
                          {order.type === "pal" ? "🐾 Pal" : "📦 Item"}
                        </span>
                        <button
                          onClick={() => deleteOrder(order.id)}
                          className="text-gray-400 hover:text-red-600 transition"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>

                      {/* Name */}
                      <h3 className="text-lg font-bold text-gray-900">
                        {order.name}
                      </h3>

                      {/* Description */}
                      {order.description && (
                        <p className="text-sm text-gray-600">{order.description}</p>
                      )}

                      {/* Traits */}
                      {order.traits.length > 0 && (
                        <div className="flex flex-wrap gap-1">
                          {order.traits.map((trait) => (
                            <span
                              key={trait}
                              className="inline-block px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded"
                            >
                              {trait}
                            </span>
                          ))}
                        </div>
                      )}

                      {/* Level Range */}
                      {order.levelMin !== undefined && order.levelMax !== undefined && (
                        <div className="flex items-center justify-between text-sm border-t border-gray-200 pt-2">
                          <span className="text-gray-600">Level Range:</span>
                          <span className="font-semibold text-gray-900">
                            {order.levelMin} - {order.levelMax}
                          </span>
                        </div>
                      )}

                      {/* Price */}
                      <div className="flex items-center justify-between text-sm border-t border-gray-200 pt-2">
                        <span className="text-gray-600">Willing to Pay:</span>
                        <span className="font-bold text-blue-600">
                          ${order.willingToPay.toLocaleString()}
                        </span>
                      </div>

                      {/* Posted By */}
                      <div className="flex items-center justify-between text-xs text-gray-600 border-t border-gray-200 pt-2">
                        <span>By: {order.userName}</span>
                        <span>{new Date(order.createdAt).toLocaleDateString()}</span>
                      </div>

                      {/* Urgency Badge */}
                      <div className="pt-2">
                        <span
                          className={`inline-block px-3 py-1 rounded-full text-xs font-semibold border ${getUrgencyColor(
                            order.urgency
                          )}`}
                        >
                          {order.urgency.charAt(0).toUpperCase() +
                            order.urgency.slice(1)}{" "}
                          Urgency
                        </span>
                      </div>

                      {/* CTA Button */}
                      <button
                        onClick={() => {
                          setSelectedOrder(order);
                          setShowAcceptModal(true);
                        }}
                        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition font-medium text-sm"
                      >
                        Accept Order
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
        <PostOrderModal
          onClose={() => setShowPostModal(false)}
          onSuccess={(newOrder) => {
            setOrders((prev) => [newOrder, ...prev]);
            const updated = [newOrder, ...orders];
            localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
          }}
        />
      )}

      {/* Accept Order Modal */}
      {showAcceptModal && selectedOrder && (
        <AcceptOrderModal
          order={selectedOrder}
          onClose={() => {
            setShowAcceptModal(false);
            setSelectedOrder(null);
          }}
          onSuccess={() => {
            setShowAcceptModal(false);
            setSelectedOrder(null);
          }}
        />
      )}
    </div>
  );
}

function PostOrderModal({
  onClose,
  onSuccess,
}: {
  onClose: () => void;
  onSuccess: (order: Order) => void;
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
  const [showDropdown, setShowDropdown] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const getOptions = () => {
    if (formData.type === "pal") {
      return palworldPals.map((pal) => pal.name);
    } else {
      return palworldItems.map((item) => item.name);
    }
  };

  const filteredOptions = getOptions().filter((option) =>
    option.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Validation
    if (!formData.name) {
      setError("Please select a name");
      return;
    }
    if (!formData.willingToPay || parseFloat(formData.willingToPay) <= 0) {
      setError("Please enter a valid price");
      return;
    }

    setLoading(true);

    try {
      const newOrder: Order = {
        id: Date.now().toString(),
        type: formData.type as "pal" | "item",
        name: formData.name,
        description: formData.description,
        traits: formData.traits.split(",").filter((t) => t.trim()),
        levelMin: formData.levelMin ? parseInt(formData.levelMin) : undefined,
        levelMax: formData.levelMax ? parseInt(formData.levelMax) : undefined,
        willingToPay: parseFloat(formData.willingToPay),
        urgency: formData.urgency as "low" | "medium" | "high",
        createdAt: new Date().toISOString(),
        userName: "You",
      };

      onSuccess(newOrder);
      onClose();
    } catch (err) {
      setError("Failed to create order");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6 flex justify-between items-center">
          <h2 className="text-xl font-bold">Post an Order</h2>
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

          {/* Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Type
            </label>
            <select
              value={formData.type}
              onChange={(e) => {
                setFormData((prev) => ({
                  ...prev,
                  type: e.target.value,
                  name: "",
                }));
                setSearchQuery("");
              }}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            >
              <option value="pal">Pal</option>
              <option value="item">Item</option>
            </select>
          </div>

          {/* Name with Dropdown */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {formData.type === "pal" ? "Pal Name" : "Item Name"} *
            </label>
            <div className="relative">
              <button
                type="button"
                onClick={() => setShowDropdown(!showDropdown)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-left flex items-center justify-between hover:bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <span className={formData.name ? "text-gray-900" : "text-gray-500"}>
                  {formData.name || "Select a name..."}
                </span>
                <ChevronDown className="h-4 w-4 text-gray-400" />
              </button>

              {showDropdown && (
                <div className="absolute top-full left-0 right-0 mt-1 border border-gray-300 rounded-lg bg-white shadow-lg z-50">
                  <div className="p-2 border-b border-gray-200">
                    <input
                      type="text"
                      placeholder="Search..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      autoFocus
                    />
                  </div>
                  <ul className="max-h-48 overflow-y-auto">
                    {filteredOptions.length > 0 ? (
                      filteredOptions.map((option) => (
                        <li key={option}>
                          <button
                            type="button"
                            onClick={() => {
                              setFormData((prev) => ({ ...prev, name: option }));
                              setShowDropdown(false);
                              setSearchQuery("");
                            }}
                            className="w-full text-left px-3 py-2 hover:bg-blue-50 text-sm text-gray-700 transition"
                          >
                            {option}
                          </button>
                        </li>
                      ))
                    ) : (
                      <li className="px-3 py-2 text-sm text-gray-500">
                        No results found
                      </li>
                    )}
                  </ul>
                </div>
              )}
            </div>
          </div>

          {/* Description */}
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

          {/* Pal-specific fields */}
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

          {/* Price */}
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

          {/* Urgency */}
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

          {/* Buttons */}
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
              {loading ? "Posting..." : "Post Order"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
function AcceptOrderModal({
  order,
  onClose,
  onSuccess,
}: {
  order: Order;
  onClose: () => void;
  onSuccess: () => void;
}) {
  const [message, setMessage] = useState("");
  const [respondentName, setRespondentName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!respondentName.trim()) {
      setError("Please enter your name");
      return;
    }

    setLoading(true);

    try {
      // Create the response
      const response: OrderResponse = {
        id: Date.now().toString(),
        orderId: order.id,
        respondentName,
        message,
        createdAt: new Date().toISOString(),
      };

      // Get existing responses
      const existing = localStorage.getItem(RESPONSES_STORAGE_KEY);
      const responses: OrderResponse[] = existing ? JSON.parse(existing) : [];

      // Add new response
      responses.push(response);
      localStorage.setItem(RESPONSES_STORAGE_KEY, JSON.stringify(responses));

      // Create notification for the order creator
      const notification = {
        id: Date.now().toString(),
        orderId: order.id,
        type: "order_response",
        title: `${respondentName} accepted your ${order.type} order for ${order.name}`,
        message: message || `${respondentName} has what you're looking for!`,
        read: false,
        createdAt: new Date().toISOString(),
        respondentName,
      };

      const existingNotifications = localStorage.getItem("paltrade_notifications");
      const notifications = existingNotifications ? JSON.parse(existingNotifications) : [];
      notifications.push(notification);
      localStorage.setItem("paltrade_notifications", JSON.stringify(notifications));

      // Show success and close
      alert(
        `✅ Success! Your response has been sent to ${order.userName}. They'll see a notification about it!`
      );
      onSuccess();
    } catch (err) {
      setError("Failed to send response");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-gradient-to-r from-green-600 to-green-700 text-white p-6 flex justify-between items-center">
          <h2 className="text-xl font-bold">Accept Order</h2>
          <button
            onClick={onClose}
            className="text-2xl leading-none hover:text-green-200 transition"
          >
            ×
          </button>
        </div>

        <div className="p-6">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <h3 className="font-bold text-gray-900 mb-2">{order.name}</h3>
            <p className="text-sm text-gray-700">
              Willing to pay: <span className="font-bold text-blue-600">${order.willingToPay.toLocaleString()}</span>
            </p>
            {order.description && (
              <p className="text-sm text-gray-700 mt-2">{order.description}</p>
            )}
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Your Name *
              </label>
              <input
                type="text"
                value={respondentName}
                onChange={(e) => setRespondentName(e.target.value)}
                placeholder="Enter your name"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Message (optional)
              </label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Tell them what you have and any other details..."
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
                rows={4}
              />
            </div>

            <div className="bg-green-50 border border-green-200 rounded-lg p-3 text-sm text-green-800">
              <p>✅ A notification will be sent to <strong>{order.userName}</strong> once you submit.</p>
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
                className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-green-400 transition font-medium"
              >
                {loading ? "Sending..." : "Accept & Notify"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}