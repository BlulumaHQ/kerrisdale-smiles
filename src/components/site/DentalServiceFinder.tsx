import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, CalendarCheck, Check, HeartPulse, ShieldCheck, Sparkles } from "lucide-react";
import { FINDER_OPTIONS, PATIENT_INTERACTIONS } from "@/content/pages";
import { routeTo, type Lang } from "@/content/site";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { buttonStyles } from "./Button";
import { SectionHeading } from "./Blocks";

const ICONS = { general: CalendarCheck, cosmetic: Sparkles, implant: ShieldCheck, surgical: HeartPulse };

export function DentalServiceFinder({ lang }: { lang: Lang }) {
  const [selected, setSelected] = useState("");
  const c = PATIENT_INTERACTIONS[lang].finder;
  return (
    <section aria-labelledby="service-finder-title" className="border-t py-16 md:py-20">
      <div className="container-page">
        <div id="service-finder-title"><SectionHeading eyebrow={c.eyebrow} title={c.title} body={c.description} /></div>
        <Tabs value={selected} onValueChange={setSelected} activationMode="manual" className="mt-8">
          <TabsList aria-label={c.title} className="grid h-auto grid-cols-1 items-stretch gap-3 rounded-none bg-transparent p-0 min-[360px]:grid-cols-2 lg:grid-cols-4">
            {FINDER_OPTIONS.map((key) => {
              const Icon = ICONS[key];
              return (
                <TabsTrigger key={key} value={key} className="group relative flex min-h-32 flex-col gap-3 whitespace-normal rounded-lg border bg-surface px-5 py-5 text-center text-primary-deep shadow-none transition-colors duration-200 hover:border-primary/50 hover:bg-secondary/40 data-[state=active]:border-primary data-[state=active]:bg-secondary data-[state=active]:text-primary-deep data-[state=active]:shadow-none">
                  <Icon aria-hidden className="size-6 shrink-0 text-primary transition-transform duration-200 group-data-[state=active]:scale-110" strokeWidth={1.5} />
                  <span className="font-display text-base font-semibold leading-snug">{c.options[key].label}</span>
                  {selected === key && <Check aria-hidden className="absolute right-3 top-3 size-4 text-primary" />}
                </TabsTrigger>
              );
            })}
          </TabsList>
          {FINDER_OPTIONS.map((key) => (
            <TabsContent key={key} value={key} className="interaction-reveal mt-6 min-h-80 border-l-2 border-champagne bg-secondary/40 p-6 sm:min-h-64 md:min-h-52 md:p-8">
              <div aria-live="polite" aria-atomic="true">
                <h3 className="font-display text-2xl font-semibold">{c.options[key].title}</h3>
                <p className="mt-3 max-w-3xl leading-relaxed text-muted-foreground">{c.options[key].description}</p>
              </div>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <Link to={routeTo(key, lang)} className={buttonStyles()}>{c.explore}<ArrowRight aria-hidden className="size-4" /></Link>
                <Link to={routeTo("contact", lang)} className={buttonStyles({ variant: "outline" })}>{c.contact}</Link>
              </div>
            </TabsContent>
          ))}
        </Tabs>
        <p className="mt-5 text-sm leading-relaxed text-muted-foreground">{c.disclaimer}</p>
      </div>
    </section>
  );
}