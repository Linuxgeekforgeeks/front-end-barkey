import { create } from "zustand";

export const useModalStore = create((set) => ({
  isVideoOpened: false,
  setVideoModal: () =>
    set((state) => ({ isVideoOpened: !state.isVideoOpened })),
  openVideoModal: () => set(() => ({ isVideoOpened: true })),
  closeVideoModal: () => set(() => ({ isVideoOpened: false })),
}));
