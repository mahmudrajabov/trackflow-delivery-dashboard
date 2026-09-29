import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/components/ui/use-toast";
import { Save, Store, Bell } from "lucide-react";

const STORAGE_KEY = "trackflow_settings";

const DEFAULTS = {
  storeName: "TrackFlow HQ",
  email: "admin@trackflow.io",
  phone: "+1 (555) 010-3390",
  emailNotif: true,
  pushNotif: true,
  weeklyReport: false,
};

const readSettings = () => {
  try {
    return { ...DEFAULTS, ...JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}") };
  } catch {
    return DEFAULTS;
  }
};

export default function Settings() {
  const { toast } = useToast();
  const [form, setForm] = useState(readSettings);
  const [saving, setSaving] = useState(false);

  const save = async () => {
    setSaving(true);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(form));
      await new Promise((r) => setTimeout(r, 400));
      toast({ title: "Settings saved", description: "Your preferences have been updated." });
    } finally {
      setSaving(false);
    }
  };

  const toggle = (key) => (checked) => {
    setForm((f) => ({ ...f, [key]: checked }));
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...form, [key]: checked }));
  };

  const notifications = [
    { key: "emailNotif", label: "Email notifications", desc: "Order updates sent to your inbox" },
    { key: "pushNotif", label: "Push notifications", desc: "Real-time alerts for status changes" },
    { key: "weeklyReport", label: "Weekly summary report", desc: "A digest of delivery performance every Monday" },
  ];

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">Settings</h1>
        <p className="mt-1 text-sm text-slate-500">Manage your workspace profile and preferences</p>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        {/* Profile */}
        <div className="rounded-2xl border border-slate-200 bg-white lg:col-span-2">
          <div className="flex items-center gap-2 border-b border-slate-200 px-5 py-4">
            <Store className="h-4 w-4 text-blue-600" />
            <h2 className="text-base font-semibold text-slate-900">Store profile</h2>
          </div>
          <div className="grid grid-cols-1 gap-4 p-5 sm:grid-cols-2">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="storeName">Store name</Label>
              <Input
                id="storeName"
                value={form.storeName}
                onChange={(e) => setForm((f) => ({ ...f, storeName: e.target.value }))}
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="email">Contact email</Label>
              <Input
                id="email"
                type="email"
                value={form.email}
                onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
              />
            </div>
            <div className="flex flex-col gap-1.5 sm:col-span-2">
              <Label htmlFor="phone">Support phone</Label>
              <Input
                id="phone"
                value={form.phone}
                onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
              />
            </div>
          </div>
          <div className="flex justify-end border-t border-slate-200 px-5 py-4">
            <Button onClick={save} disabled={saving} className="bg-blue-600 hover:bg-blue-700">
              <Save className="mr-2 h-4 w-4" />
              {saving ? "Saving…" : "Save changes"}
            </Button>
          </div>
        </div>

        {/* Notifications */}
        <div className="rounded-2xl border border-slate-200 bg-white">
          <div className="flex items-center gap-2 border-b border-slate-200 px-5 py-4">
            <Bell className="h-4 w-4 text-blue-600" />
            <h2 className="text-base font-semibold text-slate-900">Notifications</h2>
          </div>
          <div className="flex flex-col gap-5 p-5">
            {notifications.map((n) => (
              <div key={n.key} className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-medium text-slate-900">{n.label}</p>
                  <p className="mt-0.5 text-xs text-slate-500">{n.desc}</p>
                </div>
                <Switch checked={!!form[n.key]} onCheckedChange={toggle(n.key)} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}