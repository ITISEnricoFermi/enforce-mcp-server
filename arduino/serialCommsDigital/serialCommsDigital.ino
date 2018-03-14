#include <Arduino.h>

/**
* Arduino code to use in combo with the web server
* The commands are declared in the arduinoCommands.json file
*/


#define DEBUG
#define motor1_pin 5
#define motor2_pin 6


void setMotors(String data) {
  int pin;
  if (data[1] == 'l') pin = motor1_pin;
  if (data[1] == 'r') pin = motor2_pin;

  int power = atoi(data[2]);

  if (power > 0) 
    power = HIGH;
  else
    power = LOW;

  #ifdef DEBUG
  String debugMessage = "";
  debugMessage += "Setting motor at pin ";
  debugMessage += pin;
  debugMessage += " to ";
  debugMessage += power;
  Serial.println(debugMessage);
  #endif

  digitalWrite(pin, power);
}

void setup() {
  pinMode(motor1_pin, OUTPUT);
  pinMode(motor2_pin, OUTPUT);
  Serial.begin(9600);
}

void loop() {

  if (Serial.available() > 0) {
    String str = Serial.readStringUntil('\n');

    switch (str[0]) {
      case 'm':
        setMotors(str);
        break;
    }
  }
}

