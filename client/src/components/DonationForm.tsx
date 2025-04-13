import { useState } from "react";
import { socket } from "../utils/socket";

const DonationForm = () => {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<{ name?: string; amount?: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = () => {
    const newErrors: typeof errors = {};
    if (!name.trim()) newErrors.name = "Name is required";
    if (!amount.trim()) newErrors.amount = "Amount is required";
    else if (parseInt(amount) <= 0)
      newErrors.amount = "Amount must be more than 0";
    return newErrors;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validation = validate();
    if (Object.keys(validation).length > 0) {
      setErrors(validation);
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    const donation = {
      name: name.trim(),
      amount: parseInt(amount),
      message: message.trim(),
      timestamp: Date.now(),
    };

    socket.emit("send_donation", donation);

    // Reset form
    setName("");
    setAmount("");
    setMessage("");
    setIsSubmitting(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded shadow max-w-md w-full space-y-4"
    >
      <h2 className="text-2xl font-bold">Send a Donation 🚀</h2>

      <div>
        <input
          type="text"
          placeholder="Your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={`w-full px-4 py-2 border rounded ${
            errors.name ? "border-red-500" : "border-gray-300"
          }`}
        />
        {errors.name && (
          <p className="text-red-500 text-sm mt-1">{errors.name}</p>
        )}
      </div>

      <div>
        <input
          type="number"
          placeholder="Amount (Rp)"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className={`w-full px-4 py-2 border rounded ${
            errors.amount ? "border-red-500" : "border-gray-300"
          }`}
        />
        {errors.amount && (
          <p className="text-red-500 text-sm mt-1">{errors.amount}</p>
        )}
      </div>

      <textarea
        placeholder="Message (optional)"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="w-full px-4 py-2 border rounded resize-none border-gray-300"
        rows={3}
      />

      <button
        type="submit"
        disabled={isSubmitting}
        className={`w-full py-2 rounded text-white transition ${
          isSubmitting
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-green-600 hover:bg-green-700"
        }`}
      >
        {isSubmitting ? "Sending..." : "Donate"}
      </button>
    </form>
  );
};

export default DonationForm;
