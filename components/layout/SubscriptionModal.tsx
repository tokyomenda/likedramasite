"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@/components/ui/Button";

type SubscriptionModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export function SubscriptionModal({ isOpen, onClose }: SubscriptionModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-[70] grid place-items-center bg-black/84 px-4 text-white backdrop-blur-xl"
          exit={{ opacity: 0 }}
          initial={{ opacity: 0 }}
        >
          <button
            aria-label="Багцын цонх хаах"
            className="absolute inset-0"
            onClick={onClose}
            type="button"
          />
          <motion.section
            animate={{ y: 0, opacity: 1 }}
            className="relative w-full max-w-lg rounded-[2rem] border border-orange-300/25 bg-zinc-950 p-6 shadow-[0_0_85px_rgba(249,115,22,0.32)]"
            exit={{ y: 20, opacity: 0 }}
            initial={{ y: 20, opacity: 0 }}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.24em] text-orange-300">
                  VIP багц
                </p>
                <h2 className="mt-2 text-3xl font-black">Багц авах</h2>
              </div>
              <button
                aria-label="Хаах"
                className="grid h-10 w-10 place-items-center rounded-full border border-white/10 text-2xl transition hover:bg-white/10"
                onClick={onClose}
                type="button"
              >
                ×
              </button>
            </div>

            <div className="mt-6 rounded-3xl border border-white/10 bg-white/[0.05] p-5">
              <p className="text-sm font-semibold text-orange-100">
                30 хоног · бүх кино
              </p>
              <p className="mt-3 text-5xl font-black">12,500₮</p>
              <p className="mt-3 text-sm text-zinc-400">
                Төлбөр төлөх · 30 хоног. Энэ нь mock төлбөрийн цонх бөгөөд
                бодит төлбөр холбогдоогүй.
              </p>
              <ul className="mt-5 space-y-2 text-sm text-zinc-300">
                <li>• VIP кино үзэх</li>
                <li>• Шинэ анги түрүүлж үзэх</li>
                <li>• HD / 4K чанар</li>
              </ul>
            </div>

            <Button className="mt-6 w-full" onClick={onClose}>
              Mock төлбөр батлах
            </Button>
          </motion.section>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
