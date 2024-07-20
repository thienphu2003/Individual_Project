import { create } from "zustand";

interface AuthModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  isOpenForSignUp: boolean;
  onOpenForSignUp: () => void;
  onCloseSignUp: () => void;
}

const useAuthModal = create<AuthModalStore>((set) => ({
  isOpen: false,
  isOpenForSignUp: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
  onOpenForSignUp: () => set({ isOpenForSignUp: true }),
  onCloseSignUp: () => set({ isOpenForSignUp: false }),
}));

export default useAuthModal;
