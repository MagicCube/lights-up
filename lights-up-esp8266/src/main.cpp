#include <Arduino.h>
#include <ArduinoOTA.h>

#include <ESP8266WebServer.h>
#include <ESP8266WiFi.h>

#include "colors/HSV.h"
#include "devices/LEDStrip.h"

#define DEVICE_NAME "LEDSTRIP-01"

// 192.168.2.184
#define WIFI_SSID "Henry's Living Room 2.4GHz"
#define WIFI_PASS "13913954971"

LEDStrip ledStrip;
ESP8266WebServer server;

void handleRoot() {
  LEDStripPayload payload = {ledStrip.getHSVColor(), ledStrip.getBrightness()};
  server.send(200, "application/json",
              "{\"name\":\"" + String(DEVICE_NAME) + "\"" +
              ",\"power\":" + (ledStrip.isOn() ? "true" : "false") +
              ",\"aliveTime\":" + String(millis()) +
              ",\"payload\":" + payload.toJSON() +
              "}");
}

void handlePayload() {
  if (server.method() == HTTP_POST) {
    LEDStripPayload payload = LEDStripPayload::parse(server.arg("plain"));
    ledStrip.setBrightness(payload.brightness);
    ledStrip.setHSVColor(payload.hsvColor);
    server.send(200, "text/plain", "OK");
  }
}

void handlePowerOn() {
  if (server.method() == HTTP_POST) {
    ledStrip.powerOn();
    server.send(200, "text/plain", "OK");
  }
}

void handlePowerOff() {
  if (server.method() == HTTP_POST) {
    ledStrip.powerOff();
    server.send(200, "text/plain", "OK");
  }
}

void setupWiFi() {
  WiFi.begin(WIFI_SSID, WIFI_PASS);
  while (WiFi.status() != WL_CONNECTED) {
    delay(100);
  }
}

void setupServer() {
  ArduinoOTA.begin();
  server.on("/", handleRoot);
  server.on("/power/on", handlePowerOn);
  server.on("/power/off", handlePowerOff);
  server.on("/payload", handlePayload);
  server.begin();
}

void setup() {
  ledStrip.begin();
  setupWiFi();
  setupServer();
}

void loop() {
  ledStrip.update();
  ArduinoOTA.handle();
  server.handleClient();
}
