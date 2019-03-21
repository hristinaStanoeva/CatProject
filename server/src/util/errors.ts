export class OperationalError extends Error {
    public errorMessages: string | string[];

    constructor(public statusCode: number, errorMessages: string | string[]) {
        super();
        this.errorMessages = Array.isArray(errorMessages)
            ? errorMessages
            : [errorMessages];
    }
}

// needed for errors outside of middleware/routing, e.g. schema validation
// tslint:disable-next-line:max-classes-per-file
export class ServerError extends OperationalError {
    constructor(e: Error) {
        console.log(e);
        super(500, 'Server error');
    }
}
