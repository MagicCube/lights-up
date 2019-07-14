import { ipcMain } from 'electron';
import { menubar } from 'menubar';

import { Message } from '../common/Message';

import { LEDStrip } from './accessories/LEDStrip';
import { mappath } from './utils/mappath';

export class App {
  private static _instance: App = null;

  static get instance() {
    if (!App._instance) {
      App._instance = new App();
    }
    return App._instance;
  }

  private _ledStrip: LEDStrip = null;

  get devMode() {
    return process.argv[2] === '--dev';
  }

  get ledStrip() {
    return this._ledStrip;
  }

  setup() {
    if (this.devMode) {
      console.info('\nLights-up is now running in [DEV] mode.\n');
    } else {
      console.info('\nLights-up is now running.\n');
    }
    this._initMenubar();
    this._initLEDStrip();
    this._registerHotkeys();
    this._registerEnvents();
  }

  private _initLEDStrip() {
    this._ledStrip = new LEDStrip('LED Strip in Studio Room', 'http://192.168.2.184');
  }

  private _initMenubar() {
    const index = this.devMode ? 'http://localhost:3000/index.dev.html' : `file://${mappath('public/index.html')}`;
    menubar({
      index,
      icon: mappath('public/icon.png'),
      browserWindow: {
        width: 300,
        height: 400,
        vibrancy: 'light',
        webPreferences: {
          nodeIntegration: true
        }
      },
      preloadWindow: true
    });
  }

  private _registerHotkeys() {}

  private _registerEnvents() {
    ipcMain.on('message', (event: Event, message: Message) => {
      this.ledStrip.sendMessage(message);
    });
  }
}
