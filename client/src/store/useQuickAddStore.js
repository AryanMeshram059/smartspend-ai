import { create } from "zustand"

const useQuickAddStore = create((set) => ({
  isOpen: false,

  openModal: () =>
    set({
      isOpen: true,
    }),

  closeModal: () =>
    set({
      isOpen: false,
    }),
}))

export default useQuickAddStore