import { useEffect } from "react";
import { socket } from "../utils/socket";
import { useDonationStore } from "../store/donationStore";

export const useDonationSocket = () => {
  const addDonation = useDonationStore((s) => s.addDonation);

  useEffect(() => {
    socket.on("new_donation", addDonation);

    return () => {
      socket.off("new_donation", addDonation);
    };
  }, [addDonation]);
};
