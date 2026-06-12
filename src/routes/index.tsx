import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useInView, useScroll, useTransform, useMotionValue, animate } from "framer-motion";
import Lenis from "lenis";

import heroScooter from "@/assets/hero-scooter.png";
import cityBg from "@/assets/city-bg.jpg";
import riderMorning from "@/assets/rider-morning.jpg";
import riderNoon from "@/assets/rider-noon.jpg";
import riderEvening from "@/assets/rider-evening.jpg";
import riderNight from "@/assets/rider-night.jpg";
import scooter1 from "@/assets/scooter-1.png";
import scooter2 from "@/assets/scooter-2.png";
import scooter3 from "@/assets/scooter-3.png";
import scooter4 from "@/assets/scooter-4.png";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "RentEVBike — Start Earning Today on an EV Scooter" },
      {
        name: "description",
        content:
          "Rent an EV scooter from RentEVBike. Delivery partners across 18 Indian cities earn ₹1,500+/day. No EMI, no down payment, instant activation.",
      },
      { property: "og:title", content: "RentEVBike — Start Earning Today" },
      {
        property: "og:description",
        content: "India's EV scooter rental built for gig workers and delivery riders.",
      },
    ],
  }),
  component: Landing,
});

/* ──────────────────────────────────────────────────────────────────────── */
/*  Helpers                                                                  */
/* ──────────────────────────────────────────────────────────────────────── */

function formatINR(n: number) {
  return new Intl.NumberFormat("en-IN").format(Math.round(n));
}

function Counter({
  to,
  prefix = "",
  duration = 2.4,
  className = "",
}: {
  to: number;
  prefix?: string;
  duration?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const mv = useMotionValue(0);
  const [display, setDisplay] = useState("0");

  useEffect(() => {
    if (!inView) return;
    const controls = animate(mv, to, {
      duration,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setDisplay(formatINR(v)),
    });
    return () => controls.stop();
  }, [inView, to, duration, mv]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {display}
    </span>
  );
}

/* ──────────────────────────────────────────────────────────────────────── */
/*  NAV                                                                      */
/* ──────────────────────────────────────────────────────────────────────── */

function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled ? "py-2" : "py-4"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 sm:px-6">
        <div
          className={`flex w-full items-center justify-between gap-4 rounded-full px-4 py-2.5 transition-all duration-500 ${
            scrolled ? "glass-strong" : "glass"
          }`}
        >
          <a href="#top" className="flex items-center gap-2">
            <span className="relative grid h-8 w-8 place-items-center rounded-full bg-neon text-black">
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
                <path d="M13 2 4 14h7l-1 8 9-12h-7l1-8z" />
              </svg>
              <span className="absolute inset-0 rounded-full bg-neon blur-md opacity-60 -z-10" />
            </span>
            <span className="font-display text-base font-semibold tracking-tight">
              rentev<span className="text-neon">bike</span>
            </span>
          </a>

          <nav className="hidden items-center gap-8 text-sm text-muted-foreground md:flex">
            <a href="#earnings" className="hover:text-foreground transition">Earnings</a>
            <a href="#map" className="hover:text-foreground transition">Live Demand</a>
            <a href="#scooters" className="hover:text-foreground transition">Scooters</a>
            <a href="#why" className="hover:text-foreground transition">Why us</a>
          </nav>

          <a
            href="#cta"
            className="group relative inline-flex items-center gap-2 rounded-full bg-neon px-4 py-2 text-sm font-semibold text-black neon-glow"
          >
            Start earning
            <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </a>
        </div>
      </div>
    </header>
  );
}

/* ──────────────────────────────────────────────────────────────────────── */
/*  HERO                                                                     */
/* ──────────────────────────────────────────────────────────────────────── */

