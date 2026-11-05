import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import type { ReactNode } from "react";
import { DentalServiceFinder } from "@/components/site/DentalServiceFinder";
import { FirstVisitJourney } from "@/components/site/FirstVisitJourney";
import { FINDER_OPTIONS, FIRST_VISIT_STEPS, PATIENT_INTERACTIONS } from "@/content/pages";

vi.mock("@tanstack/react-router", () => ({
  Link: ({ to, children, ...props }: { to: string; children: ReactNode }) => <a href={to} {...props}>{children}</a>,
}));
afterEach(cleanup);

describe("Patient navigation", () => {
  it("does not select or expand a service before patient interaction", () => {
    render(<DentalServiceFinder lang="en" />);
    expect(screen.getAllByRole("tab")).toHaveLength(4);
    expect(screen.getAllByRole("tab").filter((tab) => tab.getAttribute("aria-selected") === "true")).toHaveLength(0);
    expect(screen.queryByRole("tabpanel")).not.toBeInTheDocument();
  });

  const paths = {
    en: ["/general/", "/cosmetic/", "/implant/", "/surgical/"],
    zh: ["/zh-hant/general-cn/", "/zh-hant/cosmetic-cn/", "/zh-hant/implant-cn/", "/zh-hant/surgical-cn/"],
  };
  it.each(["en", "zh"] as const)("selects only one service and retains original %s service and contact destinations", (lang) => {
    render(<DentalServiceFinder lang={lang} />);
    const c = PATIENT_INTERACTIONS[lang].finder;
    FINDER_OPTIONS.forEach((key, i) => {
      fireEvent.mouseDown(screen.getByRole("tab", { name: c.options[key].label }), { button: 0, ctrlKey: false });
      expect(screen.getAllByRole("tab").filter((tab) => tab.getAttribute("aria-selected") === "true")).toHaveLength(1);
      expect(screen.getAllByRole("tabpanel")).toHaveLength(1);
      expect(screen.getByRole("link", { name: c.explore })).toHaveAttribute("href", paths[lang][i]);
      expect(screen.getByRole("link", { name: c.contact })).toHaveAttribute("href", lang === "en" ? "/contact/" : "/zh-hant/contact-cn/");
    });
  });

  it.each(["en", "zh"] as const)("starts at step one and allows revisiting all four %s journey steps without booking", (lang) => {
    render(<FirstVisitJourney lang={lang} />);
    const c = PATIENT_INTERACTIONS[lang].journey;
    expect(screen.getAllByRole("tab")[0]).toHaveAttribute("aria-selected", "true");
    [...FIRST_VISIT_STEPS, "contact" as const].forEach((key) => {
      const tab = screen.getByRole("tab", { name: new RegExp(c.steps[key].title) });
      fireEvent.mouseDown(tab, { button: 0, ctrlKey: false });
      expect(tab).toHaveAttribute("aria-selected", "true");
      expect(screen.getAllByRole("tabpanel")).toHaveLength(1);
      expect(screen.getByRole("link", { name: c.contact })).toHaveAttribute("href", lang === "en" ? "/contact/" : "/zh-hant/contact-cn/");
    });
  });
});