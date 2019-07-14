import Switch from 'antd/es/switch';
import cn from 'classnames';
import * as React from 'react';

import { HSV } from '../../../common/Colors';

import { AppHeader } from '../AppHeader';
import { ColorPicker } from '../ColorPicker';
import { postMessage } from '../../messaging';
import { loadPayloadFromSettings, savePayloadToSettings } from '../../settings';

import * as styles from './index.less';

export const App: React.SFC = () => {
  const [hsvColor, setHSVColor] = React.useState(() => {
    const payload = loadPayloadFromSettings();
    return payload.hsvColor;
  });
  const [brightness, setBrightness] = React.useState(() => {
    const payload = loadPayloadFromSettings();
    return payload.brightness;
  });
  const [power, setPower] = React.useState(true);

  const handlePowerChange = React.useCallback(
    (checked: boolean) => {
      setPower(checked);
      if (checked) {
        const payload = { hsvColor, brightness };
        postMessage('powerOn', payload);
      } else {
        postMessage('powerOff');
      }
    },
    [brightness, hsvColor]
  );

  const handleColorChange = React.useCallback(
    (newColor: HSV) => {
      setHSVColor(newColor);
      const payload = { hsvColor: newColor, brightness };
      savePayloadToSettings(payload);
      postMessage('setPayload', { hsvColor: newColor, brightness });
    },
    [brightness]
  );
  const handleBrightnessChange = React.useCallback(
    (newBrightess: number) => {
      setBrightness(newBrightess);
      const payload = { hsvColor, brightness: newBrightess };
      savePayloadToSettings(payload);
      postMessage('setPayload', payload);
    },
    [hsvColor]
  );

  return (
    <div>
      <AppHeader>
        <Switch checkedChildren="开" unCheckedChildren="关" checked={power} onChange={handlePowerChange} />
      </AppHeader>
      <main className={cn({ [styles.main]: true, [styles.disabled]: !power })}>
        <div className={styles.overlay} />
        <section>
          <ColorPicker
            hsvColor={hsvColor}
            brightness={brightness}
            onColorChange={handleColorChange}
            onBrightnessChange={handleBrightnessChange}
          />
        </section>
        <section />
      </main>
    </div>
  );
};
