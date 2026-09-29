// Standalone data layer for TrackFlow.
// Persists orders and couriers in localStorage and seeds realistic demo data
// on first run — no backend required, works anywhere the app is deployed.

const STORAGE_KEY = "trackflow_mock_db_v1";

const courierSeed = [
  { id: "cur_1", name: "Marcus Reed", phone: "+1 (555) 201-0142", vehicle: "Van", area: "Downtown", status: "on_route", deliveries: 342, rating: 4.9 },
  { id: "cur_2", name: "Elena Torres", phone: "+1 (555) 201-0177", vehicle: "Bike", area: "Riverside", status: "available", deliveries: 218, rating: 4.8 },
  { id: "cur_3", name: "David Kim", phone: "+1 (555) 201-0121", vehicle: "Truck", area: "North Side", status: "on_route", deliveries: 456, rating: 4.7 },
  { id: "cur_4", name: "Aisha Bennett", phone: "+1 (555) 201-0198", vehicle: "Van", area: "Airport Zone", status: "available", deliveries: 189, rating: 4.6 },
  { id: "cur_5", name: "Tom Novak", phone: "+1 (555) 201-0155", vehicle: "Bike", area: "Old Town", status: "off_duty", deliveries: 275, rating: 4.5 },
  { id: "cur_6", name: "Priya Shah", phone: "+1 (555) 201-0163", vehicle: "Truck", area: "Harbor", status: "on_route", deliveries: 398, rating: 4.8 },
];

const orderSeed = [
  { id: "ord_01", order_number: "TF-2401", customer_name: "Sarah Mitchell", customer_phone: "+1 (555) 220-4477", address: "482 Maple Ave, Riverside", items: "Wireless earbuds x2", courier_name: "Marcus Reed", amount: 84.5, status: "delivered", order_date: "2026-09-23" },
  { id: "ord_02", order_number: "TF-2402", customer_name: "James Carter", customer_phone: "+1 (555) 220-4488", address: "1109 Oak St, Old Town", items: "Office chair", courier_name: "David Kim", amount: 149, status: "delivered", order_date: "2026-09-23" },
  { id: "ord_03", order_number: "TF-2403", customer_name: "Linda Park", customer_phone: "+1 (555) 220-4511", address: "77 Birch Rd, Harbor", items: "Coffee maker", courier_name: "Elena Torres", amount: 62.25, status: "delivered", order_date: "2026-09-24" },
  { id: "ord_04", order_number: "TF-2404", customer_name: "Omar Haddad", customer_phone: "+1 (555) 220-4532", address: "15 Pine Blvd, Downtown", items: "Smartphone case x4", courier_name: "Marcus Reed", amount: 39.9, status: "cancelled", order_date: "2026-09-24" },
  { id: "ord_05", order_number: "TF-2405", customer_name: "Grace Chen", customer_phone: "+1 (555) 220-4567", address: "2210 Cedar Ln, North Side", items: "Yoga mat", courier_name: "Aisha Bennett", amount: 28.75, status: "delivered", order_date: "2026-09-24" },
  { id: "ord_06", order_number: "TF-2406", customer_name: "Robert Fox", customer_phone: "+1 (555) 220-4601", address: "34 Elm St, Riverside", items: "Desk lamp", courier_name: "Tom Novak", amount: 54.1, status: "delivered", order_date: "2026-09-25" },
  { id: "ord_07", order_number: "TF-2407", customer_name: "Hannah Lee", customer_phone: "+1 (555) 220-4644", address: "908 Willow Dr, Airport Zone", items: "Backpack", courier_name: "Priya Shah", amount: 71.6, status: "delivered", order_date: "2026-09-25" },
  { id: "ord_08", order_number: "TF-2408", customer_name: "Victor Ortiz", customer_phone: "+1 (555) 220-4702", address: "56 Aspen Way, Downtown", items: "27-inch monitor", courier_name: "David Kim", amount: 289.99, status: "in_transit", order_date: "2026-09-26" },
  { id: "ord_09", order_number: "TF-2409", customer_name: "Amelia Wright", customer_phone: "+1 (555) 220-4733", address: "412 Juniper Ct, Harbor", items: "Bluetooth speaker", courier_name: "Elena Torres", amount: 95, status: "delivered", order_date: "2026-09-26" },
  { id: "ord_10", order_number: "TF-2410", customer_name: "Daniel Brooks", customer_phone: "+1 (555) 220-4788", address: "68 Poplar Ave, North Side", items: "Running shoes", courier_name: "Tom Novak", amount: 119.9, status: "in_transit", order_date: "2026-09-27" },
  { id: "ord_11", order_number: "TF-2411", customer_name: "Sofia Rossi", customer_phone: "+1 (555) 220-4812", address: "190 Maple Blvd, Old Town", items: "Air fryer", courier_name: "Marcus Reed", amount: 132.4, status: "pending", order_date: "2026-09-27" },
  { id: "ord_12", order_number: "TF-2412", customer_name: "Ethan Walsh", customer_phone: "+1 (555) 220-4845", address: "25 Sycamore Rd, Riverside", items: "Water bottle x6", courier_name: "Aisha Bennett", amount: 47.85, status: "delivered", order_date: "2026-09-27" },
  { id: "ord_13", order_number: "TF-2413", customer_name: "Maya Singh", customer_phone: "+1 (555) 220-4901", address: "301 Hickory St, Airport Zone", items: "Robot vacuum", courier_name: "Priya Shah", amount: 349, status: "pending", order_date: "2026-09-28" },
  { id: "ord_14", order_number: "TF-2414", customer_name: "Leo Fischer", customer_phone: "+1 (555) 220-4934", address: "9 Cherry Ln, Downtown", items: "Ergonomic keyboard", courier_name: "David Kim", amount: 88.3, status: "delivered", order_date: "2026-09-28" },
  { id: "ord_15", order_number: "TF-2415", customer_name: "Nora Malik", customer_phone: "+1 (555) 220-4977", address: "733 Chestnut Ave, Harbor", items: "Face cream set", courier_name: "Elena Torres", amount: 56.2, status: "cancelled", order_date: "2026-09-28" },
  { id: "ord_16", order_number: "TF-2416", customer_name: "Jack Turner", customer_phone: "+1 (555) 220-5002", address: "48 Cypress Dr, North Side", items: "Camping tent", courier_name: "Tom Novak", amount: 176.5, status: "pending", order_date: "2026-09-28" },
  { id: "ord_17", order_number: "TF-2417", customer_name: "Chloe Dubois", customer_phone: "+1 (555) 220-5051", address: "112 Magnolia Blvd, Old Town", items: "Fitness tracker", courier_name: "Marcus Reed", amount: 99.99, status: "in_transit", order_date: "2026-09-29" },
  { id: "ord_18", order_number: "TF-2418", customer_name: "Henry Adams", customer_phone: "+1 (555) 220-5088", address: "388 Willow Ct, Riverside", items: "Book stack x5", courier_name: "Aisha Bennett", amount: 42.75, status: "delivered", order_date: "2026-09-29" },
  { id: "ord_19", order_number: "TF-2419", customer_name: "Ivy Nakamura", customer_phone: "+1 (555) 220-5109", address: "51 Redwood Way, Airport Zone", items: "Espresso machine", courier_name: "Priya Shah", amount: 264, status: "pending", order_date: "2026-09-29" },
  { id: "ord_20", order_number: "TF-2420", customer_name: "Sam Whitfield", customer_phone: "+1 (555) 220-5150", address: "204 Birch Ave, Harbor", items: "Drone camera", courier_name: "David Kim", amount: 412.6, status: "in_transit", order_date: "2026-09-29" },
];

