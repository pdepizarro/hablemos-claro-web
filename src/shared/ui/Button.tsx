import Link from "next/link";

type BaseProps = {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  className?: string;
  "aria-label"?: string;
};

type AsButton = BaseProps & {
  href?: undefined;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  disabled?: boolean;
  form?: string;
};

type AsLink = BaseProps & {
  href: string;
  external?: boolean;
};

export type ButtonProps = AsButton | AsLink;

const base =
  "inline-flex items-center justify-center font-semibold rounded transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-hc-yellow focus-visible:ring-offset-2 focus-visible:ring-offset-black";

const variants = {
  primary: "bg-hc-yellow text-black border border-transparent hover:bg-hc-red hover:text-white",
  secondary: "border border-hc-yellow text-hc-yellow hover:bg-hc-yellow hover:text-black",
  ghost: "text-hc-text border border-transparent hover:text-hc-yellow"
} as const;

const sizes = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-base",
  lg: "px-8 py-4 text-lg"
} as const;

function classes(props: BaseProps): string {
  const v = variants[props.variant ?? "primary"];
  const s = sizes[props.size ?? "md"];
  return [base, v, s, props.className ?? ""].filter(Boolean).join(" ");
}

export function Button(props: ButtonProps) {
  if (props.href !== undefined) {
    const cls = classes(props);
    const label = props["aria-label"];
    return props.external ? (
      <a
        href={props.href}
        className={cls}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={label}
      >
        {props.children}
      </a>
    ) : (
      <Link href={props.href} className={cls} aria-label={label}>
        {props.children}
      </Link>
    );
  }

  return (
    <button
      type={props.type ?? "button"}
      onClick={props.onClick}
      disabled={props.disabled}
      form={props.form}
      className={[classes(props), props.disabled ? "opacity-50 pointer-events-none" : ""].join(" ")}
      aria-label={props["aria-label"]}
    >
      {props.children}
    </button>
  );
}
