#pragma once

#include <Arduino.h>

#include <FastLED.h>

#include "colors/HSV.h"

#define LED_STRIP_ROW_1_PIN D3
#define LED_STRIP_ROW_1_LENGTH 30

class LEDStrip {
public:
  bool isOn();
  uint8_t getBrightness();
  void setBrightness(uint8_t brightness, bool immediately = true);
  HSV getHSVColor();
  void setHSVColor(HSV hsv, bool immediately = true);

  void begin();
  void update();
  void powerOn();
  void powerOff();

private:
  uint8_t _brightness = 100;
  bool _isOn;
  HSV _hsvColor = {60, 100, 100};
  CRGB _row1[LED_STRIP_ROW_1_LENGTH];

  void _updateColor();
};
