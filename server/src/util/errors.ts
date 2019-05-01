export class OperationalError extends Error {
    constructor(public statusCode: number, public errorMessage: string) {
        super();
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
