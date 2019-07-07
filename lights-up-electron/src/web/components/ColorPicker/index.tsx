/* eslint-disable no-lonely-if */
import iro from '@jaames/iro';
import * as React from 'react';

import { RGB } from '../../types/Colors';

import * as styles from './index.less';

interface ColorPickerProps {
  onColorChange?: (color: RGB) => void;
  onBrightnessChange?: (brightness: number) => void;
}

export const ColorPicker: React.SFC<ColorPickerProps> = (props: ColorPickerProps) => {
  const { onColorChange, onBrightnessChange } = props;
  const rootRef = React.useRef(null);
  const colorPickerRef = React.useRef(null);
  const handleColorChange = React.useCallback(
    (color, changes) => {
      if (changes.v) {
        if (typeof onColorChange === 'function') {
          // Use v as brightness.
          onBrightnessChange(Math.round((color.hsv.v / 100) * 255));
        }
      } else if (typeof onColorChange === 'function') {
        // Only use h and s to construct the color.
        const newColor = new iro.Color({ h: color.hsv.h, s: color.hsv.s, v: 100 });
        onColorChange(newColor.rgb);
      }
    },
    [onColorChange, onBrightnessChange]
  );
  // Construct a new ColorPicker.
  React.useEffect(() => {
    console.info('Construct color picker');
    const colorPicker = new iro.ColorPicker(rootRef.current, {
      width: 280,
      wheelLightness: false
    });
    colorPickerRef.current = colorPicker;
    return () => {
      console.info('Destruct color picker');
      colorPickerRef.current = null;
    };
  }, [rootRef]);
  // Binding events.
  React.useEffect(() => {
    if (colorPickerRef.current) {
      console.info('Binding events.');
      colorPickerRef.current.on('color:change', handleColorChange);
    }
    return () => {
      if (colorPickerRef.current) {
        console.info('Unbinding events.');
        colorPickerRef.current.off('color:change', handleColorChange);
      }
    };
  }, [handleColorChange]);
  return <div ref={rootRef} className={styles.container} />;
};
