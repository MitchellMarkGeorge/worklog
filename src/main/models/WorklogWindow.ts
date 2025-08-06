import { BrowserWindow, shell } from "electron";
import { constants } from "../utils/constants";
import isDev from "electron-is-dev";
import utils from "../utils/utils";
import { format } from "node:url";
import { join } from "node:path";

export class WorklogWindow {
  public browserWindow: BrowserWindow;
  public constructor() {
    // Initialize the window
    const TITLEBAR_PADDING = 16;
    const TITLE_BAR_HEGHT = 44;
    const TRAFFIC_LIGHT_HEIGHT = 15;
    
    const MAIN_WINDOW_ENTRY = isDev
      ? "http://localhost:4000"
      : format({
          pathname: join(__dirname, "../renderer/index.html"),
          protocol: "file:",
          slashes: true,
        });
    
    const MAIN_WINDOW_PRELOAD_ENTRY = join(__dirname, "../preload/index.mjs");

    this.browserWindow = new BrowserWindow({
      title: constants.DEFAULT_WINDOW_TITLE,
      titleBarStyle: "hidden",
      trafficLightPosition: {
        x: TITLEBAR_PADDING,
        y: TITLE_BAR_HEGHT / 2 - TRAFFIC_LIGHT_HEIGHT / 2,
      },
      width: 1200,
      height: 900,
      // think about these values
      minHeight: 600,
      minWidth: 600,
      backgroundColor: utils.getWindowBackgroundColor(),
      show: false,
      webPreferences: {
        preload: MAIN_WINDOW_PRELOAD_ENTRY,
      },
    });

    // modified link handlers
    this.browserWindow.webContents.setWindowOpenHandler((details) => {
      shell.openExternal(details.url);
      return { action: "deny" };
    });

    this.browserWindow.webContents.on("will-navigate", (event) => {
      event.preventDefault();
      shell.openExternal(event.url);
    });

    // wait for the dom to be ready before showing the window
    // think about this
    this.browserWindow.webContents.once("dom-ready", () => {
      console.log("ready to show");
      this.browserWindow.show();
      this.browserWindow.focus();
    });

    this.browserWindow.loadURL(MAIN_WINDOW_ENTRY);

    if (isDev) {
      this.browserWindow.webContents.openDevTools({ mode: "detach" });
    }
  }

  public focus() {
    this.browserWindow.focus();
  }
}
