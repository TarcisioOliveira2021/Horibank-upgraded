import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post, UseGuards, Request, UseFilters, BadRequestException, ForbiddenException, NotFoundException } from '@nestjs/common';
import { LoginService } from './login.service';
import { UsuarioDTO_REQUEST } from './usuario_dto_REQUEST';

@Controller('login')
export class LoginController {
  constructor(private readonly loginService: LoginService) { }

  @Post('logar')
  @HttpCode(HttpStatus.OK)
  async login(@Body() usuario: UsuarioDTO_REQUEST) {
    try {
      let usuarioEncontrado = await this.loginService.login(usuario);
      return { id: usuarioEncontrado.id, token: usuarioEncontrado.token };

    } catch (e) {
      if (e.message == 'Usuário não encontrado') 
        throw new NotFoundException('Usuário não encontrado');

      if (e.message == 'Senha ou login inválidos') 
        throw new ForbiddenException('Senha ou login inválidos');
    }
  }
}
