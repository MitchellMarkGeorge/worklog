import { WindowService } from "../services/window";
import { VaultService } from "../services/vault";
import { app } from "electron";
import utils from "../utils/utils";

export class WorklogApplication {
  private static instance: WorklogApplication;
  private hasStarted = false;
  private windowService: WindowService;
  private vaultService: VaultService;

  static getInstance(): WorklogApplication {
    if (!this.instance) {
      throw new Error("WorklogApplication not initialized");
    }
    return this.instance;
  }

  private constructor() {
    // Initialize the application
    this.windowService = new WindowService();
    this.vaultService = new VaultService();
    this.handleAppListeners();
  }

  static init() {
    if (this.instance) {
      throw new Error("WorklogApplication already initialized");
    } else {
      const gotLock = app.requestSingleInstanceLock();
      if (!gotLock) {
        app.quit();
      } else {
        app.on("second-instance", () => {
          if (this.instance) {
            const lastFocusedWindow =
              this.instance.windowService.getLastFocusedWindow();
            if (lastFocusedWindow) {
              if (lastFocusedWindow.browserWindow.isMinimized()) {
                lastFocusedWindow.browserWindow.restore();
              } else {
                lastFocusedWindow.browserWindow.focus();
              }
            }
          }
        });
      }

      this.instance = new WorklogApplication();
      return this.instance;
    }
  }

  public start() {
    if (!this.hasStarted) {
      this.windowService.openNewWindow();
      this.hasStarted = true;
    } else {
      throw new Error("WorklogApplication already launched");
    }
  }

  private handleAppListeners() {
    app.on("activate", () => {
      if (!this.windowService.hasWindows()) {
        this.windowService.openNewWindow();
      }
    });

    app.on("window-all-closed", () => {
      if (!utils.isMac) {
        app.quit();
      }
    });
  }
}
