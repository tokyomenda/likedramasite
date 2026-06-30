"use client";

import { AnimatePresence, motion } from "framer-motion";

type TrailerModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
};

export function TrailerModal({ isOpen, onClose, title }: TrailerModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-[70] grid place-items-center bg-black/86 px-4 text-white backdrop-blur-xl"
          exit={{ opacity: 0 }}
          initial={{ opacity: 0 }}
        >
          <button
            aria-label="Трейлер хаах"
            className="absolute inset-0"
            onClick={onClose}
            type="button"
          />
          <motion.section
            animate={{ scale: 1, opacity: 1 }}
            className="relative w-full max-w-5xl overflow-hidden rounded-[2rem] border border-white/10 bg-zinc-950 shadow-[0_30px_90px_rgba(0,0,0,0.65)]"
            exit={{ scale: 0.96, opacity: 0 }}
            initial={{ scale: 0.96, opacity: 0 }}
          >
            <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
              <h2 className="text-xl font-black">{title} трейлер</h2>
              <button
                aria-label="Хаах"
                className="grid h-10 w-10 place-items-center rounded-full border border-white/10 text-2xl transition hover:bg-white/10"
                onClick={onClose}
                type="button"
              >
                ×
              </button>
            </div>
            <div className="aspect-video bg-black">
              <iframe
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="h-full w-full"
                src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                title={`${title} трейлер`}
              />
            </div>
          </motion.section>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
