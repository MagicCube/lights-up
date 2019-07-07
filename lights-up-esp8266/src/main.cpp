#include <Arduino.h>

#include <FastLED.h>

#define NUM_LEDS 30
#define DATA_PIN D3

CRGB leds[NUM_LEDS];

void setup() {
  Serial.begin(115200);
  // put your setup code here, to run once:
  FastLED.addLeds<WS2812B, DATA_PIN, GRB>(leds, NUM_LEDS);
  FastLED.setBrightness(255);
  for (int i = 0; i < NUM_LEDS; i++) {
    leds[i] = CRGB::Orange;
  }
  FastLED.show();
}

void loop() {
}
