"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var XBee_1 = require("./XBee");
var motorCommands = {
    left: {
        on: "ml1",
        off: "ml0"
    },
    right: {
        on: "mr1",
        off: "mr0"
    }
};
var Arduino = /** @class */ (function () {
    function Arduino(port) {
        var xbee = new XBee_1.XBee(port);
        this.rightMotor = new Motor('right', xbee);
        this.leftMotor = new Motor('left', xbee);
    }
    Arduino.prototype.right_motor_on = function () {
        this.rightMotor.turnOn();
    };
    Arduino.prototype.right_motor_off = function () {
        this.rightMotor.turnOff();
    };
    Arduino.prototype.left_motor_on = function () {
        this.leftMotor.turnOn();
    };
    Arduino.prototype.left_motor_off = function () {
        this.leftMotor.turnOff();
    };
    return Arduino;
}());
exports.Arduino = Arduino;
var Motor = /** @class */ (function () {
    function Motor(motor, xbee) {
        this.xbee = xbee;
        this.offline = true;
        this.status = false;
        if (motor === 'left') {
            this.motorCommand = motorCommands.left;
            this.offline = false;
        }
        else if (motor === 'right') {
            this.motorCommand = motorCommands.right;
            this.offline = false;
        }
    }
    Motor.prototype.turnOn = function () {
        if (!this.status) {
            this.status = true;
            this.sendData(this.motorCommand.on);
        }
    };
    Motor.prototype.turnOff = function () {
        if (this.status) {
            this.status = false;
            this.sendData(this.motorCommand.off);
        }
    };
    Motor.prototype.toggle = function () {
        if (this.offline)
            return Error('Motor offline');
        if (this.status) {
            this.turnOff();
        }
        else {
            this.turnOn();
        }
    };
    Motor.prototype.sendData = function (data) {
        if (this.offline)
            return Error('Motor offline');
        this.xbee.sendData(data);
    };
    return Motor;
}());
