import { AdminInput } from "@/components/admin/AdminInput";
import { AdminSelect } from "@/components/admin/AdminSelect";
import { AdminTable } from "@/components/admin/AdminTable";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { adminPayments } from "@/data/admin";

export default function AdminPaymentsPage() {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        <AdminInput placeholder="Төлбөр хайх..." />
        <AdminSelect options={["Бүх төлөв", "Амжилттай", "Хүлээгдэж буй", "Цуцлагдсан"]} />
      </div>
      <AdminTable>
        <thead className="bg-white/[0.04] text-xs uppercase tracking-[0.18em] text-zinc-500">
          <tr>
            <th className="px-5 py-4">Transaction ID</th>
            <th className="px-5 py-4">User</th>
            <th className="px-5 py-4">Movie / Plan</th>
            <th className="px-5 py-4">Amount</th>
            <th className="px-5 py-4">Payment method</th>
            <th className="px-5 py-4">Status</th>
            <th className="px-5 py-4">Date</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-white/10">
          {adminPayments.map((payment) => (
            <tr key={payment.id}>
              <td className="px-5 py-4 font-bold">{payment.id}</td>
              <td className="px-5 py-4 text-zinc-300">{payment.user}</td>
              <td className="px-5 py-4 text-zinc-300">{payment.item}</td>
              <td className="px-5 py-4 text-orange-300">{payment.amount}</td>
              <td className="px-5 py-4 text-zinc-300">{payment.method}</td>
              <td className="px-5 py-4">
                <StatusBadge>{payment.status}</StatusBadge>
              </td>
              <td className="px-5 py-4 text-zinc-300">{payment.date}</td>
            </tr>
          ))}
        </tbody>
      </AdminTable>
    </div>
  );
}
