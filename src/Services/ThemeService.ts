const switchTheme = () => {
  if (
    localStorage.theme === "dark" ||
    (!("theme" in localStorage) &&
      window.matchMedia("(prefers-color-scheme: dark)").matches)
  ) {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }
};

const switchToAutoTheme = () => {
  localStorage.removeItem("theme");
  switchTheme();
};

const switchToLightTheme = () => {
  localStorage.theme = "light";
  switchTheme();
};

const switchToDarkTheme = () => {
  localStorage.theme = "dark";
  switchTheme();
};

export {
  switchTheme,
  switchToAutoTheme,
  switchToLightTheme,
  switchToDarkTheme,
};
