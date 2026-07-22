"use client";
import { useEffect, useRef } from "react";

// The `autoPlay` attribute alone isn't reliable once React hydrates the
// element client-side — browsers sometimes never actually start playback
// even though the attribute is present. Calling .play() explicitly on
// mount guarantees it starts.
export default function AutoplayVideo({
  src,
  className,
}: {
  src: string;
  className?: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    ref.current?.play().catch(() => {});
  }, [src]);

  return (
    <video
      ref={ref}
      src={src}
      autoPlay
      loop
      muted
      playsInline
      className={className}
    />
  );
}
