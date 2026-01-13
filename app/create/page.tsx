"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  palworldItems,
  palworldPals,
  itemCategories,
  palTypes,
  getPalImageUrl,
} from "@/data/palworld-data";
import { itemImageUrls } from "@/data/items-images";
import { Plus, X } from "lucide-react";

export default function CreateListingPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    type: "item",
    selectedId: "", // Store the ID of selected item/pal
    name: "", // Store the display name
    description: "",
    price: "",
    quantity: "1",
    category: "",
    stats: "",
    image: "", // Image URL
    shopX: "",
    shopY: "",
  });

  const [palStats, setPalStats] = useState({
    level: "",
    hp: "",
    attack: "",
    defense: "",
    workSpeed: "",
    moveSpeed: "",
  });

  const [tradeOptions, setTradeOptions] = useState<
    Array<{ type: string; value: string }>
  >([]);
  const [newTradeItemId, setNewTradeItemId] = useState("");
  const [newTradeQuantity, setNewTradeQuantity] = useState("");
  const [tradeSearchQuery, setTradeSearchQuery] = useState("");
  const [showTradeDropdown, setShowTradeDropdown] = useState(false);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  if (status === "loading") {
    return (
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center">
        <div className="text-gray-600">Loading...</div>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  const handleTypeChange = (type: string) => {
    setFormData({ ...formData, type, selectedId: "", name: "", category: "" });
    if (type === "item") {
      setPalStats({
        level: "",
        hp: "",
        attack: "",
        defense: "",
        workSpeed: "",
        moveSpeed: "",
      });
    }
  };

  const handleNameChange = (selectedId: string) => {
    if (formData.type === "item") {
      const item = palworldItems.find((i) => i.id === selectedId);
      if (item) {
        setFormData((prev) => ({
          ...prev,
          selectedId,
          name: item.name,
          category: item.category,
          image: "",
        }));
      }
    } else {
      const pal = palworldPals.find((p) => p.id === selectedId);
      if (pal) {
        const imageUrl = getPalImageUrl(selectedId);
        console.log("Pal selected:", pal.name, "Image URL:", imageUrl);
        setFormData((prev) => ({
          ...prev,
          selectedId,
          name: pal.name,
          category: pal.type,
          image: imageUrl || "",
        }));
      }
    }
  };

  // Filter items for trade options search
  const filteredTradeItems = palworldItems.filter((item) =>
    item.name.toLowerCase().includes(tradeSearchQuery.toLowerCase())
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // Build stats object from individual fields (only include non-empty values)
      const statsObj: any = {};
      if (palStats.level) statsObj.level = parseInt(palStats.level);
      if (palStats.hp) statsObj.hp = parseInt(palStats.hp);
      if (palStats.attack) statsObj.attack = parseInt(palStats.attack);
      if (palStats.defense) statsObj.defense = parseInt(palStats.defense);
      if (palStats.workSpeed) statsObj.workSpeed = parseInt(palStats.workSpeed);
      if (palStats.moveSpeed) statsObj.moveSpeed = parseInt(palStats.moveSpeed);

      const statsString =
        Object.keys(statsObj).length > 0 ? JSON.stringify(statsObj) : "";

      const payload = {
        ...formData,
        price: parseFloat(formData.price),
        quantity: parseInt(formData.quantity),
        shopX: formData.shopX ? parseInt(formData.shopX) : null,
        shopY: formData.shopY ? parseInt(formData.shopY) : null,
        stats: statsString,
        tradeOptions:
          tradeOptions.length > 0 ? JSON.stringify(tradeOptions) : null,
      };
      console.log("Submitting listing with image:", payload.image);

      const response = await fetch("/api/listings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Failed to create listing");
      } else {
        router.push(`/listings/${data.id}`);
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold text-gray-900 mb-8">
        Create New Listing
      </h1>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg">
          {error}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-lg shadow-md p-8 space-y-6"
      >
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Listing Type
          </label>
          <div className="flex space-x-4">
            <button
              type="button"
              onClick={() => handleTypeChange("item")}
              className={`flex-1 py-3 px-4 rounded-lg border-2 transition-colors ${
                formData.type === "item"
                  ? "border-primary-600 bg-primary-50 text-primary-700"
                  : "border-gray-300 text-gray-700 hover:border-gray-400"
              }`}
            >
              Item
            </button>
            <button
              type="button"
              onClick={() => handleTypeChange("pal")}
              className={`flex-1 py-3 px-4 rounded-lg border-2 transition-colors ${
                formData.type === "pal"
                  ? "border-primary-600 bg-primary-50 text-primary-700"
                  : "border-gray-300 text-gray-700 hover:border-gray-400"
              }`}
            >
              Pal
            </button>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {formData.type === "item" ? "Item" : "Pal"}
          </label>
          <select
            value={formData.selectedId}
            onChange={(e) => handleNameChange(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            <option value="">
              Select {formData.type === "item" ? "Item" : "Pal"}...
            </option>
            {formData.type === "item"
              ? palworldItems.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                ))
              : palworldPals.map((pal) => (
                  <option key={pal.id} value={pal.id}>
                    {pal.name}
                  </option>
                ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Description (Optional)
          </label>
          <textarea
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            rows={4}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            placeholder="Add any additional details about your listing..."
          />
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Price
            </label>
            <input
              type="number"
              step="0.01"
              min="0"
              value={formData.price}
              onChange={(e) =>
                setFormData({ ...formData, price: e.target.value })
              }
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="0.00"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Quantity
            </label>
            <input
              type="number"
              min="1"
              value={formData.quantity}
              onChange={(e) =>
                setFormData({ ...formData, quantity: e.target.value })
              }
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Shop Location X (Optional)
            </label>
            <input
              type="number"
              step="1"
              value={formData.shopX}
              onChange={(e) =>
                setFormData({ ...formData, shopX: e.target.value })
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="e.g., 123"
            />
            <p className="text-xs text-gray-500 mt-1">East-West coordinate</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Shop Location Y (Optional)
            </label>
            <input
              type="number"
              step="1"
              value={formData.shopY}
              onChange={(e) =>
                setFormData({ ...formData, shopY: e.target.value })
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="e.g., 456"
            />
            <p className="text-xs text-gray-500 mt-1">North-South coordinate</p>
          </div>
        </div>

        {formData.type === "pal" && (
          <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
            <label className="block text-sm font-medium text-gray-700 mb-4">
              Pal Stats (Optional)
            </label>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">
                  Level
                </label>
                <input
                  type="number"
                  min="1"
                  max="50"
                  value={palStats.level}
                  onChange={(e) =>
                    setPalStats({ ...palStats, level: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white"
                  placeholder="1-50"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">
                  HP
                </label>
                <input
                  type="number"
                  min="0"
                  value={palStats.hp}
                  onChange={(e) =>
                    setPalStats({ ...palStats, hp: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white"
                  placeholder="Health Points"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">
                  Attack
                </label>
                <input
                  type="number"
                  min="0"
                  value={palStats.attack}
                  onChange={(e) =>
                    setPalStats({ ...palStats, attack: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white"
                  placeholder="Attack Power"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">
                  Defense
                </label>
                <input
                  type="number"
                  min="0"
                  value={palStats.defense}
                  onChange={(e) =>
                    setPalStats({ ...palStats, defense: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white"
                  placeholder="Defense Power"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">
                  Work Speed
                </label>
                <input
                  type="number"
                  min="0"
                  value={palStats.workSpeed}
                  onChange={(e) =>
                    setPalStats({ ...palStats, workSpeed: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white"
                  placeholder="Work Speed"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">
                  Move Speed
                </label>
                <input
                  type="number"
                  min="0"
                  value={palStats.moveSpeed}
                  onChange={(e) =>
                    setPalStats({ ...palStats, moveSpeed: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white"
                  placeholder="Movement Speed"
                />
              </div>
            </div>
            <p className="mt-3 text-xs text-gray-500">
              Leave fields empty if you don&apos;t want to specify that stat
            </p>
          </div>
        )}

        <div className="bg-blue-50 rounded-lg p-6 border border-blue-200">
          <label className="block text-sm font-medium text-gray-700 mb-4">
            ✨ Alternative Trade Options (Optional)
          </label>
          <p className="text-sm text-gray-600 mb-4">
            Let buyers know what items you&apos;ll accept in trade. Search from
            all game items!
          </p>

          <div className="space-y-3">
            {tradeOptions.map((option, idx) => {
              const item = palworldItems.find((i) => i.name === option.type);
              const itemImg = item ? itemImageUrls[item.id] : null;
              return (
                <div
                  key={idx}
                  className="flex items-center space-x-3 bg-white p-3 rounded-lg border border-blue-200"
                >
                  {itemImg && (
                    <div className="relative h-8 w-8 flex-shrink-0">
                      <Image
                        src={itemImg}
                        alt={option.type}
                        fill
                        className="object-contain"
                        unoptimized
                      />
                    </div>
                  )}
                  <span className="flex-1 font-medium text-gray-900">
                    {option.value} {option.type}
                  </span>
                  <button
                    type="button"
                    onClick={() =>
                      setTradeOptions(tradeOptions.filter((_, i) => i !== idx))
                    }
                    className="p-1 text-red-600 hover:bg-red-50 rounded"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
              );
            })}
          </div>

          <div className="mt-4 space-y-3">
            <div className="relative">
              <input
                type="text"
                value={tradeSearchQuery}
                onChange={(e) => {
                  setTradeSearchQuery(e.target.value);
                  setShowTradeDropdown(true);
                }}
                onFocus={() => setShowTradeDropdown(true)}
                placeholder="Search items (e.g., Coal, Wood, Stone)..."
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />

              {showTradeDropdown && (
                <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-64 overflow-y-auto">
                  {filteredTradeItems.length > 0 ? (
                    filteredTradeItems.map((item) => {
                      const imgUrl = itemImageUrls[item.id];
                      return (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => {
                            setNewTradeItemId(item.id);
                            setTradeSearchQuery(item.name);
                            setShowTradeDropdown(false);
                          }}
                          className="w-full text-left px-3 py-3 hover:bg-blue-50 transition-colors flex items-center space-x-3"
                        >
                          {imgUrl && (
                            <div className="relative h-8 w-8 flex-shrink-0">
                              <Image
                                src={imgUrl}
                                alt={item.name}
                                fill
                                className="object-contain"
                                unoptimized
                              />
                            </div>
                          )}
                          <div>
                            <div className="font-medium text-gray-900">
                              {item.name}
                            </div>
                            <div className="text-xs text-gray-500">
                              {item.category}
                            </div>
                          </div>
                        </button>
                      );
                    })
                  ) : (
                    <div className="px-3 py-2 text-gray-500 text-sm">
                      No items found
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="flex space-x-2">
              <input
                type="number"
                min="1"
                value={newTradeQuantity}
                onChange={(e) => setNewTradeQuantity(e.target.value)}
                placeholder="Quantity"
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
              <button
                type="button"
                onClick={() => {
                  if (newTradeItemId && newTradeQuantity) {
                    const selectedItem = palworldItems.find(
                      (i) => i.id === newTradeItemId
                    );
                    if (selectedItem) {
                      setTradeOptions([
                        ...tradeOptions,
                        {
                          type: selectedItem.name,
                          value: newTradeQuantity,
                        },
                      ]);
                      setNewTradeItemId("");
                      setNewTradeQuantity("");
                      setTradeSearchQuery("");
                      setShowTradeDropdown(false);
                    }
                  }
                }}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Plus className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>

        <div className="flex space-x-4 pt-4">
          <button
            type="submit"
            disabled={loading}
            className="flex-1 flex items-center justify-center space-x-2 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Plus className="h-5 w-5" />
            <span>{loading ? "Creating..." : "Create Listing"}</span>
          </button>
          <button
            type="button"
            onClick={() => router.back()}
            className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
