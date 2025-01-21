export class ExistCorrespondentObjects extends Error {
    constructor(message) {
        super(message);
        this.name = 'ExistCorrespondentObjects';
    }
}