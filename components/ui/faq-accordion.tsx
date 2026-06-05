"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { Reveal } from "@/components/home/motion-primitives";

export function FaqAccordion({ items }: { items: readonly { question: string; answer: string }[] }) {
  const [openIndex, setOpenIndex] = useState<number>(0);

  return (
    <div className="mx-auto max-w-3xl space-y-4">
      {items.map((item, i) => {
        const isOpen = openIndex === i;

        return (
          <Reveal key={i} delay={0.1 * i}>
            <div className={`bg-white border rounded-3xl transition-colors group ${isOpen ? "border-ocean/30 shadow-sm" : "border-slate-100 hover:border-ocean/30"}`}>
              <button
                type="button"
                aria-expanded={isOpen}
                onClick={() => setOpenIndex(isOpen ? -1 : i)}
                className="flex w-full items-start md:items-center justify-between gap-6 p-6 md:p-8 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-ocean/40 rounded-3xl"
              >
                <div>
                  <p className="text-base md:text-lg font-bold text-ink">{item.question}</p>
                  <div className={`grid transition-[grid-template-rows,opacity] duration-300 ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
                    <div className="overflow-hidden">
                      <p className="mt-3 text-sm font-semibold leading-relaxed text-slate-500">{item.answer}</p>
                    </div>
                  </div>
                </div>
                <div className={`mt-0.5 md:mt-0 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-all ${isOpen ? "border-ocean bg-ocean text-white" : "border-slate-100 group-hover:bg-ocean group-hover:text-white"}`}>
                  <Plus className={`h-4 w-4 transition-transform ${isOpen ? "rotate-45" : ""}`} />
                </div>
              </button>
            </div>
          </Reveal>
        );
      })}
    </div>
  );
}
