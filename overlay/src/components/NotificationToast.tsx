import React, { useEffect } from "react";
import { Bell, X, TrendingUp, MessageCircle } from "lucide-react";

interface NotificationToastProps {
  id: string;
  type: "offer" | "message" | "trade" | "listing";
  title: string;
  description: string;
  actionUrl?: string;
  onDismiss: (id: string) => void;
  autoClose?: number;
}

export const NotificationToast: React.FC<NotificationToastProps> = ({
  id,
  type,
  title,
  description,
  actionUrl,
  onDismiss,
  autoClose = 5000,
}) => {
  useEffect(() => {
    if (autoClose > 0) {
      const timer = setTimeout(() => onDismiss(id), autoClose);
      return () => clearTimeout(timer);
    }
  }, [autoClose, id, onDismiss]);

  const getIcon = () => {
    switch (type) {
      case "offer":
        return <TrendingUp size={20} className="text-green-400" />;
      case "message":
        return <MessageCircle size={20} className="text-blue-400" />;
      case "trade":
        return <Bell size={20} className="text-amber-400" />;
      default:
        return <Bell size={20} className="text-purple-400" />;
    }
  };

  return (
    <div className="animate-in slide-in-from-top bg-gray-900 border border-amber-500 rounded-lg p-4 shadow-lg">
      <div className="flex gap-3">
        <div className="flex-shrink-0">{getIcon()}</div>
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-white text-sm">{title}</p>
          <p className="text-gray-300 text-xs mt-1">{description}</p>
          {actionUrl && (
            <button
              onClick={() => window.open(actionUrl)}
              className="text-amber-400 hover:text-amber-300 text-xs mt-2 font-medium transition"
            >
              View →
            </button>
          )}
        </div>
        <button
          onClick={() => onDismiss(id)}
          className="flex-shrink-0 text-gray-400 hover:text-gray-200 transition"
        >
          <X size={16} />
        </button>
      </div>
    </div>
  );
};
