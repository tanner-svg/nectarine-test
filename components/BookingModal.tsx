"use client";
import Image from "next/image";

const BOOKING_IFRAME_SRC =
  "https://calendar.google.com/calendar/appointments/schedules/AcZssZ35HLSuGC2kNEiVHQkcZbsokxZ8qGsw8oBR0f6--84NKdtzTCmQV47m-q3u4V7BuHniisYXvmfl?gv=true";

/**
 * Shared popup for every "schedule a call" / "book a call" button
 * site-wide — embeds the Google Calendar scheduling widget instead of
 * sending visitors off to a separate calendar.app.google page.
 */
export default function BookingModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[300] flex items-center justify-center p-4 lg:p-[50px] bg-black/40">
      <div className="relative bg-[#fcf8f3] rounded-[25px] p-6 lg:p-[40px] max-w-[900px] w-full flex flex-col gap-[20px] max-h-[90vh]">
        <button onClick={onClose} className="absolute top-4 right-4 lg:top-[25px] lg:right-[25px] z-10" aria-label="Close">
          <Image src="/.shipstudio/assets/cancel.svg" alt="Close" width={36} height={36} />
        </button>
        <h2 className="font-bel font-semibold text-[24px] lg:text-[28px] text-[#380102] pr-[50px]">
          Schedule a Call
        </h2>
        <iframe
          src={BOOKING_IFRAME_SRC}
          style={{ border: 0 }}
          width="100%"
          height="600"
          frameBorder={0}
          title="Schedule a call"
          className="rounded-[15px] flex-1"
        />
      </div>
    </div>
  );
}
