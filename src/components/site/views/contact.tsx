"use client";

import { ChevronDown, Clock, Mail, MapPin, Phone } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { CONTACT_INFO } from "@/lib/site-data";
import { Reveal, RevealGroup, RevealItem } from "@/components/site/reveal";

/* Contact page — rebuilt against Figma "Desktop - 4" (node 33:815):
 * maroon banner with olive wave base, centred white headline,
 * plain info rows with beige icon circles, white form card with
 * cream inputs and a maroon pill submit button. */

const INFO_ROWS = [
  {
    icon: MapPin,
    label: "Location",
    value: "Rugsan Mall, Mogadishu, Somalia",
    href: "https://maps.google.com/?q=Rugsan+Mall+Mogadishu",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+252 (0) 61X XXX XXX",
    href: "tel:0619180005",
  },
  {
    icon: Mail,
    label: "Email",
    value: CONTACT_INFO.email,
    href: `mailto:${CONTACT_INFO.email}`,
  },
  {
    icon: Clock,
    label: "Opening Hours",
    value: CONTACT_INFO.hours,
  },
];

const INQUIRY_TYPES = [
  "General Question",
  "Table Reservation",
  "Catering Order",
  "Tayo Hall Event Booking",
];

const inputCls =
  "w-full rounded-[10px] border border-[#e5dccb] bg-cream px-3.5 py-2.5 font-body text-[13.5px] text-ink placeholder:text-stone3/60 outline-none transition-all duration-300 focus:border-gold focus:shadow-[0_0_0_4px_rgba(196,154,90,0.12)]";

const labelCls =
  "mb-1.5 block font-body text-[12.5px] font-bold text-[#292521]";

