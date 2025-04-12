import { useDonationStore } from "./store/donationStore";

const App = () => {
  const donations = useDonationStore((s) => s.donations);
  const addDonation = useDonationStore((s) => s.addDonation);

  return (
    <main className="min-h-screen p-8 bg-white">
      <h1 className="text-3xl font-bold mb-4">🧠 Zustand Test</h1>
      <button
        className="bg-blue-600 text-white px-4 py-2 rounded"
        onClick={() =>
          addDonation({
            name: "Andi",
            amount: 50000,
            timestamp: Date.now(),
            message: "Keren banget bro!",
          })
        }
      >
        Add Donation
      </button>

      <ul className="mt-4 space-y-2">
        {donations.map((d, i) => (
          <li key={i} className="border p-2 rounded">
            <strong>{d.name}</strong>: Rp{d.amount} — {d.message}
          </li>
        ))}
      </ul>
    </main>
  );
};

export default App;
