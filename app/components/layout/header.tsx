import { useState, useEffect } from "react";
import { NavLink } from "react-router";
import { Menu, X } from "lucide-react";
import { cn } from "~/lib/utils";
import { navItems } from "~/data/site";

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on escape key
  useEffect(() => {
    if (!mobileOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [mobileOpen]);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        scrolled
          ? "border-b border-white/[0.04] bg-black/60 backdrop-blur-[20px] backdrop-saturate-[1.2]"
          : "border-b border-transparent bg-transparent"
      )}
    >
      <div className="mx-auto flex h-16 max-w-[1100px] items-center justify-between px-6 md:px-8">
        {/* Logo */}
        <NavLink
          to="/"
          className="font-heading text-lg font-semibold tracking-tight text-white/90 transition-opacity duration-200 hover:opacity-80"
          aria-label="홈으로 이동"
        >
          kilian.sh
        </NavLink>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-8 md:flex">
          {navItems.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              end={to === "/"}
              className={({ isActive }) =>
                cn(
                  "relative text-sm font-medium transition-colors duration-200",
                  "after:absolute after:-bottom-1 after:left-0 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-purple-400/60 after:transition-transform after:duration-300",
                  isActive
                    ? "text-white/90 after:scale-x-100"
                    : "text-white/45 hover:text-white/85 hover:after:scale-x-100"
                )
              }
            >
              {label}
            </NavLink>
          ))}
        </nav>

        {/* Mobile toggle */}
        <button
          type="button"
          className="inline-flex size-9 items-center justify-center rounded-lg text-white/45 transition-colors duration-200 hover:text-white/85 md:hidden"
          aria-label={mobileOpen ? "메뉴 닫기" : "메뉴 열기"}
          onClick={() => setMobileOpen((prev) => !prev)}
        >
          {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <nav className="border-t border-white/[0.04] bg-black/80 backdrop-blur-[20px] md:hidden">
          <div className="mx-auto flex max-w-[1100px] flex-col gap-1 px-6 py-4">
            {navItems.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                end={to === "/"}
                onClick={() => setMobileOpen(false)}
                className={({ isActive }) =>
                  cn(
                    "rounded-md px-3 py-2.5 text-sm font-medium transition-colors duration-200",
                    isActive
                      ? "text-white/90 bg-white/[0.03]"
                      : "text-white/45 hover:text-white/85 hover:bg-white/[0.03]"
                  )
                }
              >
                {label}
              </NavLink>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}