// Stagger created_date so "recent orders" ordering looks natural.
orderSeed.forEach((o, i) => {
  o.created_date = `${o.order_date}T${String(9 + (i % 10)).padStart(2, "0")}:30:00.000Z`;
  o.updated_date = o.created_date;
});
courierSeed.forEach((c, i) => {
  c.created_date = `2026-09-20T0${i + 1}:00:00.000Z`;
  c.updated_date = c.created_date;
});

let db = null;

function getDb() {
  if (db) return db;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed && parsed.orders && parsed.couriers) {
        db = parsed;
        return db;
      }
    }
  } catch {
    // fall through to fresh seed
  }
  db = {
    orders: JSON.parse(JSON.stringify(orderSeed)),
    couriers: JSON.parse(JSON.stringify(courierSeed)),
  };
  persist();
  return db;
}

function persist() {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(db));
  } catch {
    // storage unavailable (private mode) — keep data in memory only
  }
}

function sortRecords(list, sort) {
  if (!sort) return list;
  const desc = sort.startsWith("-");
  const field = desc ? sort.slice(1) : sort;
  return [...list].sort((a, b) => {
    const av = a[field] ?? "";
    const bv = b[field] ?? "";
    if (av < bv) return desc ? 1 : -1;
    if (av > bv) return desc ? -1 : 1;
    return 0;
  });
}

function makeStore(name) {
  return {
    async list(sort, limit) {
      const sorted = sortRecords(getDb()[name] || [], sort);
      return limit ? sorted.slice(0, limit) : sorted;
    },
    async get(id) {
      return (getDb()[name] || []).find((r) => r.id === id) || null;
    },
    async create(data) {
      const now = new Date().toISOString();
      const record = {
        ...data,
        id: `rec_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
        created_date: now,
        updated_date: now,
      };
      getDb()[name].push(record);
      persist();
      return record;
    },
    async update(id, data) {
      const record = (getDb()[name] || []).find((r) => r.id === id);
      if (!record) throw new Error(`${name}: record ${id} not found`);
      Object.assign(record, data, { updated_date: new Date().toISOString() });
      persist();
      return record;
    },
    async delete(id) {
      const store = getDb()[name] || [];
      const idx = store.findIndex((r) => r.id === id);
      if (idx === -1) throw new Error(`${name}: record ${id} not found`);
      store.splice(idx, 1);
      persist();
    },
  };
}

export const orders = makeStore("orders");
export const couriers = makeStore("couriers");