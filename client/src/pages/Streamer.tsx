import { useDonationStore } from "../store/donationStore";
import { useDonationSocket } from "../hooks/useDonationSocket";
import { useEffect, useRef } from "react";
import useDonationSound from "../hooks/useDonationSound";

const Streamer = () => {
  const donations = useDonationStore((s) => s.donations);
  useDonationSocket();
  useDonationSound(); // 👈 plays sound on new donation

  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  }, [donations]);

  return (
    <div className="bg-black text-white min-h-screen p-6 flex flex-col items-center justify-center">
      <h1 className="text-3xl md:text-4xl font-bold mb-6 text-green-400 animate-pulse">
        💸 Live Donations
      </h1>

      <div
        ref={listRef}
        className="w-full max-w-md h-96 overflow-y-auto space-y-4 px-4"
      >
        {donations.map((d, i) => (
          <div
            key={i}
            className="bg-white text-black p-4 rounded-xl shadow animate-fade-in"
          >
            <p className="font-bold text-lg">{d.name} just donated</p>
            <p className="text-green-700 font-semibold text-xl">Rp{d.amount}</p>
            {d.message && <p className="text-gray-700 italic">{d.message}</p>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Streamer;
