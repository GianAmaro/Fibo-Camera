import { create } from "zustand";

const useCameraStore = create((set) => ({
  position: [0, 2, 5],
  rotation: [0, 0, 0],
  fov: 35,

  setCamera: (data) => set(() => data),
}));

export default useCameraStore;
