"use client";
import { useTransitionCtx } from "./TransitionContext";

export default function MainContent({ children }: { children: React.ReactNode }) {
  const { phase } = useTransitionCtx();

  return (
    <>
      {/* Cream curtain that masks the route swap */}
      <div className={`page-curtain curtain-${phase}`} aria-hidden="true" />
      <div className={`page-content page-${phase}`}>
        {children}
      </div>
    </>
  );
}
