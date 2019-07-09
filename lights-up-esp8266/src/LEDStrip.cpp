#include "LEDStrip.h"

bool LEDStrip::isOn() {
  return _isOn;
}

uint8_t LEDStrip::getBrightness() {
  return _brightness;
}

void LEDStrip::setBrightness(uint8_t brightness, bool immediately) {
  _brightness = brightness;
  auto scale = _brightness / 100.00 * 255;
  if (scale > 255) {
    scale = 255;
  }
  FastLED.setBrightness(scale);
  if (immediately) {
    FastLED.showColor(CRGB::Orange);
  }
}

void LEDStrip::begin() {
  pinMode(LED_BUILTIN, OUTPUT);
  digitalWrite(LED_BUILTIN, HIGH);
  FastLED.addLeds<WS2812B, LED_STRIP_ROW_1_PIN, GRB>(_row1, LED_STRIP_ROW_1_LENGTH);
  setBrightness(_brightness, false);
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
