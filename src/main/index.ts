import { WorklogApplication } from './models/WorklogApplication';
import { app } from 'electron';

function start() {
  app.on("ready", () => {
    const worklogApp = WorklogApplication.init();
    worklogApp.start();
  });
}

start();