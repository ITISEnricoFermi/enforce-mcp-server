import { XBee } from "./XBee";

const motorCommands = {
  left: {
    on: "ml1",
    off: "ml0"
  },
  right: {
    on: "mr1",
    off: "mr0"
  }
};

export class Arduino {
  private rightMotor: Motor;
  private leftMotor: Motor;

  constructor(port: string) {
    let xbee = new XBee(port);
    this.rightMotor = new Motor('right', xbee);
    this.leftMotor = new Motor('left', xbee);
  }

  right_motor_on() {
    this.rightMotor.turnOn();
  }

  right_motor_off() {
    this.rightMotor.turnOff();
  }

  left_motor_on() {
    this.leftMotor.turnOn();
  }

  left_motor_off() {
    this.leftMotor.turnOff();
  }
}

class Motor {
  private motorCommand: any;
  private offline: boolean = true;
  private status: boolean = false;

  constructor(motor: string, private xbee: XBee) {
    if (motor === 'left') {
      this.motorCommand = motorCommands.left;
      this.offline = false;
    } else if (motor === 'right') {
      this.motorCommand = motorCommands.right;
      this.offline = false;
    }
  }

  turnOn() {
    if (!this.status) {
      this.status = true;
      this.sendData(this.motorCommand.on);
    }
  }

  turnOff() {
    if (this.status) {
      this.status = false;
      this.sendData(this.motorCommand.off);
    }
  }

  toggle() {
    if (this.status) {
      this.turnOff();
    } else {
      this.turnOn();
    }
  }

  sendData(data: string) {
    if (this.offline) return Error('Motor offline');
    this.xbee.sendData(data);
  }
}