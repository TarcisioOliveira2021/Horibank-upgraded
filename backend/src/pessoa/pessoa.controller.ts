import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post, UseGuards} from '@nestjs/common';
import { PessoaService } from './pessoa.service';
import { PessoaDTO } from './pessoa_dto';
import { AuthGuard } from '../login/auth.guard';

@Controller('pessoa')
export class PessoaController {

    constructor(
        private readonly pessoaService: PessoaService
    ) { }

    @Post('cadastrar')
    cadastrarPessoa(@Body() pessoaDTO: PessoaDTO) {
        return this.pessoaService.cadastrarPessoa(pessoaDTO);
    }


    @HttpCode(HttpStatus.OK)
    @Get('/:id')
    async getUsuario(@Param('id') id: string) {
        return await this.pessoaService.getPessoaId(id);
    }
}
