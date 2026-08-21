import { ArrowRight, Menu, X } from "lucide-react";
import { useState } from "react";

function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const closeMenu = () => {
    setMobileOpen(false);
  };

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-[#dcd5ca] bg-[#f7f3ed]/95 backdrop-blur-md">
        <div className="mx-auto flex h-[82px] max-w-[1440px] items-center justify-between px-6 lg:px-[70px]">

          {/* LOGO */}
          <a
            href="/"
            className="flex items-center gap-4"
            onClick={closeMenu}
          >
            {/* Logo mark */}
            <div className="relative flex h-[50px] w-[42px] items-center justify-center">
              <div className="absolute inset-0 rotate-45 border border-[#c59b5e]" />

              <span className="relative z-10 text-[21px] font-serif text-[#c59b5e]">
                A
              </span>
            </div>

            <div>
              <div className="flex items-center gap-[3px] text-[19px] tracking-[0.42em] text-[#171918]">
                A S T I T V A
              </div>

              <div className="mt-0.5 text-[9px] font-medium tracking-[0.28em] text-[#b77e39]">
                PROOF OF CREATION
              </div>
            </div>
          </a>

          {/* DESKTOP NAV */}
          <nav className="astitva-desktop-nav hidden items-center gap-12 md:flex">
            <a
              href="#how-it-works"
              className="text-[15px] text-[#252827] transition hover:text-[#c08b4d]"
            >
              How it works
            </a>

            <a
              href="#why-astitva"
              className="text-[15px] text-[#252827] transition hover:text-[#c08b4d]"
            >
              Why Astitva
            </a>

            <a
              href="#proof"
              className="text-[15px] text-[#252827] transition hover:text-[#c08b4d]"
            >
              Verify
            </a>

            <a
              href="#about"
              className="text-[15px] text-[#252827] transition hover:text-[#c08b4d]"
            >
              About us
            </a>
          </nav>

          {/* RIGHT SIDE */}
          <div className="hidden items-center gap-8 md:flex">
            <a
              href="/login"
              className="text-[15px] text-[#171918] transition hover:text-[#b77e39]"
            >
              Login
            </a>

            <a
              href="/stamp-my-work"
              className="group flex h-[46px] items-center gap-7 bg-[#173633] px-6 text-[15px] font-medium text-white transition hover:bg-[#214640]"
            >
              Stamp My Work

              <ArrowRight
                size={19}
                strokeWidth={1.5}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </a>
          </div>

          {/* MOBILE MENU BUTTON */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="flex h-10 w-10 items-center justify-center border border-[#d4ccc0] md:hidden"
            aria-label="Toggle navigation"
          >
            {mobileOpen ? (
              <X size={20} />
            ) : (
              <Menu size={20} />
            )}
          </button>
        </div>
      </header>

      {/* MOBILE NAV */}
      {mobileOpen && (
        <div className="fixed inset-x-0 top-[82px] z-40 border-b border-[#dcd5ca] bg-[#f7f3ed] px-6 py-6 shadow-lg md:hidden">
          <div className="flex flex-col gap-5">

            <a
              href="#how-it-works"
              onClick={closeMenu}
              className="border-b border-[#ddd5c9] pb-4 text-[15px]"
            >
              How it works
            </a>

            <a
              href="#why-astitva"
              onClick={closeMenu}
              className="border-b border-[#ddd5c9] pb-4 text-[15px]"
            >
              Why Astitva
            </a>

            <a
              href="#proof"
              onClick={closeMenu}
              className="border-b border-[#ddd5c9] pb-4 text-[15px]"
            >
              Verify
            </a>

            <a
              href="#about"
              onClick={closeMenu}
              className="border-b border-[#ddd5c9] pb-4 text-[15px]"
            >
              About us
            </a>

            <a
              href="/login"
              onClick={closeMenu}
              className="text-[15px]"
            >
              Login
            </a>

            <a
              href="/stamp-my-work"
              onClick={closeMenu}
              className="flex items-center justify-center gap-3 bg-[#173633] py-3.5 text-sm font-medium text-white"
            >
              Stamp My Work
              <ArrowRight size={17} />
            </a>

          </div>
        </div>
      )}
    </>
  );
}

export default Navbar;