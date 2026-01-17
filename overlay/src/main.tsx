import React from "react";
import ReactDOM from "react-dom/client";
import { getAuthToken, setAuthToken } from "./services/api";
import { overlayWs } from "./services/websocket";

/**
 * Main background script for the overlay
 * Handles WebSocket connections and inter-process communication
 */

const Main = () => {
  React.useEffect(() => {
    const initializeOverlay = async () => {
      const token = getAuthToken();

      if (token) {
        try {
          // Connect to WebSocket for real-time updates
          await overlayWs.connect(token);

          // Listen for trade notifications
          overlayWs.on("trade_notification", (data) => {
            // Broadcast to overlay window
            window.postMessage(
              {
                type: "TRADE_NOTIFICATION",
                payload: data,
              },
              "*"
            );
          });

          // Listen for offer updates
          overlayWs.on("offer_update", (data) => {
            window.postMessage(
              {
                type: "OFFER_UPDATE",
                payload: data,
              },
              "*"
            );
          });

          // Listen for messages
          overlayWs.on("new_message", (data) => {
            window.postMessage(
              {
                type: "NEW_MESSAGE",
                payload: data,
              },
              "*"
            );
          });

          console.log("PalTrade Overlay initialized");
        } catch (error) {
          console.error("Failed to initialize overlay:", error);
        }
      }
    };

    initializeOverlay();

    return () => {
      overlayWs.disconnect();
    };
  }, []);

  return null;
};

const root = ReactDOM.createRoot(document.getElementById("main")!);
root.render(<Main />);
