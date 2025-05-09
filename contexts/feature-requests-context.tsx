"use client";

import FeatureRequestModal from "@/components/feature-request-modal";
import { createContext, useState, useContext, type ReactNode } from "react";

interface FeatureRequestContextType {
  openFeatureRequestModal: (title: string, description: string) => void;
  closeFeatureRequestModal: () => void;
}

const FeatureRequestContext = createContext<
  FeatureRequestContextType | undefined
>(undefined);

export function FeatureRequestProvider({ children }: { children: ReactNode }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [featureTitle, setFeatureTitle] = useState("");
  const [featureDescription, setFeatureDescription] = useState("");

  const openFeatureRequestModal = (title: string, description: string) => {
    setFeatureTitle(title);
    setFeatureDescription(description);
    setIsModalOpen(true);
  };

  const closeFeatureRequestModal = (cb: () => void = () => {}) => {
    setIsModalOpen(false);
    console.log("Modal closed");
    cb();
  };

  return (
    <FeatureRequestContext.Provider
      value={{
        openFeatureRequestModal,
        closeFeatureRequestModal,
      }}
    >
      {children}
      <FeatureRequestModal
        isOpen={isModalOpen}
        onClose={closeFeatureRequestModal}
        featureTitle={featureTitle}
        featureDescription={featureDescription}
      />
    </FeatureRequestContext.Provider>
  );
}

export function useFeatureRequest() {
  const context = useContext(FeatureRequestContext);
  if (context === undefined) {
    throw new Error(
      "useFeatureRequest must be used within a FeatureRequestProvider"
    );
  }
  return context;
}
