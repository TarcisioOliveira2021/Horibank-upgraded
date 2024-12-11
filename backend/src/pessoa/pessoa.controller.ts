import { Body, Controller, Post, Get, Param} from '@nestjs/common';
import { PessoaService } from './pessoa.service';
import { PessoaDTO } from './pessoa_dto';

@Controller('pessoa')
export class PessoaController {

    constructor(
        private pessoaService: PessoaService
    ){}

    @Post('cadastrar')
    cadastrarPessoa(@Body() pessoaDTO: PessoaDTO) {
        return this.pessoaService.cadastrarPessoa(pessoaDTO);
    }
}
