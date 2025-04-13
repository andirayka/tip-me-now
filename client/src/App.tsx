import { useDonationStore } from "./store/donationStore";
import { socket } from "./utils/socket";
import { useDonationSocket } from "./hooks/useDonationSocket";

const App = () => {
  const donations = useDonationStore((s) => s.donations);
  useDonationSocket(); // 👈 this line does all the socket syncing

  const handleFakeDonate = () => {
    const donation = {
      name: "Anon",
      amount: 25000,
      message: "Mantap bro!",
      timestamp: Date.now(),
    };
    socket.emit("send_donation", donation);
  };

  return (
    <main className="min-h-screen p-8 bg-white">
      <h1 className="text-3xl font-bold mb-4">💸 TipMeNow Realtime</h1>
      <button
        className="bg-green-600 text-white px-4 py-2 rounded"
        onClick={handleFakeDonate}
      >
        Send Fake Donation
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
