"use client";
import { useState } from "react";
import WipeLink from "./WipeLink";
import BookingModal from "./BookingModal";

/**
 * A wipe-hover button that opens the booking modal, bundled with that
 * modal so server-component pages can drop this in without needing to
 * hold their own open/close state (which they can't — server components
 * can't hand event handlers to client children, and this needs its own
 * local state anyway).
 */
export default function ScheduleCallButton({
  className,
  overlayColor,
  textOnHover,
  trackLabel,
  children,
}: {
  className?: string;
  overlayColor: string;
  textOnHover: string;
  trackLabel?: string;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <WipeLink
        overlayColor={overlayColor}
        textOnHover={textOnHover}
        trackLabel={trackLabel}
        className={className}
        onClick={() => setOpen(true)}
      >
        {children}
      </WipeLink>
      <BookingModal open={open} onClose={() => setOpen(false)} />
    </>
  );
}
