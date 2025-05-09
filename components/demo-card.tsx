"use client";

import { useFingerprint } from "@/hooks/use-fingerprint";
import { Fingerprint, Check, X } from "lucide-react";

export default function DemoCard() {
  const { visitorId, hasConsent, loading } = useFingerprint();

  // Masquer une partie du visitorId pour la démo
  const maskedVisitorId = visitorId
    ? `${visitorId.substring(0, 8)}...${visitorId.substring(
        visitorId.length - 8
      )}`
    : "Non disponible";

  return (
    <div className="bg-[#111] p-6 rounded-3xl border border-[#222] shadow-lg">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold flex items-center">
          <Fingerprint className="mr-2" size={18} />
          Démo Fingerprint
        </h3>
        {loading ? (
          <div className="w-4 h-4 rounded-full bg-yellow-500 animate-pulse"></div>
        ) : (
          <div
            className={`w-4 h-4 rounded-full ${
              hasConsent ? "bg-green-500" : "bg-red-500"
            }`}
          ></div>
        )}
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-20">
          <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-purple-500"></div>
        </div>
      ) : (
        <>
          <div className="flex items-center mb-4">
            <div
              className={`w-8 h-8 rounded-full ${
                hasConsent ? "bg-green-900/30" : "bg-red-900/30"
              } flex items-center justify-center mr-3`}
            >
              {hasConsent ? (
                <Check size={16} className="text-green-400" />
              ) : (
                <X size={16} className="text-red-400" />
              )}
            </div>
            <div>
              <p
                className={`font-medium ${
                  hasConsent ? "text-green-400" : "text-red-400"
                }`}
              >
                {hasConsent ? "Tracking activé" : "Tracking désactivé"}
              </p>
              <p className="text-xs text-gray-400">
                {hasConsent
                  ? "Votre visite est anonymement tracée"
                  : "Votre visite n'est pas tracée"}
              </p>
            </div>
          </div>

          {hasConsent && (
            <div className="mt-2 p-3 bg-[#0a0a0a] rounded-lg">
              <div className="flex items-center mb-1">
                <Fingerprint size={14} className="mr-2 text-gray-400" />
                <span className="text-xs text-gray-300">ID Visiteur</span>
              </div>
              <code className="block w-full text-xs bg-[#111] p-2 rounded border border-[#222] overflow-x-auto">
                {maskedVisitorId}
              </code>
            </div>
          )}
        </>
      )}
    </div>
  );
}
