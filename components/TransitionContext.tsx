"use client";
import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  useRef,
} from "react";

type Phase = "entering" | "entered" | "exiting";

interface Ctx {
  phase: Phase;
  startExit: (onComplete: () => void) => void;
  startEnter: () => void;
}

const TransitionCtx = createContext<Ctx>({
  phase: "entering",
  startExit: () => {},
  startEnter: () => {},
});

export function TransitionProvider({ children }: { children: React.ReactNode }) {
  const [phase, setPhase] = useState<Phase>("entering");
  const exitTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const startExit = useCallback((onComplete: () => void) => {
    if (exitTimer.current) clearTimeout(exitTimer.current);
    setPhase("exiting");
    exitTimer.current = setTimeout(onComplete, 420);
  }, []);

  const startEnter = useCallback(() => {
    setPhase("entering");
    // Two frames: first lets React paint the "entering" starting position,
    // second triggers the CSS transition to "entered"
    const r1 = requestAnimationFrame(() => {
      requestAnimationFrame(() => setPhase("entered"));
    });
    return () => cancelAnimationFrame(r1);
  }, []);

  // Animate in on first page load
  useEffect(() => {
    startEnter();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <TransitionCtx.Provider value={{ phase, startExit, startEnter }}>
      {children}
    </TransitionCtx.Provider>
  );
}

export const useTransitionCtx = () => useContext(TransitionCtx);
