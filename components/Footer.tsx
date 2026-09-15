import Link from "next/link";
import { nav, practice, fullAddress, site, nearbyAreas } from "@/lib/site";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-line bg-canvas">
      <div className="container-page grid gap-10 py-14 md:grid-cols-4">
        <div className="md:col-span-2">
          <p className="font-serif text-lg font-semibold text-ink">
            Dr Amanda Henderson
          </p>
          <p className="mt-1 text-sm text-muted">
            Female family GP · {practice.suburb}, Sydney
          </p>
          <p className="mt-4 max-w-sm text-sm leading-6 text-muted">
            Thoughtful, thorough general practice with a particular interest in
            women&rsquo;s health, pregnancy, children and family medicine.
          </p>
          <p className="mt-4 text-xs text-muted">
            Serving {nearbyAreas.slice(0, 6).join(", ")} and the eastern
            suburbs.
          </p>
        </div>

        <nav aria-label="Footer" className="text-sm">
          <p className="mb-3 font-semibold text-ink">Explore</p>
          <ul className="space-y-2">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-muted hover:text-ink"
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/midlife-health-check-sydney"
                className="text-muted hover:text-ink"
              >
                Midlife Health Check
              </Link>
            </li>
            <li>
              <Link href="/contact" className="text-muted hover:text-ink">
                Contact
              </Link>
            </li>
            <li>
              <Link href="/editorial-policy" className="text-muted hover:text-ink">
                Editorial policy
              </Link>
            </li>
            <li>
              <Link href="/privacy" className="text-muted hover:text-ink">
                Privacy
              </Link>
            </li>
          </ul>
        </nav>

        <div className="text-sm">
          <p className="mb-3 font-semibold text-ink">Practice</p>
          <address className="not-italic leading-6 text-muted">
            {practice.name}
            <br />
            {fullAddress}
          </address>
          <p className="mt-3 leading-6 text-muted">
            <a href={practice.phoneHref} className="hover:text-ink" data-cta="call_practice">
              {practice.phone}
            </a>
          </p>
          <a
            href={practice.bookingUrl}
            target="_blank"
            rel="noopener"
            data-cta="book_appointment"
            className="btn-primary mt-4 px-5 py-2.5 text-sm"
          >
            Book an appointment
          </a>
        </div>
      </div>

      <div className="border-t border-line/70">
        <div className="container-page flex flex-col gap-2 py-6 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} Dr Amanda Henderson. All rights
            reserved.
          </p>
          <p className="max-w-xl sm:text-right">
            Information on this site is general in nature and is not a substitute
            for personal medical advice. In an emergency, call{" "}
            <a href="tel:000" className="font-medium text-ink">
              000
            </a>
            .
          </p>
        </div>
      </div>
    </footer>
  );
}
