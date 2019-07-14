import { HSV } from '../../common/Colors';

interface Payload {
  brightness: number;
  hsvColor: HSV;
}

export function savePayloadToSettings(payload: Payload) {
  localStorage.setItem('payload', JSON.stringify(payload));
}

export function loadPayloadFromSettings() {
  if (!localStorage.getItem('payload')) {
    savePayloadToSettings({
      brightness: 100,
      hsvColor: { h: 60, s: 100, v: 100 }
    });
  }
  return JSON.parse(localStorage.getItem('payload'));
}
