import { useEffect } from "react";
import { io } from "socket.io-client";
import { useDonationStore } from "../store/donationStore";

const socket = io("http://localhost:3000");

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
