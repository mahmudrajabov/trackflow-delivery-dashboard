import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { orders as ordersStore } from "@/lib/mockDb";
import { format, subDays } from "date-fns";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import { Package, PackageCheck, Clock, XCircle, Eye } from "lucide-react";
import StatusBadge from "@/components/dashboard/StatusBadge";

const Spinner = () => (
  <div className="flex h-64 items-center justify-center">
    <div className="h-8 w-8 animate-spin rounded-full border-4 border-slate-200 border-t-blue-600" />
  </div>
);

export default function Dashboard() {
  const [orders, setOrders] = useState(null);

  useEffect(() => {
    ordersStore.list("-created_date", 300).then(setOrders);
  }, []);

  if (!orders) return <Spinner />;

  const byStatus = (s) => orders.filter((o) => o.status === s).length;
  const stats = {
    total: orders.length,
    delivered: byStatus("delivered"),
    pending: byStatus("pending"),
    cancelled: byStatus("cancelled"),
    inTransit: byStatus("in_transit"),
  };

  const chartData = Array.from({ length: 7 }, (_, i) => {
    const d = subDays(new Date(), 6 - i);
    const key = format(d, "yyyy-MM-dd");
    return {
      day: format(d, "MMM d"),
      orders: orders.filter(
        (o) => (o.order_date || String(o.created_date || "").slice(0, 10)) === key
      ).length,
    };
  });

  const pieData = [
    { name: "Delivered", value: stats.delivered, color: "#10b981" },
    { name: "Pending", value: stats.pending, color: "#f59e0b" },
    { name: "In transit", value: stats.inTransit, color: "#3b82f6" },
    { name: "Cancelled", value: stats.cancelled, color: "#ef4444" },
  ].filter((d) => d.value > 0);

  const cards = [
    { label: "Total orders", value: stats.total, icon: Package, tone: "bg-blue-100 text-blue-700", delta: "+8.2% this week" },
    { label: "Delivered", value: stats.delivered, icon: PackageCheck, tone: "bg-emerald-100 text-emerald-700", delta: "+4.6% this week" },
    { label: "Pending", value: stats.pending, icon: Clock, tone: "bg-amber-100 text-amber-700", delta: "awaiting dispatch" },
    { label: "Cancelled", value: stats.cancelled, icon: XCircle, tone: "bg-red-100 text-red-700", delta: "-1.1% this week" },
  ];

  const money = (n) => `$${Number(n || 0).toFixed(2)}`;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
            Dashboard
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Overview of delivery operations — {format(new Date(), "EEEE, MMMM d, yyyy")}
          </p>
        </div>
        <Link
          to="/orders"
          className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-blue-700"
        >
          <Package className="h-4 w-4" />
          Manage orders
        </Link>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {cards.map((c) => {
          const Icon = c.icon;
          return (
            <div
              key={c.label}
              className="rounded-2xl border border-slate-200 bg-white p-5 transition-shadow hover:shadow-md"
            >
              <div className="flex items-center justify-between">
                <span className={`flex h-10 w-10 items-center justify-center rounded-xl ${c.tone}`}>
                  <Icon className="h-5 w-5" />
                </span>
                <span className="text-xs text-slate-400">{c.delta}</span>
              </div>
              <p className="mt-4 text-3xl font-semibold tracking-tight text-slate-900">{c.value}</p>
              <p className="mt-1 text-sm text-slate-500">{c.label}</p>
            </div>
          );
        })}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 xl:col-span-2">
          <h2 className="text-base font-semibold text-slate-900">Orders — last 7 days</h2>
          <div className="mt-4 h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="orderFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.25} />
                    <stop offset="100%" stopColor="#3b82f6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="day" tick={{ fontSize: 12, fill: "#64748b" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 12, fill: "#64748b" }} axisLine={false} tickLine={false} allowDecimals={false} />
                <Tooltip
                  contentStyle={{ borderRadius: "10px", border: "1px solid #e2e8f0", fontSize: 13 }}
                />
                <Area
                  type="monotone"
                  dataKey="orders"
                  stroke="#2563eb"
                  strokeWidth={2.5}
                  fill="url(#orderFill)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5">
          <h2 className="text-base font-semibold text-slate-900">Status breakdown</h2>
          <div className="mt-4 h-64">
            {pieData.length === 0 ? (
              <div className="flex h-full items-center justify-center text-sm text-slate-400">
                No orders yet
              </div>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    dataKey="value"
                    nameKey="name"
                    innerRadius={55}
                    outerRadius={85}
                    paddingAngle={3}
                  >
                    {pieData.map((d) => (
                      <Cell key={d.name} fill={d.color} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ borderRadius: "10px", border: "1px solid #e2e8f0", fontSize: 13 }} />
                  <Legend iconType="circle" wrapperStyle={{ fontSize: 13 }} />
                </PieChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>
      </div>

      {/* Recent orders */}
      <div className="rounded-2xl border border-slate-200 bg-white">
        <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
          <h2 className="text-base font-semibold text-slate-900">Recent orders</h2>
          <Link to="/orders" className="text-sm font-medium text-blue-600 hover:text-blue-700">
            View all
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] text-sm">
            <thead>
              <tr className="border-b border-slate-200 text-left text-xs uppercase tracking-wider text-slate-500">
                <th className="px-5 py-3 font-medium">Order</th>
                <th className="px-5 py-3 font-medium">Customer</th>
                <th className="px-5 py-3 font-medium">Courier</th>
                <th className="px-5 py-3 font-medium">Amount</th>
                <th className="px-5 py-3 font-medium">Status</th>
                <th className="px-5 py-3 font-medium" />
              </tr>
            </thead>
            <tbody>
              {orders.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-5 py-12 text-center text-sm text-slate-400">
                    No orders yet — create one from the Orders page.
                  </td>
                </tr>
              )}
              {orders.slice(0, 6).map((o) => (
                <tr key={o.id} className="border-b border-slate-100 last:border-0 hover:bg-slate-50">
                  <td className="px-5 py-3.5 font-medium text-blue-600">{o.order_number}</td>
                  <td className="px-5 py-3.5 text-slate-900">{o.customer_name}</td>
                  <td className="px-5 py-3.5 text-slate-600">{o.courier_name || "—"}</td>
                  <td className="px-5 py-3.5 text-slate-900">{money(o.amount)}</td>
                  <td className="px-5 py-3.5">
                    <StatusBadge status={o.status} />
                  </td>
                  <td className="px-5 py-3.5 text-right">
                    <Link
                      to={`/orders/${o.id}`}
                      className="inline-flex rounded-lg p-2 text-slate-500 transition-colors hover:bg-slate-100 hover:text-blue-600"
                      aria-label={`View ${o.order_number}`}
                    >
                      <Eye className="h-4 w-4" />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}