function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const scooterY = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const scooterRotate = useTransform(scrollYProgress, [0, 1], [0, -6]);
  const bgY = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      id="top"
      ref={ref}
      className="relative isolate min-h-screen overflow-hidden pt-28 pb-16 md:pt-32"
    >
      {/* Background city */}
      <motion.div
        style={{ y: bgY, opacity: fade }}
        className="absolute inset-0 -z-10"
      >
        <img
          src={cityBg}
          alt=""
          width={1920}
          height={1080}
          className="h-full w-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/60 via-ink/70 to-ink" />
        <div className="absolute inset-0 grid-bg opacity-60" />
      </motion.div>

      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-4 sm:px-6 lg:grid-cols-[1.1fr_1fr] lg:gap-6">
        {/* LEFT */}
        <div className="relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="chip"
          >
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full rounded-full bg-neon pulse-dot" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-neon" />
            </span>
            Live · 1,284 riders earning right now
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6"
          >
            <div className="font-mono-tabular text-[clamp(2.75rem,9vw,6.5rem)] font-bold leading-[0.95] tracking-tight">
              <span className="text-foreground">₹</span>
              <Counter to={4327840} duration={2.6} className="text-shimmer" />
            </div>
            <h1 className="font-display mt-3 text-balance text-2xl font-semibold uppercase tracking-[0.18em] text-foreground/90 sm:text-3xl">
              Earned by rentevbike <span className="text-neon">riders</span> this month
            </h1>
            <p className="mt-5 max-w-xl text-balance text-base text-muted-foreground sm:text-lg">
              Thousands of riders are earning every day using our EV scooters. No EMI. No deposit.
              Pick up tomorrow, start earning tomorrow.
            </p>
          </motion.div>

          {/* Stat strip */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.25 }}
            className="mt-8 grid grid-cols-3 gap-3 sm:gap-4"
          >
            {[
              { v: 1284, l: "Active riders", suffix: "" },
              { v: 72000, l: "Deliveries done", suffix: "" },
              { v: 18, l: "Indian cities", suffix: "" },
            ].map((s) => (
              <div
                key={s.l}
                className="glass rounded-2xl px-3 py-4 sm:px-4 sm:py-5"
              >
                <div className="font-mono-tabular text-xl font-bold text-foreground sm:text-3xl">
                  <Counter to={s.v} />
                  {s.suffix}
                </div>
                <div className="mt-1 text-[10px] uppercase tracking-[0.14em] text-muted-foreground sm:text-xs">
                  {s.l}
                </div>
              </div>
            ))}
          </motion.div>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="mt-8 flex flex-wrap items-center gap-3"
          >
            <a
              href="#cta"
              className="group inline-flex items-center gap-2 rounded-full bg-neon px-6 py-3.5 font-semibold text-black neon-glow transition-transform hover:scale-[1.02]"
            >
              Start earning today
              <svg viewBox="0 0 24 24" className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </a>
            <a
              href="#stories"
              className="inline-flex items-center gap-2 rounded-full glass px-6 py-3.5 font-medium text-foreground/90 hover:bg-white/[0.08] transition"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
                <path d="M8 5v14l11-7z" />
              </svg>
              Watch rider stories
            </a>
          </motion.div>
        </div>

        {/* RIGHT — Scooter */}
        <motion.div
          style={{ y: scooterY, rotate: scooterRotate }}
          className="relative mx-auto flex aspect-square w-full max-w-[560px] items-center justify-center lg:max-w-none"
        >
          {/* Glow ring */}
          <div className="absolute inset-[12%] rounded-full bg-neon/30 blur-3xl" />
          <div className="absolute inset-[20%] rounded-full bg-neon/25 blur-2xl" />
          {/* Orbit lines */}
          <div className="absolute inset-[6%] rounded-full border border-white/5" />
          <div className="absolute inset-[14%] rounded-full border border-white/5" />
          {/* Headlight pulse */}
          <div className="absolute left-[28%] top-[40%] h-24 w-24 rounded-full bg-neon/70 blur-2xl headlight" />

          <motion.img
            src={heroScooter}
            alt="Premium electric scooter"
            width={1024}
            height={1024}
            className="relative z-10 w-full float-y drop-shadow-[0_30px_60px_rgba(158,255,0,0.25)]"
          />

          {/* Floating spec chips */}
          <FloatingChip
            className="left-2 top-10 sm:left-0 sm:top-16"
            label="Range"
            value="125 km"
            delay={0.6}
          />
          <FloatingChip
            className="right-2 top-[55%] sm:right-0"
            label="Top speed"
            value="85 km/h"
            delay={0.9}
          />
          <FloatingChip
            className="left-1/2 -translate-x-1/2 bottom-2 sm:bottom-6"
            label="Daily rent"
            value="₹99"
            highlight
            delay={1.2}
          />
        </motion.div>
      </div>

      {/* Scroll hint */}
      <div className="absolute inset-x-0 bottom-6 flex justify-center">
        <div className="flex flex-col items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
          <span>Scroll</span>
          <span className="h-8 w-px bg-gradient-to-b from-neon to-transparent" />
        </div>
      </div>
    </section>
  );
}

function FloatingChip({
  label,
  value,
  className = "",
  highlight = false,
  delay = 0,
}: {
  label: string;
  value: string;
  className?: string;
  highlight?: boolean;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className={`absolute z-20 ${className}`}
    >
      <div
        className={`glass-strong rounded-2xl px-3 py-2 ${
          highlight ? "neon-glow-soft" : ""
        }`}
      >
        <div className="text-[9px] uppercase tracking-[0.16em] text-muted-foreground">{label}</div>
        <div
          className={`font-mono-tabular text-sm font-bold ${
            highlight ? "text-neon" : "text-foreground"
          }`}
        >
          {value}
        </div>
      </div>
    </motion.div>
  );
}

/* ──────────────────────────────────────────────────────────────────────── */
/*  SECTION 2 — Live City Demand Map                                         */
/* ──────────────────────────────────────────────────────────────────────── */

const HOTSPOTS = [
  { name: "Hitech City", x: 32, y: 38, riders: 142, earn: "₹1,820", heat: "Very high" },
  { name: "Gachibowli", x: 22, y: 60, riders: 96, earn: "₹1,640", heat: "High" },
  { name: "Madhapur", x: 44, y: 48, riders: 118, earn: "₹1,720", heat: "High" },
  { name: "Kukatpally", x: 60, y: 28, riders: 74, earn: "₹1,380", heat: "Medium" },
  { name: "Banjara Hills", x: 68, y: 56, riders: 88, earn: "₹1,520", heat: "High" },
  { name: "Secunderabad", x: 78, y: 38, riders: 64, earn: "₹1,260", heat: "Medium" },
];

