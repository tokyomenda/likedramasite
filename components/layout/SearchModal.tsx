"use client";

import { SearchOverlay } from "./SearchOverlay";

type SearchModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export function SearchModal({ isOpen, onClose }: SearchModalProps) {
  return <SearchOverlay isOpen={isOpen} onClose={onClose} />;
}