export function ContactView() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    type: INQUIRY_TYPES[3],
    message: "",
  });

  const set = (k: keyof typeof form) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.message.trim()) {
      toast.error("Please fill in your name and message");
      return;
    }
    const subject = encodeURIComponent(
      `${form.type} — from ${form.name}`
    );
    const body = encodeURIComponent(
      `Name: ${form.name}\nPhone: ${form.phone || "—"}\nEmail: ${form.email || "—"}\nInquiry: ${form.type}\n\n${form.message}`
    );
    toast.success("Opening your email app…", {
      description: "Your message is pre-filled and ready to send to our team.",
    });
    window.location.href = `mailto:${CONTACT_INFO.email}?subject=${subject}&body=${body}`;
  };

  return (
    <>
      {/* banner — maroon with olive wave base */}
      <section className="relative overflow-hidden bg-maroon-deep pb-20 pt-28 md:pb-24 md:pt-32">
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(900px 460px at 50% 20%, #a41824 0%, #8f111b 55%, #7d0e15 90%)",
          }}
        />
        {/* envelope — top right, as designed */}
        <img
          src="/images/contact-icon-2.webp"
          alt=""
          aria-hidden
          width={400}
          height={400}
          className="tayo-float absolute right-[6%] top-[12%] w-12 md:right-[8%] md:top-[14%] md:w-[72px]"
        />
        {/* map pin — mid left, as designed (desktop only to avoid text overlap) */}
        <img
          src="/images/contact-icon-1.webp"
          alt=""
          aria-hidden
          width={400}
          height={400}
          className="tayo-float absolute bottom-[18%] left-[24%] hidden w-11 md:block"
          style={{ animationDelay: "1.6s" }}
        />

        <div className="relative mx-auto max-w-4xl px-6 text-center">
          <Reveal>
            <h1 className="font-display text-5xl font-extrabold tracking-[-0.01em] text-cream sm:text-6xl md:text-[46px] md:leading-[1.05]">
              GET IN TOUCH
            </h1>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="mx-auto mt-4 max-w-2xl font-body text-[15px] leading-relaxed text-cream/85 sm:text-base">
              We would love to hear from you. Reach out for reservations,
              catering, or event bookings.
            </p>
          </Reveal>
        </div>

        {/* olive wave — the banner's base edge, as designed */}
        <svg
          aria-hidden
          viewBox="0 0 1440 90"
          preserveAspectRatio="none"
          className="absolute inset-x-0 bottom-0 h-[64px] w-full md:h-[90px]"
        >
          <path
            d="M0,52 C220,96 460,10 740,34 C980,54 1220,78 1440,38 L1440,90 L0,90 Z"
            fill="#4f533a"
          />
        </svg>
      </section>

      <section className="bg-white py-14 md:py-20" aria-label="Contact details and form">
        <div className="mx-auto grid max-w-[1280px] grid-cols-1 gap-12 px-5 lg:grid-cols-[1fr_1.3fr] lg:gap-16 lg:px-0">
          {/* info rows — plain list with beige icon circles */}
          <div className="lg:pl-2">
            <Reveal>
              <h2 className="font-display text-[26px] font-bold tracking-[-0.01em] text-[#292521]">
                Contact Information
              </h2>
              <p className="mt-2 font-body text-[13.5px] text-stone2">
                Our team is ready to assist you with any inquiries.
              </p>
            </Reveal>
            <RevealGroup className="mt-7 space-y-6">
              {INFO_ROWS.map((row) => {
                const Icon = row.icon;
                const inner = (
                  <>
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-[12px] bg-beige text-maroon transition-colors duration-300 group-hover:bg-pastel-pink">
                      <Icon className="h-[18px] w-[18px]" aria-hidden />
                    </span>
                    <div>
                      <p className="font-body text-[14px] font-bold text-[#292521]">
                        {row.label}
                      </p>
                      <p className="mt-0.5 font-body text-[13px] leading-relaxed text-stone2">
                        {row.value}
                      </p>
                    </div>
                  </>
                );
                return (
                  <RevealItem key={row.label}>
                    {row.href ? (
                      <a
                        href={row.href}
                        target={row.href.startsWith("http") ? "_blank" : undefined}
                        rel="noreferrer"
                        className="group flex items-center gap-4"
                      >
                        {inner}
                      </a>
                    ) : (
                      <div className="flex items-center gap-4">{inner}</div>
                    )}
                  </RevealItem>
                );
              })}
            </RevealGroup>
          </div>

          {/* form card */}
          <Reveal delay={0.1}>
            <form
              onSubmit={submit}
              className="rounded-2xl border border-[#e5dccb]/60 bg-white p-5 shadow-[0_20px_48px_rgba(42,34,30,0.08)] sm:p-7"
              aria-label="Contact form"
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="c-name" className={labelCls}>
                    Full Name
                  </label>
                  <input
                    id="c-name"
                    value={form.name}
                    onChange={set("name")}
                    placeholder="John Doe"
                    className={inputCls}
                    autoComplete="name"
                  />
                </div>
                <div>
                  <label htmlFor="c-phone" className={labelCls}>
                    Phone Number
                  </label>
                  <input
                    id="c-phone"
                    value={form.phone}
                    onChange={set("phone")}
                    placeholder="+252 (0)…"
                    className={inputCls}
                    autoComplete="tel"
                    inputMode="tel"
                  />
                </div>
              </div>
              <div className="mt-4">
                <label htmlFor="c-email" className={labelCls}>
                  Email Address
                </label>
                <input
                  id="c-email"
                  type="email"
                  value={form.email}
                  onChange={set("email")}
                  placeholder="john@example.com"
                  className={inputCls}
                  autoComplete="email"
                />
              </div>
              <div className="relative mt-4">
                <label htmlFor="c-type" className={labelCls}>
                  Inquiry Type
                </label>
                <select
                  id="c-type"
                  value={form.type}
                  onChange={set("type")}
                  className={`${inputCls} appearance-none pr-10`}
                >
                  {INQUIRY_TYPES.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
                <ChevronDown
                  className="pointer-events-none absolute bottom-3 right-3.5 h-4 w-4 text-stone2"
                  aria-hidden
                />
              </div>
              <div className="mt-4">
                <label htmlFor="c-msg" className={labelCls}>
                  Your Message
                </label>
                <textarea
                  id="c-msg"
                  rows={4}
                  value={form.message}
                  onChange={set("message")}
                  placeholder="Tell us about your event or catering needs…"
                  className={`${inputCls} resize-none`}
                />
              </div>
              <button
                type="submit"
                className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-maroon py-3 font-jakarta text-sm font-bold text-cream shadow-[0_12px_28px_rgba(139,15,22,0.28)] transition-all duration-300 hover:scale-[1.01] hover:bg-maroon-deep active:scale-[0.99]"
              >
                Send Message
              </button>
              <p className="mt-3 text-center font-body text-xs text-stone3">
                Prefer to talk? Call{" "}
                <a href="tel:0619180005" className="font-bold text-maroon hover:underline">
                  061 9180005
                </a>
              </p>
            </form>
          </Reveal>
        </div>
      </section>
    </>
  );
}
