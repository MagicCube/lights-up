import { resolve } from 'path';

export function mappath(relativePath: string) {
  return resolve(__dirname, '../../..', relativePath);
}
