import { nativeTheme } from 'electron';

const isMac = process.platform === "darwin";
const isWindows = process.platform === "win32";
const isLinux = process.platform === "linux";
const isDarkMode = nativeTheme.shouldUseDarkColors;
const lightBackgroundColor = "#FAFAFA";
const darkBackgroundColor = "#171717";
// for now
const getWindowBackgroundColor = () => isDarkMode ? darkBackgroundColor : lightBackgroundColor;

export default {
    isMac,
    isWindows,
    isLinux,
    isDarkMode,
    lightBackgroundColor,
    darkBackgroundColor,
    getWindowBackgroundColor
}