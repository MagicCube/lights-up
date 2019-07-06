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

  setRGBColor(r: number, g: number, b: number) {}

  setBrightness(brightness: number) {}
}
