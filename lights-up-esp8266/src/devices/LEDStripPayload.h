#pragma once

#include <Arduino.h>

#include "colors/HSV.h"

struct LEDStripPayload {
  HSV hsvColor;
  uint8_t brightness;

  static LEDStripPayload parse(String text);
  String toJSON();
};
