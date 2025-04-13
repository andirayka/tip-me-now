import { useEffect } from "react";
import { useDonationStore } from "../store/donationStore";

const useDonationSound = () => {
  const donations = useDonationStore((s) => s.donations);

  useEffect(() => {
    if (donations.length < 1) return;

    const audio = new Audio("/sounds/coin.mp3");
    audio.volume = 0.7;
    audio.play().catch((e) => {
      console.warn("Audio play failed:", e);
    });
  }, [donations.length]); // Only when new donation comes in
};

export default useDonationSound;
