// function to handle clicks on the toggle button
const onClick = () => {
    switchTheme()
}

// function to toggle the theme
const switchTheme = () => {
  theme.value = theme.value === 'light'
    ? 'dark'
    : 'light'
  setThemePreference()
}
// first checks for the user's preference in local storage 
// fallback to check the system preference if nothing is found in storage:
const storageKey = 'theme-preference';

const getThemePreference = () => {
    if (localStorage.getItem(storageKey))
        return localStorage.getItem(storageKey)
    else
        return window.matchMedia('(prefers-color-scheme: dark)').matches 
            ? 'dark' 
            : 'light'
}


// function to set the user's preference in local storage
const setThemePreference = () => {
    localStorage.setItem(storageKey, theme.value)
    // document.startViewTransition(reflectThemePreference);
    reflectThemePreference()
}

// function to modify the DOM based on the user's preference
const reflectThemePreference = () => {
    document.firstElementChild.setAttribute('data-theme', theme.value)
    document.querySelector('#theme-toggle')?.setAttribute('aria-label', theme.value)
}


const theme = {
  value: getThemePreference(),
}

// set early so no page flashes / CSS is made aware
// reflectThemePreference()

window.onload = () => {
  // set on load so screen readers can get the latest value on the button
  reflectThemePreference()

  // now this script can find and listen for clicks on the control
  document
    .querySelector('#theme-toggle')
    .addEventListener('click', onClick)
}


// Synchronize the theme with system change
window
  .matchMedia('(prefers-color-scheme: dark)')
  .addEventListener('change', ({matches:isDark}) => {
    theme.value = isDark ? 'dark' : 'light'
    setThemePreference()
  })