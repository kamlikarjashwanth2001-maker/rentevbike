import { jsxs, jsx, Fragment } from "react/jsx-runtime";
import { useEffect, useState, useRef, useMemo } from "react";
import { useScroll, useTransform, motion, useInView, useMotionValue, animate } from "framer-motion";
import Lenis from "lenis";
const heroScooter = "/assets/hero-scooter-CT0XbLWI.png";
const cityBg = "/assets/city-bg-DlKUSX4f.jpg";
const riderMorning = "/assets/rider-morning-D2gRWNbT.jpg";
const riderNoon = "/assets/rider-noon-BqAv-EaY.jpg";
const riderEvening = "/assets/rider-evening-D1XNdpI2.jpg";
const riderNight = "/assets/rider-night-B6sgldoo.jpg";
const scooter1 = "/assets/scooter-1-KnUh62R6.png";
const scooter2 = "/assets/scooter-2-dyJVdiiX.png";
const scooter3 = "/assets/scooter-3-DM9IYp5y.png";
const scooter4 = "/assets/scooter-4-Bue7C2BK.png";
function formatINR(n) {
  return new Intl.NumberFormat("en-IN").format(Math.round(n));
}
function Counter({
  to,
  prefix = "",
  duration = 2.4,
  className = ""
}) {
  const ref = useRef(null);
  const inView = useInView(ref, {
    once: true,
    margin: "-10% 0px"
  });
  const mv = useMotionValue(0);
  const [display, setDisplay] = useState("0");
  useEffect(() => {
    if (!inView) return;
    const controls = animate(mv, to, {
      duration,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setDisplay(formatINR(v))
    });
    return () => controls.stop();
  }, [inView, to, duration, mv]);
  return /* @__PURE__ */ jsxs("span", { ref, className, children: [
    prefix,
    display
  ] });
}
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener("scroll", onScroll, {
      passive: true
    });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return /* @__PURE__ */ jsx("header", { className: `fixed inset-x-0 top-0 z-50 transition-all duration-500 ${scrolled ? "py-2" : "py-4"}`, children: /* @__PURE__ */ jsx("div", { className: "mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 sm:px-6", children: /* @__PURE__ */ jsxs("div", { className: `flex w-full items-center justify-between gap-4 rounded-full px-4 py-2.5 transition-all duration-500 ${scrolled ? "glass-strong" : "glass"}`, children: [
    /* @__PURE__ */ jsxs("a", { href: "#top", className: "flex items-center gap-2", children: [
      /* @__PURE__ */ jsxs("span", { className: "relative grid h-8 w-8 place-items-center rounded-full bg-neon text-black", children: [
        /* @__PURE__ */ jsx("svg", { viewBox: "0 0 24 24", className: "h-4 w-4", fill: "currentColor", children: /* @__PURE__ */ jsx("path", { d: "M13 2 4 14h7l-1 8 9-12h-7l1-8z" }) }),
        /* @__PURE__ */ jsx("span", { className: "absolute inset-0 rounded-full bg-neon blur-md opacity-60 -z-10" })
      ] }),
      /* @__PURE__ */ jsxs("span", { className: "font-display text-base font-semibold tracking-tight", children: [
        "rentev",
        /* @__PURE__ */ jsx("span", { className: "text-neon", children: "bike" })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("nav", { className: "hidden items-center gap-8 text-sm text-muted-foreground md:flex", children: [
      /* @__PURE__ */ jsx("a", { href: "#earnings", className: "hover:text-foreground transition", children: "Earnings" }),
      /* @__PURE__ */ jsx("a", { href: "#map", className: "hover:text-foreground transition", children: "Live Demand" }),
      /* @__PURE__ */ jsx("a", { href: "#scooters", className: "hover:text-foreground transition", children: "Scooters" }),
      /* @__PURE__ */ jsx("a", { href: "#why", className: "hover:text-foreground transition", children: "Why us" })
    ] }),
    /* @__PURE__ */ jsxs("a", { href: "#cta", className: "group relative inline-flex items-center gap-2 rounded-full bg-neon px-4 py-2 text-sm font-semibold text-black neon-glow", children: [
      "Start earning",
      /* @__PURE__ */ jsx("svg", { viewBox: "0 0 24 24", className: "h-3.5 w-3.5", fill: "none", stroke: "currentColor", strokeWidth: "2.5", children: /* @__PURE__ */ jsx("path", { d: "M5 12h14M13 6l6 6-6 6" }) })
    ] })
  ] }) }) });
}
function Hero() {
  const ref = useRef(null);
  const {
    scrollYProgress
  } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });
  const scooterY = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const scooterRotate = useTransform(scrollYProgress, [0, 1], [0, -6]);
  const bgY = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  return /* @__PURE__ */ jsxs("section", { id: "top", ref, className: "relative isolate min-h-screen overflow-hidden pt-28 pb-16 md:pt-32", children: [
    /* @__PURE__ */ jsxs(motion.div, { style: {
      y: bgY,
      opacity: fade
    }, className: "absolute inset-0 -z-10", children: [
      /* @__PURE__ */ jsx("img", { src: cityBg, alt: "", width: 1920, height: 1080, className: "h-full w-full object-cover opacity-40" }),
      /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-b from-ink/60 via-ink/70 to-ink" }),
      /* @__PURE__ */ jsx("div", { className: "absolute inset-0 grid-bg opacity-60" })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-4 sm:px-6 lg:grid-cols-[1.1fr_1fr] lg:gap-6", children: [
      /* @__PURE__ */ jsxs("div", { className: "relative", children: [
        /* @__PURE__ */ jsxs(motion.div, { initial: {
          opacity: 0,
          y: 20
        }, animate: {
          opacity: 1,
          y: 0
        }, transition: {
          duration: 0.8,
          ease: [0.22, 1, 0.36, 1]
        }, className: "chip", children: [
          /* @__PURE__ */ jsxs("span", { className: "relative flex h-1.5 w-1.5", children: [
            /* @__PURE__ */ jsx("span", { className: "absolute inline-flex h-full w-full rounded-full bg-neon pulse-dot" }),
            /* @__PURE__ */ jsx("span", { className: "relative inline-flex h-1.5 w-1.5 rounded-full bg-neon" })
          ] }),
          "Live · 1,284 riders earning right now"
        ] }),
        /* @__PURE__ */ jsxs(motion.div, { initial: {
          opacity: 0,
          y: 30
        }, animate: {
          opacity: 1,
          y: 0
        }, transition: {
          duration: 1,
          delay: 0.1,
          ease: [0.22, 1, 0.36, 1]
        }, className: "mt-6", children: [
          /* @__PURE__ */ jsxs("div", { className: "font-mono-tabular text-[clamp(2.75rem,9vw,6.5rem)] font-bold leading-[0.95] tracking-tight", children: [
            /* @__PURE__ */ jsx("span", { className: "text-foreground", children: "₹" }),
            /* @__PURE__ */ jsx(Counter, { to: 4327840, duration: 2.6, className: "text-shimmer" })
          ] }),
          /* @__PURE__ */ jsxs("h1", { className: "font-display mt-3 text-balance text-2xl font-semibold uppercase tracking-[0.18em] text-foreground/90 sm:text-3xl", children: [
            "Earned by rentevbike ",
            /* @__PURE__ */ jsx("span", { className: "text-neon", children: "riders" }),
            " this month"
          ] }),
          /* @__PURE__ */ jsx("p", { className: "mt-5 max-w-xl text-balance text-base text-muted-foreground sm:text-lg", children: "Thousands of riders are earning every day using our EV scooters. No EMI. No deposit. Pick up tomorrow, start earning tomorrow." })
        ] }),
        /* @__PURE__ */ jsx(motion.div, { initial: {
          opacity: 0,
          y: 30
        }, animate: {
          opacity: 1,
          y: 0
        }, transition: {
          duration: 1,
          delay: 0.25
        }, className: "mt-8 grid grid-cols-3 gap-3 sm:gap-4", children: [{
          v: 1284,
          l: "Active riders",
          suffix: ""
        }, {
          v: 72e3,
          l: "Deliveries done",
          suffix: ""
        }, {
          v: 18,
          l: "Indian cities",
          suffix: ""
        }].map((s) => /* @__PURE__ */ jsxs("div", { className: "glass rounded-2xl px-3 py-4 sm:px-4 sm:py-5", children: [
          /* @__PURE__ */ jsxs("div", { className: "font-mono-tabular text-xl font-bold text-foreground sm:text-3xl", children: [
            /* @__PURE__ */ jsx(Counter, { to: s.v }),
            s.suffix
          ] }),
          /* @__PURE__ */ jsx("div", { className: "mt-1 text-[10px] uppercase tracking-[0.14em] text-muted-foreground sm:text-xs", children: s.l })
        ] }, s.l)) }),
        /* @__PURE__ */ jsxs(motion.div, { initial: {
          opacity: 0,
          y: 20
        }, animate: {
          opacity: 1,
          y: 0
        }, transition: {
          duration: 1,
          delay: 0.4
        }, className: "mt-8 flex flex-wrap items-center gap-3", children: [
          /* @__PURE__ */ jsxs("a", { href: "#cta", className: "group inline-flex items-center gap-2 rounded-full bg-neon px-6 py-3.5 font-semibold text-black neon-glow transition-transform hover:scale-[1.02]", children: [
            "Start earning today",
            /* @__PURE__ */ jsx("svg", { viewBox: "0 0 24 24", className: "h-4 w-4 transition-transform group-hover:translate-x-1", fill: "none", stroke: "currentColor", strokeWidth: "2.5", children: /* @__PURE__ */ jsx("path", { d: "M5 12h14M13 6l6 6-6 6" }) })
          ] }),
          /* @__PURE__ */ jsxs("a", { href: "#stories", className: "inline-flex items-center gap-2 rounded-full glass px-6 py-3.5 font-medium text-foreground/90 hover:bg-white/[0.08] transition", children: [
            /* @__PURE__ */ jsx("svg", { viewBox: "0 0 24 24", className: "h-4 w-4", fill: "currentColor", children: /* @__PURE__ */ jsx("path", { d: "M8 5v14l11-7z" }) }),
            "Watch rider stories"
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs(motion.div, { style: {
        y: scooterY,
        rotate: scooterRotate
      }, className: "relative mx-auto flex aspect-square w-full max-w-[560px] items-center justify-center lg:max-w-none", children: [
        /* @__PURE__ */ jsx("div", { className: "absolute inset-[12%] rounded-full bg-neon/30 blur-3xl" }),
        /* @__PURE__ */ jsx("div", { className: "absolute inset-[20%] rounded-full bg-neon/25 blur-2xl" }),
        /* @__PURE__ */ jsx("div", { className: "absolute inset-[6%] rounded-full border border-white/5" }),
        /* @__PURE__ */ jsx("div", { className: "absolute inset-[14%] rounded-full border border-white/5" }),
        /* @__PURE__ */ jsx("div", { className: "absolute left-[28%] top-[40%] h-24 w-24 rounded-full bg-neon/70 blur-2xl headlight" }),
        /* @__PURE__ */ jsx(motion.img, { src: heroScooter, alt: "Premium electric scooter", width: 1024, height: 1024, className: "relative z-10 w-full float-y drop-shadow-[0_30px_60px_rgba(158,255,0,0.25)]" }),
        /* @__PURE__ */ jsx(FloatingChip, { className: "left-2 top-10 sm:left-0 sm:top-16", label: "Range", value: "125 km", delay: 0.6 }),
        /* @__PURE__ */ jsx(FloatingChip, { className: "right-2 top-[55%] sm:right-0", label: "Top speed", value: "85 km/h", delay: 0.9 }),
        /* @__PURE__ */ jsx(FloatingChip, { className: "left-1/2 -translate-x-1/2 bottom-2 sm:bottom-6", label: "Daily rent", value: "₹99", highlight: true, delay: 1.2 })
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "absolute inset-x-0 bottom-6 flex justify-center", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-muted-foreground", children: [
      /* @__PURE__ */ jsx("span", { children: "Scroll" }),
      /* @__PURE__ */ jsx("span", { className: "h-8 w-px bg-gradient-to-b from-neon to-transparent" })
    ] }) })
  ] });
}
function FloatingChip({
  label,
  value,
  className = "",
  highlight = false,
  delay = 0
}) {
  return /* @__PURE__ */ jsx(motion.div, { initial: {
    opacity: 0,
    scale: 0.8,
    y: 10
  }, animate: {
    opacity: 1,
    scale: 1,
    y: 0
  }, transition: {
    duration: 0.6,
    delay,
    ease: [0.22, 1, 0.36, 1]
  }, className: `absolute z-20 ${className}`, children: /* @__PURE__ */ jsxs("div", { className: `glass-strong rounded-2xl px-3 py-2 ${highlight ? "neon-glow-soft" : ""}`, children: [
    /* @__PURE__ */ jsx("div", { className: "text-[9px] uppercase tracking-[0.16em] text-muted-foreground", children: label }),
    /* @__PURE__ */ jsx("div", { className: `font-mono-tabular text-sm font-bold ${highlight ? "text-neon" : "text-foreground"}`, children: value })
  ] }) });
}
const HOTSPOTS = [{
  name: "Hitech City",
  x: 32,
  y: 38,
  riders: 142,
  earn: "₹1,820",
  heat: "Very high"
}, {
  name: "Gachibowli",
  x: 22,
  y: 60,
  riders: 96,
  earn: "₹1,640",
  heat: "High"
}, {
  name: "Madhapur",
  x: 44,
  y: 48,
  riders: 118,
  earn: "₹1,720",
  heat: "High"
}, {
  name: "Kukatpally",
  x: 60,
  y: 28,
  riders: 74,
  earn: "₹1,380",
  heat: "Medium"
}, {
  name: "Banjara Hills",
  x: 68,
  y: 56,
  riders: 88,
  earn: "₹1,520",
  heat: "High"
}, {
  name: "Secunderabad",
  x: 78,
  y: 38,
  riders: 64,
  earn: "₹1,260",
  heat: "Medium"
}];
function LiveMap() {
  const [active, setActive] = useState(0);
  return /* @__PURE__ */ jsx("section", { id: "map", className: "relative py-24 md:py-32", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-7xl px-4 sm:px-6", children: [
    /* @__PURE__ */ jsx(SectionHeader, { kicker: "Live City Demand", title: /* @__PURE__ */ jsxs(Fragment, { children: [
      "Where the city is ",
      /* @__PURE__ */ jsx("span", { className: "text-neon", children: "earning" }),
      " right now"
    ] }), sub: "Real-time hotspot demand from Hyderabad. Pick a spot, see what riders are making." }),
    /* @__PURE__ */ jsxs("div", { className: "mt-12 grid grid-cols-1 gap-6 lg:grid-cols-[1.4fr_1fr]", children: [
      /* @__PURE__ */ jsxs("div", { className: "relative aspect-[4/3] overflow-hidden rounded-3xl glass-strong", children: [
        /* @__PURE__ */ jsx("img", { src: cityBg, alt: "Hyderabad night map", width: 1600, height: 1200, loading: "lazy", className: "absolute inset-0 h-full w-full object-cover opacity-60" }),
        /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-br from-ink/60 via-ink/40 to-ink/70" }),
        /* @__PURE__ */ jsx("div", { className: "absolute inset-0 grid-bg" }),
        /* @__PURE__ */ jsxs("svg", { className: "absolute inset-0 h-full w-full", viewBox: "0 0 100 75", preserveAspectRatio: "none", children: [
          /* @__PURE__ */ jsx("defs", { children: /* @__PURE__ */ jsxs("linearGradient", { id: "road", x1: "0", x2: "1", children: [
            /* @__PURE__ */ jsx("stop", { offset: "0%", stopColor: "#9EFF00", stopOpacity: "0" }),
            /* @__PURE__ */ jsx("stop", { offset: "50%", stopColor: "#9EFF00", stopOpacity: "0.8" }),
            /* @__PURE__ */ jsx("stop", { offset: "100%", stopColor: "#9EFF00", stopOpacity: "0" })
          ] }) }),
          ["M0 30 Q 30 20 50 35 T 100 28", "M0 55 Q 35 60 60 45 T 100 52", "M20 0 Q 30 30 45 40 T 60 75"].map((d, i) => /* @__PURE__ */ jsxs("g", { children: [
            /* @__PURE__ */ jsx("path", { d, stroke: "rgba(158,255,0,0.18)", strokeWidth: "0.4", fill: "none" }),
            /* @__PURE__ */ jsx("path", { d, stroke: "url(#road)", strokeWidth: "0.5", fill: "none", children: /* @__PURE__ */ jsx("animate", { attributeName: "stroke-dasharray", values: "0 200; 60 140; 0 200", dur: `${6 + i * 2}s`, repeatCount: "indefinite" }) })
          ] }, i))
        ] }),
        HOTSPOTS.map((h, i) => /* @__PURE__ */ jsxs("button", { onMouseEnter: () => setActive(i), onClick: () => setActive(i), style: {
          left: `${h.x}%`,
          top: `${h.y}%`
        }, className: "group absolute -translate-x-1/2 -translate-y-1/2", children: [
          /* @__PURE__ */ jsxs("span", { className: "relative grid place-items-center", children: [
            /* @__PURE__ */ jsx("span", { className: "absolute h-10 w-10 rounded-full bg-neon/30 pulse-dot" }),
            /* @__PURE__ */ jsx("span", { className: `relative h-3 w-3 rounded-full ring-2 ring-neon transition ${active === i ? "bg-neon" : "bg-ink"}` })
          ] }),
          /* @__PURE__ */ jsx("span", { className: `absolute left-1/2 top-4 -translate-x-1/2 whitespace-nowrap rounded-md px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider transition ${active === i ? "bg-neon text-black" : "bg-black/60 text-white/80"}`, children: h.name })
        ] }, h.name)),
        /* @__PURE__ */ jsx(ScooterDots, {}),
        /* @__PURE__ */ jsxs("div", { className: "absolute left-4 top-4 chip", children: [
          /* @__PURE__ */ jsx("span", { className: "h-1.5 w-1.5 rounded-full bg-neon pulse-dot" }),
          "Live · Hyderabad"
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-4", children: [
        /* @__PURE__ */ jsxs("div", { className: "glass-strong rounded-3xl p-6", children: [
          /* @__PURE__ */ jsx("div", { className: "text-xs uppercase tracking-[0.2em] text-muted-foreground", children: "Selected hotspot" }),
          /* @__PURE__ */ jsxs("div", { className: "mt-2 flex items-center justify-between", children: [
            /* @__PURE__ */ jsx("h3", { className: "font-display text-3xl font-semibold", children: HOTSPOTS[active].name }),
            /* @__PURE__ */ jsx("span", { className: "chip", children: HOTSPOTS[active].heat })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "mt-6 grid grid-cols-2 gap-3", children: [
            /* @__PURE__ */ jsxs("div", { className: "rounded-2xl bg-white/[0.03] p-4 ring-1 ring-white/5", children: [
              /* @__PURE__ */ jsx("div", { className: "text-[10px] uppercase tracking-[0.16em] text-muted-foreground", children: "Riders online" }),
              /* @__PURE__ */ jsx("div", { className: "mt-1 font-mono-tabular text-2xl font-bold", children: HOTSPOTS[active].riders })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "rounded-2xl bg-white/[0.03] p-4 ring-1 ring-white/5", children: [
              /* @__PURE__ */ jsx("div", { className: "text-[10px] uppercase tracking-[0.16em] text-muted-foreground", children: "Est. daily earn" }),
              /* @__PURE__ */ jsx("div", { className: "mt-1 font-mono-tabular text-2xl font-bold text-neon", children: HOTSPOTS[active].earn })
            ] })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "mt-4 h-px hairline-x" }),
          /* @__PURE__ */ jsxs("div", { className: "mt-4 flex items-center justify-between text-xs text-muted-foreground", children: [
            /* @__PURE__ */ jsx("span", { children: "Demand surging in 3 zones" }),
            /* @__PURE__ */ jsx("span", { className: "font-mono-tabular text-foreground", children: "↑ 22%" })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "glass rounded-3xl p-5", children: [
          /* @__PURE__ */ jsx("div", { className: "text-xs uppercase tracking-[0.2em] text-muted-foreground mb-3", children: "Top earning zones" }),
          /* @__PURE__ */ jsx("ul", { className: "space-y-2", children: HOTSPOTS.slice(0, 4).map((h, i) => /* @__PURE__ */ jsxs("li", { onMouseEnter: () => setActive(i), className: `flex items-center justify-between rounded-xl px-3 py-2 transition cursor-pointer ${active === i ? "bg-neon/10" : "hover:bg-white/[0.04]"}`, children: [
            /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-3", children: [
              /* @__PURE__ */ jsx("span", { className: "font-mono-tabular text-xs text-muted-foreground w-4", children: i + 1 }),
              /* @__PURE__ */ jsx("span", { className: "text-sm", children: h.name })
            ] }),
            /* @__PURE__ */ jsx("span", { className: "font-mono-tabular text-sm text-neon", children: h.earn })
          ] }, h.name)) })
        ] })
      ] })
    ] })
  ] }) });
}
function ScooterDots() {
  const paths = [{
    from: {
      x: 10,
      y: 65
    },
    to: {
      x: 90,
      y: 30
    },
    dur: 14
  }, {
    from: {
      x: 80,
      y: 70
    },
    to: {
      x: 20,
      y: 20
    },
    dur: 18
  }, {
    from: {
      x: 50,
      y: 5
    },
    to: {
      x: 55,
      y: 75
    },
    dur: 12
  }];
  return /* @__PURE__ */ jsx(Fragment, { children: paths.map((p, i) => /* @__PURE__ */ jsx(motion.span, { initial: {
    left: `${p.from.x}%`,
    top: `${p.from.y}%`,
    opacity: 0
  }, animate: {
    left: [`${p.from.x}%`, `${p.to.x}%`],
    top: [`${p.from.y}%`, `${p.to.y}%`],
    opacity: [0, 1, 1, 0]
  }, transition: {
    duration: p.dur,
    repeat: Infinity,
    ease: "linear",
    delay: i * 1.5
  }, className: "pointer-events-none absolute h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-neon shadow-[0_0_12px_4px_rgba(158,255,0,0.7)]" }, i)) });
}
const JOURNEY = [{
  time: "08:00 AM",
  label: "Shift started",
  amount: 0,
  deliveries: 0,
  img: riderMorning,
  note: "First login. Battery 100%."
}, {
  time: "11:00 AM",
  label: "Morning rush",
  amount: 540,
  deliveries: 8,
  img: riderNoon,
  note: "Hitech City peak hours."
}, {
  time: "02:00 PM",
  label: "Lunch surge",
  amount: 1040,
  deliveries: 15,
  img: riderEvening,
  note: "Battery swapped in 2 min."
}, {
  time: "08:00 PM",
  label: "Day done",
  amount: 1980,
  deliveries: 29,
  img: riderNight,
  note: "Profit booked. Time to head home."
}];
function Journey() {
  const ref = useRef(null);
  const {
    scrollYProgress
  } = useScroll({
    target: ref,
    offset: ["start 80%", "end 20%"]
  });
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  return /* @__PURE__ */ jsx("section", { id: "stories", ref, className: "relative py-24 md:py-32", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-7xl px-4 sm:px-6", children: [
    /* @__PURE__ */ jsx(SectionHeader, { kicker: "A Day in the Saddle", title: /* @__PURE__ */ jsxs(Fragment, { children: [
      "One rider. One day. ",
      /* @__PURE__ */ jsx("span", { className: "text-neon", children: "₹1,980" }),
      " in the pocket."
    ] }), sub: "Follow Ravi's real shift in Hyderabad — from first login to last drop." }),
    /* @__PURE__ */ jsxs("div", { className: "relative mt-16 md:mt-24", children: [
      /* @__PURE__ */ jsx("div", { className: "absolute left-5 top-0 bottom-0 w-px bg-white/8 md:left-1/2 md:-translate-x-1/2" }),
      /* @__PURE__ */ jsx(motion.div, { style: {
        height: lineHeight
      }, className: "absolute left-5 top-0 w-px bg-gradient-to-b from-neon via-neon to-transparent md:left-1/2 md:-translate-x-1/2" }),
      /* @__PURE__ */ jsx("ul", { className: "space-y-16 md:space-y-28", children: JOURNEY.map((j, i) => /* @__PURE__ */ jsx(JourneyItem, { item: j, index: i }, j.time)) })
    ] })
  ] }) });
}
function JourneyItem({
  item,
  index
}) {
  const ref = useRef(null);
  const inView = useInView(ref, {
    once: true,
    margin: "-20% 0px"
  });
  const flip = index % 2 === 1;
  return /* @__PURE__ */ jsxs("li", { ref, className: "relative grid grid-cols-[2.5rem_1fr] gap-4 md:grid-cols-2 md:gap-12", children: [
    /* @__PURE__ */ jsx("div", { className: "relative md:hidden", children: /* @__PURE__ */ jsx("span", { className: "absolute left-5 top-4 grid h-3 w-3 -translate-x-1/2 place-items-center rounded-full bg-neon ring-4 ring-ink neon-glow" }) }),
    /* @__PURE__ */ jsx("div", { className: "hidden md:block absolute left-1/2 top-8 -translate-x-1/2", children: /* @__PURE__ */ jsx("span", { className: "grid h-4 w-4 place-items-center rounded-full bg-neon ring-4 ring-ink neon-glow" }) }),
    /* @__PURE__ */ jsx(motion.div, { initial: {
      opacity: 0,
      x: flip ? 40 : -40
    }, animate: inView ? {
      opacity: 1,
      x: 0
    } : {}, transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1]
    }, className: `glass-strong overflow-hidden rounded-3xl ${flip ? "md:col-start-2" : ""}`, children: /* @__PURE__ */ jsxs("div", { className: "relative aspect-[16/10] overflow-hidden", children: [
      /* @__PURE__ */ jsx("img", { src: item.img, alt: item.label, width: 800, height: 600, loading: "lazy", className: "h-full w-full object-cover" }),
      /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-transparent" }),
      /* @__PURE__ */ jsx("div", { className: "absolute left-4 top-4 chip", children: item.time }),
      /* @__PURE__ */ jsxs("div", { className: "absolute bottom-4 left-4 right-4 flex items-end justify-between gap-3", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("div", { className: "font-display text-xl font-semibold sm:text-2xl", children: item.label }),
          /* @__PURE__ */ jsx("div", { className: "text-xs text-muted-foreground", children: item.note })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "text-right", children: [
          /* @__PURE__ */ jsx("div", { className: "text-[10px] uppercase tracking-[0.18em] text-muted-foreground", children: "Earned" }),
          /* @__PURE__ */ jsxs("div", { className: "font-mono-tabular text-2xl font-bold text-neon sm:text-3xl", children: [
            "₹",
            formatINR(item.amount)
          ] })
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxs(motion.div, { initial: {
      opacity: 0,
      y: 20
    }, animate: inView ? {
      opacity: 1,
      y: 0
    } : {}, transition: {
      duration: 0.8,
      delay: 0.15
    }, className: `hidden md:flex flex-col justify-center ${flip ? "md:col-start-1 md:row-start-1 md:text-right md:items-end" : ""}`, children: [
      /* @__PURE__ */ jsx("div", { className: "text-xs uppercase tracking-[0.2em] text-muted-foreground", children: item.time }),
      /* @__PURE__ */ jsx("h3", { className: "font-display mt-2 text-3xl font-semibold", children: item.label }),
      /* @__PURE__ */ jsxs("p", { className: "mt-2 max-w-sm text-sm text-muted-foreground", children: [
        item.deliveries,
        " deliveries · ",
        item.note
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "mt-4 inline-flex items-center gap-2 rounded-full bg-white/[0.04] px-3 py-1 text-xs text-muted-foreground", children: [
        /* @__PURE__ */ jsx("span", { className: "h-1 w-1 rounded-full bg-neon" }),
        "Running total ",
        /* @__PURE__ */ jsxs("span", { className: "font-mono-tabular text-foreground", children: [
          "₹",
          formatINR(item.amount)
        ] })
      ] })
    ] })
  ] });
}
function Profit() {
  return /* @__PURE__ */ jsx("section", { id: "earnings", className: "relative py-24 md:py-32", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-7xl px-4 sm:px-6", children: [
    /* @__PURE__ */ jsx(SectionHeader, { kicker: "Profit Reveal", title: /* @__PURE__ */ jsxs(Fragment, { children: [
      "Keep more of ",
      /* @__PURE__ */ jsx("span", { className: "text-neon", children: "what you earn." })
    ] }), sub: "₹99/day rental. The rest is yours." }),
    /* @__PURE__ */ jsxs("div", { className: "mt-12 grid grid-cols-1 gap-6 lg:grid-cols-[1fr_1.2fr]", children: [
      /* @__PURE__ */ jsxs("div", { className: "glass-strong relative overflow-hidden rounded-3xl p-6 sm:p-8", children: [
        /* @__PURE__ */ jsx("div", { className: "absolute -right-20 -top-20 h-64 w-64 rounded-full bg-neon/20 blur-3xl" }),
        /* @__PURE__ */ jsx("div", { className: "text-xs uppercase tracking-[0.2em] text-muted-foreground", children: "Today's ledger · Ravi K." }),
        /* @__PURE__ */ jsxs("div", { className: "mt-6 space-y-5", children: [
          /* @__PURE__ */ jsx(Row, { label: "Today's earnings", value: 1980, positive: true }),
          /* @__PURE__ */ jsx("div", { className: "hairline-x" }),
          /* @__PURE__ */ jsx(Row, { label: "Bike rental cost", value: 99, negative: true }),
          /* @__PURE__ */ jsx("div", { className: "hairline-x" }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("div", { className: "text-[10px] uppercase tracking-[0.2em] text-muted-foreground", children: "Net profit" }),
            /* @__PURE__ */ jsxs("div", { className: "mt-2 font-mono-tabular text-5xl font-bold text-neon sm:text-6xl", children: [
              "₹",
              /* @__PURE__ */ jsx(Counter, { to: 1881, duration: 2 })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "mt-1 text-sm text-muted-foreground", children: "~₹56,430/month at this pace" })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "mt-8 inline-flex items-center gap-2 rounded-full bg-neon/10 px-3 py-1.5 text-xs text-neon ring-1 ring-neon/30", children: [
          /* @__PURE__ */ jsx("span", { className: "h-1.5 w-1.5 rounded-full bg-neon" }),
          "Zero hidden charges"
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "glass-strong relative overflow-hidden rounded-3xl p-6 sm:p-8", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("div", { className: "text-xs uppercase tracking-[0.2em] text-muted-foreground", children: "Net profit · last 7 days" }),
            /* @__PURE__ */ jsxs("div", { className: "mt-2 font-mono-tabular text-3xl font-bold", children: [
              "₹",
              /* @__PURE__ */ jsx(Counter, { to: 12940 })
            ] })
          ] }),
          /* @__PURE__ */ jsx("span", { className: "chip", children: "↑ 18.4%" })
        ] }),
        /* @__PURE__ */ jsx(ProfitChart, {}),
        /* @__PURE__ */ jsx("div", { className: "mt-6 grid grid-cols-3 gap-3 text-center", children: [{
          l: "Best day",
          v: "₹2,210"
        }, {
          l: "Avg / day",
          v: "₹1,848"
        }, {
          l: "Trips",
          v: "187"
        }].map((s) => /* @__PURE__ */ jsxs("div", { className: "rounded-2xl bg-white/[0.03] p-3 ring-1 ring-white/5", children: [
          /* @__PURE__ */ jsx("div", { className: "text-[10px] uppercase tracking-[0.16em] text-muted-foreground", children: s.l }),
          /* @__PURE__ */ jsx("div", { className: "mt-1 font-mono-tabular text-base font-bold", children: s.v })
        ] }, s.l)) })
      ] })
    ] })
  ] }) });
}
function Row({
  label,
  value,
  positive,
  negative
}) {
  return /* @__PURE__ */ jsxs("div", { className: "flex items-baseline justify-between gap-4", children: [
    /* @__PURE__ */ jsx("div", { className: "text-sm text-muted-foreground", children: label }),
    /* @__PURE__ */ jsxs("div", { className: `font-mono-tabular text-2xl font-bold sm:text-3xl ${positive ? "text-foreground" : negative ? "text-foreground/60" : ""}`, children: [
      negative ? "−" : "",
      "₹",
      /* @__PURE__ */ jsx(Counter, { to: value })
    ] })
  ] });
}
function ProfitChart() {
  const data = [820, 1240, 980, 1640, 1450, 1980, 1830];
  const max = Math.max(...data);
  const ref = useRef(null);
  const inView = useInView(ref, {
    once: true,
    margin: "-10%"
  });
  const points = useMemo(() => data.map((v, i) => {
    const x = i / (data.length - 1) * 100;
    const y = 100 - v / max * 80 - 5;
    return `${x},${y}`;
  }).join(" "), [data, max]);
  return /* @__PURE__ */ jsx("div", { className: "mt-6 aspect-[16/8] w-full", children: /* @__PURE__ */ jsxs("svg", { ref, viewBox: "0 0 100 100", preserveAspectRatio: "none", className: "h-full w-full", children: [
    /* @__PURE__ */ jsx("defs", { children: /* @__PURE__ */ jsxs("linearGradient", { id: "fill", x1: "0", x2: "0", y1: "0", y2: "1", children: [
      /* @__PURE__ */ jsx("stop", { offset: "0%", stopColor: "#9EFF00", stopOpacity: "0.5" }),
      /* @__PURE__ */ jsx("stop", { offset: "100%", stopColor: "#9EFF00", stopOpacity: "0" })
    ] }) }),
    [20, 40, 60, 80].map((y) => /* @__PURE__ */ jsx("line", { x1: "0", x2: "100", y1: y, y2: y, stroke: "rgba(255,255,255,0.05)", strokeWidth: "0.2" }, y)),
    /* @__PURE__ */ jsx(motion.polygon, { points: `0,100 ${points} 100,100`, fill: "url(#fill)", initial: {
      opacity: 0
    }, animate: inView ? {
      opacity: 1
    } : {}, transition: {
      duration: 1.2,
      delay: 0.3
    } }),
    /* @__PURE__ */ jsx(motion.polyline, { points, fill: "none", stroke: "#9EFF00", strokeWidth: "0.6", strokeLinecap: "round", strokeLinejoin: "round", initial: {
      pathLength: 0
    }, animate: inView ? {
      pathLength: 1
    } : {}, transition: {
      duration: 1.6,
      ease: "easeOut"
    }, style: {
      filter: "drop-shadow(0 0 4px #9EFF00)"
    } }),
    data.map((v, i) => {
      const x = i / (data.length - 1) * 100;
      const y = 100 - v / max * 80 - 5;
      return /* @__PURE__ */ jsx(motion.circle, { cx: x, cy: y, r: "0.9", fill: "#9EFF00", initial: {
        scale: 0
      }, animate: inView ? {
        scale: 1
      } : {}, transition: {
        delay: 0.5 + i * 0.1
      } }, i);
    })
  ] }) });
}
const PERKS = [{
  t: "No EMI",
  d: "Zero loans, zero credit checks.",
  icon: "💳"
}, {
  t: "No down payment",
  d: "Walk in empty handed. Ride out earning.",
  icon: "🆓"
}, {
  t: "No maintenance",
  d: "Servicing on us. Always.",
  icon: "🛠️"
}, {
  t: "Battery swap",
  d: "60-second swap at 220+ stations.",
  icon: "🔋"
}, {
  t: "Flexible plans",
  d: "Daily, weekly, monthly. Cancel any day.",
  icon: "🗓️"
}, {
  t: "Instant activation",
  d: "KYC in 7 minutes. Ride in 15.",
  icon: "⚡"
}, {
  t: "24/7 support",
  d: "Real humans, never a chatbot.",
  icon: "📞"
}, {
  t: "Roadside help",
  d: "We come to you. Anywhere, anytime.",
  icon: "🛟"
}];
function Why() {
  return /* @__PURE__ */ jsx("section", { id: "why", className: "relative py-24 md:py-32", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-7xl px-4 sm:px-6", children: [
    /* @__PURE__ */ jsx(SectionHeader, { kicker: "Why riders pick rentevbike", title: /* @__PURE__ */ jsxs(Fragment, { children: [
      "Built for the rider, ",
      /* @__PURE__ */ jsx("span", { className: "text-neon", children: "not the bank." })
    ] }), sub: "Everything the gig economy needs. Nothing it doesn't." }),
    /* @__PURE__ */ jsx("div", { className: "mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4", children: PERKS.map((p, i) => /* @__PURE__ */ jsxs(motion.div, { initial: {
      opacity: 0,
      y: 20
    }, whileInView: {
      opacity: 1,
      y: 0
    }, viewport: {
      once: true,
      margin: "-10%"
    }, transition: {
      duration: 0.6,
      delay: i % 4 * 0.08
    }, className: "group relative overflow-hidden rounded-3xl glass p-6 transition hover:bg-white/[0.06]", children: [
      /* @__PURE__ */ jsx("div", { className: "absolute -right-10 -top-10 h-32 w-32 rounded-full bg-neon/0 blur-2xl transition group-hover:bg-neon/20" }),
      /* @__PURE__ */ jsx("div", { className: "text-3xl", children: p.icon }),
      /* @__PURE__ */ jsx("h3", { className: "font-display mt-4 text-lg font-semibold", children: p.t }),
      /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-muted-foreground", children: p.d }),
      /* @__PURE__ */ jsxs("div", { className: "mt-6 flex items-center gap-1 text-xs text-neon opacity-0 transition group-hover:opacity-100", children: [
        "Learn more",
        /* @__PURE__ */ jsx("svg", { viewBox: "0 0 24 24", className: "h-3 w-3", fill: "none", stroke: "currentColor", strokeWidth: "2.5", children: /* @__PURE__ */ jsx("path", { d: "M5 12h14M13 6l6 6-6 6" }) })
      ] })
    ] }, p.t)) })
  ] }) });
}
const SCOOTERS = [{
  name: "Volt S1",
  style: "Ola-inspired",
  rent: 99,
  range: "121 km",
  availability: "In stock",
  img: scooter1,
  accent: "from-white/10"
}, {
  name: "Apex 450",
  style: "Ather-inspired",
  rent: 119,
  range: "146 km",
  availability: "Few left",
  img: scooter2,
  accent: "from-zinc-500/10"
}, {
  name: "Cube iQ",
  style: "TVS-inspired",
  rent: 89,
  range: "100 km",
  availability: "In stock",
  img: scooter3,
  accent: "from-sky-500/10"
}, {
  name: "Retro 70",
  style: "Chetak-inspired",
  rent: 129,
  range: "108 km",
  availability: "Pre-book",
  img: scooter4,
  accent: "from-amber-500/10"
}];
function Scooters() {
  const [i, setI] = useState(0);
  const next = () => setI((p) => (p + 1) % SCOOTERS.length);
  const prev = () => setI((p) => (p - 1 + SCOOTERS.length) % SCOOTERS.length);
  const s = SCOOTERS[i];
  return /* @__PURE__ */ jsx("section", { id: "scooters", className: "relative py-24 md:py-32", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-7xl px-4 sm:px-6", children: [
    /* @__PURE__ */ jsx(SectionHeader, { kicker: "The fleet", title: /* @__PURE__ */ jsxs(Fragment, { children: [
      "Pick your ",
      /* @__PURE__ */ jsx("span", { className: "text-neon", children: "ride." })
    ] }), sub: "Premium EV scooters, certified. Battery-swap ready, every one of them." }),
    /* @__PURE__ */ jsxs("div", { className: "mt-12 grid grid-cols-1 gap-8 lg:grid-cols-[1fr_1.2fr] lg:items-center", children: [
      /* @__PURE__ */ jsxs("div", { className: "relative aspect-square overflow-hidden rounded-[2rem] glass-strong", children: [
        /* @__PURE__ */ jsx("div", { className: `absolute inset-0 bg-gradient-radial ${s.accent} to-transparent` }),
        /* @__PURE__ */ jsx("div", { className: "absolute inset-0 grid-bg opacity-40" }),
        /* @__PURE__ */ jsx("div", { className: "absolute left-1/2 top-1/2 h-3/5 w-3/5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-neon/20 blur-3xl" }),
        /* @__PURE__ */ jsx(motion.img, { src: s.img, alt: s.name, width: 800, height: 600, loading: "lazy", initial: {
          opacity: 0,
          scale: 0.92,
          rotateY: -15
        }, animate: {
          opacity: 1,
          scale: 1,
          rotateY: 0
        }, transition: {
          duration: 0.7,
          ease: [0.22, 1, 0.36, 1]
        }, className: "absolute inset-0 h-full w-full object-contain p-6 sm:p-12" }, s.name),
        /* @__PURE__ */ jsx("div", { className: "absolute bottom-4 left-4 chip", children: s.style }),
        /* @__PURE__ */ jsxs("div", { className: "absolute bottom-4 right-4 flex gap-2", children: [
          /* @__PURE__ */ jsx("button", { onClick: prev, className: "grid h-10 w-10 place-items-center rounded-full glass-strong hover:bg-white/10", "aria-label": "Previous scooter", children: /* @__PURE__ */ jsx("svg", { viewBox: "0 0 24 24", className: "h-4 w-4", fill: "none", stroke: "currentColor", strokeWidth: "2.5", children: /* @__PURE__ */ jsx("path", { d: "M15 6l-6 6 6 6" }) }) }),
          /* @__PURE__ */ jsx("button", { onClick: next, className: "grid h-10 w-10 place-items-center rounded-full bg-neon text-black neon-glow-soft", "aria-label": "Next scooter", children: /* @__PURE__ */ jsx("svg", { viewBox: "0 0 24 24", className: "h-4 w-4", fill: "none", stroke: "currentColor", strokeWidth: "2.5", children: /* @__PURE__ */ jsx("path", { d: "M9 6l6 6-6 6" }) }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsxs("div", { className: "text-xs uppercase tracking-[0.2em] text-muted-foreground", children: [
          "Model ",
          String(i + 1).padStart(2, "0"),
          " / ",
          String(SCOOTERS.length).padStart(2, "0")
        ] }),
        /* @__PURE__ */ jsx("h3", { className: "font-display mt-2 text-5xl font-semibold sm:text-7xl", children: s.name }),
        /* @__PURE__ */ jsxs("div", { className: "mt-8 grid grid-cols-3 gap-3", children: [
          /* @__PURE__ */ jsx(Spec, { label: "Daily rent", value: `₹${s.rent}`, highlight: true }),
          /* @__PURE__ */ jsx(Spec, { label: "Range", value: s.range }),
          /* @__PURE__ */ jsx(Spec, { label: "Status", value: s.availability })
        ] }),
        /* @__PURE__ */ jsx("ul", { className: "mt-8 space-y-2 text-sm text-muted-foreground", children: ["Battery-swap network access", "Delivery box compatible", "App + GPS unlock", "Insurance included"].map((f) => /* @__PURE__ */ jsxs("li", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsx("span", { className: "grid h-5 w-5 place-items-center rounded-full bg-neon/15 text-neon", children: /* @__PURE__ */ jsx("svg", { viewBox: "0 0 24 24", className: "h-3 w-3", fill: "none", stroke: "currentColor", strokeWidth: "3", children: /* @__PURE__ */ jsx("path", { d: "M5 12l5 5L20 7" }) }) }),
          f
        ] }, f)) }),
        /* @__PURE__ */ jsxs("div", { className: "mt-8 flex flex-wrap gap-3", children: [
          /* @__PURE__ */ jsxs("a", { href: "#cta", className: "inline-flex items-center gap-2 rounded-full bg-neon px-6 py-3 font-semibold text-black neon-glow", children: [
            "Reserve ",
            s.name
          ] }),
          /* @__PURE__ */ jsx("a", { href: "#cta", className: "inline-flex items-center gap-2 rounded-full glass px-6 py-3 font-medium", children: "Compare all" })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "mt-8 flex gap-3", children: SCOOTERS.map((sc, idx) => /* @__PURE__ */ jsx("button", { onClick: () => setI(idx), className: `relative h-16 w-20 overflow-hidden rounded-xl ring-1 transition ${i === idx ? "ring-neon" : "ring-white/10 opacity-60 hover:opacity-100"}`, children: /* @__PURE__ */ jsx("img", { src: sc.img, alt: sc.name, className: "h-full w-full object-contain p-1", loading: "lazy" }) }, sc.name)) })
      ] })
    ] })
  ] }) });
}
function Spec({
  label,
  value,
  highlight
}) {
  return /* @__PURE__ */ jsxs("div", { className: `rounded-2xl p-4 ring-1 ring-white/8 ${highlight ? "bg-neon/10 ring-neon/30" : "bg-white/[0.03]"}`, children: [
    /* @__PURE__ */ jsx("div", { className: "text-[10px] uppercase tracking-[0.16em] text-muted-foreground", children: label }),
    /* @__PURE__ */ jsx("div", { className: `mt-1 font-mono-tabular text-lg font-bold ${highlight ? "text-neon" : ""}`, children: value })
  ] });
}
const FEED = [{
  who: "Ravi",
  what: "rented Volt S1",
  where: "Hitech City",
  t: "12s ago",
  v: null
}, {
  who: "Priya",
  what: "earned today",
  where: "Madhapur",
  t: "34s ago",
  v: "₹1,450"
}, {
  who: "Arjun",
  what: "completed deliveries",
  where: "Gachibowli",
  t: "1m ago",
  v: "28 trips"
}, {
  who: "12 riders",
  what: "joined today",
  where: "Bangalore",
  t: "2m ago",
  v: null
}, {
  who: "Suresh",
  what: "swapped battery in",
  where: "Kukatpally",
  t: "3m ago",
  v: "58 sec"
}, {
  who: "Neha",
  what: "hit weekly target",
  where: "Pune",
  t: "4m ago",
  v: "₹11,200"
}, {
  who: "Manoj",
  what: "rented Apex 450",
  where: "Hyderabad",
  t: "5m ago",
  v: null
}, {
  who: "Kiran",
  what: "earned overnight",
  where: "Secunderabad",
  t: "6m ago",
  v: "₹980"
}];
function ActivityFeed() {
  const tracks = [FEED, [...FEED].reverse()];
  return /* @__PURE__ */ jsxs("section", { className: "relative py-24 md:py-32", children: [
    /* @__PURE__ */ jsx("div", { className: "mx-auto max-w-7xl px-4 sm:px-6", children: /* @__PURE__ */ jsx(SectionHeader, { kicker: "Live activity", title: /* @__PURE__ */ jsxs(Fragment, { children: [
      "The network is ",
      /* @__PURE__ */ jsx("span", { className: "text-neon", children: "moving." })
    ] }), sub: "A real-time pulse from every city we operate in." }) }),
    /* @__PURE__ */ jsx("div", { className: "mt-12 space-y-4 overflow-hidden", children: tracks.map((track, ti) => /* @__PURE__ */ jsxs("div", { className: "relative overflow-hidden", children: [
      /* @__PURE__ */ jsx("div", { className: `flex w-max gap-3 ${ti === 1 ? "marquee [animation-direction:reverse]" : "marquee"}`, style: {
        animationDuration: ti === 1 ? "50s" : "40s"
      }, children: [...track, ...track, ...track].map((f, i) => /* @__PURE__ */ jsxs("div", { className: "flex w-[280px] shrink-0 items-center gap-3 rounded-2xl glass px-4 py-3", children: [
        /* @__PURE__ */ jsx("span", { className: "grid h-8 w-8 shrink-0 place-items-center rounded-full bg-neon/15 text-neon text-xs font-bold", children: f.who[0] }),
        /* @__PURE__ */ jsxs("div", { className: "min-w-0 flex-1", children: [
          /* @__PURE__ */ jsxs("div", { className: "truncate text-sm", children: [
            /* @__PURE__ */ jsx("span", { className: "font-semibold", children: f.who }),
            " ",
            /* @__PURE__ */ jsx("span", { className: "text-muted-foreground", children: f.what }),
            " ",
            f.v && /* @__PURE__ */ jsx("span", { className: "font-mono-tabular text-neon", children: f.v })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "text-[10px] text-muted-foreground", children: [
            f.where,
            " · ",
            f.t
          ] })
        ] }),
        /* @__PURE__ */ jsx("span", { className: "h-1.5 w-1.5 shrink-0 rounded-full bg-neon pulse-dot" })
      ] }, i)) }),
      /* @__PURE__ */ jsx("div", { className: "pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-ink to-transparent" }),
      /* @__PURE__ */ jsx("div", { className: "pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-ink to-transparent" })
    ] }, ti)) })
  ] });
}
function FinalCTA() {
  return /* @__PURE__ */ jsxs("section", { id: "cta", className: "relative isolate overflow-hidden py-32 md:py-44", children: [
    /* @__PURE__ */ jsxs("div", { className: "absolute inset-0 -z-10", children: [
      /* @__PURE__ */ jsx("img", { src: cityBg, alt: "", width: 1920, height: 1080, loading: "lazy", className: "h-full w-full object-cover opacity-30" }),
      /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-b from-ink via-ink/80 to-ink" }),
      /* @__PURE__ */ jsx("div", { className: "absolute inset-0 grid-bg opacity-50" })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-6xl px-4 sm:px-6 text-center", children: [
      /* @__PURE__ */ jsxs(motion.div, { initial: {
        opacity: 0,
        y: 30
      }, whileInView: {
        opacity: 1,
        y: 0
      }, viewport: {
        once: true
      }, transition: {
        duration: 0.9
      }, children: [
        /* @__PURE__ */ jsx("span", { className: "chip", children: "The final word" }),
        /* @__PURE__ */ jsxs("h2", { className: "font-display mt-6 text-balance text-[clamp(2.5rem,9vw,7rem)] font-bold leading-[0.95] tracking-tight", children: [
          "Stop paying ",
          /* @__PURE__ */ jsx("span", { className: "text-foreground/40 line-through decoration-[3px] decoration-destructive", children: "EMIs." }),
          /* @__PURE__ */ jsx("br", {}),
          "Start ",
          /* @__PURE__ */ jsx("span", { className: "text-shimmer", children: "earning." })
        ] }),
        /* @__PURE__ */ jsx("p", { className: "mx-auto mt-6 max-w-xl text-balance text-muted-foreground sm:text-lg", children: "Walk in tomorrow. Ride out tomorrow. Make your first ₹1,500 tomorrow night." })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "mx-auto mt-12 max-w-3xl", children: /* @__PURE__ */ jsx(motion.img, { src: heroScooter, alt: "EV Scooter", width: 1024, height: 1024, loading: "lazy", initial: {
        opacity: 0,
        scale: 0.9
      }, whileInView: {
        opacity: 1,
        scale: 1
      }, viewport: {
        once: true
      }, transition: {
        duration: 1
      }, className: "mx-auto w-full float-y drop-shadow-[0_30px_80px_rgba(158,255,0,0.35)]" }) }),
      /* @__PURE__ */ jsxs("div", { className: "mt-10 flex flex-wrap items-center justify-center gap-3", children: [
        /* @__PURE__ */ jsxs("a", { href: "#", className: "inline-flex items-center gap-2 rounded-full bg-neon px-7 py-4 text-base font-semibold text-black neon-glow", children: [
          "Rent your EV today",
          /* @__PURE__ */ jsx("svg", { viewBox: "0 0 24 24", className: "h-4 w-4", fill: "none", stroke: "currentColor", strokeWidth: "2.5", children: /* @__PURE__ */ jsx("path", { d: "M5 12h14M13 6l6 6-6 6" }) })
        ] }),
        /* @__PURE__ */ jsxs("a", { href: "https://wa.me/919999999999", className: "inline-flex items-center gap-2 rounded-full glass-strong px-7 py-4 text-base font-medium", children: [
          /* @__PURE__ */ jsx("svg", { viewBox: "0 0 24 24", className: "h-5 w-5 text-neon", fill: "currentColor", children: /* @__PURE__ */ jsx("path", { d: "M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.86 9.86 0 0 0 4.78 1.22h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2zm5.83 14.18c-.25.7-1.43 1.32-2 1.4-.51.07-1.16.11-1.87-.12-.43-.14-.99-.32-1.7-.63-3-1.3-4.96-4.31-5.11-4.51-.15-.2-1.22-1.62-1.22-3.09s.77-2.2 1.05-2.5c.27-.3.6-.37.79-.37h.57c.18 0 .43-.07.67.51.25.6.86 2.07.94 2.22.07.15.13.32.02.52-.1.2-.15.32-.3.5-.15.18-.32.4-.46.54-.15.15-.31.31-.13.6.18.3.81 1.33 1.74 2.16 1.2 1.07 2.21 1.4 2.52 1.55.31.15.49.13.67-.08.18-.2.78-.91.99-1.22.2-.31.41-.26.69-.16.28.1 1.77.83 2.08.99.3.15.5.22.58.35.07.13.07.74-.18 1.44z" }) }),
          "Chat on WhatsApp"
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "mt-16", children: [
        /* @__PURE__ */ jsx("div", { className: "text-[10px] uppercase tracking-[0.3em] text-muted-foreground", children: "Trusted by riders on" }),
        /* @__PURE__ */ jsx("div", { className: "mt-5 flex flex-wrap items-center justify-center gap-x-8 gap-y-4 text-lg font-semibold text-muted-foreground/70", children: ["Zomato", "Swiggy", "Zepto", "Uber", "Rapido", "BlinkIt", "Dunzo"].map((b) => /* @__PURE__ */ jsx("span", { className: "font-display hover:text-neon transition", children: b }, b)) })
      ] })
    ] })
  ] });
}
function Footer() {
  return /* @__PURE__ */ jsx("footer", { className: "border-t border-white/5 py-16", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-7xl px-4 sm:px-6", children: [
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-10 md:grid-cols-4", children: [
      /* @__PURE__ */ jsxs("div", { className: "col-span-2", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsx("span", { className: "grid h-8 w-8 place-items-center rounded-full bg-neon text-black", children: /* @__PURE__ */ jsx("svg", { viewBox: "0 0 24 24", className: "h-4 w-4", fill: "currentColor", children: /* @__PURE__ */ jsx("path", { d: "M13 2 4 14h7l-1 8 9-12h-7l1-8z" }) }) }),
          /* @__PURE__ */ jsxs("span", { className: "font-display text-base font-semibold", children: [
            "rentev",
            /* @__PURE__ */ jsx("span", { className: "text-neon", children: "bike" })
          ] })
        ] }),
        /* @__PURE__ */ jsx("p", { className: "mt-4 max-w-sm text-sm text-muted-foreground", children: "India's EV scooter rental platform built for delivery partners. Earn more. Pay less. Ride electric." }),
        /* @__PURE__ */ jsx("div", { className: "mt-5 flex gap-2", children: ["IG", "X", "YT", "IN"].map((s) => /* @__PURE__ */ jsx("a", { href: "#", className: "grid h-9 w-9 place-items-center rounded-full glass text-xs hover:bg-neon hover:text-black transition", children: s }, s)) })
      ] }),
      /* @__PURE__ */ jsx(FooterCol, { title: "Platform", links: ["How it works", "Pricing", "Fleet", "Battery network", "Support"] }),
      /* @__PURE__ */ jsx(FooterCol, { title: "Cities", links: ["Hyderabad", "Bangalore", "Pune", "Mumbai", "+ 14 more"] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "mt-12 flex flex-col items-start justify-between gap-4 border-t border-white/5 pt-6 text-xs text-muted-foreground sm:flex-row", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        "© ",
        (/* @__PURE__ */ new Date()).getFullYear(),
        " RentEVBike Mobility Pvt. Ltd. Built in India."
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex gap-4", children: [
        /* @__PURE__ */ jsx("a", { href: "#", className: "hover:text-foreground", children: "Privacy" }),
        /* @__PURE__ */ jsx("a", { href: "#", className: "hover:text-foreground", children: "Terms" }),
        /* @__PURE__ */ jsx("a", { href: "#", className: "hover:text-foreground", children: "Contact" })
      ] })
    ] })
  ] }) });
}
function FooterCol({
  title,
  links
}) {
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx("div", { className: "text-xs uppercase tracking-[0.2em] text-muted-foreground", children: title }),
    /* @__PURE__ */ jsx("ul", { className: "mt-4 space-y-2 text-sm", children: links.map((l) => /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("a", { href: "#", className: "text-foreground/80 hover:text-neon transition", children: l }) }, l)) })
  ] });
}
function SectionHeader({
  kicker,
  title,
  sub
}) {
  return /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-3xl text-center", children: [
    /* @__PURE__ */ jsx("span", { className: "chip", children: kicker }),
    /* @__PURE__ */ jsx("h2", { className: "font-display mt-5 text-balance text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl md:text-6xl", children: title }),
    sub && /* @__PURE__ */ jsx("p", { className: "mt-4 text-balance text-base text-muted-foreground sm:text-lg", children: sub })
  ] });
}
function Landing() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    const lenis = new Lenis({
      lerp: 0.1,
      smoothWheel: true
    });
    let raf = 0;
    const tick = (t) => {
      lenis.raf(t);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
    };
  }, []);
  return /* @__PURE__ */ jsxs("div", { className: "relative", children: [
    /* @__PURE__ */ jsx(Nav, {}),
    /* @__PURE__ */ jsxs("main", { children: [
      /* @__PURE__ */ jsx(Hero, {}),
      /* @__PURE__ */ jsx(LiveMap, {}),
      /* @__PURE__ */ jsx(Journey, {}),
      /* @__PURE__ */ jsx(Profit, {}),
      /* @__PURE__ */ jsx(Why, {}),
      /* @__PURE__ */ jsx(Scooters, {}),
      /* @__PURE__ */ jsx(ActivityFeed, {}),
      /* @__PURE__ */ jsx(FinalCTA, {})
    ] }),
    /* @__PURE__ */ jsx(Footer, {})
  ] });
}
export {
  Landing as component
};
