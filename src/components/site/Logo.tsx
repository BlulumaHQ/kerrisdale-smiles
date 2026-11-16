import { cn } from "@/lib/utils";

/** Joyce Wu Dental tooth + JW mark (Concept 5) rendered via mask so it adapts to light/dark surfaces. */
export function Logo({ dark = false, className }: { dark?: boolean; className?: string }) {
  return (
    <span className={cn("flex items-center gap-3", className)}>
      <span
        aria-hidden
        className={cn("block h-11 w-10 shrink-0", dark ? "bg-champagne" : "bg-primary")}
        style={{
          WebkitMaskImage: "url(/images/jwd-tooth-mark.svg)",
          maskImage: "url(/images/jwd-tooth-mark.svg)",
          WebkitMaskSize: "contain",
          maskSize: "contain",
          WebkitMaskRepeat: "no-repeat",
          maskRepeat: "no-repeat",
          WebkitMaskPosition: "center",
          maskPosition: "center",
        }}
      />
      <span className="flex flex-col leading-none">
        <span className={cn("font-display text-[1.02rem] font-semibold tracking-tight", dark ? "text-on-dark" : "text-primary-deep")}>
          Dr. Joyce Wu Dental
        </span>
        <span className={cn("mt-1 text-[0.66rem] font-semibold uppercase tracking-[0.24em]", dark ? "text-champagne" : "text-champagne-ink")}>
          Kerrisdale
        </span>
      </span>
    </span>
  );
}
