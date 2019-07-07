export interface MessageContent {
  [propName: string]: number | string | boolean | object;
}

export interface Message extends MessageContent {
  type: string;
}
