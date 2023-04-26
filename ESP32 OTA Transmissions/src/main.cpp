#include <Arduino.h>
#include <WiFi.h>
#include <Wire.h>
#include <Adafruit_BMP280.h>

#define led_pin 4

// Transmit Packet
typedef struct transmit{
  float topTemp;
  float botTemp;
} transmit;

// Global Declarations
transmit packet;
char* recBuffer;
char* sendBuffer;

WiFiClient client;

Adafruit_BMP280 bmp; // I2C
Adafruit_BMP280 bmp2; // I2C


void setup() {
  //Serial.begin(9600);
  pinMode(led_pin, OUTPUT);

analogWrite(led_pin, 2);
  unsigned status;
  unsigned status2;
  Wire.begin(14, 15);
  status = bmp.begin(0x76); // other id is 0x77
  bmp2.begin(0x77);
  if(!status){
    digitalWrite(led_pin, 1);
    delay(200);
    digitalWrite(led_pin, 0);
    delay(200);
    digitalWrite(led_pin, 1);
    delay(200);
    digitalWrite(led_pin, 0);
  }
  if (!status2){
    digitalWrite(led_pin, 1);
    delay(200);
    digitalWrite(led_pin, 0);
    delay(200);
    digitalWrite(led_pin, 1);
    delay(200);
    digitalWrite(led_pin, 0);
    delay(200);
    digitalWrite(led_pin, 1);
    delay(200);
    digitalWrite(led_pin, 0);
    delay(200);
    digitalWrite(led_pin, 1);
    delay(200);
    digitalWrite(led_pin, 0);
  }
  digitalWrite(led_pin, 0);

  /* Default settings from datasheet. */
  bmp.setSampling(Adafruit_BMP280::MODE_NORMAL,     /* Operating Mode. */
                  Adafruit_BMP280::SAMPLING_X2,     /* Temp. oversampling */
                  Adafruit_BMP280::SAMPLING_X16,    /* Pressure oversampling */
                  Adafruit_BMP280::FILTER_X16,      /* Filtering. */
                  Adafruit_BMP280::STANDBY_MS_500); /* Standby time. */

  bmp2.setSampling(Adafruit_BMP280::MODE_NORMAL,     /* Operating Mode. */
                  Adafruit_BMP280::SAMPLING_X2,     /* Temp. oversampling */
                  Adafruit_BMP280::SAMPLING_X16,    /* Pressure oversampling */
                  Adafruit_BMP280::FILTER_X16,      /* Filtering. */
                  Adafruit_BMP280::STANDBY_MS_500); /* Standby time. */
  //Serial.println("Connecting to WiFi..");
  WiFi.mode(WIFI_STA);
  WiFi.begin("Testnet", "6043130575");
  while(WiFi.status() != WL_CONNECTED){
    analogWrite(led_pin, 5);
  }
  analogWrite(led_pin, 0);
  // Serial.print("WiFi Connected:");
  // Serial.println(WiFi.localIP());

}

bool pin4 = false;
int timer = 0;

void loop() {

  packet.topTemp = bmp2.readTemperature();
  packet.botTemp = bmp.readTemperature();
  if (timer > 800){
    analogWrite(led_pin, 2);
    client.connect("192.168.137.127", 5566);
    sendBuffer = (char*)malloc(sizeof(transmit));
    memcpy(sendBuffer, (char*)&packet, sizeof(transmit));
    client.write(sendBuffer, sizeof(transmit));
    client.stop();
    analogWrite(led_pin, 0);
    timer = 0;
  }

  delay(20);
  timer+=20;
}