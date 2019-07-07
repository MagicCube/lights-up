import { HSV } from '../../common/Colors';
import { Message } from '../../common/Message';

import { Accessory } from './Accessory';

export class LightBulb extends Accessory {
  private _name: string;

  private _address: string;

  constructor(name: string, address: string) {
    super();
    this._name = name;
    this._address = address;
  }

  get name() {
    return this._name;
  }

  get address() {
    return this._address;
  }

  turnOn() {
    console.info(`[${this.name}] Turn on`);
  }

  turnOff() {
    console.info(`[${this.name}] Turn off`);
  }

  setHSVColor(hsvColor: HSV) {
    console.info(`[${this.name}] Set color to`, hsvColor);
  }

  setBrightness(brightness: number) {
    console.info(`[${this.name}] Set brightness to`, brightness);
  }

  onMessage(message: Message) {
    if (!super.onMessage(message)) {
      if (message.type === 'setHSVColor') {
        this.setHSVColor(message.hsvColor as HSV);
        return true;
      }
      if (message.type === 'setBrightness') {
        this.setBrightness(message.brightness as number);
        return true;
      }
    }
    return false;
  }
}
