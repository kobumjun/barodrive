"use client";

import { useState } from "react";
import { FAQItem } from "@/types";

export function FAQAccordion({ items }: { items: FAQItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="space-y-3">
      {items.map((item, index) => (
        <div key={item.question} className="overflow-hidden rounded-2xl border border-zinc-200 bg-white">
          <button
            onClick={() => setOpenIndex(openIndex === index ? null : index)}
            className="flex w-full items-center justify-between px-5 py-4 text-left font-semibold text-zinc-900"
          >
            {item.question}
            <span>{openIndex === index ? "-" : "+"}</span>
          </button>
          {openIndex === index ? <p className="border-t border-zinc-100 px-5 py-4 text-sm leading-7 text-zinc-600">{item.answer}</p> : null}
        </div>
      ))}
    </div>
  );
}
