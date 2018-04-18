import { XBee } from "module-xbee";

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

export class Motors {
  private rightMotor: Motor;
  private leftMotor: Motor;
  public xbee: XBee;

  constructor(port: string) {
    this.xbee = new XBee(port);
    this.rightMotor = new Motor('right', this.xbee);
    this.leftMotor = new Motor('left', this.xbee);
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
      this.sendCommand(this.motorCommand.on);
    }
  }

  turnOff() {
    if (this.status) {
      this.status = false;
      this.sendCommand(this.motorCommand.off);
    }
  }

  toggle() {
    if (this.status) {
      this.turnOff();
    } else {
      this.turnOn();
    }
  }

  sendCommand(com: string) {
    if (this.offline) return Error('Motor offline');
      this.xbee.sendCommand(com);
  }
}
