const darkModeToggle = document.getElementById("switch");
const darkModeEnabled = localStorage.getItem("darkModeEnabled");

function toggleDarkMode() {
  const currentMode = localStorage.getItem("darkModeEnabled");

  if (currentMode === "true") {
    document.body.classList.remove("dark-mode");
    localStorage.setItem("darkModeEnabled", "false");
  } else {
    document.body.classList.add("dark-mode");
    localStorage.setItem("darkModeEnabled", "true");
  }
}

if (darkModeEnabled === "true") {
  document.body.classList.add("dark-mode");
  darkModeToggle.checked = true;
}

darkModeToggle.addEventListener("change", toggleDarkMode);