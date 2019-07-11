import throttle from 'lodash.throttle';
import fetch, { RequestInit } from 'node-fetch';

import { HSV } from '../../common/Colors';
import { Message } from '../../common/Message';

import { Accessory } from './Accessory';

const THROTTLE_WAIT = 100;

const throttled = throttle((callback: () => Promise<void>) => callback(), THROTTLE_WAIT);

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
    console.info(`[${this.name}] Power on.`);
    try {
      await this.fetchPost(`power/on`);
    } catch (e) {
      console.error('Fail to power on.');
    }
  }

  async powerOff() {
    console.info(`[${this.name}] Power off.`);
    try {
      await this.fetchPost(`power/off`);
    } catch (e) {
      console.error('Fail to power off.');
    }
  }

  async setHSVColor(hsvColor: HSV) {
    await throttled(async () => {
      console.info(`[${this.name}] Setting color to`, hsvColor);
      try {
        await this.fetchPost(`color/hsv`, {
          body: `${hsvColor.h},${hsvColor.s},${hsvColor.v}`
        });
      } catch (e) {
        console.error('Fail to set HSV color.');
      }
    });
  }

  async setBrightness(brightness: number) {
    await throttled(async () => {
      console.info(`[${this.name}] Setting brightness to`, brightness);
      try {
        await this.fetchPost(`brightness`, {
          body: `${brightness}`
        });
      } catch (e) {
        console.error('Fail to set brightness.');
      }
    });
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
