"use client";

import { useState } from "react";
import { FAQItem } from "@/types";

export function FAQAccordion({ items }: { items: FAQItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="space-y-3">
      {items.map((item, index) => {
        const opened = openIndex === index;
        return (
          <div
            key={item.question}
            className={`overflow-hidden rounded-2xl border bg-white transition ${
              opened ? "border-amber-300 shadow-md shadow-amber-100" : "border-zinc-200"
            }`}
          >
            <button
              onClick={() => setOpenIndex(opened ? null : index)}
              className="flex w-full items-center justify-between gap-3 px-5 py-4 text-left"
            >
              <span className="font-semibold text-zinc-900">{item.question}</span>
              <span
                className={`inline-flex h-7 w-7 items-center justify-center rounded-full text-sm font-bold ${
                  opened ? "bg-amber-400 text-zinc-900" : "bg-zinc-200 text-zinc-700"
                }`}
              >
                {opened ? "-" : "+"}
              </span>
            </button>
            {opened ? (
              <p className="border-t border-zinc-100 bg-zinc-50 px-5 py-4 text-sm leading-7 text-zinc-700">
                {item.answer}
              </p>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}
