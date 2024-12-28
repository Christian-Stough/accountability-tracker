import { create } from "zustand";

interface TabState {
  activeTab: "list" | "leaderboard";
  setActiveTab: (active: "list" | "leaderboard") => void;
}

export const useStore = create<TabState>((set) => ({
  activeTab: "list",
  setActiveTab: (active: "list" | "leaderboard") => {
    set(() => ({ activeTab: active }));
  },
}));
