#include "LEDStrip.h"

bool LEDStrip::isOn() {
  return _isOn;
}

void LEDStrip::begin() {
  pinMode(LED_BUILTIN, OUTPUT);
  digitalWrite(LED_BUILTIN, HIGH);
  FastLED.addLeds<WS2812B, LED_STRIP_ROW_1_PIN, GRB>(_row1, LED_STRIP_ROW_1_LENGTH);
  powerOn();
}

void LEDStrip::update() {
  if (isOn()) {
  }
}

void LEDStrip::powerOn() {
  _isOn = true;
  digitalWrite(LED_BUILTIN, LOW);
  FastLED.showColor(CRGB::Orange);
}

void LEDStrip::powerOff() {
  _isOn = false;
  digitalWrite(LED_BUILTIN, HIGH);
  FastLED.showColor(CRGB::Black);
}
