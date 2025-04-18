import { useDonationStore } from "../store/donationStore";
import { useDonationSocket } from "../hooks/useDonationSocket";
import { useState } from "react";
import { useTTS } from "../hooks/useTTS";

const StreamerPanel = () => {
  const donations = useDonationStore((s) => s.donations);
  useDonationSocket();

  const [ttsEnabled, setTTSEnabled] = useState(true);
  useTTS(ttsEnabled);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <h1 className="text-3xl font-bold mb-6">🎛️ Streamer Control Panel</h1>

      <div className="mb-6 space-x-4">
        <button
          onClick={() => setTTSEnabled((prev) => !prev)}
          className={`${
            ttsEnabled ? "bg-green-600" : "bg-gray-600"
          } hover:opacity-90 text-white px-4 py-2 rounded`}
        >
          {ttsEnabled ? "🗣️ Text to Speech ON" : "🤐 Text to Speech OFF"}
        </button>
      </div>

      <div className="bg-white text-black rounded p-4 max-w-xl space-y-3 shadow">
        {donations.length === 0 && (
          <p className="text-gray-500">No donations yet.</p>
        )}
        {donations.map((d, i) => (
          <div
            key={i}
            className="border border-gray-300 p-3 rounded bg-gray-50"
          >
            <strong>{d.name}</strong> donated{" "}
            <span className="text-green-700">Rp{d.amount}</span>
            <p className="text-sm text-gray-600">{d.message}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StreamerPanel;
