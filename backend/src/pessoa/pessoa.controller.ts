import { BadRequestException, Body, Controller, ForbiddenException, Get, HttpCode, HttpStatus, InternalServerErrorException, Param, Post, UseFilters, UseGuards } from '@nestjs/common';
import { PessoaService } from './pessoa.service';
import { PessoaDTO } from './pessoa_dto';
import { HttpExceptionFilter } from 'src/http-exceptions/http-exception.filter';

@Controller('pessoa')
export class PessoaController {

    constructor(
        private readonly pessoaService: PessoaService
    ) { }

    @HttpCode(HttpStatus.CREATED)
    @UseFilters(new HttpExceptionFilter())
    @Post('cadastrar')
    async cadastrarPessoa(@Body() pessoaDTO: PessoaDTO) {
        await this.pessoaService.cadastrarPessoa(pessoaDTO);
        return { 
            message: 'Pessoa cadastrada com sucesso' 
        };
    }


    @HttpCode(HttpStatus.OK)
    @UseFilters(new HttpExceptionFilter())
    @Get('/:id')
    async getUsuario(@Param('id') id: string) {
        return await this.pessoaService.getPessoaId(id);
    }
}
