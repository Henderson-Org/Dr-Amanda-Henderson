"use client";

import Link from "next/link";
import { useState } from "react";
import { nav, practice, site } from "@/lib/site";

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-line/70 bg-paper/85 backdrop-blur supports-[backdrop-filter]:bg-paper/70">
      <div className="container-page flex h-16 items-center justify-between gap-4">
        <Link
          href="/"
          className="flex flex-col leading-none"
          aria-label={`${site.name} - home`}
          onClick={() => setOpen(false)}
        >
          <span className="font-serif text-lg font-semibold tracking-tight text-ink">
            Dr Amanda Henderson
          </span>
          <span className="text-[0.7rem] font-medium uppercase tracking-[0.14em] text-sage-600">
            Family GP · Maroubra
          </span>
        </Link>

        {/* Desktop nav */}
        <nav
          aria-label="Primary"
          className="hidden items-center gap-x-4 xl:flex xl:gap-x-5"
        >
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="whitespace-nowrap text-[0.9rem] font-medium text-muted transition-colors hover:text-ink xl:text-[0.95rem]"
            >
              {item.label}
            </Link>
          ))}
          <a
            href={practice.bookingUrl}
            target="_blank"
            rel="noopener"
            data-cta="book_appointment"
            className="btn-primary px-5 py-2 text-[0.9rem] xl:text-[0.95rem]"
          >
            Book
          </a>
        </nav>

        {/* Mobile toggle */}
        <button
          type="button"
          className="inline-flex items-center gap-2 rounded-full border border-line px-3 py-2 text-sm font-medium text-ink xl:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((v) => !v)}
        >
          <span className="sr-only">
            {open ? "Close menu" : "Open menu"}
          </span>
          <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2">
            {open ? (
              <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
            ) : (
              <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
            )}
          </svg>
          Menu
        </button>
      </div>

      {/* Mobile menu panel */}
      {open && (
        <nav
          id="mobile-menu"
          aria-label="Primary"
          className="border-t border-line bg-paper xl:hidden"
        >
          <ul className="container-page flex flex-col py-3">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="block rounded-lg px-2 py-3 text-base font-medium text-ink hover:bg-canvas"
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li className="pt-2">
              <a
                href={practice.bookingUrl}
                target="_blank"
                rel="noopener"
                data-cta="book_appointment"
                className="btn-primary w-full"
                onClick={() => setOpen(false)}
              >
                Book an appointment
              </a>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
