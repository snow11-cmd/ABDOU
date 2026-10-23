import "server-only";

import type { Order } from "@/lib/data/types";

type SandboxStore = { orders: Map<string, Order> };

const globalStore = globalThis as unknown as { __sandboxOrders?: SandboxStore };

const MAX_ORDERS = 500;
const MAX_AGE_MS = 24 * 60 * 60 * 1000;

function store(): SandboxStore {
  if (!globalStore.__sandboxOrders) {
    globalStore.__sandboxOrders = { orders: new Map<string, Order>() };
  }
  return globalStore.__sandboxOrders;
}

// The demo store is intentionally in-memory. Keep it bounded and drop old
// orders so a long-running server cannot accumulate customer data forever.
function prune(orders: Map<string, Order>) {
  const cutoff = Date.now() - MAX_AGE_MS;
  for (const [id, order] of orders) {
    if (new Date(order.createdAt).getTime() >= cutoff) break;
    orders.delete(id);
  }
  while (orders.size >= MAX_ORDERS) {
    const oldest = orders.keys().next().value;
    if (!oldest) break;
    orders.delete(oldest);
  }
}

export function createSandboxOrder(input: {
  serviceId: string;
  serviceTitle: string;
  customerName: string;
  customerEmail: string;
  notes: string | null;
  amount: number;
  currency?: string;
}): Order {
  const order: Order = {
    id: `SBX-${crypto.randomUUID()}`,
    serviceId: input.serviceId,
    serviceTitle: input.serviceTitle,
    customerName: input.customerName,
    customerEmail: input.customerEmail,
    notes: input.notes,
    amount: input.amount,
    currency: input.currency ?? "USD",
    status: "pending",
    createdAt: new Date().toISOString(),
  };
  const orders = store().orders;
  prune(orders);
  orders.set(order.id, order);
  return order;
}

export function getSandboxOrder(id: string): Order | null {
  return store().orders.get(id) ?? null;
}
