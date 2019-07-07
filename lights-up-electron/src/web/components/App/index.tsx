import Switch from 'antd/es/switch';
import cn from 'classnames';
import * as React from 'react';

import { HSV } from '../../../common/Colors';

import { AppHeader } from '../AppHeader';
import { ColorPicker } from '../ColorPicker';
import { postMessage } from '../../messages';

import * as styles from './index.less';

export const App: React.SFC = () => {
  const [hsvColor, setHSVColor] = React.useState({ h: 60, s: 100, v: 0 });
  const [brightness, setBrightness] = React.useState(100);
  const [power, setPower] = React.useState(false);

  const handlePowerChange = React.useCallback((checked: boolean) => {
    setPower(checked);
    if (checked) {
      postMessage('on');
    } else {
      postMessage('off');
    }
  }, []);

  const handleColorChange = React.useCallback((newColor: HSV) => {
    setHSVColor(newColor);
    postMessage('setColor', { color: newColor });
  }, []);
  const handleBrightnessChange = React.useCallback((newBrightess: number) => {
    setBrightness(newBrightess);
    postMessage('setBrightness', { brightness: newBrightess });
  }, []);

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
