import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import { NotificationToast } from "./components/NotificationToast";

interface Notification {
  id: string;
  type: "offer" | "message" | "trade" | "listing";
  title: string;
  description: string;
  actionUrl?: string;
}

const NotificationsWindow = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.origin !== window.location.origin) return;

      const { type, payload } = event.data;

      if (type === "TRADE_NOTIFICATION") {
        addNotification({
          type: "trade",
          title: `${payload.buyerName} wants to trade!`,
          description: payload.description,
          actionUrl: `https://paltrade.vercel.app/listings/${payload.listingId}`,
        });
      } else if (type === "OFFER_UPDATE") {
        addNotification({
          type: "offer",
          title: "Offer Update",
          description: payload.message,
        });
      } else if (type === "NEW_MESSAGE") {
        addNotification({
          type: "message",
          title: `Message from ${payload.senderName}`,
          description: payload.preview,
        });
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  const addNotification = (notification: Omit<Notification, "id">) => {
    const id = Date.now().toString();
    setNotifications((prev) => [...prev, { ...notification, id }]);
  };

  const dismissNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  return (
    <div className="p-2 space-y-2">
      {notifications.map((notification) => (
        <NotificationToast
          key={notification.id}
          {...notification}
          onDismiss={dismissNotification}
        />
      ))}
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(<NotificationsWindow />);
