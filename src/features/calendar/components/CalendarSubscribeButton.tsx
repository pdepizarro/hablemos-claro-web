"use client";

import Image from "next/image";

type CalendarSubscribeButtonProps = {
  cid: string;
  label: string;
};

function isAndroidDevice(): boolean {
  return /Android/i.test(navigator.userAgent);
}

function isMobileDevice(): boolean {
  return /Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent);
}

export function CalendarSubscribeButton({ cid, label }: CalendarSubscribeButtonProps) {
  const openSubscription = () => {
    const encodedCid = encodeURIComponent(cid);
    const webUrl = `https://calendar.google.com/calendar/u/0/r?cid=${encodedCid}`;

    if (!isMobileDevice()) {
      window.open(webUrl, "_blank", "noopener,noreferrer");
      return;
    }

    let pageHidden = false;
    const onVisibilityChange = () => {
      if (document.visibilityState === "hidden") pageHidden = true;
    };
    document.addEventListener("visibilitychange", onVisibilityChange);

    window.setTimeout(() => {
      document.removeEventListener("visibilitychange", onVisibilityChange);
      if (!pageHidden) window.location.href = webUrl;
    }, 900);

    if (isAndroidDevice()) {
      const androidIntent =
        `intent://calendar.google.com/calendar/u/0/r?cid=${encodedCid}` +
        "#Intent;scheme=https;package=com.google.android.calendar;end";
      window.location.href = androidIntent;
      return;
    }

    window.location.href = `googlecalendar://?cid=${encodedCid}`;
  };

  return (
    <button
      type="button"
      onClick={openSubscription}
      className="inline-flex items-center justify-center rounded border border-transparent bg-hc-yellow px-8 py-4 text-lg font-semibold text-black shadow-hc-card ring-1 ring-hc-yellow/35 transition-colors duration-200 hover:bg-hc-red hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-hc-yellow focus-visible:ring-offset-2 focus-visible:ring-offset-black"
    >
      <span className="inline-flex items-center gap-2">
        <Image
          src="/img/icons/google_calendar.svg"
          alt=""
          width={22}
          height={22}
          className="h-[22px] w-[22px]"
          aria-hidden
        />
        {label}
      </span>
    </button>
  );
}

