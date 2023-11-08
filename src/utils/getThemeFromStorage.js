export const getThemeFromStorage = () => {
  let theme = false;
  if (localStorage.getItem('theme')) {
    theme = JSON.parse(localStorage.getItem('theme'));
  }
  return theme;
};