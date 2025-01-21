export class NotFoundCorrespondentObjects extends Error {
    constructor(message) {
        super(message);
        this.name = 'NotFoundCorrespondentObjects';
    }
}