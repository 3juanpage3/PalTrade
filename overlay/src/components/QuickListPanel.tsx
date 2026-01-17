import React, { useState } from "react";
import { X, Plus } from "lucide-react";
import { overlayApi } from "../services/api";

interface QuickListPanelProps {
  onClose: () => void;
  onSuccess: () => void;
}

const PAL_TYPES = [
  "Anubis",
  "Axel",
  "Azurobe",
  "Belbegam",
  "Beakon",
  "Blazehowl",
  "Blazehowl Noct",
  "Blaze Condor",
  "Boar",
  "Bushi",
  "Cattiva",
  "Chillet",
  "Chingling",
  "Cinsnow",
  "Claw",
  "Crabrawler",
  "Creampup",
  "Crocalisk",
  "Daedream",
  "Dagstoise",
  "Damrocculus",
  "Dinossir",
  "Direhowl",
  "Dondozer",
  "Dragostrophe",
  "Drakeon",
  "Duma",
  "Dumud",
  "Dunragon",
  "Eaglet",
  "Eikthyrdeer",
  // ... add more pal types
];

const TRAITS = [
  "Lucky",
  "Blessed",
  "Swift-Footed",
  "Fiery",
  "Chilly",
  "Brawny",
  "Dainty",
  "Tiny",
  "Humongous",
  "Alpha",
];

export const QuickListPanel: React.FC<QuickListPanelProps> = ({
  onClose,
  onSuccess,
}) => {
  const [palType, setPalType] = useState("");
  const [level, setLevel] = useState(1);
  const [traits, setTraits] = useState<string[]>([]);
  const [price, setPrice] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleTraitToggle = (trait: string) => {
    setTraits((prev) =>
      prev.includes(trait) ? prev.filter((t) => t !== trait) : [...prev, trait]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await overlayApi.quickListPal({
        type: "pal",
        name: palType,
        description: `Level ${level} Pal with ${traits.join(", ")} traits`,
        price: parseFloat(price),
        quantity: 1,
        category: palType,
        stats: JSON.stringify({ level, traits }),
      });

      onSuccess();
      onClose();
    } catch (err: any) {
      setError(err.response?.data?.error || "Failed to create listing");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-900 border border-amber-500 rounded-lg p-6 w-96 shadow-2xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-white">Quick List Pal</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Pal Type */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Pal Type
            </label>
            <select
              value={palType}
              onChange={(e) => setPalType(e.target.value)}
              required
              className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded text-white placeholder-gray-500 focus:outline-none focus:border-amber-500"
            >
              <option value="">Select a Pal</option>
              {PAL_TYPES.map((pal) => (
                <option key={pal} value={pal}>
                  {pal}
                </option>
              ))}
            </select>
          </div>

          {/* Level */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Level: {level}
            </label>
            <input
              type="range"
              min="1"
              max="50"
              value={level}
              onChange={(e) => setLevel(parseInt(e.target.value))}
              className="w-full"
            />
          </div>

          {/* Traits */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Traits
            </label>
            <div className="grid grid-cols-2 gap-2">
              {TRAITS.map((trait) => (
                <button
                  key={trait}
                  type="button"
                  onClick={() => handleTraitToggle(trait)}
                  className={`
                    px-3 py-1 rounded text-sm font-medium transition
                    ${
                      traits.includes(trait)
                        ? "bg-amber-500 text-gray-900"
                        : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                    }
                  `}
                >
                  {trait}
                </button>
              ))}
            </div>
          </div>

          {/* Price */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Price (Gold)
            </label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
              placeholder="e.g., 50000"
              className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded text-white placeholder-gray-500 focus:outline-none focus:border-amber-500"
            />
          </div>

          {error && (
            <div className="p-3 bg-red-900 border border-red-700 rounded text-red-100 text-sm">
              {error}
            </div>
          )}

          <div className="flex gap-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-600 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 px-4 py-2 bg-amber-500 text-gray-900 rounded hover:bg-amber-600 transition disabled:opacity-50 font-medium flex items-center justify-center gap-2"
            >
              <Plus size={18} />
              {loading ? "Listing..." : "List Now"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
