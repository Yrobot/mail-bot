// No need to use state management library for now
import { create } from "zustand";
import type { Channel } from "@prisma/client";
import { getEmailList } from "@/services";

type State = {
  list: Channel[];
};

type Action = {
  refetch: () => Promise<void>;
};

const useEmailsStore = create<State & Action>((set) => ({
  list: [],
  refetch: async () => {
    const list = await getEmailList();
    set({ list });
  },
}));
