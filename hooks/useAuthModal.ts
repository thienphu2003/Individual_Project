import { create } from "zustand";

interface AuthModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  isOpenForSignUp: boolean;
  onOpenForSignUp: () => void;
}

const useAuthModal = create<AuthModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
  isOpenForSignUp: false,
  onOpenForSignUp: () => set({ isOpenForSignUp: true }),
}));

export default useAuthModal;
