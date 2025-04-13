import { useEffect } from "react";
import { useDonationStore } from "../store/donationStore";
import { socket } from "../utils/socket";

export const useDonationSocket = () => {
  const addDonation = useDonationStore((s) => s.addDonation);

  useEffect(() => {
    socket.on("new_donation", (donation) => {
      console.log("💸 Received donation:", donation);
      addDonation(donation);
    });

    return () => {
      socket.off("new_donation", addDonation);
    };
  }, [addDonation]);

  return socket;
};
