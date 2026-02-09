"use client";

import { useEffect } from "react";

export default function ThemeProvider(): null {
  useEffect(() => {
    const el = document.documentElement;
    const mq = window.matchMedia("(prefers-color-scheme: dark)");

    const apply = (e?: MediaQueryListEvent) => {
      const matches = e ? e.matches : mq.matches;
      if (matches) el.classList.add("dark");
      else el.classList.remove("dark");
    };

    apply();
    // modern API
    if (mq.addEventListener) mq.addEventListener("change", apply);
    else mq.addListener(apply);

    return () => {
      if (mq.removeEventListener) mq.removeEventListener("change", apply);
      else mq.removeListener(apply);
    };
  }, []);

  return null;
}
