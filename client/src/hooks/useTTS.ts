import { useEffect } from "react";
import { useDonationStore } from "../store/donationStore";

export const useTTS = (enabled: boolean) => {
  const donations = useDonationStore((s) => s.donations);

  useEffect(() => {
    if (!enabled) return;
    if (donations.length < 1) return;

    const latest = donations[donations.length - 1];
    const msg = new SpeechSynthesisUtterance(
      `${latest.name} donated ${latest.amount} Rupiah${
        latest.message ? `. Message: ${latest.message}` : ""
      }`
    );

    msg.volume = 1;
    msg.rate = 1;
    msg.pitch = 1;
    window.speechSynthesis.speak(msg);
  }, [donations, enabled]);
};
