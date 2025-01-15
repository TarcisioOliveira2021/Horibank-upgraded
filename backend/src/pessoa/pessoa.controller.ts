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
    @HttpCode(HttpStatus.CREATED)
    async cadastrarPessoa(@Body() pessoaDTO: PessoaDTO) {
        try{
            await this.pessoaService.cadastrarPessoa(pessoaDTO);
            return {message: 'Pessoa cadastrada com sucesso'};
        }catch(e){
            
        }
    }


    @HttpCode(HttpStatus.OK)
    @Get('/:id')
    async getUsuario(@Param('id') id: string) {
        return await this.pessoaService.getPessoaId(id);
    }
}
