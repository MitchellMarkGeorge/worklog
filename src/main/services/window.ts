import { WorklogWindow } from "../models/WorklogWindow";
import { BrowserWindow } from "electron";

export class WindowService {
  private windows: WorklogWindow[];
  private lastFocusedWindow: WorklogWindow | null;
  constructor() {
    this.windows = [];
    this.lastFocusedWindow = null;
  }

  public openNewWindow(): WorklogWindow {
    const newWindow = new WorklogWindow();

    if (this.lastFocusedWindow == null) {
      this.lastFocusedWindow = newWindow;
    }

    newWindow.browserWindow.on("focus", () => {
      this.lastFocusedWindow = newWindow;
    });

    newWindow.browserWindow.on("close", () => {
      this.removeWindow(newWindow);
    });

    this.windows.push(newWindow);

    return newWindow;
  }

  public getWindows(): WorklogWindow[] {
    return this.windows;
  }

  public hasWindows(): boolean {
    return this.windows.length > 0;
  }

  public removeWindow(window: WorklogWindow): void {
    const index = this.windows.indexOf(window);
    if (index !== -1) {
      this.windows.splice(index, 1);
    }
  }

  public getLastFocusedWindow(): WorklogWindow | null {
    return this.lastFocusedWindow;
  }

  public getWindowFromBrowserWindow(
    browserWindow: BrowserWindow,
  ): WorklogWindow | null {
    return (
      this.windows.find((window) => window.browserWindow === browserWindow) ||
      null
    );
  }
}
