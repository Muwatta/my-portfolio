import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import App from "./App";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </HelmetProvider>
  </React.StrictMode>,
);

// Register Service Worker for PWA support
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/sw.js", { scope: "/" })
      .then((registration) => {
        console.log("✓ Service Worker registered successfully");

        // Check for updates periodically
        setInterval(() => {
          registration.update();
        }, 60000); // Check every minute

        // Listen for updates
        registration.addEventListener("updatefound", () => {
          const newWorker = registration.installing;
          if (!newWorker) return;

          newWorker.addEventListener("statechange", () => {
            if (
              newWorker.state === "installed" &&
              navigator.serviceWorker.controller
            ) {
              // New service worker is ready, show update prompt
              showUpdatePrompt(registration);
            }
          });
        });
      })
      .catch((error) => {
        console.error("✗ Service Worker registration failed:", error);
      });
  });
}

// Show update prompt when new SW is available
function showUpdatePrompt(registration) {
  const message = document.createElement("div");
  message.className =
    "fixed bottom-4 left-4 right-4 max-w-sm bg-blue-600 text-white rounded-lg shadow-lg p-4 flex items-center justify-between gap-4 z-50";
  message.innerHTML = `
    <span>New version available!</span>
    <div class="flex gap-2">
      <button id="update-dismiss" class="text-sm px-3 py-1 rounded hover:bg-blue-700 transition-colors">Dismiss</button>
      <button id="update-accept" class="text-sm px-3 py-1 bg-white text-blue-600 rounded font-bold hover:bg-gray-100 transition-colors">Update</button>
    </div>
  `;

  document.body.appendChild(message);

  document.getElementById("update-dismiss").onclick = () => {
    message.remove();
  };

  document.getElementById("update-accept").onclick = () => {
    // Tell the new SW to take over
    registration.waiting.postMessage({ type: "SKIP_WAITING" });
    message.remove();

    // Reload after SW activates
    navigator.serviceWorker.addEventListener("controllerchange", () => {
      window.location.reload();
    });
  };

  // Auto-dismiss after 10 seconds if user doesn't interact
  setTimeout(() => {
    if (message.parentNode) message.remove();
  }, 10000);
}
