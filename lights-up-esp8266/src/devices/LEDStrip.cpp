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
    _updateColor();
  }
}

HSV LEDStrip::getHSVColor() {
  return _hsvColor;
}

void LEDStrip::setHSVColor(HSV hsv, bool immediately) {
  _hsvColor = hsv;
  if (immediately) {
    _updateColor();
  }
}

void LEDStrip::begin() {
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
  _updateColor();
}

void LEDStrip::powerOff() {
  _isOn = false;
  FastLED.showColor(CRGB::Black);
}

void LEDStrip::_updateColor() {
  CRGB rgb;
  rgb.setHSV(_hsvColor.h / 360.0 * 255, _hsvColor.s / 100.0 * 255, _hsvColor.v / 100.0 * 255);
  FastLED.showColor(rgb);
}
