"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

/**
 * A working, self-contained demonstration of one order moving through three
 * layers of a connected system. All data is illustrative and local — no
 * metrics, no logs, no fetches. Scenario switching is plain React state;
 * every visual change is a CSS colour transition, which the global
 * `prefers-reduced-motion` rule in globals.css already neutralises.
 */

type Scenario = "confirmed" | "delayed";
type NodeState = "active" | "waiting";

type DemoNode = {
  id: string;
  label: string;
  status: Record<Scenario, { text: string; state: NodeState }>;
};

type Layer = {
  id: string;
  title: string;
  nodes: DemoNode[];
  /** State of the connector drawn above this layer, per scenario. */
  connector?: Record<Scenario, NodeState>;
};

const layers: Layer[] = [
  {
    id: "customer",
    title: "Customer experience",
    nodes: [
      {
        id: "checkout",
        label: "Storefront checkout",
        status: {
          confirmed: { text: "Order placed", state: "active" },
          delayed: { text: "Order placed", state: "active" },
        },
      },
      {
        id: "confirmation",
        label: "Order confirmation",
        status: {
          confirmed: { text: "Order confirmed", state: "active" },
          delayed: { text: "Awaiting payment", state: "waiting" },
        },
      },
    ],
  },
  {
    id: "logic",
    title: "Business logic",
    // The order always reaches the system, in both scenarios.
    connector: { confirmed: "active", delayed: "active" },
    nodes: [
      {
        id: "order-service",
        label: "Order service",
        status: {
          confirmed: { text: "Released", state: "active" },
          delayed: { text: "Pending", state: "waiting" },
        },
      },
      {
        id: "payment",
        label: "Payment verification",
        status: {
          confirmed: { text: "Payment verified", state: "active" },
          delayed: { text: "Status check queued", state: "waiting" },
        },
      },
    ],
  },
  {
    id: "operations",
    title: "Operations",
    // Nothing is released downstream until payment clears.
    connector: { confirmed: "active", delayed: "waiting" },
    nodes: [
      {
        id: "inventory",
        label: "Inventory",
        status: {
          confirmed: { text: "Stock allocated", state: "active" },
          delayed: { text: "Allocation held", state: "waiting" },
        },
      },
      {
        id: "fulfilment",
        label: "Fulfilment",
        status: {
          confirmed: { text: "Queued for dispatch", state: "active" },
          delayed: { text: "Held", state: "waiting" },
        },
      },
      {
        id: "notifications",
        label: "Customer notifications",
        status: {
          confirmed: { text: "Confirmation sent", state: "active" },
          delayed: { text: "Payment reminder queued", state: "waiting" },
        },
      },
    ],
  },
];

const scenarioOptions: { value: Scenario; label: string }[] = [
  { value: "confirmed", label: "Payment confirmed" },
  { value: "delayed", label: "Payment delayed" },
];

const statusSentence: Record<Scenario, string> = {
  confirmed:
    "Payment cleared, so stock is allocated, fulfilment is queued and the customer has their confirmation.",
  delayed:
    "Payment hasn’t cleared, so the order is held, stock stays unallocated and the customer sees Awaiting payment.",
};

const nodeColumns: Record<number, string> = {
  2: "sm:grid-cols-2",
  3: "sm:grid-cols-3",
};

function Connector({ state }: { state: NodeState }) {
  return (
    <div aria-hidden className="flex justify-center py-2">
      <span
        className={cn(
          "h-6 w-px transition-colors duration-300",
          state === "active" ? "bg-teal" : "bg-amber",
        )}
      />
    </div>
  );
}

export function OrderSystemDemo() {
  const [scenario, setScenario] = useState<Scenario>("confirmed");

  return (
    <div
      data-demo="order-system"
      className="rounded-2xl border border-ink-elevated bg-ink-elevated/40 p-5 sm:p-6"
    >
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-base font-semibold text-ink-foreground">Inside an order</h2>
        <span className="rounded-full border border-teal/40 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-teal">
          Interactive demo
        </span>
      </div>

      <div role="group" aria-label="Payment scenario" className="mt-4 flex flex-wrap gap-2">
        {scenarioOptions.map((option) => {
          const isActive = scenario === option.value;
          return (
            <button
              key={option.value}
              type="button"
              aria-pressed={isActive}
              onClick={() => setScenario(option.value)}
              className={cn(
                "min-h-11 cursor-pointer rounded-full border px-4 py-2 text-sm font-medium transition-colors duration-200",
                isActive
                  ? "border-teal bg-teal/15 text-ink-foreground"
                  : "border-ink-muted/30 text-ink-muted hover:border-ink-muted/60 hover:text-ink-foreground",
              )}
            >
              {option.label}
            </button>
          );
        })}
      </div>

      <div className="mt-6">
        {layers.map((layer) => (
          <div key={layer.id}>
            {layer.connector ? <Connector state={layer.connector[scenario]} /> : null}

            <h3 className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-muted">
              {layer.title}
            </h3>

            <div className={cn("mt-2 grid gap-2", nodeColumns[layer.nodes.length])}>
              {layer.nodes.map((node) => {
                const { text, state } = node.status[scenario];
                const isActive = state === "active";
                return (
                  <div
                    key={node.id}
                    className={cn(
                      "rounded-xl border px-3 py-2.5 transition-colors duration-300",
                      isActive ? "border-teal/40 bg-teal/10" : "border-amber/40 bg-amber/10",
                    )}
                  >
                    <p className="text-xs font-medium text-ink-foreground">{node.label}</p>
                    <p className="mt-1 flex items-center gap-1.5">
                      <span
                        aria-hidden
                        className={cn(
                          "h-1.5 w-1.5 shrink-0 rounded-full transition-colors duration-300",
                          isActive ? "bg-teal" : "bg-amber",
                        )}
                      />
                      <span
                        className={cn(
                          "text-xs transition-colors duration-300",
                          isActive ? "text-teal" : "text-amber",
                        )}
                      >
                        {text}
                      </span>
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <p aria-live="polite" className="mt-6 text-sm leading-relaxed text-ink-muted">
        {statusSentence[scenario]}
      </p>

      {scenario === "delayed" ? (
        <button
          type="button"
          onClick={() => setScenario("confirmed")}
          className="mt-4 inline-flex min-h-11 cursor-pointer items-center justify-center rounded-full bg-teal px-5 py-2.5 text-sm font-medium text-teal-foreground transition-colors duration-200 hover:brightness-95"
        >
          Confirm payment
        </button>
      ) : null}
    </div>
  );
}
