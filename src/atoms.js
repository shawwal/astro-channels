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

export const selectedCategory = atom({
  key: "selectedCategory",
  default: []
});

export const selectedLanguage = atom({
  key: "selectedLanguage",
  default: []
});

export const selectedResolution = atom({
  key: "selectedResolution",
  default: []
});

export const categoryArray = atom({
  key: 'categoryArray',
  default: [
    { id: 1, value: "Movies", isChecked: false },
    { id: 2, value: "Sports", isChecked: false },
    { id: 3, value: "Kids", isChecked: false },
    { id: 4, value: "Learning", isChecked: false },
    { id: 5, value: "Music", isChecked: false },
    { id: 6, value: "News", isChecked: false },
    { id: 7, value: "Lifestyle", isChecked: false },
    { id: 8, value: "Variety Entertainment", isChecked: false },
    { id: 9, value: "Special Interest", isChecked: false },
    { id: 10, value: "Radio", isChecked: false },
  ]
})

export const languageArray = atom({
  key: 'languageArray',
  default: [
    { id: 1, value: "International", isChecked: false },
    { id: 2, value: "Malay", isChecked: false },
    { id: 3, value: "Chinese", isChecked: false },
    { id: 4, value: "Indian", isChecked: false },
    { id: 5, value: "Korean & Japanese", isChecked: false },
    { id: 6, value: "Multiple Languages", isChecked: false },
  ]
})

export const resultionsArrayList = atom({
  key: 'resolutionArray',
  default: [
    { id: 1, value: "SD", isChecked: false },
    { id: 2, value: "HD", isChecked: false },
  ]
})