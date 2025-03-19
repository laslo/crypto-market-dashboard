"use client";

import React, { createContext, useCallback, useContext, useState } from "react";

import { TOAST_DURATION } from "@/constants";

interface Toast {
  id: number;
  message: string;
  type: "neutral" | "success" | "warning" | "error";
}

interface ToastContextType {
  toast: (message: string, type?: Toast["type"]) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const useToast = (): ToastContextType => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const toastCounter = useState(0);

  const toast = useCallback(
    (message: string, type: Toast["type"] = "neutral") => {
      const newToast: Toast = { id: toastCounter[0]++, message, type };
      setToasts((prev) => [...prev, newToast]);

      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== newToast.id));
      }, TOAST_DURATION);
    },
    [toastCounter],
  );

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      <div className="fixed bottom-5 right-5 flex flex-col gap-2 z-50">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`px-4 py-2 rounded-lg shadow-lg text-white transition-opacity duration-300 ${getToastColor(toast.type)}`}
          >
            {toast.message}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};

const getToastColor = (type: Toast["type"]): string => {
  switch (type) {
    case "success":
      return "bg-green-800";
    case "warning":
      return "bg-yellow-800";
    case "error":
      return "bg-red-800";
    default:
      return "bg-gray-800";
  }
};
