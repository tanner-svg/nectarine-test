"use client";
import { useTransitionCtx } from "./TransitionContext";

export default function MainContent({ children }: { children: React.ReactNode }) {
  const { phase } = useTransitionCtx();

  return (
    <div className={`page-content page-${phase}`}>
      {children}
    </div>
  );
}
