import { atom } from "recoil";

export const themeAtom = atom({
  key: "theme",
  default: "dark"
});

export const filterAtom = atom({
  key: "filter",
  default: []
});