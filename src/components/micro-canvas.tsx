"use client";

import { useEffect, useRef } from "react";
import { useTheme } from "next-themes";

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  phase: number;
  hub: boolean;
  excite: number;
};

type Packet = {
  a: number;
  b: number;
  t: number;
  speed: number;
};

const PALETTES = {
  dark: { dot: "34, 211, 238", line: "34, 211, 238", packet: "167, 139, 250", mouse: "167, 139, 250" },
  light: { dot: "20, 87, 208", line: "20, 87, 208", packet: "14, 116, 144", mouse: "14, 116, 144" },
};

const LINK_DIST = 130;
const MOUSE_RADIUS = 170;
const MAX_PACKETS = 10;
const PACKET_SPAWN = 0.02;
const HUB_RATIO = 0.1;

export default function MicroCanvas({ density = 1 }: { density?: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let w = 0;
    let h = 0;
    let dpr = 1;
    let particles: Particle[] = [];
    let packets: Packet[] = [];
    const mouse = { x: -9999, y: -9999 };
    const palette = PALETTES[resolvedTheme === "light" ? "light" : "dark"];
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let lastT = performance.now();

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = rect.width;
      h = rect.height;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      spawn();
    };

    const spawn = () => {
      const count = Math.max(
        40,
        Math.round(((w * h) / 14000) * Math.min(density, 2)),
      );
      particles = Array.from({ length: count }, (_, i) => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.45,
        vy: (Math.random() - 0.5) * 0.45,
        r: 1 + Math.random() * 1.4,
        phase: Math.random() * Math.PI * 2,
        hub: i / count < HUB_RATIO,
        excite: 0,
      }));
      packets = [];
    };

    const linkAlpha = (dist: number, t: number) => {
      const breathe = 0.75 + 0.25 * Math.sin(t * 0.0006);
      return (1 - dist / LINK_DIST) * 0.3 * breathe;
    };

    const drawStatic = () => {
      ctx.clearRect(0, 0, w, h);
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i];
          const b = particles[j];
          const dist = Math.hypot(a.x - b.x, a.y - b.y);
          if (dist < LINK_DIST) {
            const alpha = (1 - dist / LINK_DIST) * 0.16;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(${palette.line}, ${alpha})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }
      for (const p of particles) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${palette.dot}, 0.55)`;
        ctx.fill();
      }
    };

    const fire = (a: Particle, b: Particle) => {
      a.excite = 1;
      b.excite = 1;
    };

    const draw = (t: number, dt: number) => {
      ctx.clearRect(0, 0, w, h);

      const tms = t / 1000;
      const near: Particle[] = [];

      for (const p of particles) {
        p.x += p.vx + Math.sin(tms * 0.6 + p.phase) * 0.12;
        p.y += p.vy + Math.cos(tms * 0.5 + p.phase) * 0.12;
        p.excite = Math.max(0, p.excite - dt * 1.6);

        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const dist = Math.hypot(dx, dy);
        if (dist < MOUSE_RADIUS && dist > 0.001) {
          const force = (1 - dist / MOUSE_RADIUS) * 0.9;
          p.x += (dx / dist) * force * 0.3;
          p.y += (dy / dist) * force * 0.3;
          if (dist < 130) near.push(p);
        }

        if (p.x < -20) p.x = w + 20;
        if (p.x > w + 20) p.x = -20;
        if (p.y < -20) p.y = h + 20;
        if (p.y > h + 20) p.y = -20;
      }

      // links + packet spawning
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i];
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.hypot(dx, dy);
          if (dist < LINK_DIST) {
            const alpha = linkAlpha(dist, t);
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(${palette.line}, ${alpha})`;
            ctx.lineWidth = a.hub && b.hub ? 1.5 : 1;
            ctx.stroke();

            if (
              packets.length < MAX_PACKETS &&
              Math.random() < PACKET_SPAWN * dt
            ) {
              packets.push({
                a: i,
                b: j,
                t: 0,
                speed: 1.4 + Math.random() * 1.2,
              });
            }
          }
        }
      }

      // advance + draw packets
      for (let k = packets.length - 1; k >= 0; k--) {
        const pk = packets[k];
        pk.t += pk.speed * dt;
        if (pk.t >= 1) {
          fire(particles[pk.a], particles[pk.b]);
          packets.splice(k, 1);
          continue;
        }
        const from = particles[pk.a];
        const to = particles[pk.b];
        const x = from.x + (to.x - from.x) * pk.t;
        const y = from.y + (to.y - from.y) * pk.t;

        const trail = ctx.createLinearGradient(
          from.x,
          from.y,
          to.x,
          to.y,
        );
        trail.addColorStop(Math.max(0, pk.t - 0.18), "transparent");
        trail.addColorStop(pk.t, `rgba(${palette.packet}, 0.9)`);
        ctx.beginPath();
        ctx.moveTo(from.x, from.y);
        ctx.lineTo(x, y);
        ctx.strokeStyle = trail;
        ctx.lineWidth = 1.4;
        ctx.stroke();

        const glow = ctx.createRadialGradient(x, y, 0, x, y, 9);
        glow.addColorStop(0, `rgba(${palette.packet}, 0.95)`);
        glow.addColorStop(0.4, `rgba(${palette.packet}, 0.35)`);
        glow.addColorStop(1, "transparent");
        ctx.beginPath();
        ctx.arc(x, y, 9, 0, Math.PI * 2);
        ctx.fillStyle = glow;
        ctx.fill();
        ctx.beginPath();
        ctx.arc(x, y, 1.6, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${palette.packet}, 1)`;
        ctx.fill();
      }

      // mouse-stimulated firing
      if (near.length && packets.length < MAX_PACKETS) {
        near.sort(
          (a, b) =>
            Math.hypot(a.x - mouse.x, a.y - mouse.y) -
            Math.hypot(b.x - mouse.x, b.y - mouse.y),
        );
        const src = near[0];
        let best = -1;
        let bestD = Infinity;
        for (let i = 0; i < particles.length; i++) {
          if (particles[i] === src) continue;
          const d = Math.hypot(src.x - particles[i].x, src.y - particles[i].y);
          if (d < LINK_DIST && d < bestD) {
            bestD = d;
            best = i;
          }
        }
        if (best >= 0 && Math.random() < 0.08 * dt) {
          packets.push({
            a: particles.indexOf(src),
            b: best,
            t: 0,
            speed: 2 + Math.random(),
          });
        }
      }

      // nodes
      for (const p of particles) {
        const pulse = 0.6 + 0.4 * Math.sin(tms * 2 + p.phase);
        const hot = Math.hypot(p.x - mouse.x, p.y - mouse.y) < 150;
        const exciteBoost = p.excite > 0 ? p.excite * 1.6 : 0;
        const radius =
          p.r * (p.hub ? 2.1 : 1) * (0.7 + 0.5 * pulse) + exciteBoost;

        ctx.beginPath();
        ctx.arc(p.x, p.y, radius, 0, Math.PI * 2);
        if (p.excite > 0) {
          const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, radius * 3);
          g.addColorStop(0, `rgba(${palette.packet}, ${0.5 * p.excite})`);
          g.addColorStop(1, "transparent");
          ctx.beginPath();
          ctx.arc(p.x, p.y, radius * 3, 0, Math.PI * 2);
          ctx.fillStyle = g;
          ctx.fill();
        }
        ctx.beginPath();
        ctx.arc(p.x, p.y, radius, 0, Math.PI * 2);
        ctx.fillStyle = hot
          ? `rgba(${palette.mouse}, 0.9)`
          : `rgba(${palette.dot}, ${0.35 + 0.45 * pulse})`;
        ctx.fill();
      }

      // data beam from cursor to nearest particles
      if (near.length) {
        near.sort(
          (a, b) =>
            Math.hypot(a.x - mouse.x, a.y - mouse.y) -
            Math.hypot(b.x - mouse.x, b.y - mouse.y),
        );
        for (let k = 0; k < Math.min(3, near.length); k++) {
          const p = near[k];
          const grad = ctx.createLinearGradient(mouse.x, mouse.y, p.x, p.y);
          grad.addColorStop(0, `rgba(${palette.mouse}, 0.5)`);
          grad.addColorStop(1, "transparent");
          ctx.beginPath();
          ctx.moveTo(mouse.x, mouse.y);
          ctx.lineTo(p.x, p.y);
          ctx.strokeStyle = grad;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }
    };

    const loop = (t: number) => {
      const dt = Math.min((t - lastT) / 1000, 0.05);
      lastT = t;
      if (reduced) {
        drawStatic();
        return;
      }
      draw(t, dt);
      raf = requestAnimationFrame(loop);
    };

    const onMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };
    const onLeave = () => {
      mouse.x = -9999;
      mouse.y = -9999;
    };
    const onVisibility = () => {
      cancelAnimationFrame(raf);
      if (!document.hidden) raf = requestAnimationFrame(loop);
    };

    lastT = performance.now();
    resize();
    raf = requestAnimationFrame(loop);
    window.addEventListener("resize", resize);
    canvas.addEventListener("pointermove", onMove);
    canvas.addEventListener("pointerleave", onLeave);
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("pointermove", onMove);
      canvas.removeEventListener("pointerleave", onLeave);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [resolvedTheme, density]);

  return <canvas ref={canvasRef} className="micro-canvas" aria-hidden />;
}
