import { XBee } from "./XBee";
export declare class Arduino {
    private rightMotor;
    private leftMotor;
    xbee: XBee;
    constructor(port: string);
    right_motor_on(): void;
    right_motor_off(): void;
    left_motor_on(): void;
    left_motor_off(): void;
}
