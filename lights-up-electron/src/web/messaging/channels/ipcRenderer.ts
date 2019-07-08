import { ipcRenderer } from 'electron';

import { Message, MessageContent } from '../../../common/Message';

export function postMessage(type: string, content?: MessageContent) {
  const message: Message = { type, ...content };
  ipcRenderer.send('message', message);
}
