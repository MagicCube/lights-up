#include "HSV.h"

HSV HSV::parse(String text) {
  uint8_t commaIndex = -1;
  uint8_t lastCommaIndex;
  HSV result;
  for (int i = 0; i < 3; i++) {
    lastCommaIndex = commaIndex + 1;
    commaIndex = text.indexOf(",", lastCommaIndex);
    uint16_t value = text.substring(lastCommaIndex, commaIndex).toInt();
    if (i == 0) {
      result.h = value;
    } else if (i == 1) {
      result.s = value;
    } else {
      result.v = value;
    }
  }
  return result;
}

String HSV::toString() {
  return String(h) + "," + String(s) + "," + String(v);
}
