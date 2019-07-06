import { menubar } from 'menubar';

import { LEDStrip } from './accessories/LEDStrip';
import { mappath } from './utils/mappath';

export class App {
  private static _instance: App = null;

  private _ledStrip: LEDStrip = null;

  static get instance() {
    if (!App._instance) {
      App._instance = new App();
    }
    return App._instance;
  }

  setup() {
    this._initMenubar();
    this._initLEDStrip();
    this._registerHotkeys();
    this._registerEnvents();
  }

  private _initLEDStrip() {
    this._ledStrip = new LEDStrip('LED Strip in Studio Room', '192.168.4.12');
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
        vibrancy: 'popover',
        webPreferences: {
          nodeIntegration: true
        }
      },
      preloadWindow: true
    });
  }

  private _registerHotkeys() {}

  private _registerEnvents() {}
}
