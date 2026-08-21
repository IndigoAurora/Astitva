import { ArrowRight } from "lucide-react";

function Button({
  children,
  onClick,
  type = "button",
  disabled = false,
  showArrow = true,
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className="group inline-flex items-center justify-center gap-3 rounded-xl bg-[#00D4FF] px-6 py-3.5 text-sm font-bold text-[#080C1A] shadow-[0_0_30px_rgba(0,212,255,0.15)] transition duration-300 hover:shadow-[0_0_40px_rgba(0,212,255,0.3)] hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-50"
    >
      {children}

      {showArrow && (
        <ArrowRight
          size={17}
          className="transition-transform duration-300 group-hover:translate-x-1"
        />
      )}
    </button>
  );
}

export default Button;