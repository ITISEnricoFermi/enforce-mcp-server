"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var module_xbee_1 = require("module-xbee");
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
var Motors = /** @class */ (function () {
    function Motors(port) {
        this.xbee = new module_xbee_1.XBee(port);
        this.rightMotor = new Motor('right', this.xbee);
        this.leftMotor = new Motor('left', this.xbee);
    }
    Motors.prototype.right_motor_on = function () {
        this.rightMotor.turnOn();
    };
    Motors.prototype.right_motor_off = function () {
        this.rightMotor.turnOff();
    };
    Motors.prototype.left_motor_on = function () {
        this.leftMotor.turnOn();
    };
    Motors.prototype.left_motor_off = function () {
        this.leftMotor.turnOff();
    };
    return Motors;
}());
exports.Motors = Motors;
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
            this.sendCommand(this.motorCommand.on);
        }
    };
    Motor.prototype.turnOff = function () {
        if (this.status) {
            this.status = false;
            this.sendCommand(this.motorCommand.off);
        }
    };
    Motor.prototype.toggle = function () {
        if (this.status) {
            this.turnOff();
        }
        else {
            this.turnOn();
        }
    };
    Motor.prototype.sendCommand = function (com) {
        if (this.offline)
            return Error('Motor offline');
        this.xbee.sendCommand(com);
    };
    return Motor;
}());
