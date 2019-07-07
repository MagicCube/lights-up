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

  turnOn() {}

  turnOff() {}

  setHSVColor(hsv: HSV) {}

  setBrightness(brightness: number) {}

  onMessage(message: Message) {
    console.info(message);
  }
}
