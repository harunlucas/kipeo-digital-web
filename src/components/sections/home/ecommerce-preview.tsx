"use client";

import { useState } from "react";
import Image from "next/image";
import { ShoppingBag } from "lucide-react";
import { cn } from "@/lib/cn";

type View = "storefront" | "product";

const views: { value: View; label: string }[] = [
  { value: "storefront", label: "Storefront" },
  { value: "product", label: "Product page" },
];

export function EcommercePreview() {
  const [view, setView] = useState<View>("storefront");
  const [bagCount, setBagCount] = useState(0);

  return (
    <div>
      <p className="font-serif-display text-sm italic text-slate-muted">Interactive example</p>

      <div role="group" aria-label="View" className="mt-4 inline-flex flex-wrap gap-2">
        {views.map((option) => {
          const isSelected = view === option.value;
          return (
            <button
              key={option.value}
              type="button"
              aria-pressed={isSelected}
              onClick={() => setView(option.value)}
              className={cn(
                "min-h-11 cursor-pointer rounded-full border px-4 py-2 text-sm font-medium transition-colors duration-200",
                isSelected
                  ? "border-teal-strong bg-teal-strong text-white"
                  : "border-neutral-300 text-slate hover:border-neutral-400 hover:text-paper-foreground",
              )}
            >
              {option.label}
            </button>
          );
        })}
      </div>

      {view === "storefront" ? (
        // The lamp photography gets the full width here — no competing HTML
        // chrome, since the storefront itself is the thing being shown.
        <div className="relative mt-6 aspect-[1165/1024] overflow-hidden rounded-xl bg-paper-elevated">
          <Image
            src="/images/services/websites-ecommerce-laptop.webp"
            alt="Forma lighting store homepage open in a laptop browser, showing the Lighting for living hero banner and an Arc lamp product photo."
            fill
            sizes="(min-width: 1024px) 65vw, (min-width: 640px) 85vw, 100vw"
            className="object-contain"
            priority={false}
          />
        </div>
      ) : (
        <div className="mt-6 flex flex-col gap-6 sm:flex-row sm:items-start">
          <div className="relative mx-auto aspect-[344/769] w-full max-w-[220px] shrink-0 overflow-hidden rounded-xl bg-paper-elevated sm:mx-0">
            <Image
              src="/images/services/websites-ecommerce-phone.webp"
              alt="Forma product page for the Arc lamp open on a phone, showing its price, rating and an Add to bag button."
              fill
              sizes="220px"
              className="object-contain"
            />
          </div>

          <div className="flex-1">
            <h4 className="text-lg font-semibold text-paper-foreground">Arc lamp</h4>
            <p className="mt-1 text-slate">$395</p>

            <div className="mt-5 flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={() => setBagCount((count) => count + 1)}
                className="inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-full bg-teal-strong px-5 py-2.5 text-sm font-medium text-white transition-colors duration-200 hover:brightness-95"
              >
                <ShoppingBag className="h-4 w-4" aria-hidden />
                Add to bag
              </button>

              <p role="status" className="flex items-center gap-1.5 text-sm text-slate">
                <ShoppingBag className="h-4 w-4 text-slate-muted" aria-hidden />
                Bag · {bagCount} {bagCount === 1 ? "item" : "items"}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
