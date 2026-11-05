import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, CalendarCheck, ClipboardList, MapPin, MessageCircle, Phone } from "lucide-react";
import { FIRST_VISIT_STEPS, PATIENT_INTERACTIONS } from "@/content/pages";
import { CLINIC, routeTo, UI, type Lang } from "@/content/site";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { buttonStyles } from "./Button";
import { SectionHeading } from "./Blocks";

const ICONS = { contact: MessageCircle, confirm: CalendarCheck, prepare: ClipboardList, visit: MapPin };

export function FirstVisitJourney({ lang, children }: { lang: Lang; children?: ReactNode }) {
  const c = PATIENT_INTERACTIONS[lang].journey;
  return (
    <section aria-labelledby="first-visit-title" className="bg-secondary py-20 md:py-28">
      <div className="container-page">
        <div id="first-visit-title"><SectionHeading eyebrow={c.eyebrow} title={c.title} body={c.description} /></div>
        <Tabs defaultValue="contact" activationMode="automatic" className="mt-10">
          <TabsList aria-label={c.title} className="relative grid h-auto grid-cols-2 items-stretch gap-x-4 gap-y-5 rounded-none bg-transparent p-0 md:grid-cols-4 md:gap-x-6">
            <span aria-hidden className="absolute inset-x-12 top-7 hidden h-px bg-primary/25 md:block" />
            {FIRST_VISIT_STEPS.map((key, i) => {
              const Icon = ICONS[key];
              return (
                <TabsTrigger key={key} value={key} className="group relative flex min-h-36 flex-col justify-start gap-3 whitespace-normal rounded-lg border border-transparent px-2 py-0 text-primary-deep shadow-none transition-colors duration-200 hover:border-primary/30 data-[state=active]:bg-transparent data-[state=active]:text-primary-deep data-[state=active]:shadow-none">
                  <span className="relative flex size-14 shrink-0 items-center justify-center rounded-full border border-primary/30 bg-secondary font-display text-lg text-primary transition-colors duration-200 group-data-[state=active]:border-primary group-data-[state=active]:bg-primary group-data-[state=active]:text-primary-foreground">{String(i + 1).padStart(2, "0")}</span>
                  <Icon aria-hidden className="size-5 shrink-0 text-primary" strokeWidth={1.5} />
                  <span className="max-w-48 font-display text-sm font-semibold leading-snug md:text-base">{c.steps[key].title}</span>
                </TabsTrigger>
              );
            })}
          </TabsList>
          {FIRST_VISIT_STEPS.map((key) => (
            <TabsContent key={key} value={key} className="interaction-reveal mt-6 min-h-72 border-l-2 border-primary px-5 py-3 sm:min-h-52 md:min-h-44 md:px-8">
              <h3 className="font-display text-2xl font-semibold">{c.steps[key].title}</h3>
              <p className="mt-3 max-w-3xl leading-relaxed text-foreground">{c.steps[key].description}</p>
              {key === "contact" && <a href={CLINIC.phoneHref} className="mt-4 inline-flex min-h-11 items-center gap-2 font-medium text-primary underline underline-offset-4"><Phone aria-hidden className="size-4" />{CLINIC.phoneDisplay}</a>}
              {key === "visit" && <a href={CLINIC.mapsUrl} target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex min-h-11 items-center gap-2 font-medium text-primary underline underline-offset-4"><MapPin aria-hidden className="size-4" />{UI[lang].directions}</a>}
            </TabsContent>
          ))}
        </Tabs>
        <div className="mt-6 flex flex-col justify-between gap-4 border-t border-primary/20 pt-6 sm:flex-row sm:items-center">
          <p className="font-display text-lg font-semibold text-primary-deep">{c.question}</p>
          <Link to={routeTo("contact", lang)} className={buttonStyles()}>{c.contact}<ArrowRight aria-hidden className="size-4" /></Link>
        </div>
        {children}
      </div>
    </section>
  );
}