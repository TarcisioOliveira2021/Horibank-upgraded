import { BadRequestException, ForbiddenException, Injectable, InternalServerErrorException, UnauthorizedException } from "@nestjs/common";

@Injectable()
export class ExceptionsService {

    public async handleHttpException(e: any) {
        switch (e.status) {
            case 400:
                throw new BadRequestException(e.message);
            case 401:
                throw new UnauthorizedException(e.message);
            case 403:
                throw new ForbiddenException(e.message);
            case 500:
                throw new InternalServerErrorException(e.message);
        }
    }
}