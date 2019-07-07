import { Message } from '../../common/Message';

export abstract class Accessory {
  sendMessage(message: Message) {
    this.onMessage(message);
  }

  abstract get name(): string;

  abstract get address(): string;

  protected abstract onMessage(message: Message): void;
}
