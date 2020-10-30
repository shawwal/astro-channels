import { atom } from "recoil";

export const themeAtom = atom({
  key: "theme",
  default: "dark"
});

export const categoryAtom = atom({
  key: "category",
  default: []
});

export const languageAtom = atom({
  key: "language",
  default: []
})

export const resolutionAtom = atom({
  key: "resolution",
  default: []
})