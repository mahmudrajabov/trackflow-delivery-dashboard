import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { base44 } from "@/api/base44Client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";
import { Plus, Search, Eye, Pencil, Trash2 } from "lucide-react";
import StatusBadge from "@/components/dashboard/StatusBadge";
import OrderForm from "@/components/dashboard/OrderForm";
import ConfirmDelete from "@/components/dashboard/ConfirmDelete";

const Spinner = () => (
  <div className="flex h-64 items-center justify-center">
    <div className="h-8 w-8 animate-spin rounded-full border-4 border-slate-200 border-t-blue-600" />
  </div>
);

const money = (n) => `$${Number(n || 0).toFixed(2)}`;

export default function Orders() {
  const { toast } = useToast();
  const [orders, setOrders] = useState(null);
  const [couriers, setCouriers] = useState([]);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [deleting, setDeleting] = useState(null);
  const [busy, setBusy] = useState(false);

  const load = async () => {
    const [o, c] = await Promise.all([
      base44.entities.Order.list("-created_date", 300),
      base44.entities.Courier.list("-created_date", 50),
    ]);
    setOrders(o);
    setCouriers(c);
  };

  useEffect(() => {
    load();
  }, []);

  if (!orders) return <Spinner />;

  const filtered = orders.filter((o) => {
    const q = search.trim().toLowerCase();
    const matchQ =
      !q ||
      [o.order_number, o.customer_name, o.courier_name].join(" ").toLowerCase().includes(q);
    const matchS = status === "all" || o.status === status;
    return matchQ && matchS;
  });

  const doDelete = async () => {
    setBusy(true);
    try {
      await base44.entities.Order.delete(deleting.id);
      toast({ title: "Order deleted", description: `${deleting.order_number} was removed.` });
      setDeleting(null);
      await load();
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">Orders</h1>
          <p className="mt-1 text-sm text-slate-500">
            Showing {filtered.length} of {orders.length} orders
          </p>
        </div>
        <Button
          onClick={() => setFormOpen(true)}
          className="bg-blue-600 hover:bg-blue-700"
        >
          <Plus className="mr-2 h-4 w-4" />
          Create order
        </Button>
      </div>

      {/* Search + filter */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <Input
            placeholder="Search by order number, customer or courier…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
        <Select value={status} onValueChange={setStatus}>
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All statuses</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="in_transit">In transit</SelectItem>
            <SelectItem value="delivered">Delivered</SelectItem>
            <SelectItem value="cancelled">Cancelled</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Table */}
      <div className="rounded-2xl border border-slate-200 bg-white">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px] text-sm">
            <thead>
              <tr className="border-b border-slate-200 text-left text-xs uppercase tracking-wider text-slate-500">
                <th className="px-5 py-3 font-medium">Order</th>
                <th className="px-5 py-3 font-medium">Customer</th>
                <th className="px-5 py-3 font-medium">Items</th>
                <th className="px-5 py-3 font-medium">Courier</th>
                <th className="px-5 py-3 font-medium">Amount</th>
                <th className="px-5 py-3 font-medium">Status</th>
                <th className="px-5 py-3 text-right font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((o) => (
                <tr key={o.id} className="border-b border-slate-100 last:border-0 hover:bg-slate-50">
                  <td className="px-5 py-3.5">
                    <Link to={`/orders/${o.id}`} className="font-medium text-blue-600 hover:text-blue-700">
                      {o.order_number}
                    </Link>
                  </td>
                  <td className="px-5 py-3.5 text-slate-900">{o.customer_name}</td>
                  <td className="px-5 py-3.5 text-slate-600">{o.items || "—"}</td>
                  <td className="px-5 py-3.5 text-slate-600">{o.courier_name || "—"}</td>
                  <td className="px-5 py-3.5 text-slate-900">{money(o.amount)}</td>
                  <td className="px-5 py-3.5">
                    <StatusBadge status={o.status} />
                  </td>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center justify-end gap-1">
                      <Link
                        to={`/orders/${o.id}`}
                        className="rounded-lg p-2 text-slate-500 transition-colors hover:bg-slate-100 hover:text-blue-600"
                        aria-label={`View ${o.order_number}`}
                      >
                        <Eye className="h-4 w-4" />
                      </Link>
                      <button
                        onClick={() => setEditing(o)}
                        className="rounded-lg p-2 text-slate-500 transition-colors hover:bg-slate-100 hover:text-blue-600"
                        aria-label={`Edit ${o.order_number}`}
                      >
                        <Pencil className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => setDeleting(o)}
                        className="rounded-lg p-2 text-slate-500 transition-colors hover:bg-red-50 hover:text-red-600"
                        aria-label={`Delete ${o.order_number}`}
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-5 py-12 text-center text-slate-400">
                    No orders match your search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create dialog */}
      <Dialog open={formOpen} onOpenChange={setFormOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Create order</DialogTitle>
            <DialogDescription>Fill in the delivery details below.</DialogDescription>
          </DialogHeader>
          <OrderForm
            couriers={couriers}
            onCancel={() => setFormOpen(false)}
            onSaved={() => {
              setFormOpen(false);
              toast({ title: "Order created" });
              load();
            }}
          />
        </DialogContent>
      </Dialog>

      {/* Edit dialog */}
      <Dialog open={!!editing} onOpenChange={(v) => !v && setEditing(null)}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Edit {editing?.order_number}</DialogTitle>
            <DialogDescription>Update the order details below.</DialogDescription>
          </DialogHeader>
          {editing && (
            <OrderForm
              order={editing}
              couriers={couriers}
              onCancel={() => setEditing(null)}
              onSaved={() => {
                setEditing(null);
                toast({ title: "Order updated" });
                load();
              }}
            />
          )}
        </DialogContent>
      </Dialog>

      {/* Delete confirm */}
      <ConfirmDelete
        open={!!deleting}
        onOpenChange={(v) => !v && setDeleting(null)}
        title={`Delete order ${deleting?.order_number}?`}
        description="This will permanently remove the order. This action cannot be undone."
        onConfirm={doDelete}
        busy={busy}
      />
    </div>
  );
}