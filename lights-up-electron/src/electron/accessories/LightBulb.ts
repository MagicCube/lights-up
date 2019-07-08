import fetch, { RequestInit } from 'node-fetch';

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

  get url() {
    return this._address;
  }

  async powerOn() {
    await this.fetchPost(`power/on`);
    console.info(`[${this.name}] POWER ON`);
  }

  async powerOff() {
    await this.fetchPost(`power/off`);
    console.info(`[${this.name}] POWER OFF`);
  }

  async setHSVColor(hsvColor: HSV) {
    await this.fetchPost(`color/hsv`, {
      body: JSON.stringify(hsvColor)
    });
    console.info(`[${this.name}] SET COLOR TO`, hsvColor);
  }

  async setBrightness(brightness: number) {
    await this.fetchPost(`brightness`, {
      body: `${brightness}`
    });
    console.info(`[${this.name}] SET BRIGHTNESS TO`, brightness);
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

  protected fetchGet(path: string, init?: RequestInit) {
    return fetch(`${this.url}/${path}`, { ...init, method: 'GET' });
  }

  protected fetchPost(path: string, init?: RequestInit) {
    return fetch(`${this.url}/${path}`, { ...init, method: 'POST' });
  }
}
