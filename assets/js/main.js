/**
 * Theming.
 *
 * Supports the preferred color scheme of the operation system as well as
 * the theme choice of the user.
 *
 */
const themeToggle = document.querySelector(".theme-toggle");
const chosenTheme = window.localStorage && window.localStorage.getItem("theme");
const chosenThemeIsDark = chosenTheme == "dark";
const chosenThemeIsLight = chosenTheme == "light";
const darkThemeBackgroundImage = "assets/images/logoNoName.png";
const lightThemeBackgroundImage = "assets/images/logoLight.png";



// Detect the color scheme the operating system prefers.
function detectOSColorTheme() {
  if (chosenThemeIsDark) {
    document.documentElement.setAttribute("data-theme", "dark");
    document.body.style.backgroundImage = `url('${darkThemeBackgroundImage}')`;
  } else if (chosenThemeIsLight) {
    document.documentElement.setAttribute("data-theme", "light");
    document.body.style.backgroundImage = `url('${lightThemeBackgroundImage}')`;
  } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
    document.documentElement.setAttribute("data-theme", "dark");
    document.body.style.backgroundImage = `url('${darkThemeBackgroundImage}')`;
  } else {
    document.documentElement.setAttribute("data-theme", "light");
    document.body.style.backgroundImage = `url('${lightThemeBackgroundImage}')`;
  }
}


// Switch the theme.
function switchTheme(e) {
  if (chosenThemeIsDark) {
    localStorage.setItem("theme", "light");
  } else if (chosenThemeIsLight) {
    localStorage.setItem("theme", "dark");
  } else {
    if (document.documentElement.getAttribute("data-theme") == "dark") {
      localStorage.setItem("theme", "light");
    } else {
      localStorage.setItem("theme", "dark");
    }
  }

  detectOSColorTheme();
  window.location.reload();
}

// Event listener
if (themeToggle) {
  themeToggle.addEventListener("click", switchTheme, false);
  window
    .matchMedia("(prefers-color-scheme: dark)")
    .addEventListener("change", (e) => e.matches && detectOSColorTheme());
  window
    .matchMedia("(prefers-color-scheme: light)")
    .addEventListener("change", (e) => e.matches && detectOSColorTheme());

  detectOSColorTheme();
} else {
  localStorage.removeItem("theme");
}
