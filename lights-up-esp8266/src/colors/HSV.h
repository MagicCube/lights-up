#pragma once

#include <Arduino.h>

struct HSV {
  uint16_t h;
  uint8_t s;
  uint8_t v;

  String toString();
  static HSV parse(String text);
};
