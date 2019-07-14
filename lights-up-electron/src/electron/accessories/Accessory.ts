import { Message } from '../../common/Message';

export abstract class Accessory {
  sendMessage(message: Message) {
    this.onMessage(message);
  }

  protected onMessage(message: Message): boolean {
    if (message.type === 'powerOn') {
      this.powerOn(message);
      return true;
    }
    if (message.type === 'powerOff') {
      this.powerOff();
      return true;
    }
    return false;
  }

  abstract get name(): string;

  abstract get url(): string;

  abstract powerOn(message?: Message): Promise<void>;

  abstract powerOff(message?: Message): Promise<void>;
}
