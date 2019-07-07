import Switch from 'antd/es/switch';
import cn from 'classnames';
import * as React from 'react';

import { RGB } from '../../types/Colors';

import { AppHeader } from '../AppHeader';
import { ColorPicker } from '../ColorPicker';

import * as styles from './index.less';

export const App: React.SFC = () => {
  const [color, setColor] = React.useState({ r: 255, g: 255, b: 255 });
  const [brightness, setBrightness] = React.useState(255);
  const [power, setPower] = React.useState(false);

  const handlePowerChange = React.useCallback((checked: boolean) => {
    setPower(checked);
  }, []);

  const handleColorChange = React.useCallback((newColor: RGB) => {
    setColor(newColor);
  }, []);
  const handleBrightnessChange = React.useCallback((newBrightess: number) => {
    setBrightness(newBrightess);
  }, []);
  console.info(power, color, brightness);
  return (
    <div>
      <AppHeader>
        <Switch checkedChildren="开" unCheckedChildren="关" checked={power} onChange={handlePowerChange} />
      </AppHeader>
      <main className={cn({ [styles.main]: true, [styles.disabled]: !power })}>
        <div className={styles.overlay} />
        <section>
          <ColorPicker onColorChange={handleColorChange} onBrightnessChange={handleBrightnessChange} />
        </section>
        <section />
      </main>
    </div>
  );
};
