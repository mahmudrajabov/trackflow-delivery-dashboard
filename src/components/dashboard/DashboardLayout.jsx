import React, { useEffect, useState } from "react";
import { NavLink, Outlet, useLocation, Link } from "react-router-dom";
import { LayoutDashboard, Package, Truck, Settings, Menu, X } from "lucide-react";

const EMBLEM_URL = "https://media.base44.com/images/public/6aba7dde19db9f4ae2999cdc/4dc2953fa_m-cat-emblem.svg";

function Emblem({ className }) {
  return <img src={EMBLEM_URL} alt="Mahmud Rajabov emblem" className={`${className} shrink-0 object-contain`} />;
}

const nav = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard, end: true },
  { to: "/orders", label: "Orders", icon: Package },
  { to: "/couriers", label: "Couriers", icon: Truck },
  { to: "/settings", label: "Settings", icon: Settings },
];

function NavLinks({ onNavigate }) {
  return (
    <nav className="flex flex-col gap-1 px-3">
      {nav.map((item) => {
        const Icon = item.icon;
        return (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            onClick={onNavigate}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                isActive
                  ? "bg-blue-50 text-blue-700"
                  : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
              }`
            }
          >
            <Icon className="h-5 w-5" />
            {item.label}
          </NavLink>
        );
      })}
    </nav>
  );
}

function Logo() {
  return (
    <Link to="/" className="flex items-center gap-2.5 px-6 py-6" aria-label="Back to home">
      <Emblem className="h-8 w-8" />
      <div>
        <p className="text-base font-semibold tracking-tight text-slate-900">Mahmud Rajabov</p>
        <p className="text-xs text-slate-500">TrackFlow · Delivery Dashboard</p>
      </div>
    </Link>
  );
}

export default function DashboardLayout() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  // Lock body scroll and close the drawer on Escape while the mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    const onKey = (e) => e.key === "Escape" && setMobileOpen(false);
    if (mobileOpen) window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [mobileOpen]);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Desktop sidebar */}
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 flex-col border-r border-slate-200 bg-white lg:flex">
        <Logo />
        <div className="flex-1 overflow-y-auto py-2">
          <NavLinks />
        </div>
        <div className="border-t border-slate-200 p-4">
          <div className="flex items-center gap-3 rounded-lg bg-slate-50 p-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-100 text-sm font-semibold text-blue-700">
              AD
            </span>
            <div>
              <p className="text-sm font-medium text-slate-900">Admin Demo</p>
              <p className="text-xs text-slate-500">admin@trackflow.io</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Mobile topbar */}
      <header className="sticky top-0 z-40 flex items-center justify-between border-b border-slate-200 bg-white px-4 py-3 lg:hidden">
        <Link to="/" className="flex items-center gap-2.5" aria-label="Back to home">
          <Emblem className="h-7 w-7" />
          <span className="text-base font-semibold tracking-tight text-slate-900">Mahmud Rajabov</span>
        </Link>
        <button
          onClick={() => setMobileOpen(true)}
          className="rounded-lg p-2 text-slate-600 hover:bg-slate-100"
          aria-label="Open menu"
        >
          <Menu className="h-6 w-6" />
        </button>
      </header>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-slate-900/40"
            onClick={() => setMobileOpen(false)}
          />
          <aside className="absolute inset-y-0 left-0 flex w-72 flex-col bg-white shadow-xl">
            <div className="flex items-center justify-between border-b border-slate-200 pr-4">
              <Logo />
              <button
                onClick={() => setMobileOpen(false)}
                className="rounded-lg p-2 text-slate-500 hover:bg-slate-100"
                aria-label="Close menu"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <NavLinks onNavigate={() => setMobileOpen(false)} />
          </aside>
        </div>
      )}

      <main className="lg:pl-64">
        <div className="mx-auto max-w-7xl p-4 sm:p-6 lg:p-8">
          <div key={location.pathname} className="float-in">
            <Outlet />
          </div>
        </div>
        <footer className="border-t border-slate-200">
          <div className="mx-auto flex max-w-7xl items-center gap-2 px-4 py-4 sm:px-6 lg:px-8">
            <Emblem className="h-6 w-6" />
            <span className="text-sm text-slate-500">© {new Date().getFullYear()} Mahmud Rajabov · TrackFlow Delivery Dashboard</span>
          </div>
        </footer>
      </main>
    </div>
  );
}