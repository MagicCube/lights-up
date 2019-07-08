#include <Arduino.h>
#include <ArduinoOTA.h>

#include <ESP8266mDNS.h>
#include <ESP8266WebServer.h>
#include <ESP8266WiFi.h>

ESP8266WebServer server;

void handleTest() {
  server.send(200, "application/json", "{\"name\":\"" + server.arg("name") + "\"}");
}

void handleTurnOn() {
  digitalWrite(LED_BUILTIN, LOW);
  server.send(200, "text/plain", "OK");
}

void handleTurnOff() {
  digitalWrite(LED_BUILTIN, HIGH);
  server.send(200, "text/plain", "OK");
}

void setup() {
  pinMode(LED_BUILTIN, OUTPUT);
  digitalWrite(LED_BUILTIN, HIGH);
  WiFi.begin("iPhone", "13913954971");
  while (WiFi.status() != WL_CONNECTED) {
    delay(100);
  }
  MDNS.begin("ledstrip-01");
  ArduinoOTA.begin();
  server.on("/test", handleTest);
  server.on("/turnOn", handleTurnOn);
  server.on("/turnOff", handleTurnOff);
  server.begin();
}

void loop() {
  ArduinoOTA.handle();
  server.handleClient();
  MDNS.update();
}
