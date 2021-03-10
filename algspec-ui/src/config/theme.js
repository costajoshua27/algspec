export const allThemes = ['light', 'dark'];

export class Themes {
  constructor() {
    const storage = localStorage.getItem('theme');
    if (storage != null) {
      this.select(storage);
    } else {
      this.select(allThemes[0]);
    }
  }

  select(name) {
    if (name && !allThemes.includes(name)) {
      throw new Error(`${name} is not a valid theme.`);
    }
    document.body.setAttribute('data-theme', name);
  }

  get allThemes() {
    return allThemes;
  }
}