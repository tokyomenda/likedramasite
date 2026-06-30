import type { ReactNode } from "react";

type AdminTableProps = {
  children: ReactNode;
};

export function AdminTable({ children }: AdminTableProps) {
  return (
    <div className="overflow-x-auto rounded-3xl border border-white/10 bg-white/[0.035]">
      <table className="min-w-full divide-y divide-white/10 text-left text-sm">
        {children}
      </table>
    </div>
  );
}
