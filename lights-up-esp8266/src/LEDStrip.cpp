#include "LEDStrip.h"

void LEDStrip::begin() {
  pinMode(LED_BUILTIN, OUTPUT);
  digitalWrite(LED_BUILTIN, HIGH);
  FastLED.addLeds<WS2812B, LED_STRIP_ROW_1_PIN, GRB>(_row1, LED_STRIP_ROW_1_LENGTH);
  FastLED.setBrightness(255);
  FastLED.showColor(CRGB::Black);
}

void LEDStrip::update() {
}

void LEDStrip::powerOn() {
  digitalWrite(LED_BUILTIN, LOW);
  FastLED.showColor(CRGB::Orange);
}

void LEDStrip::powerOff() {
  digitalWrite(LED_BUILTIN, HIGH);
  FastLED.showColor(CRGB::Black);
}
