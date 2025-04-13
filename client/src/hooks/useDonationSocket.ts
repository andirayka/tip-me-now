import { useEffect, useCallback } from "react";
import { Donation, useDonationStore } from "../store/donationStore";
import { socket } from "../utils/socket";

export const useDonationSocket = () => {
  const addDonation = useDonationStore((s) => s.addDonation);

  const onNewDonation = useCallback(
    (donation: Donation) => {
      console.log("💸 Received donation:", donation);
      addDonation(donation);
    },
    [addDonation]
  );

  useEffect(() => {
    socket.on("new_donation", onNewDonation);

    return () => {
      socket.off("new_donation", onNewDonation);
    };
  }, [onNewDonation]);

  return socket;
};
