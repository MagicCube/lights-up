import { app as electronApp } from 'electron';

import { App } from './App';

electronApp.on('ready', () => {
  App.instance.setup();
});
