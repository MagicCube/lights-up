#include <Arduino.h>
#include <ArduinoOTA.h>

#include <ESP8266WebServer.h>
#include <ESP8266WiFi.h>

#include "LEDStrip.h"

#define DEVICE_NAME "LEDSTRIP-01"

// 192.168.2.184
#define WIFI_SSID "Henry's Living Room 2.4GHz"
#define WIFI_PASS "13913954971"

LEDStrip ledStrip;
ESP8266WebServer server;

void handleRoot() {
  server.send(200, "application/json",
              "{\"name\":\"" + String(DEVICE_NAME) + "\",\"time\":\"" + String(millis()) + "\"}");
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

void handleHsvColor() {
  if (server.method() == HTTP_POST) {
    server.send(200, "text/plain", server.arg("plain"));
  }
}

void handleBrightness() {
  if (server.method() == HTTP_POST) {
    server.send(200, "text/plain", server.arg("plain"));
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
  server.on("/color/hsv", handleHsvColor);
  server.on("/brightness", handleBrightness);
  server.begin();
}

void setup() {
  ledStrip.begin();
  setupWiFi();
  setupServer();
}

void loop() {
  ArduinoOTA.handle();
  server.handleClient();
}
