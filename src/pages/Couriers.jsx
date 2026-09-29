import React, { useEffect, useState } from "react";
import { couriers as couriersStore } from "@/lib/mockDb";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";
import { Plus, Pencil, Trash2, Phone, MapPin, Star, Truck } from "lucide-react";
import CourierForm from "@/components/dashboard/CourierForm";
import ConfirmDelete from "@/components/dashboard/ConfirmDelete";

const COURIER_STYLES = {
  available: "bg-emerald-100 text-emerald-800",
  on_route: "bg-blue-100 text-blue-800",
  off_duty: "bg-slate-200 text-slate-700",
};
const COURIER_LABELS = { available: "Available", on_route: "On route", off_duty: "Off duty" };

const Spinner = () => (
  <div className="flex h-64 items-center justify-center">
    <div className="h-8 w-8 animate-spin rounded-full border-4 border-slate-200 border-t-blue-600" />
  </div>
);

export default function Couriers() {
  const { toast } = useToast();
  const [couriers, setCouriers] = useState(null);
  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [deleting, setDeleting] = useState(null);
  const [busy, setBusy] = useState(false);

  const load = async () => {
    setCouriers(await couriersStore.list("-created_date", 100));
  };

  useEffect(() => {
    load();
  }, []);

  if (!couriers) return <Spinner />;

  const doDelete = async () => {
    setBusy(true);
    try {
      await couriersStore.delete(deleting.id);
      toast({ title: "Courier removed", description: `${deleting.name} was deleted.` });
      setDeleting(null);
      await load();
    } catch (err) {
      toast({ title: "Could not delete courier", description: "Please try again.", variant: "destructive" });
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">Couriers</h1>
          <p className="mt-1 text-sm text-slate-500">{couriers.length} couriers in your fleet</p>
        </div>
        <Button onClick={() => setFormOpen(true)} className="bg-blue-600 hover:bg-blue-700">
          <Plus className="mr-2 h-4 w-4" />
          Add courier
        </Button>
      </div>

      {couriers.length === 0 && (
        <div className="rounded-2xl border border-dashed border-slate-200 bg-white px-6 py-16 text-center">
          <p className="text-sm font-medium text-slate-900">No couriers yet</p>
          <p className="mt-1 text-sm text-slate-500">Add your first courier to start dispatching orders.</p>
        </div>
      )}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {couriers.map((c) => {
          const initials = c.name
            .split(" ")
            .map((p) => p[0])
            .slice(0, 2)
            .join("")
            .toUpperCase();
          return (
            <div
              key={c.id}
              className="flex flex-col rounded-2xl border border-slate-200 bg-white p-5 transition-shadow hover:shadow-md"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-100 text-sm font-semibold text-blue-700">
                    {initials}
                  </span>
                  <div>
                    <p className="font-semibold text-slate-900">{c.name}</p>
                    <p className="text-xs text-slate-500">{c.vehicle || "—"}</p>
                  </div>
                </div>
                <span
                  className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${
                    COURIER_STYLES[c.status] || COURIER_STYLES.off_duty
                  }`}
                >
                  {COURIER_LABELS[c.status] || c.status}
                </span>
              </div>

              <div className="mt-4 flex flex-col gap-2 text-sm text-slate-600">
                <span className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-slate-400" />
                  {c.phone}
                </span>
                <span className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-slate-400" />
                  {c.area || "All areas"}
                </span>
                <span className="flex items-center gap-2">
                  <Truck className="h-4 w-4 text-slate-400" />
                  {c.deliveries ?? 0} deliveries
                </span>
                <span className="flex items-center gap-2">
                  <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                  {Number(c.rating ?? 5).toFixed(1)} rating
                </span>
              </div>

              <div className="mt-5 flex justify-end gap-1 border-t border-slate-100 pt-4">
                <button
                  onClick={() => setEditing(c)}
                  className="rounded-lg p-2 text-slate-500 transition-colors hover:bg-slate-100 hover:text-blue-600"
                  aria-label={`Edit ${c.name}`}
                >
                  <Pencil className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setDeleting(c)}
                  className="rounded-lg p-2 text-slate-500 transition-colors hover:bg-red-50 hover:text-red-600"
                  aria-label={`Delete ${c.name}`}
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Add dialog */}
      <Dialog open={formOpen} onOpenChange={setFormOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Add courier</DialogTitle>
            <DialogDescription>Register a new courier in your fleet.</DialogDescription>
          </DialogHeader>
          <CourierForm
            onCancel={() => setFormOpen(false)}
            onSaved={() => {
              setFormOpen(false);
              toast({ title: "Courier added" });
              load();
            }}
          />
        </DialogContent>
      </Dialog>

      {/* Edit dialog */}
      <Dialog open={!!editing} onOpenChange={(v) => !v && setEditing(null)}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Edit {editing?.name}</DialogTitle>
            <DialogDescription>Update the courier details below.</DialogDescription>
          </DialogHeader>
          {editing && (
            <CourierForm
              courier={editing}
              onCancel={() => setEditing(null)}
              onSaved={() => {
                setEditing(null);
                toast({ title: "Courier updated" });
                load();
              }}
            />
          )}
        </DialogContent>
      </Dialog>

      <ConfirmDelete
        open={!!deleting}
        onOpenChange={(v) => !v && setDeleting(null)}
        title={`Delete courier ${deleting?.name}?`}
        description="This will permanently remove the courier. This action cannot be undone."
        onConfirm={doDelete}
        busy={busy}
      />
    </div>
  );
}