import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import { getAuthToken, initiateOAuth, clearAuthToken } from "./services/api";
import { FloatingButton } from "./components/FloatingButton";
import { QuickListPanel } from "./components/QuickListPanel";
import "./overlay.css";

const Overlay = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [showQuickList, setShowQuickList] = useState(false);
  const [notificationCount, setNotificationCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is authenticated
    const token = getAuthToken();
    setIsAuthenticated(!!token);
    setLoading(false);

    // Listen for messages from background script
    const handleMessage = (event: MessageEvent) => {
      if (event.origin !== window.location.origin) return;

      const { type, payload } = event.data;

      switch (type) {
        case "TRADE_NOTIFICATION":
          setNotificationCount((prev) => prev + 1);
          break;
        case "OFFER_UPDATE":
          setNotificationCount((prev) => Math.max(0, prev + 1));
          break;
        case "NEW_MESSAGE":
          setNotificationCount((prev) => prev + 1);
          break;
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  const handleLogin = () => {
    initiateOAuth();
  };

  const handleLogout = () => {
    clearAuthToken();
    setIsAuthenticated(false);
    setIsExpanded(false);
  };

  const handleListNewClick = () => {
    setShowQuickList(true);
    setIsExpanded(false);
  };

  const handleViewListingsClick = () => {
    // Open listings in a popup or navigate to the site
    window.open(
      "https://paltrade.vercel.app/listings",
      "PalTrade Listings",
      "width=800,height=600"
    );
  };

  const handleNotificationsClick = () => {
    window.open(
      "https://paltrade.vercel.app/profile",
      "PalTrade Profile",
      "width=800,height=600"
    );
    setNotificationCount(0);
  };

  if (loading) {
    return null;
  }

  if (!isAuthenticated) {
    return (
      <div className="fixed bottom-8 right-8 z-50">
        <div className="bg-gray-900 border border-amber-500 rounded-lg p-6 shadow-2xl w-80">
          <h3 className="text-white font-bold mb-2">Welcome to PalTrade</h3>
          <p className="text-gray-300 text-sm mb-4">
            Sign in to list your Pals and receive trade notifications in-game
          </p>
          <button
            onClick={handleLogin}
            className="w-full px-4 py-2 bg-amber-500 text-gray-900 rounded font-medium hover:bg-amber-600 transition"
          >
            Sign In
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <FloatingButton
        isExpanded={isExpanded}
        onToggle={() => setIsExpanded(!isExpanded)}
        notificationCount={notificationCount}
        onListNewClick={handleListNewClick}
        onViewListingsClick={handleViewListingsClick}
        onNotificationsClick={handleNotificationsClick}
      />

      {showQuickList && (
        <QuickListPanel
          onClose={() => setShowQuickList(false)}
          onSuccess={() => {
            console.log("Listing created successfully");
            setShowQuickList(false);
          }}
        />
      )}
    </>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(<Overlay />);
