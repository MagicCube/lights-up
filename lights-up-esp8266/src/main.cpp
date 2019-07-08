#include <Arduino.h>
#include <ArduinoOTA.h>

#include <ESP8266WebServer.h>
#include <ESP8266WiFi.h>
#include <ESP8266mDNS.h>

#define DEVICE_NAME "LEDSTRIP-01"

ESP8266WebServer server;

void handleRoot() {
  server.send(200, "application/json",
              "{\"name\":\"" + String(DEVICE_NAME) + "\",\"time\":\"" + String(millis()) + "\"}");
}

void handlePowerOn() {
  if (server.method() == HTTP_POST) {
    digitalWrite(LED_BUILTIN, LOW);
    server.send(200, "text/plain", "OK");
  }
}

void handlePowerOff() {
  if (server.method() == HTTP_POST) {
    digitalWrite(LED_BUILTIN, HIGH);
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

void setup() {
  pinMode(LED_BUILTIN, OUTPUT);
  digitalWrite(LED_BUILTIN, HIGH);
  WiFi.begin("iPhone", "13913954971");
  while (WiFi.status() != WL_CONNECTED) {
    delay(100);
  }
  MDNS.begin(DEVICE_NAME);
  ArduinoOTA.begin();
  server.on("/", handleRoot);
  server.on("/power/on", handlePowerOn);
  server.on("/power/off", handlePowerOff);
  server.on("/color/hsv", handleHsvColor);
  server.on("/brightness", handleBrightness);
  server.begin();
}

void loop() {
  ArduinoOTA.handle();
  server.handleClient();
  MDNS.update();
}
