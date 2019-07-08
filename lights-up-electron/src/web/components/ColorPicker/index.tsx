/* eslint-disable no-lonely-if */
import iro from '@jaames/iro';
import * as React from 'react';

import { HSV } from '../../../common/Colors';

import * as styles from './index.less';

interface ColorPickerProps {
  hsvColor: HSV;
  brightness: number;
  onColorChange?: (color: HSV) => void;
  onBrightnessChange?: (brightness: number) => void;
}

export const ColorPicker: React.SFC<ColorPickerProps> = (props: ColorPickerProps) => {
  const { hsvColor, brightness, onColorChange, onBrightnessChange } = props;
  const domRef = React.useRef(null);
  const colorPickerRef = React.useRef(null);
  const handleColorChange = React.useCallback(
    (newColor, changes) => {
      if (changes.v) {
        // If only brightness has been changed
        if (typeof onColorChange === 'function') {
          // Use v as brightness.
          onBrightnessChange(newColor.hsv.v);
        }
      } else if (typeof onColorChange === 'function') {
        // Only use h and s to construct the color.
        onColorChange({ h: newColor.hsv.h, s: newColor.hsv.s, v: 100 });
      }
    },
    [onColorChange, onBrightnessChange]
  );
  // Construct a new ColorPicker.
  React.useEffect(() => {
    console.info('[ColorPicker]', 'Construct color picker');
    const colorPicker = new iro.ColorPicker(domRef.current, {
      width: 280,
      wheelLightness: false
    });
    colorPickerRef.current = colorPicker;
    return () => {
      console.info('[ColorPicker]', 'Destruct color picker');
      colorPickerRef.current = null;
    };
  }, []);
  React.useEffect(() => {
    if (colorPickerRef.current) {
      const currentOfColorPicker = colorPickerRef.current.color;
      if (
        hsvColor.h !== currentOfColorPicker.hsv.h ||
        hsvColor.s !== currentOfColorPicker.hsv.s ||
        brightness !== currentOfColorPicker.hsv.v
      ) {
        const newHSVColor = {
          h: hsvColor.h,
          s: hsvColor.s,
          v: brightness
        };
        console.info('[ColorPicker]', 'Set to ', newHSVColor);
        colorPickerRef.current.color.hsv = newHSVColor;
      }
    }
  }, [hsvColor, brightness]);
  // Binding events.
  React.useEffect(() => {
    if (colorPickerRef.current) {
      console.info('[ColorPicker]', 'Binding events.');
      colorPickerRef.current.on('color:change', handleColorChange);
    }
    return () => {
      if (colorPickerRef.current) {
        console.info('[ColorPicker]', 'Unbinding events.');
        colorPickerRef.current.off('color:change', handleColorChange);
      }
    };
  }, [handleColorChange]);
  return <div ref={domRef} className={styles.container} />;
};