function LiveMap() {
  const [active, setActive] = useState(0);

  return (
    <section id="map" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeader
          kicker="Live City Demand"
          title={<>Where the city is <span className="text-neon">earning</span> right now</>}
          sub="Real-time hotspot demand from Hyderabad. Pick a spot, see what riders are making."
        />

        <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-[1.4fr_1fr]">
          {/* Map */}
          <div className="relative aspect-[4/3] overflow-hidden rounded-3xl glass-strong">
            <img
              src={cityBg}
              alt="Hyderabad night map"
              width={1600}
              height={1200}
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover opacity-60"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-ink/60 via-ink/40 to-ink/70" />
            <div className="absolute inset-0 grid-bg" />

            {/* Animated roads */}
            <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 75" preserveAspectRatio="none">
              <defs>
                <linearGradient id="road" x1="0" x2="1">
                  <stop offset="0%" stopColor="#9EFF00" stopOpacity="0" />
                  <stop offset="50%" stopColor="#9EFF00" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#9EFF00" stopOpacity="0" />
                </linearGradient>
              </defs>
              {[
                "M0 30 Q 30 20 50 35 T 100 28",
                "M0 55 Q 35 60 60 45 T 100 52",
                "M20 0 Q 30 30 45 40 T 60 75",
              ].map((d, i) => (
                <g key={i}>
                  <path d={d} stroke="rgba(158,255,0,0.18)" strokeWidth="0.4" fill="none" />
                  <path d={d} stroke="url(#road)" strokeWidth="0.5" fill="none">
                    <animate
                      attributeName="stroke-dasharray"
                      values="0 200; 60 140; 0 200"
                      dur={`${6 + i * 2}s`}
                      repeatCount="indefinite"
                    />
                  </path>
                </g>
              ))}
            </svg>

            {/* Hotspots */}
            {HOTSPOTS.map((h, i) => (
              <button
                key={h.name}
                onMouseEnter={() => setActive(i)}
                onClick={() => setActive(i)}
                style={{ left: `${h.x}%`, top: `${h.y}%` }}
                className="group absolute -translate-x-1/2 -translate-y-1/2"
              >
                <span className="relative grid place-items-center">
                  <span className="absolute h-10 w-10 rounded-full bg-neon/30 pulse-dot" />
                  <span
                    className={`relative h-3 w-3 rounded-full ring-2 ring-neon transition ${
                      active === i ? "bg-neon" : "bg-ink"
                    }`}
                  />
                </span>
                <span
                  className={`absolute left-1/2 top-4 -translate-x-1/2 whitespace-nowrap rounded-md px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider transition ${
                    active === i ? "bg-neon text-black" : "bg-black/60 text-white/80"
                  }`}
                >
                  {h.name}
                </span>
              </button>
            ))}

            {/* Moving scooter dots */}
            <ScooterDots />

            <div className="absolute left-4 top-4 chip">
              <span className="h-1.5 w-1.5 rounded-full bg-neon pulse-dot" />
              Live · Hyderabad
            </div>
          </div>

          {/* Hotspot panel */}
          <div className="flex flex-col gap-4">
            <div className="glass-strong rounded-3xl p-6">
              <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                Selected hotspot
              </div>
              <div className="mt-2 flex items-center justify-between">
                <h3 className="font-display text-3xl font-semibold">{HOTSPOTS[active].name}</h3>
                <span className="chip">{HOTSPOTS[active].heat}</span>
              </div>
              <div className="mt-6 grid grid-cols-2 gap-3">
                <div className="rounded-2xl bg-white/[0.03] p-4 ring-1 ring-white/5">
                  <div className="text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
                    Riders online
                  </div>
                  <div className="mt-1 font-mono-tabular text-2xl font-bold">
                    {HOTSPOTS[active].riders}
                  </div>
                </div>
                <div className="rounded-2xl bg-white/[0.03] p-4 ring-1 ring-white/5">
                  <div className="text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
                    Est. daily earn
                  </div>
                  <div className="mt-1 font-mono-tabular text-2xl font-bold text-neon">
                    {HOTSPOTS[active].earn}
                  </div>
                </div>
              </div>
              <div className="mt-4 h-px hairline-x" />
              <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
                <span>Demand surging in 3 zones</span>
                <span className="font-mono-tabular text-foreground">↑ 22%</span>
              </div>
            </div>

            <div className="glass rounded-3xl p-5">
              <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-3">
                Top earning zones
              </div>
              <ul className="space-y-2">
                {HOTSPOTS.slice(0, 4).map((h, i) => (
                  <li
                    key={h.name}
                    onMouseEnter={() => setActive(i)}
                    className={`flex items-center justify-between rounded-xl px-3 py-2 transition cursor-pointer ${
                      active === i ? "bg-neon/10" : "hover:bg-white/[0.04]"
                    }`}
                  >
                    <span className="flex items-center gap-3">
                      <span className="font-mono-tabular text-xs text-muted-foreground w-4">
                        {i + 1}
                      </span>
                      <span className="text-sm">{h.name}</span>
                    </span>
                    <span className="font-mono-tabular text-sm text-neon">{h.earn}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ScooterDots() {
  const paths = [
    { from: { x: 10, y: 65 }, to: { x: 90, y: 30 }, dur: 14 },
    { from: { x: 80, y: 70 }, to: { x: 20, y: 20 }, dur: 18 },
    { from: { x: 50, y: 5 }, to: { x: 55, y: 75 }, dur: 12 },
  ];
  return (
    <>
      {paths.map((p, i) => (
        <motion.span
          key={i}
          initial={{ left: `${p.from.x}%`, top: `${p.from.y}%`, opacity: 0 }}
          animate={{
            left: [`${p.from.x}%`, `${p.to.x}%`],
            top: [`${p.from.y}%`, `${p.to.y}%`],
            opacity: [0, 1, 1, 0],
          }}
          transition={{ duration: p.dur, repeat: Infinity, ease: "linear", delay: i * 1.5 }}
          className="pointer-events-none absolute h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-neon shadow-[0_0_12px_4px_rgba(158,255,0,0.7)]"
        />
      ))}
    </>
  );
}

/* ──────────────────────────────────────────────────────────────────────── */
/*  SECTION 3 — Rider Journey Timeline                                       */
/* ──────────────────────────────────────────────────────────────────────── */

const JOURNEY = [
  { time: "08:00 AM", label: "Shift started", amount: 0, deliveries: 0, img: riderMorning, note: "First login. Battery 100%." },
  { time: "11:00 AM", label: "Morning rush", amount: 540, deliveries: 8, img: riderNoon, note: "Hitech City peak hours." },
  { time: "02:00 PM", label: "Lunch surge", amount: 1040, deliveries: 15, img: riderEvening, note: "Battery swapped in 2 min." },
  { time: "08:00 PM", label: "Day done", amount: 1980, deliveries: 29, img: riderNight, note: "Profit booked. Time to head home." },
];

function Journey() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 80%", "end 20%"] });
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="stories" ref={ref} className="relative py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeader
          kicker="A Day in the Saddle"
          title={<>One rider. One day. <span className="text-neon">₹1,980</span> in the pocket.</>}
          sub="Follow Ravi's real shift in Hyderabad — from first login to last drop."
        />

        <div className="relative mt-16 md:mt-24">
          {/* Timeline rail */}
          <div className="absolute left-5 top-0 bottom-0 w-px bg-white/8 md:left-1/2 md:-translate-x-1/2" />
          <motion.div
            style={{ height: lineHeight }}
            className="absolute left-5 top-0 w-px bg-gradient-to-b from-neon via-neon to-transparent md:left-1/2 md:-translate-x-1/2"
          />

          <ul className="space-y-16 md:space-y-28">
            {JOURNEY.map((j, i) => (
              <JourneyItem key={j.time} item={j} index={i} />
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function JourneyItem({
  item,
  index,
}: {
  item: (typeof JOURNEY)[number];
  index: number;
}) {
  const ref = useRef<HTMLLIElement>(null);
  const inView = useInView(ref, { once: true, margin: "-20% 0px" });
  const flip = index % 2 === 1;

  return (
    <li ref={ref} className="relative grid grid-cols-[2.5rem_1fr] gap-4 md:grid-cols-2 md:gap-12">
      {/* Marker */}
      <div className="relative md:hidden">
        <span className="absolute left-5 top-4 grid h-3 w-3 -translate-x-1/2 place-items-center rounded-full bg-neon ring-4 ring-ink neon-glow" />
      </div>
      <div className="hidden md:block absolute left-1/2 top-8 -translate-x-1/2">
        <span className="grid h-4 w-4 place-items-center rounded-full bg-neon ring-4 ring-ink neon-glow" />
      </div>

      {/* Card */}
      <motion.div
        initial={{ opacity: 0, x: flip ? 40 : -40 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className={`glass-strong overflow-hidden rounded-3xl ${flip ? "md:col-start-2" : ""}`}
      >
        <div className="relative aspect-[16/10] overflow-hidden">
          <img
            src={item.img}
            alt={item.label}
            width={800}
            height={600}
            loading="lazy"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-transparent" />
          <div className="absolute left-4 top-4 chip">{item.time}</div>
          <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-3">
            <div>
              <div className="font-display text-xl font-semibold sm:text-2xl">{item.label}</div>
              <div className="text-xs text-muted-foreground">{item.note}</div>
            </div>
            <div className="text-right">
              <div className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">Earned</div>
              <div className="font-mono-tabular text-2xl font-bold text-neon sm:text-3xl">
                ₹{formatINR(item.amount)}
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Side notes */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.15 }}
        className={`hidden md:flex flex-col justify-center ${flip ? "md:col-start-1 md:row-start-1 md:text-right md:items-end" : ""}`}
      >
        <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
          {item.time}
        </div>
        <h3 className="font-display mt-2 text-3xl font-semibold">{item.label}</h3>
        <p className="mt-2 max-w-sm text-sm text-muted-foreground">
          {item.deliveries} deliveries · {item.note}
        </p>
        <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-white/[0.04] px-3 py-1 text-xs text-muted-foreground">
          <span className="h-1 w-1 rounded-full bg-neon" />
          Running total <span className="font-mono-tabular text-foreground">₹{formatINR(item.amount)}</span>
        </div>
      </motion.div>
    </li>
  );
}

/* ──────────────────────────────────────────────────────────────────────── */
/*  SECTION 4 — Profit Reveal                                                */
/* ──────────────────────────────────────────────────────────────────────── */

function Profit() {
  return (
    <section id="earnings" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeader
          kicker="Profit Reveal"
          title={<>Keep more of <span className="text-neon">what you earn.</span></>}
          sub="₹99/day rental. The rest is yours."
        />

        <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-[1fr_1.2fr]">
          {/* Calculator card */}
          <div className="glass-strong relative overflow-hidden rounded-3xl p-6 sm:p-8">
            <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-neon/20 blur-3xl" />
            <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
              Today's ledger · Ravi K.
            </div>

            <div className="mt-6 space-y-5">
              <Row label="Today's earnings" value={1980} positive />
              <div className="hairline-x" />
              <Row label="Bike rental cost" value={99} negative />
              <div className="hairline-x" />
              <div>
                <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                  Net profit
                </div>
                <div className="mt-2 font-mono-tabular text-5xl font-bold text-neon sm:text-6xl">
                  ₹<Counter to={1881} duration={2} />
                </div>
                <div className="mt-1 text-sm text-muted-foreground">
                  ~₹56,430/month at this pace
                </div>
              </div>
            </div>

            <div className="mt-8 inline-flex items-center gap-2 rounded-full bg-neon/10 px-3 py-1.5 text-xs text-neon ring-1 ring-neon/30">
              <span className="h-1.5 w-1.5 rounded-full bg-neon" />
              Zero hidden charges
            </div>
          </div>

          {/* Chart card */}
          <div className="glass-strong relative overflow-hidden rounded-3xl p-6 sm:p-8">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                  Net profit · last 7 days
                </div>
                <div className="mt-2 font-mono-tabular text-3xl font-bold">
                  ₹<Counter to={12940} />
                </div>
              </div>
              <span className="chip">↑ 18.4%</span>
            </div>

            <ProfitChart />

            <div className="mt-6 grid grid-cols-3 gap-3 text-center">
              {[
                { l: "Best day", v: "₹2,210" },
                { l: "Avg / day", v: "₹1,848" },
                { l: "Trips", v: "187" },
              ].map((s) => (
                <div key={s.l} className="rounded-2xl bg-white/[0.03] p-3 ring-1 ring-white/5">
                  <div className="text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
                    {s.l}
                  </div>
                  <div className="mt-1 font-mono-tabular text-base font-bold">{s.v}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Row({ label, value, positive, negative }: { label: string; value: number; positive?: boolean; negative?: boolean }) {
  return (
    <div className="flex items-baseline justify-between gap-4">
      <div className="text-sm text-muted-foreground">{label}</div>
      <div
        className={`font-mono-tabular text-2xl font-bold sm:text-3xl ${
          positive ? "text-foreground" : negative ? "text-foreground/60" : ""
        }`}
      >
        {negative ? "−" : ""}₹<Counter to={value} />
      </div>
    </div>
  );
}

function ProfitChart() {
  const data = [820, 1240, 980, 1640, 1450, 1980, 1830];
  const max = Math.max(...data);
  const ref = useRef<SVGSVGElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });

  const points = useMemo(
    () =>
      data
        .map((v, i) => {
          const x = (i / (data.length - 1)) * 100;
          const y = 100 - (v / max) * 80 - 5;
          return `${x},${y}`;
        })
        .join(" "),
    [data, max],
  );

  return (
    <div className="mt-6 aspect-[16/8] w-full">
      <svg ref={ref} viewBox="0 0 100 100" preserveAspectRatio="none" className="h-full w-full">
        <defs>
          <linearGradient id="fill" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#9EFF00" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#9EFF00" stopOpacity="0" />
          </linearGradient>
        </defs>
        {[20, 40, 60, 80].map((y) => (
          <line key={y} x1="0" x2="100" y1={y} y2={y} stroke="rgba(255,255,255,0.05)" strokeWidth="0.2" />
        ))}
        <motion.polygon
          points={`0,100 ${points} 100,100`}
          fill="url(#fill)"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 1.2, delay: 0.3 }}
        />
        <motion.polyline
          points={points}
          fill="none"
          stroke="#9EFF00"
          strokeWidth="0.6"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          animate={inView ? { pathLength: 1 } : {}}
          transition={{ duration: 1.6, ease: "easeOut" }}
          style={{ filter: "drop-shadow(0 0 4px #9EFF00)" }}
        />
        {data.map((v, i) => {
          const x = (i / (data.length - 1)) * 100;
          const y = 100 - (v / max) * 80 - 5;
          return (
            <motion.circle
              key={i}
              cx={x}
              cy={y}
              r="0.9"
              fill="#9EFF00"
              initial={{ scale: 0 }}
              animate={inView ? { scale: 1 } : {}}
              transition={{ delay: 0.5 + i * 0.1 }}
            />
          );
        })}
      </svg>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────────────── */
/*  SECTION 5 — Why Riders Choose Us                                         */
/* ──────────────────────────────────────────────────────────────────────── */

const PERKS = [
  { t: "No EMI", d: "Zero loans, zero credit checks.", icon: "💳" },
  { t: "No down payment", d: "Walk in empty handed. Ride out earning.", icon: "🆓" },
  { t: "No maintenance", d: "Servicing on us. Always.", icon: "🛠️" },
  { t: "Battery swap", d: "60-second swap at 220+ stations.", icon: "🔋" },
  { t: "Flexible plans", d: "Daily, weekly, monthly. Cancel any day.", icon: "🗓️" },
  { t: "Instant activation", d: "KYC in 7 minutes. Ride in 15.", icon: "⚡" },
  { t: "24/7 support", d: "Real humans, never a chatbot.", icon: "📞" },
  { t: "Roadside help", d: "We come to you. Anywhere, anytime.", icon: "🛟" },
];

function Why() {
  return (
    <section id="why" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeader
          kicker="Why riders pick rentevbike"
          title={<>Built for the rider, <span className="text-neon">not the bank.</span></>}
          sub="Everything the gig economy needs. Nothing it doesn't."
        />
        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {PERKS.map((p, i) => (
            <motion.div
              key={p.t}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.6, delay: (i % 4) * 0.08 }}
              className="group relative overflow-hidden rounded-3xl glass p-6 transition hover:bg-white/[0.06]"
            >
              <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-neon/0 blur-2xl transition group-hover:bg-neon/20" />
              <div className="text-3xl">{p.icon}</div>
              <h3 className="font-display mt-4 text-lg font-semibold">{p.t}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{p.d}</p>
              <div className="mt-6 flex items-center gap-1 text-xs text-neon opacity-0 transition group-hover:opacity-100">
                Learn more
                <svg viewBox="0 0 24 24" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────────────────────────────── */
/*  SECTION 6 — Scooter Carousel                                             */
/* ──────────────────────────────────────────────────────────────────────── */

const SCOOTERS = [
  { name: "Volt S1", style: "Ola-inspired", rent: 99, range: "121 km", availability: "In stock", img: scooter1, accent: "from-white/10" },
  { name: "Apex 450", style: "Ather-inspired", rent: 119, range: "146 km", availability: "Few left", img: scooter2, accent: "from-zinc-500/10" },
  { name: "Cube iQ", style: "TVS-inspired", rent: 89, range: "100 km", availability: "In stock", img: scooter3, accent: "from-sky-500/10" },
  { name: "Retro 70", style: "Chetak-inspired", rent: 129, range: "108 km", availability: "Pre-book", img: scooter4, accent: "from-amber-500/10" },
];

function Scooters() {
  const [i, setI] = useState(0);
  const next = () => setI((p) => (p + 1) % SCOOTERS.length);
  const prev = () => setI((p) => (p - 1 + SCOOTERS.length) % SCOOTERS.length);
  const s = SCOOTERS[i];

  return (
    <section id="scooters" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeader
          kicker="The fleet"
          title={<>Pick your <span className="text-neon">ride.</span></>}
          sub="Premium EV scooters, certified. Battery-swap ready, every one of them."
        />

        <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-[1fr_1.2fr] lg:items-center">
          {/* Stage */}
          <div className="relative aspect-square overflow-hidden rounded-[2rem] glass-strong">
            <div className={`absolute inset-0 bg-gradient-radial ${s.accent} to-transparent`} />
            <div className="absolute inset-0 grid-bg opacity-40" />
            <div className="absolute left-1/2 top-1/2 h-3/5 w-3/5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-neon/20 blur-3xl" />
            <motion.img
              key={s.name}
              src={s.img}
              alt={s.name}
              width={800}
              height={600}
              loading="lazy"
              initial={{ opacity: 0, scale: 0.92, rotateY: -15 }}
              animate={{ opacity: 1, scale: 1, rotateY: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0 h-full w-full object-contain p-6 sm:p-12"
            />
            <div className="absolute bottom-4 left-4 chip">{s.style}</div>
            <div className="absolute bottom-4 right-4 flex gap-2">
              <button
                onClick={prev}
                className="grid h-10 w-10 place-items-center rounded-full glass-strong hover:bg-white/10"
                aria-label="Previous scooter"
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M15 6l-6 6 6 6" /></svg>
              </button>
              <button
                onClick={next}
                className="grid h-10 w-10 place-items-center rounded-full bg-neon text-black neon-glow-soft"
                aria-label="Next scooter"
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M9 6l6 6-6 6" /></svg>
              </button>
            </div>
          </div>

          {/* Details */}
          <div>
            <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
              Model {String(i + 1).padStart(2, "0")} / {String(SCOOTERS.length).padStart(2, "0")}
            </div>
            <h3 className="font-display mt-2 text-5xl font-semibold sm:text-7xl">{s.name}</h3>

            <div className="mt-8 grid grid-cols-3 gap-3">
              <Spec label="Daily rent" value={`₹${s.rent}`} highlight />
              <Spec label="Range" value={s.range} />
              <Spec label="Status" value={s.availability} />
            </div>

            <ul className="mt-8 space-y-2 text-sm text-muted-foreground">
              {["Battery-swap network access", "Delivery box compatible", "App + GPS unlock", "Insurance included"].map((f) => (
                <li key={f} className="flex items-center gap-3">
                  <span className="grid h-5 w-5 place-items-center rounded-full bg-neon/15 text-neon">
                    <svg viewBox="0 0 24 24" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="3"><path d="M5 12l5 5L20 7" /></svg>
                  </span>
                  {f}
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#cta" className="inline-flex items-center gap-2 rounded-full bg-neon px-6 py-3 font-semibold text-black neon-glow">
                Reserve {s.name}
              </a>
              <a href="#cta" className="inline-flex items-center gap-2 rounded-full glass px-6 py-3 font-medium">
                Compare all
              </a>
            </div>

            {/* Thumbs */}
            <div className="mt-8 flex gap-3">
              {SCOOTERS.map((sc, idx) => (
                <button
                  key={sc.name}
                  onClick={() => setI(idx)}
                  className={`relative h-16 w-20 overflow-hidden rounded-xl ring-1 transition ${
                    i === idx ? "ring-neon" : "ring-white/10 opacity-60 hover:opacity-100"
                  }`}
                >
                  <img src={sc.img} alt={sc.name} className="h-full w-full object-contain p-1" loading="lazy" />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Spec({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div className={`rounded-2xl p-4 ring-1 ring-white/8 ${highlight ? "bg-neon/10 ring-neon/30" : "bg-white/[0.03]"}`}>
      <div className="text-[10px] uppercase tracking-[0.16em] text-muted-foreground">{label}</div>
      <div className={`mt-1 font-mono-tabular text-lg font-bold ${highlight ? "text-neon" : ""}`}>{value}</div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────────────── */
/*  SECTION 7 — Live Activity Feed                                           */
/* ──────────────────────────────────────────────────────────────────────── */

const FEED = [
  { who: "Ravi", what: "rented Volt S1", where: "Hitech City", t: "12s ago", v: null as string | null },
  { who: "Priya", what: "earned today", where: "Madhapur", t: "34s ago", v: "₹1,450" },
  { who: "Arjun", what: "completed deliveries", where: "Gachibowli", t: "1m ago", v: "28 trips" },
  { who: "12 riders", what: "joined today", where: "Bangalore", t: "2m ago", v: null },
  { who: "Suresh", what: "swapped battery in", where: "Kukatpally", t: "3m ago", v: "58 sec" },
  { who: "Neha", what: "hit weekly target", where: "Pune", t: "4m ago", v: "₹11,200" },
  { who: "Manoj", what: "rented Apex 450", where: "Hyderabad", t: "5m ago", v: null },
  { who: "Kiran", what: "earned overnight", where: "Secunderabad", t: "6m ago", v: "₹980" },
];

function ActivityFeed() {
  const tracks = [FEED, [...FEED].reverse()];
  return (
    <section className="relative py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeader
          kicker="Live activity"
          title={<>The network is <span className="text-neon">moving.</span></>}
          sub="A real-time pulse from every city we operate in."
        />
      </div>

      <div className="mt-12 space-y-4 overflow-hidden">
        {tracks.map((track, ti) => (
          <div key={ti} className="relative overflow-hidden">
            <div
              className={`flex w-max gap-3 ${ti === 1 ? "marquee [animation-direction:reverse]" : "marquee"}`}
              style={{ animationDuration: ti === 1 ? "50s" : "40s" }}
            >
              {[...track, ...track, ...track].map((f, i) => (
                <div
                  key={i}
                  className="flex w-[280px] shrink-0 items-center gap-3 rounded-2xl glass px-4 py-3"
                >
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-neon/15 text-neon text-xs font-bold">
                    {f.who[0]}
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="truncate text-sm">
                      <span className="font-semibold">{f.who}</span>{" "}
                      <span className="text-muted-foreground">{f.what}</span>{" "}
                      {f.v && <span className="font-mono-tabular text-neon">{f.v}</span>}
                    </div>
                    <div className="text-[10px] text-muted-foreground">
                      {f.where} · {f.t}
                    </div>
                  </div>
                  <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-neon pulse-dot" />
                </div>
              ))}
            </div>
            <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-ink to-transparent" />
            <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-ink to-transparent" />
          </div>
        ))}
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────────────────────────────── */
/*  FINAL CTA + FOOTER                                                       */
/* ──────────────────────────────────────────────────────────────────────── */

function FinalCTA() {
  return (
    <section id="cta" className="relative isolate overflow-hidden py-32 md:py-44">
      <div className="absolute inset-0 -z-10">
        <img
          src={cityBg}
          alt=""
          width={1920}
          height={1080}
          loading="lazy"
          className="h-full w-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink via-ink/80 to-ink" />
        <div className="absolute inset-0 grid-bg opacity-50" />
      </div>

      <div className="mx-auto max-w-6xl px-4 sm:px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
        >
          <span className="chip">The final word</span>
          <h2 className="font-display mt-6 text-balance text-[clamp(2.5rem,9vw,7rem)] font-bold leading-[0.95] tracking-tight">
            Stop paying <span className="text-foreground/40 line-through decoration-[3px] decoration-destructive">EMIs.</span>
            <br />
            Start <span className="text-shimmer">earning.</span>
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-balance text-muted-foreground sm:text-lg">
            Walk in tomorrow. Ride out tomorrow. Make your first ₹1,500 tomorrow night.
          </p>
        </motion.div>

        <div className="mx-auto mt-12 max-w-3xl">
          <motion.img
            src={heroScooter}
            alt="EV Scooter"
            width={1024}
            height={1024}
            loading="lazy"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="mx-auto w-full float-y drop-shadow-[0_30px_80px_rgba(158,255,0,0.35)]"
          />
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <a href="#" className="inline-flex items-center gap-2 rounded-full bg-neon px-7 py-4 text-base font-semibold text-black neon-glow">
            Rent your EV today
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
          </a>
          <a href="https://wa.me/919999999999" className="inline-flex items-center gap-2 rounded-full glass-strong px-7 py-4 text-base font-medium">
            <svg viewBox="0 0 24 24" className="h-5 w-5 text-neon" fill="currentColor">
              <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.86 9.86 0 0 0 4.78 1.22h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2zm5.83 14.18c-.25.7-1.43 1.32-2 1.4-.51.07-1.16.11-1.87-.12-.43-.14-.99-.32-1.7-.63-3-1.3-4.96-4.31-5.11-4.51-.15-.2-1.22-1.62-1.22-3.09s.77-2.2 1.05-2.5c.27-.3.6-.37.79-.37h.57c.18 0 .43-.07.67.51.25.6.86 2.07.94 2.22.07.15.13.32.02.52-.1.2-.15.32-.3.5-.15.18-.32.4-.46.54-.15.15-.31.31-.13.6.18.3.81 1.33 1.74 2.16 1.2 1.07 2.21 1.4 2.52 1.55.31.15.49.13.67-.08.18-.2.78-.91.99-1.22.2-.31.41-.26.69-.16.28.1 1.77.83 2.08.99.3.15.5.22.58.35.07.13.07.74-.18 1.44z"/>
            </svg>
            Chat on WhatsApp
          </a>
        </div>

        <div className="mt-16">
          <div className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
            Trusted by riders on
          </div>
          <div className="mt-5 flex flex-wrap items-center justify-center gap-x-8 gap-y-4 text-lg font-semibold text-muted-foreground/70">
            {["Zomato", "Swiggy", "Zepto", "Uber", "Rapido", "BlinkIt", "Dunzo"].map((b) => (
              <span key={b} className="font-display hover:text-neon transition">{b}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-white/5 py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-4">
          <div className="col-span-2">
            <div className="flex items-center gap-2">
              <span className="grid h-8 w-8 place-items-center rounded-full bg-neon text-black">
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor"><path d="M13 2 4 14h7l-1 8 9-12h-7l1-8z" /></svg>
              </span>
              <span className="font-display text-base font-semibold">rentev<span className="text-neon">bike</span></span>
            </div>
            <p className="mt-4 max-w-sm text-sm text-muted-foreground">
              India's EV scooter rental platform built for delivery partners. Earn more. Pay less. Ride electric.
            </p>
            <div className="mt-5 flex gap-2">
              {["IG", "X", "YT", "IN"].map((s) => (
                <a key={s} href="#" className="grid h-9 w-9 place-items-center rounded-full glass text-xs hover:bg-neon hover:text-black transition">
                  {s}
                </a>
              ))}
            </div>
          </div>

          <FooterCol title="Platform" links={["How it works", "Pricing", "Fleet", "Battery network", "Support"]} />
          <FooterCol title="Cities" links={["Hyderabad", "Bangalore", "Pune", "Mumbai", "+ 14 more"]} />
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-white/5 pt-6 text-xs text-muted-foreground sm:flex-row">
          <div>© {new Date().getFullYear()} RentEVBike Mobility Pvt. Ltd. Built in India.</div>
          <div className="flex gap-4">
            <a href="#" className="hover:text-foreground">Privacy</a>
            <a href="#" className="hover:text-foreground">Terms</a>
            <a href="#" className="hover:text-foreground">Contact</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: string[] }) {
  return (
    <div>
      <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{title}</div>
      <ul className="mt-4 space-y-2 text-sm">
        {links.map((l) => (
          <li key={l}><a href="#" className="text-foreground/80 hover:text-neon transition">{l}</a></li>
        ))}
      </ul>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────────────── */
/*  Section Header                                                           */
/* ──────────────────────────────────────────────────────────────────────── */

function SectionHeader({
  kicker,
  title,
  sub,
}: {
  kicker: string;
  title: React.ReactNode;
  sub?: string;
}) {
  return (
    <div className="mx-auto max-w-3xl text-center">
      <span className="chip">{kicker}</span>
      <h2 className="font-display mt-5 text-balance text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl md:text-6xl">
        {title}
      </h2>
      {sub && <p className="mt-4 text-balance text-base text-muted-foreground sm:text-lg">{sub}</p>}
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────────────── */
/*  PAGE                                                                     */
/* ──────────────────────────────────────────────────────────────────────── */

function Landing() {
  // Lenis smooth scroll
  useEffect(() => {
    if (typeof window === "undefined") return;
    const lenis = new Lenis({ lerp: 0.1, smoothWheel: true });
    let raf = 0;
    const tick = (t: number) => {
      lenis.raf(t);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
    };
  }, []);

  return (
    <div className="relative">
      <Nav />
      <main>
        <Hero />
        <LiveMap />
        <Journey />
        <Profit />
        <Why />
        <Scooters />
        <ActivityFeed />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}
