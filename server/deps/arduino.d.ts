export declare class Arduino {
    private rightMotor;
    private leftMotor;
    constructor(port: string);
    right_motor_on(): void;
    right_motor_off(): void;
    left_motor_on(): void;
    left_motor_off(): void;
}
