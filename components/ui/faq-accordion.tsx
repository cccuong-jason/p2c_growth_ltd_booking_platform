"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { Reveal } from "@/components/home/motion-primitives";

interface FaqItem {
  question: string;
  answer: string;
}

interface FaqCategory {
  id: string;
  label: string;
  items: readonly FaqItem[];
}

export function FaqAccordion({ 
  categories 
}: { 
  categories: readonly FaqCategory[];
}) {
  const [activeTabId, setActiveTabId] = useState<string>(categories[0]?.id || "");
  const [openIndex, setOpenIndex] = useState<number>(0);

  const activeCategory = categories.find((cat) => cat.id === activeTabId) || categories[0];
  const items = activeCategory?.items || [];

  const handleTabChange = (id: string) => {
    setActiveTabId(id);
    setOpenIndex(0); // Reset accordion state to open first question of the new category
  };

  return (
    <div className="mx-auto max-w-4xl space-y-8">
      {/* Category Tabs */}
      {categories.length > 1 && (
        <div className="flex flex-wrap justify-center gap-3 border-b border-slate-100 pb-8">
          {categories.map((cat) => {
            const isActive = cat.id === activeTabId;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => handleTabChange(cat.id)}
                className={`px-6 py-3 text-xs md:text-sm font-extrabold rounded-2xl border transition-all duration-200 active:scale-95 shadow-sm ${
                  isActive 
                    ? "bg-ocean text-white border-ocean shadow-blue-500/10" 
                    : "bg-white hover:bg-slate-50 border-slate-200 text-slate-650 hover:text-slate-800"
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>
      )}

      {/* Accordion List */}
      <div className="space-y-4 max-w-3xl mx-auto">
        {items.map((item, i) => {
          const isOpen = openIndex === i;

          return (
            <Reveal key={`${activeTabId}-${i}`} delay={0.08 * i}>
              <div className={`bg-white border rounded-3xl transition-all duration-300 group ${isOpen ? "border-ocean/30 shadow-md translate-y-[-2px]" : "border-slate-200 hover:border-ocean/20 hover:shadow-sm shadow-sm"}`}>
                <button
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() => setOpenIndex(isOpen ? -1 : i)}
                  className="flex w-full items-start md:items-center justify-between gap-6 p-6 md:p-8 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-ocean/40 rounded-3xl"
                >
                  <div className="flex-1">
                    <p className="text-base md:text-lg font-bold text-ink leading-snug">{item.question}</p>
                    <div className={`grid transition-[grid-template-rows,opacity] duration-300 ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
                      <div className="overflow-hidden">
                        <p className="mt-4 text-sm font-semibold leading-relaxed text-slate-500">{item.answer}</p>
                      </div>
                    </div>
                  </div>
                  <div className={`mt-0.5 md:mt-0 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-all duration-300 ${isOpen ? "border-ocean bg-ocean text-white" : "border-slate-200 group-hover:bg-ocean group-hover:text-white"}`}>
                    <Plus className={`h-4 w-4 transition-transform duration-300 ${isOpen ? "rotate-45" : ""}`} />
                  </div>
                </button>
              </div>
            </Reveal>
          );
        })}
      </div>
    </div>
  );
}
