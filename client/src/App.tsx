import { useEffect, useRef } from "react";
import { useDonationStore } from "./store/donationStore";
import DonationForm from "./components/DonationForm";
import { useDonationSocket } from "./hooks/useDonationSocket";

const App = () => {
  const donations = useDonationStore((s) => s.donations);
  const listRef = useRef<HTMLDivElement>(null);
  useDonationSocket();

  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  }, [donations]);

  return (
    <main className="min-h-screen bg-gray-100 p-8 flex flex-col items-center gap-8">
      <h1 className="text-4xl font-bold text-blue-700">TipMeNow 💸</h1>

      <DonationForm />

      <div
        ref={listRef}
        className="max-w-md w-full h-64 overflow-y-auto space-y-3 bg-white p-4 rounded shadow"
      >
        {donations.map((d, i) => (
          <div key={i} className="bg-gray-50 p-3 rounded border">
            <strong>{d.name}</strong> donated{" "}
            <span className="text-green-600">Rp{d.amount}</span>
            <p className="text-sm text-gray-600">{d.message}</p>
          </div>
        ))}
      </div>
    </main>
  );
};

export default App;
