"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { X, Bell, BellOff, CheckCircle, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { sendFeatureRequestV1 } from "@/lib/feature-request";
interface FeatureRequestModalProps {
  isOpen: boolean;
  onClose: (cb: () => void) => void;
  featureTitle: string;
  featureDescription: string;
}

export default function FeatureRequestModal({
  isOpen,
  onClose,
  featureTitle,
  featureDescription,
}: FeatureRequestModalProps) {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isNotifyChecked, setIsNotifyChecked] = useState(true);
  const [mounted, setMounted] = useState(false);

  // Animation states
  const [showAnimation, setShowAnimation] = useState(false);

  useEffect(() => {
    setMounted(true);

    if (isOpen) {
      // Reset states when modal opens
      setIsSubmitted(false);
      setShowAnimation(false);

      // Block scrolling when modal is open
      document.body.style.overflow = "hidden";

      // Trigger animation after a small delay
      setTimeout(() => {
        setShowAnimation(true);
      }, 100);
    } else {
      // Restore scrolling when modal is closed
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  if (!mounted || !isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Simulate submission
    setTimeout(() => {
      setIsSubmitted(true);

      // Close modal after showing success message
      setTimeout(() => {
        onClose(() => {});
      }, 3000);
    }, 1000);
  };

  const handleClose = () => {
    setShowAnimation(false);
    onClose(() => sendFeatureRequestV1(featureTitle, featureDescription));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <div
        className={`relative w-full max-w-md mx-4 overflow-hidden bg-gradient-to-br from-[#111] to-[#0a0a0a] border border-[#222] rounded-3xl shadow-2xl transition-all duration-500 ${
          showAnimation ? "opacity-100 scale-100" : "opacity-0 scale-95"
        }`}
      >
        {/* Sparkle effects */}
        <div className="absolute top-0 right-0 w-20 h-20 bg-purple-500/10 rounded-full blur-xl -mr-10 -mt-10"></div>
        <div className="absolute bottom-0 left-0 w-20 h-20 bg-indigo-500/10 rounded-full blur-xl -ml-10 -mb-10"></div>

        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors z-10"
          aria-label="Fermer"
        >
          <X size={20} />
        </button>

        <div className="p-6">
          {!isSubmitted ? (
            <>
              {/* Header with sparkle icon */}
              <div className="flex items-center justify-center mb-6">
                <div className="w-16 h-16 flex items-center justify-center bg-gradient-to-br from-purple-600 to-indigo-600 rounded-2xl shadow-lg">
                  <Sparkles className="text-white" size={32} />
                </div>
              </div>

              <h2 className="text-xl font-bold mb-2 text-center text-white">
                Fonctionnalité à venir !
              </h2>

              <div className="bg-[#1a1a1a] p-4 rounded-xl mb-4 border border-[#333]">
                <h3 className="font-bold text-white mb-1">{featureTitle}</h3>
                <p className="text-gray-300 text-sm">{featureDescription}</p>
              </div>

              <p className="text-gray-400 text-sm mb-6 text-center">
                Cette fonctionnalité est en cours de développement. Voulez-vous
                être notifié(e) quand elle sera disponible ?
              </p>

              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <Input
                    type="email"
                    placeholder="Votre email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-[#1a1a1a] border-[#333] rounded-xl text-white placeholder:text-gray-500"
                    required
                  />
                </div>

                <div className="flex items-center mb-6">
                  <button
                    type="button"
                    onClick={() => setIsNotifyChecked(!isNotifyChecked)}
                    className="flex items-center text-sm text-gray-300 hover:text-white"
                  >
                    <div
                      className={`w-5 h-5 mr-2 rounded flex items-center justify-center ${
                        isNotifyChecked ? "bg-purple-600" : "bg-[#333]"
                      }`}
                    >
                      {isNotifyChecked ? (
                        <Bell size={12} />
                      ) : (
                        <BellOff size={12} />
                      )}
                    </div>
                    Me notifier quand cette fonctionnalité sera disponible
                  </button>
                </div>

                <div className="flex gap-3">
                  <Button
                    onClick={handleClose}
                    type="button"
                    variant="outline"
                    className="flex-1 bg-transparent border-[#333] hover:bg-[#222] text-gray-300"
                  >
                    Annuler
                  </Button>
                  <Button
                    type="submit"
                    className="flex-1 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white"
                  >
                    Envoyer
                  </Button>
                </div>
              </form>
            </>
          ) : (
            <div className="py-8 flex flex-col items-center">
              <div className="w-16 h-16 flex items-center justify-center bg-gradient-to-br from-green-500 to-emerald-500 rounded-full mb-6 animate-bounce">
                <CheckCircle className="text-white" size={32} />
              </div>
              <h2 className="text-xl font-bold mb-2 text-center text-white">
                Merci pour votre intérêt !
              </h2>
              <p className="text-gray-400 text-center mb-2">
                Nous vous tiendrons informé(e) dès que cette fonctionnalité sera
                disponible.
              </p>
              <p className="text-gray-500 text-sm text-center">
                Cette fenêtre se fermera automatiquement...
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
