import { Message, MessageContent } from '../../../common/Message';

export function postMessage(type: string, content?: MessageContent) {
  const message: Message = { type, ...content };
  console.info('[DUMMY]', message);
}
