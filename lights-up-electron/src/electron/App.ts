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

  get ledStrip() {
    return this._ledStrip;
  }

  setup() {
    this._initMenubar();
    this._initLEDStrip();
    this._registerHotkeys();
    this._registerEnvents();
  }

  private _initLEDStrip() {
    this._ledStrip = new LEDStrip('LED Strip in Studio Room', 'http://172.20.10.8');
  }

  private _initMenubar() {
    const options = {
      index: 'http://localhost:3000/'
    };
    menubar({
      ...options,
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
