import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { orders } from "@/lib/mockDb";

const STATUSES = ["pending", "in_transit", "delivered", "cancelled"];

export default function OrderForm({ order, couriers, onSaved, onCancel }) {
  const [form, setForm] = useState({
    order_number: order?.order_number || `TF-${2500 + Math.floor(Math.random() * 499)}`,
    customer_name: order?.customer_name || "",
    customer_phone: order?.customer_phone || "",
    address: order?.address || "",
    items: order?.items || "",
    amount: order?.amount ?? "",
    courier_name: order?.courier_name || "Unassigned",
    status: order?.status || "pending",
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const setText = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    if (!form.customer_name.trim() || !form.address.trim()) {
      setError("Customer name and delivery address are required.");
      return;
    }
    setSaving(true);
    try {
      const payload = {
        ...form,
        amount: Number(form.amount) || 0,
        customer_name: form.customer_name.trim(),
        address: form.address.trim(),
      };
      if (order) {
        await orders.update(order.id, payload);
      } else {
        const today = new Date().toISOString().slice(0, 10);
        await orders.create({ ...payload, order_date: today });
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
          <Label htmlFor="order_number">Order number</Label>
          <Input id="order_number" value={form.order_number} onChange={setText("order_number")} />
        </div>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="status">Status</Label>
          <Select value={form.status} onValueChange={(v) => setForm((f) => ({ ...f, status: v }))}>
            <SelectTrigger id="status">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {STATUSES.map((s) => (
                <SelectItem key={s} value={s}>
                  {s === "in_transit" ? "In transit" : s.charAt(0).toUpperCase() + s.slice(1)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="customer_name">Customer name *</Label>
          <Input
            id="customer_name"
            placeholder="Jane Cooper"
            value={form.customer_name}
            onChange={setText("customer_name")}
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="customer_phone">Phone</Label>
          <Input
            id="customer_phone"
            placeholder="+1 (555) 000-0000"
            value={form.customer_phone}
            onChange={setText("customer_phone")}
          />
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="address">Delivery address *</Label>
        <Textarea
          id="address"
          placeholder="482 Maple Ave, Riverside"
          rows={2}
          value={form.address}
          onChange={setText("address")}
        />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="flex flex-col gap-1.5 sm:col-span-2">
          <Label htmlFor="items">Items</Label>
          <Input
            id="items"
            placeholder="Wireless earbuds x2"
            value={form.items}
            onChange={setText("items")}
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="amount">Amount ($)</Label>
          <Input
            id="amount"
            type="number"
            min="0"
            step="0.01"
            placeholder="0.00"
            value={form.amount}
            onChange={setText("amount")}
          />
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <Label>Courier</Label>
        <Select
          value={form.courier_name}
          onValueChange={(v) => setForm((f) => ({ ...f, courier_name: v }))}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Unassigned">Unassigned</SelectItem>
            {(couriers || []).map((c) => (
              <SelectItem key={c.id} value={c.name}>
                {c.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <div className="flex justify-end gap-2 pt-2">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" disabled={saving} className="bg-blue-600 hover:bg-blue-700">
          {saving ? "Saving…" : order ? "Save changes" : "Create order"}
        </Button>
      </div>
    </form>
  );
}