import { cva, type VariantProps } from "class-variance-authority";

export const buttonStyles = cva(
  "inline-flex items-center justify-center gap-2 rounded-full font-medium transition-all duration-300 ease-out disabled:pointer-events-none disabled:opacity-60 min-h-11 whitespace-nowrap",
  {
    variants: {
      variant: {
        primary: "bg-primary text-primary-foreground hover:bg-primary-deep shadow-soft hover:shadow-lift",
        champagne: "bg-champagne text-primary-deep hover:bg-on-dark",
        outline: "border border-primary/30 text-primary-deep hover:border-primary hover:bg-surface",
        ghostDark: "border border-on-dark/40 text-on-dark hover:bg-on-dark hover:text-primary-deep",
        link: "min-h-0 rounded-none px-0 text-primary underline-offset-4 hover:underline",
      },
      size: {
        sm: "px-4 py-2 text-sm",
        md: "px-6 py-3 text-[0.95rem]",
        lg: "px-7 py-3.5 text-base",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  },
);

export type ButtonStyleProps = VariantProps<typeof buttonStyles>;
