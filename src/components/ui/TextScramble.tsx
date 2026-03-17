"use client";

import { useEffect, useRef, useState } from "react";

interface TextScrambleProps {
  text: string;
  className?: string;
  delay?: number;
  duration?: number;
}

const chars = "!@#$%^&*()_+-=[]{}|;:,.<>?ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

export default function TextScramble({
  text,
  className = "",
  delay = 0,
  duration = 1500,
}: TextScrambleProps) {
  const [displayed, setDisplayed] = useState("");
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setStarted(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  useEffect(() => {
    if (!started) return;

    const steps = 20;
    const interval = duration / steps;
    let step = 0;

    const scrambleInterval = setInterval(() => {
      step++;
      const progress = step / steps;
      const resolved = Math.floor(progress * text.length);

      let result = "";
      for (let i = 0; i < text.length; i++) {
        if (i < resolved) {
          result += text[i];
        } else if (text[i] === " ") {
          result += " ";
        } else {
          result += chars[Math.floor(Math.random() * chars.length)];
        }
      }
      setDisplayed(result);

      if (step >= steps) {
        clearInterval(scrambleInterval);
        setDisplayed(text);
      }
    }, interval);

    return () => clearInterval(scrambleInterval);
  }, [started, text, duration]);

  return (
    <span ref={ref} className={className}>
      {started ? displayed : "\u00A0".repeat(text.length)}
    </span>
  );
}
