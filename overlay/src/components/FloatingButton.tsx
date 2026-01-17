import React, { useState } from "react";
import { ChevronDown, Plus, Bell } from "lucide-react";

interface FloatingButtonProps {
  isExpanded: boolean;
  onToggle: () => void;
  notificationCount: number;
  onListNewClick: () => void;
  onViewListingsClick: () => void;
  onNotificationsClick: () => void;
}

export const FloatingButton: React.FC<FloatingButtonProps> = ({
  isExpanded,
  onToggle,
  notificationCount,
  onListNewClick,
  onViewListingsClick,
  onNotificationsClick,
}) => {
  return (
    <div className="fixed bottom-8 right-8 z-50">
      {isExpanded && (
        <div className="absolute bottom-16 right-0 bg-gray-900 border border-amber-500 rounded-lg shadow-2xl overflow-hidden w-48">
          <button
            onClick={onListNewClick}
            className="w-full px-4 py-3 hover:bg-gray-800 flex items-center gap-2 text-white transition"
          >
            <Plus size={18} />
            <span>Quick List Pal</span>
          </button>
          <div className="border-t border-gray-700" />
          <button
            onClick={onViewListingsClick}
            className="w-full px-4 py-3 hover:bg-gray-800 flex items-center gap-2 text-white transition"
          >
            <span>📋</span>
            <span>My Listings</span>
          </button>
          <div className="border-t border-gray-700" />
          <button
            onClick={onNotificationsClick}
            className="w-full px-4 py-3 hover:bg-gray-800 flex items-center gap-2 text-white transition relative"
          >
            <Bell size={18} />
            <span>Notifications</span>
            {notificationCount > 0 && (
              <span className="absolute right-2 top-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {notificationCount}
              </span>
            )}
          </button>
        </div>
      )}

      <button
        onClick={onToggle}
        className={`
          w-12 h-12 rounded-full flex items-center justify-center
          transition transform duration-200
          ${
            isExpanded
              ? "bg-amber-500 hover:bg-amber-600"
              : "bg-amber-600 hover:bg-amber-700"
          }
          text-white shadow-lg hover:shadow-xl
          ${isExpanded ? "rotate-180" : ""}
        `}
        title="PalTrade Menu"
      >
        <ChevronDown size={24} />
      </button>
    </div>
  );
};
