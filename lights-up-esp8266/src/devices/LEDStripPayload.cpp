#include "LEDStripPayload.h"

LEDStripPayload LEDStripPayload::parse(String text) {
  LEDStripPayload result;
  int lastCommaIndex = text.lastIndexOf(",");
  result.brightness = text.substring(lastCommaIndex + 1).toInt();
  result.hsvColor = HSV::parse(text.substring(0, lastCommaIndex));
  return result;
}

String LEDStripPayload::toJSON() {
  return "{\"hsv\":[" + hsvColor.toString() + "],\"brightness\":" + String(brightness) + "}";
}
