import { PageBand, SectionHeading } from "@/components/site-shell";

export default function AboutPage() {
  return (
    <main>
      <PageBand>
        <SectionHeading
          eyebrow="About P2C Growth"
          title="Technology infrastructure for service businesses that need trust before scale."
          description="P2C Growth LTD builds booking, CRM, and coordination systems for businesses that manage high-value requests across customers and professional partners."
        />
        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {[
            ["Customer-centric", "Every workflow starts with a clear user request and a low-friction path to human follow-up."],
            ["Transparent", "Users see the role P2C plays, what happens next, and where clinical or professional responsibility sits."],
            ["Tech-driven", "Modern product interfaces, structured data, and automation replace scattered calls, emails, and spreadsheets."]
          ].map(([title, body]) => (
            <article key={title} className="rounded-lg border border-slate-200 bg-white p-6 shadow-panel">
              <h2 className="text-xl font-semibold text-ink">{title}</h2>
              <p className="mt-3 leading-7 text-slate-600">{body}</p>
            </article>
          ))}
        </div>
      </PageBand>
    </main>
  );
}
