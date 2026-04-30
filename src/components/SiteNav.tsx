"use client";

import Link from "next/link";
import classNames from "classnames";
import { useEffect, useState } from "react";

type SiteNavVariant = "landing" | "light";

function MenuToggleIcon({
  open,
  className,
}: {
  open: boolean;
  className?: string;
}) {
  return (
    <svg
      className={classNames("h-6 w-6", className)}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
      aria-hidden
    >
      {open ? (
        <path strokeLinecap="round" d="M6 18L18 6M6 6l12 12" />
      ) : (
        <>
          <path strokeLinecap="round" d="M4 7h16" />
          <path strokeLinecap="round" d="M4 12h16" />
          <path strokeLinecap="round" d="M4 17h16" />
        </>
      )}
    </svg>
  );
}

export function SiteNav({
  variant = "light",
  bgColor,
}: {
  variant?: SiteNavVariant;
  bgColor?: string;
}) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [menuOpen]);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  if (variant === "landing") {
    const panelBg = scrolled ? (bgColor ?? "bg-brand/98") : "bg-slate-900/95";
    const linkClass =
      "block py-3 text-base font-medium text-white/95 transition hover:text-white";
    const navLinkClass = "transition hover:text-white px-5";

    return (
      <header
        className={classNames(
          "sticky top-0 z-50 flex flex-wrap items-center justify-between gap-3 px-4 backdrop-blur md:h-16 md:flex-nowrap md:gap-4 md:px-10 lg:px-16 transition-colors",
          scrolled ? (bgColor ?? "bg-brand/95") : "bg-transparent",
          "min-h-14 py-3 md:py-0",
          "relative",
        )}
      >
        <Link
          href="/"
          className="text-lg font-bold tracking-tight text-white md:text-xl h-[64px] leading-[64px] block px-4"
          onClick={() => setMenuOpen(false)}
        >
          Tokenthon
        </Link>

        <button
          type="button"
          className="inline-flex items-center justify-center rounded-md p-2 text-white md:hidden"
          aria-expanded={menuOpen}
          aria-controls="site-nav-mobile-landing"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          onClick={() => setMenuOpen((o) => !o)}
        >
          <MenuToggleIcon open={menuOpen} />
        </button>

        <nav
          className="hidden w-full h-[64px] leading-[64px] flex-none items-center text-sm font-medium text-white/95 md:flex md:w-auto"
          aria-label="Main"
        >
          <Link href="/schedule" className={navLinkClass}>
            Global Tour Schedule
          </Link>
          <Link href="/pressroom" className={navLinkClass}>
            Pressroom
          </Link>
          <Link href="/contact" className={navLinkClass}>
            Contact
          </Link>
          {/* <Link href="/kovar" className={navLinkClass}>
            Kovar
          </Link> */}
          <Link
            href="/submit"
            className="rounded-full bg-white px-5 py-2 text-sm font-semibold text-brand shadow-sm transition hover:bg-white/90 hover:scale-[1.02] active:scale-[0.98]"
          >
            Submit
          </Link>
        </nav>

        {menuOpen && (
          <>
            <button
              type="button"
              className="fixed inset-0 z-40 bg-black/40 md:hidden"
              aria-label="Close menu"
              onClick={() => setMenuOpen(false)}
            />
            <nav
              id="site-nav-mobile-landing"
              className={classNames(
                "absolute left-0 right-0 top-full z-50 flex max-h-[min(70vh,calc(100dvh-3.5rem))] px-4 shadow-md flex-col overflow-y-auto border-t border-white/10 md:hidden",
                panelBg,
              )}
              aria-label="Main mobile"
            >
              <Link
                href="/schedule"
                className={linkClass}
                onClick={() => setMenuOpen(false)}
              >
                Global Tour Schedule
              </Link>
              <Link
                href="/pressroom"
                className={linkClass}
                onClick={() => setMenuOpen(false)}
              >
                Pressroom
              </Link>
              <Link
                href="/contact"
                className={linkClass}
                onClick={() => setMenuOpen(false)}
              >
                Contact
              </Link>
              {/* <Link
                href="/kovar"
                className={linkClass}
                onClick={() => setMenuOpen(false)}
              >
                Kovar
              </Link> */}
              <Link
                href="/submit"
                className="mb-3 mt-1 block rounded-full bg-white px-5 py-3 text-center text-sm font-semibold text-brand shadow-sm transition hover:bg-white/90 active:scale-[0.98]"
                onClick={() => setMenuOpen(false)}
              >
                Submit
              </Link>
            </nav>
          </>
        )}
      </header>
    );
  }

  const linkClassMobile =
    "block border-b border-slate-100 py-3.5 text-base text-slate-700 transition last:border-0 hover:text-brand active:bg-slate-50";

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur md:px-10">
      <div className="relative mx-auto flex max-w-6xl flex-wrap items-center justify-between">
        <Link
          href="/"
          className="text-base font-bold text-slate-800 h-[64px] leading-[64px] block px-4"
          onClick={() => setMenuOpen(false)}
        >
          Tokenthon
        </Link>

        <button
          type="button"
          className="inline-flex items-center justify-center rounded-md p-2 text-slate-700 hover:bg-slate-100 md:hidden"
          aria-expanded={menuOpen}
          aria-controls="site-nav-mobile-light"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          onClick={() => setMenuOpen((o) => !o)}
        >
          <MenuToggleIcon open={menuOpen} />
        </button>

        <nav
          className="hidden flex-wrap items-center text-sm text-slate-600 md:flex leading-[64px]"
          aria-label="Main"
        >
          <Link href="/" className="hover:text-brand px-5 block">
            Home
          </Link>
          <Link href="/schedule" className="hover:text-brand px-5">
            Global Tour Schedule
          </Link>
          <Link href="/pressroom" className="hover:text-brand px-5">
            Pressroom
          </Link>
          <Link href="/contact" className="hover:text-brand px-5">
            Contact
          </Link>
          {/* <Link href="/kovar" className="hover:text-brand px-5">
            Kovar
          </Link> */}

          <Link
            href="/submit"
            className="hover:text-white rounded-full text-white px-5 py-2 text-sm font-semibold bg-brand shadow-sm transition hover:bg-brand/90 hover:scale-[1.02] active:scale-[0.98]"
          >
            Submit
          </Link>
        </nav>

        {menuOpen && (
          <>
            <button
              type="button"
              className="fixed inset-0 z-40 bg-black/30 md:hidden"
              aria-label="Close menu"
              onClick={() => setMenuOpen(false)}
            />
            <nav
              id="site-nav-mobile-light"
              className="absolute left-0 right-0 top-full z-50 border-b border-slate-200 bg-white px-4 shadow-md md:hidden"
              aria-label="Main mobile"
            >
              <Link
                href="/"
                className={linkClassMobile}
                onClick={() => setMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/schedule"
                className={linkClassMobile}
                onClick={() => setMenuOpen(false)}
              >
                Global Tour Schedule
              </Link>
              <Link
                href="/pressroom"
                className={linkClassMobile}
                onClick={() => setMenuOpen(false)}
              >
                Pressroom
              </Link>
              <Link
                href="/contact"
                className={linkClassMobile}
                onClick={() => setMenuOpen(false)}
              >
                Contact
              </Link>
              {/* <Link
                href="/kovar"
                className={linkClassMobile}
                onClick={() => setMenuOpen(false)}
              >
                Kovar
              </Link> */}
              <Link
                href="/submit"
                className={linkClassMobile}
                onClick={() => setMenuOpen(false)}
              >
                Submit
              </Link>
            </nav>
          </>
        )}
      </div>
    </header>
  );
}
