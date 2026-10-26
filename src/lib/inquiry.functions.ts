import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

export const inquirySchema = z.object({
  name: z.string().trim().min(2).max(100),
  email: z.string().trim().email().max(255),
  phone: z
    .string()
    .trim()
    .min(7)
    .max(30)
    .regex(/^[0-9+()\-.\s]+$/),
  service: z.enum(["general", "cosmetic", "surgical", "implant", "other"]),
  contactMethod: z.enum(["phone", "email"]),
  message: z.string().trim().max(1000).optional().default(""),
  consent: z.literal(true),
  website: z.string().max(0).optional().default(""), // honeypot — must stay empty
  startedAt: z.number().int(),
});

export type InquiryInput = z.input<typeof inquirySchema>;
export type InquiryResult = { status: "delivered" } | { status: "not_configured" } | { status: "rejected" };

/**
 * Inquiry delivery endpoint. No delivery channel (email service or storage) has been
 * authorised for this preview, so validated inquiries are NOT sent anywhere and the
 * UI tells the visitor to call or email instead. Wire a real channel here when approved.
 */
export const submitInquiry = createServerFn({ method: "POST" })
  .inputValidator((data: InquiryInput) => inquirySchema.parse(data))
  .handler(async ({ data }): Promise<InquiryResult> => {
    // Spam checks: honeypot filled, or submitted faster than a human could.
    if (data.website || Date.now() - data.startedAt < 2500) return { status: "rejected" };
    return { status: "not_configured" };
  });
