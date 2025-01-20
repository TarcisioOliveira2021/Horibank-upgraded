import { BadRequestException, Body, Controller, ForbiddenException, Get, HttpCode, HttpStatus, InternalServerErrorException, Param, Post, UseGuards } from '@nestjs/common';
import { PessoaService } from './pessoa.service';
import { PessoaDTO } from './pessoa_dto';
import { AuthGuard } from '../login/auth.guard';
import { ExceptionsService } from '../http-exceptions/exceptions.service';

@Controller('pessoa')
export class PessoaController {

    constructor(
        private readonly pessoaService: PessoaService,
        private readonly exceptionsService: ExceptionsService   
    ) { }

    @Post('cadastrar')
    @HttpCode(HttpStatus.CREATED)
    async cadastrarPessoa(@Body() pessoaDTO: PessoaDTO) {
        try {
            await this.pessoaService.cadastrarPessoa(pessoaDTO);
            return { message: 'Pessoa cadastrada com sucesso' };
        } catch (e) {
            throw await this.exceptionsService.handleHttpException(e);
        }
    }


    @HttpCode(HttpStatus.OK)
    @Get('/:id')
    async getUsuario(@Param('id') id: string) {
        try{
            return await this.pessoaService.getPessoaId(id);
        }catch (e) {
            throw await this.exceptionsService.handleHttpException(e);
        }
    }
}
