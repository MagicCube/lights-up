#ifndef LED_STRIP_H
#define LED_STRIP_H

#include <Arduino.h>

#include <FastLED.h>

#define LED_STRIP_ROW_1_PIN D3
#define LED_STRIP_ROW_1_LENGTH 30

class LEDStrip {
public:
  bool isOn();
  uint8_t getBrightness();
  void setBrightness(uint8_t brightness, bool immediately = true);

  void begin();
  void update();
  void powerOn();
  void powerOff();

private:
  uint8_t _brightness = 60;
  bool _isOn;
  CRGB _row1[LED_STRIP_ROW_1_LENGTH];
};

#endif
