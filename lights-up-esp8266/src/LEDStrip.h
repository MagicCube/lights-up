#ifndef LED_STRIP_H
#define LED_STRIP_H

#include <Arduino.h>

#include <FastLED.h>

#define LED_STRIP_ROW_1_PIN D3
#define LED_STRIP_ROW_1_LENGTH 30

class LEDStrip {
public:
  bool isOn();

  void begin();
  void update();
  void powerOn();
  void powerOff();

private:
  bool _isOn;
  CRGB _row1[LED_STRIP_ROW_1_LENGTH];
};

#endif
