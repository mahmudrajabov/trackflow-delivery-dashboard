import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { couriers as couriersStore } from "@/lib/mockDb";

const STATUSES = ["available", "on_route", "off_duty"];

export default function CourierForm({ courier, onSaved, onCancel }) {
  const [form, setForm] = useState({
    name: courier?.name || "",
    phone: courier?.phone || "",
    vehicle: courier?.vehicle || "",
    area: courier?.area || "",
    status: courier?.status || "available",
    deliveries: courier?.deliveries ?? 0,
    rating: courier?.rating ?? 5,
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const setText = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.phone.trim()) {
      setError("Name and phone are required.");
      return;
    }
    setSaving(true);
    try {
      const payload = {
        ...form,
        name: form.name.trim(),
        deliveries: Number(form.deliveries) || 0,
        rating: Number(form.rating) || 5,
      };
      if (courier) {
        await couriersStore.update(courier.id, payload);
      } else {
        await couriersStore.create(payload);
      }
      onSaved();
    } catch (err) {
      setError("Something went wrong. Please try again.");
      setSaving(false);
    }
  };

  return (
    <form onSubmit={submit} className="flex flex-col gap-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="courier_name">Full name *</Label>
          <Input id="courier_name" placeholder="Marcus Reed" value={form.name} onChange={setText("name")} />
        </div>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="courier_phone">Phone *</Label>
          <Input
            id="courier_phone"
            placeholder="+1 (555) 000-0000"
            value={form.phone}
            onChange={setText("phone")}
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="vehicle">Vehicle</Label>
          <Input id="vehicle" placeholder="Van" value={form.vehicle} onChange={setText("vehicle")} />
        </div>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="area">Delivery area</Label>
          <Input id="area" placeholder="Downtown" value={form.area} onChange={setText("area")} />
        </div>
        <div className="flex flex-col gap-1.5">
          <Label>Status</Label>
          <Select value={form.status} onValueChange={(v) => setForm((f) => ({ ...f, status: v }))}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {STATUSES.map((s) => (
                <SelectItem key={s} value={s}>
                  {s === "on_route" ? "On route" : s === "off_duty" ? "Off duty" : "Available"}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="deliveries">Deliveries</Label>
            <Input
              id="deliveries"
              type="number"
              min="0"
              value={form.deliveries}
              onChange={setText("deliveries")}
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="rating">Rating</Label>
            <Input
              id="rating"
              type="number"
              min="0"
              max="5"
              step="0.1"
              value={form.rating}
              onChange={setText("rating")}
            />
          </div>
        </div>
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <div className="flex justify-end gap-2 pt-2">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" disabled={saving} className="bg-blue-600 hover:bg-blue-700">
          {saving ? "Saving…" : courier ? "Save changes" : "Add courier"}
        </Button>
      </div>
    </form>
  );
}