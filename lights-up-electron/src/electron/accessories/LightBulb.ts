import throttle from 'lodash.throttle';
import fetch, { RequestInit } from 'node-fetch';

import { HSV } from '../../common/Colors';
import { Message } from '../../common/Message';

import { Accessory } from './Accessory';

const THROTTLE_WAIT = 250;

const throttled = throttle((callback: () => Promise<void>) => callback(), THROTTLE_WAIT);

export class LightBulb extends Accessory {
  private _name: string;

  private _url: string;

  private _brightness: number = 100;

  private _hsvColor: HSV = { h: 60, s: 100, v: 100 };

  constructor(name: string, url: string) {
    super();
    this._name = name;
    this._url = url;
  }

  get name() {
    return this._name;
  }

  get url() {
    return this._url;
  }

  get hsvColor() {
    return this._hsvColor;
  }

  get brigntness() {
    return this._brightness;
  }

  async powerOn() {
    console.info(`[${this.name}] Power on.`);
    try {
      await this.sendPayload();
      await this.fetchPost('power/on');
    } catch (e) {
      console.error('Fail to power on.');
    }
  }

  async powerOff() {
    console.info(`[${this.name}] Power off.`);
    try {
      await this.fetchPost('power/off');
    } catch (e) {
      console.error('Fail to power off.');
    }
  }

  async setHSVColor(hsvColor: HSV) {
    this._hsvColor = hsvColor;
    await throttled(async () => {
      console.info(`[${this.name}] Setting color to`, hsvColor);
      try {
        await this.sendPayload();
      } catch (e) {
        console.error('Fail to set HSV color.');
      }
    });
  }

  async setBrightness(brightness: number) {
    this._brightness = brightness;
    await throttled(async () => {
      console.info(`[${this.name}] Setting brightness to`, brightness);
      try {
        await this.sendPayload();
      } catch (e) {
        console.error('Fail to set brightness.');
      }
    });
  }

  async setPayload(hsvColor: HSV, brightness: number) {
    this._hsvColor = hsvColor;
    this._brightness = brightness;
    await throttled(async () => {
      console.info(`[${this.name}] Setting payload to`, hsvColor, brightness);
      try {
        await this.sendPayload();
      } catch (e) {
        console.error('Fail to set payload.');
      }
    });
  }

  onMessage(message: Message) {
    if (!super.onMessage(message)) {
      if (message.type === 'setPayload') {
        this.setPayload(message.hsvColor as HSV, message.brightness as number);
        return true;
      }
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

  protected async sendPayload() {
    await this.fetchPost(`payload`, {
      body: `${this.hsvColor.h},${this.hsvColor.s},${this.hsvColor.v},${this.brigntness}`
    });
  }

  protected fetchGet(path: string, init?: RequestInit) {
    return fetch(`${this.url}/${path}`, { ...init, method: 'GET' });
  }

  protected fetchPost(path: string, init?: RequestInit) {
    return fetch(`${this.url}/${path}`, { ...init, method: 'POST' });
  }
}
