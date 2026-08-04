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
};

const PALETTES = {
  dark: { dot: "34, 211, 238", line: "34, 211, 238", mouse: "167, 139, 250" },
  light: { dot: "20, 87, 208", line: "20, 87, 208", mouse: "14, 116, 144" },
};

const LINK_DIST = 115;
const MOUSE_RADIUS = 150;

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
    const mouse = { x: -9999, y: -9999 };
    const palette = PALETTES[resolvedTheme === "light" ? "light" : "dark"];
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

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
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.45,
        vy: (Math.random() - 0.5) * 0.45,
        r: 1 + Math.random() * 1.4,
        phase: Math.random() * Math.PI * 2,
      }));
    };

    const drawStatic = () => {
      ctx.clearRect(0, 0, w, h);
      for (const p of particles) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${palette.dot}, 0.55)`;
        ctx.fill();
      }
    };

    const draw = (t: number) => {
      ctx.clearRect(0, 0, w, h);

      const near: Particle[] = [];
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;

        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const dist = Math.hypot(dx, dy);
        if (dist < MOUSE_RADIUS && dist > 0.001) {
          const force = (1 - dist / MOUSE_RADIUS) * 1.15;
          p.x += (dx / dist) * force;
          p.y += (dy / dist) * force;
          if (dist < 130) near.push(p);
        }

        if (p.x < -20) p.x = w + 20;
        if (p.x > w + 20) p.x = -20;
        if (p.y < -20) p.y = h + 20;
        if (p.y > h + 20) p.y = -20;
      }

      // links
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i];
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.hypot(dx, dy);
          if (dist < LINK_DIST) {
            const alpha = (1 - dist / LINK_DIST) * 0.34;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(${palette.line}, ${alpha})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }

      // dots with energy pulse
      const tms = t / 1000;
      for (const p of particles) {
        const pulse = 0.6 + 0.4 * Math.sin(tms * 2 + p.phase);
        const isHot =
          Math.hypot(p.x - mouse.x, p.y - mouse.y) < 150;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r * (0.7 + 0.5 * pulse), 0, Math.PI * 2);
        ctx.fillStyle = isHot
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
      if (reduced) {
        drawStatic();
        return;
      }
      draw(t);
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
