import { cn } from "@/lib/utils";

/** Original clinic "J" mark (from the source site) rendered via mask so it adapts to light/dark surfaces. */
export function Logo({ dark = false, className }: { dark?: boolean; className?: string }) {
  return (
    <span className={cn("flex items-center gap-3", className)}>
      <span
        aria-hidden
        className={cn("block size-10 shrink-0 rounded-full border", dark ? "border-on-dark/30" : "border-primary/20")}
        style={{ display: "grid", placeItems: "center" }}
      >
        <span
          className={cn("block size-7", dark ? "bg-champagne" : "bg-primary")}
          style={{
            WebkitMaskImage: "url(/images/joyce-wu-dental-logo-mark.png)",
            maskImage: "url(/images/joyce-wu-dental-logo-mark.png)",
            WebkitMaskSize: "contain",
            maskSize: "contain",
            WebkitMaskRepeat: "no-repeat",
            maskRepeat: "no-repeat",
            WebkitMaskPosition: "center",
            maskPosition: "center",
          }}
        />
      </span>
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
