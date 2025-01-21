import { BadRequestException, Injectable, NotAcceptableException } from "@nestjs/common";

@Injectable()
export class ExceptionsService {

    public async handleHttpException(e: Error) {
        switch (e.name) {
            case 'NotFoundCorrespondentObjects' :
                throw new NotAcceptableException(e.message);
            
            case 'RangeError' :
                throw new BadRequestException(e.message);

            
        }
    }
}