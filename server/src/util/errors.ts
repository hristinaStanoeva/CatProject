export class OperationalError extends Error {
    public errorMessages: string | string[];

    constructor(public statusCode: number, errorMessages: string | string[]) {
        super();
        this.errorMessages = Array.isArray(errorMessages)
            ? errorMessages
            : [errorMessages];
    }
}

// maybe not really needed.
// tslint:disable-next-line:max-classes-per-file
export class ServerError extends OperationalError {
    constructor() {
        super(500, 'Server error');
    }
}
