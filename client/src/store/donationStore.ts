import { create } from "zustand";

export type Donation = {
  name: string;
  amount: number;
  message?: string;
  timestamp: number;
};

type DonationStore = {
  donations: Donation[];
  addDonation: (donation: Donation) => void;
  clearDonations: () => void;
};

export const useDonationStore = create<DonationStore>((set) => ({
  donations: [],
  addDonation: (donation) =>
    set((state) => ({
      donations: [...state.donations, donation],
    })),
  clearDonations: () => set({ donations: [] }),
}));
