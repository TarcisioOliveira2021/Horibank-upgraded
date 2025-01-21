export class NotAllowedAction extends Error {
    constructor(message) {
        super(message);
        this.name = 'NotAllowedAction';
    }
}