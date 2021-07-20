export type cookieTypes = {
  language: Language;
  fontSize: number;
  theme: Themes;
};

export enum Language {
  de = 'de',
  en = 'en',
}

export enum Themes {
  dark = 'dark',
  light = 'light',
}
