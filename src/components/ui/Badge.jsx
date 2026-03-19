import { cn } from "../../lib/utils";

export const Badge = ({
  children,
  variant = "default",
  size = "default",
  className,
}) => {
  const variants = {
    default: "bg-slate-800 text-slate-300 border-slate-700",
    primary: "bg-blue-500/20 text-blue-300 border-blue-500/30",
    success: "bg-green-500/20 text-green-300 border-green-500/30",
    accent:
      "bg-gradient-to-r from-blue-500 to-cyan-400 text-white border-transparent",
  };

  const sizes = {
    sm: "px-2 py-0.5 text-xs",
    default: "px-3 py-1 text-sm",
    lg: "px-4 py-2 text-base",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border font-medium",
        variants[variant],
        sizes[size],
        className,
      )}
    >
      {children}
    </span>
  );
};
