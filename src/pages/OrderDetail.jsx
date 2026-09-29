import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { base44 } from "@/api/base44Client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { ArrowLeft, Pencil, Trash2, User, Phone, MapPin, Package, Truck, CalendarDays } from "lucide-react";
import StatusBadge from "@/components/dashboard/StatusBadge";
import OrderForm from "@/components/dashboard/OrderForm";
import ConfirmDelete from "@/components/dashboard/ConfirmDelete";

const STEPS = ["pending", "in_transit", "delivered"];
const STEP_LABELS = { pending: "Pending", in_transit: "In transit", delivered: "Delivered" };

export default function OrderDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [order, setOrder] = useState(null);
  const [notFound, setNotFound] = useState(false);
  const [couriers, setCouriers] = useState([]);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        const [o, c] = await Promise.all([
          base44.entities.Order.get(id),
          base44.entities.Courier.list("-created_date", 50),
        ]);
        setCouriers(c);
        if (!o) {
          setNotFound(true);
        } else {
          setOrder(o);
          setNotFound(false);
        }
      } catch {
        setNotFound(true);
      }
    };
    load();
  }, [id]);

  if (notFound) {
    return (
      <div className="flex flex-col items-center gap-4 py-24 text-center">
        <p className="text-lg font-semibold text-slate-900">Order not found</p>
        <p className="text-sm text-slate-500">It may have been deleted.</p>
        <Link to="/orders" className="text-sm font-medium text-blue-600 hover:text-blue-700">
          ← Back to orders
        </Link>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-slate-200 border-t-blue-600" />
      </div>
    );
  }

  const changeStatus = async (value) => {
    await base44.entities.Order.update(order.id, { status: value });
    setOrder((o) => ({ ...o, status: value }));
    toast({ title: "Status updated", description: `${order.order_number} → ${value.replace("_", " ")}` });
  };

  const doDelete = async () => {
    setBusy(true);
    try {
      await base44.entities.Order.delete(order.id);
      toast({ title: "Order deleted" });
      navigate("/orders");
    } finally {
      setBusy(false);
    }
  };

  const currentIdx = STEPS.indexOf(order.status);
  const money = (n) => `$${Number(n || 0).toFixed(2)}`;
  const fmtDate = (d) => (d ? new Date(d).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : "—");

  const rows = [
    { icon: User, label: "Customer", value: order.customer_name },
    { icon: Phone, label: "Phone", value: order.customer_phone || "—" },
    { icon: MapPin, label: "Address", value: order.address },
    { icon: Package, label: "Items", value: order.items || "—" },
    { icon: Truck, label: "Courier", value: order.courier_name || "Unassigned" },
    { icon: CalendarDays, label: "Order date", value: fmtDate(order.order_date || order.created_date) },
  ];

  return (
    <div className="flex flex-col gap-6">
      <Link to="/orders" className="inline-flex w-fit items-center gap-2 text-sm font-medium text-slate-500 transition-colors hover:text-slate-900">
        <ArrowLeft className="h-4 w-4" />
        Back to orders
      </Link>

      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
            {order.order_number}
          </h1>
          <StatusBadge status={order.status} />
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setEditOpen(true)}>
            <Pencil className="mr-2 h-4 w-4" />
            Edit
          </Button>
          <Button
            variant="outline"
            onClick={() => setDeleteOpen(true)}
            className="border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700"
          >
            <Trash2 className="mr-2 h-4 w-4" />
            Delete
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        {/* Details card */}
        <div className="rounded-2xl border border-slate-200 bg-white lg:col-span-2">
          <div className="border-b border-slate-200 px-5 py-4">
            <h2 className="text-base font-semibold text-slate-900">Delivery details</h2>
          </div>
          <dl className="grid grid-cols-1 gap-0 p-5 sm:grid-cols-2">
            {rows.map((r) => {
              const Icon = r.icon;
              return (
                <div key={r.label} className="flex items-start gap-3 rounded-xl p-3 hover:bg-slate-50">
                  <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                    <Icon className="h-4 w-4" />
                  </span>
                  <div className="min-w-0">
                    <dt className="text-xs uppercase tracking-wider text-slate-400">{r.label}</dt>
                    <dd className="mt-0.5 break-words text-sm font-medium text-slate-900">{r.value}</dd>
                  </div>
                </div>
              );
            })}
          </dl>
        </div>

        {/* Status card */}
        <div className="flex flex-col gap-4">
          <div className="rounded-2xl border border-slate-200 bg-white p-5">
            <h2 className="text-base font-semibold text-slate-900">Status</h2>
            <div className="mt-4">
              <Select value={order.status} onValueChange={changeStatus}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="in_transit">In transit</SelectItem>
                  <SelectItem value="delivered">Delivered</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {order.status === "cancelled" ? (
              <p className="mt-4 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">
                This order was cancelled.
              </p>
            ) : (
              <div className="mt-6 flex items-center">
                {STEPS.map((step, i) => (
                  <React.Fragment key={step}>
                    <div className="flex flex-col items-center gap-1.5">
                      <span
                        className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-semibold ${
                          i <= currentIdx ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-400"
                        }`}
                      >
                        {i + 1}
                      </span>
                      <span className={`text-[11px] ${i <= currentIdx ? "text-slate-900" : "text-slate-400"}`}>
                        {STEP_LABELS[step]}
                      </span>
                    </div>
                    {i < STEPS.length - 1 && (
                      <div className={`mx-1 mb-5 h-0.5 flex-1 rounded ${i < currentIdx ? "bg-blue-600" : "bg-slate-200"}`} />
                    )}
                  </React.Fragment>
                ))}
              </div>
            )}
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5">
            <h2 className="text-base font-semibold text-slate-900">Summary</h2>
            <div className="mt-4 flex items-center justify-between">
              <span className="text-sm text-slate-500">Order amount</span>
              <span className="text-2xl font-semibold tracking-tight text-slate-900">
                {money(order.amount)}
              </span>
            </div>
            <div className="mt-2 flex items-center justify-between text-sm">
              <span className="text-slate-500">Last updated</span>
              <span className="text-slate-700">{fmtDate(order.updated_date)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Edit dialog */}
      <Dialog open={editOpen} onOpenChange={setEditOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Edit {order.order_number}</DialogTitle>
            <DialogDescription>Update the order details below.</DialogDescription>
          </DialogHeader>
          <OrderForm
            order={order}
            couriers={couriers}
            onCancel={() => setEditOpen(false)}
            onSaved={() => {
              setEditOpen(false);
              toast({ title: "Order updated" });
              base44.entities.Order.get(id).then(setOrder);
            }}
          />
        </DialogContent>
      </Dialog>

      <ConfirmDelete
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        title={`Delete order ${order.order_number}?`}
        description="This will permanently remove the order. This action cannot be undone."
        onConfirm={doDelete}
        busy={busy}
      />
    </div>
  );
}