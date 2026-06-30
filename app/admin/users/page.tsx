import { AdminButton } from "@/components/admin/AdminButton";
import { AdminInput } from "@/components/admin/AdminInput";
import { AdminTable } from "@/components/admin/AdminTable";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { adminUsers } from "@/data/admin";

export default function AdminUsersPage() {
  return (
    <div className="space-y-6">
      <AdminInput className="max-w-md" placeholder="Хэрэглэгч хайх..." />
      <AdminTable>
        <thead className="bg-white/[0.04] text-xs uppercase tracking-[0.18em] text-zinc-500">
          <tr>
            <th className="px-5 py-4">Нэр</th>
            <th className="px-5 py-4">Email</th>
            <th className="px-5 py-4">Role</th>
            <th className="px-5 py-4">VIP status</th>
            <th className="px-5 py-4">Joined date</th>
            <th className="px-5 py-4">Status</th>
            <th className="px-5 py-4">Үйлдэл</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-white/10">
          {adminUsers.map((user) => (
            <tr key={user.id}>
              <td className="px-5 py-4 font-bold">{user.name}</td>
              <td className="px-5 py-4 text-zinc-300">{user.email}</td>
              <td className="px-5 py-4 text-zinc-300">{user.role}</td>
              <td className="px-5 py-4">
                <StatusBadge>{user.isVip ? "VIP" : "Идэвхгүй"}</StatusBadge>
              </td>
              <td className="px-5 py-4 text-zinc-300">{user.joinedDate}</td>
              <td className="px-5 py-4">
                <StatusBadge>{user.status}</StatusBadge>
              </td>
              <td className="px-5 py-4">
                <div className="flex gap-2">
                  <AdminButton variant="secondary">Харах</AdminButton>
                  <AdminButton variant="danger">Хаах</AdminButton>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </AdminTable>
    </div>
  );
}
