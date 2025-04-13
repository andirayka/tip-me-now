import DonationForm from "./components/DonationForm";
import { useDonationStore } from "./store/donationStore";
import { useDonationSocket } from "./hooks/useDonationSocket";

const App = () => {
  const donations = useDonationStore((s) => s.donations);
  useDonationSocket();

  return (
    <main className="min-h-screen bg-gray-100 p-8 flex flex-col items-center gap-8">
      <h1 className="text-4xl font-bold text-blue-700">TipMeNow 💸</h1>

      <DonationForm />

      <div className="max-w-md w-full space-y-3">
        {donations.map((d, i) => (
          <div key={i} className="bg-white p-4 rounded shadow">
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
