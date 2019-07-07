import { Message } from '../../common/Message';

export abstract class Accessory {
  sendMessage(message: Message) {
    this.onMessage(message);
  }

  protected onMessage(message: Message): boolean {
    if (message.type === 'turnOn') {
      this.turnOn();
      return true;
    }
    if (message.type === 'turnOff') {
      this.turnOff();
      return true;
    }
    return false;
  }

  abstract get name(): string;

  abstract get address(): string;

  abstract turnOn(): void;

  abstract turnOff(): void;
}
