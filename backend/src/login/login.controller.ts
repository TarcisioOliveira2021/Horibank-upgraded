import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post, UseGuards, Request, UseFilters, BadRequestException, ForbiddenException, NotFoundException } from '@nestjs/common';
import { LoginService } from './login.service';
import { UsuarioDTO_REQUEST } from './usuario_dto_REQUEST';
import { HttpExceptionFilter } from 'src/http-exceptions/http-exception.filter';

@Controller('login')
export class LoginController {
  constructor(
    private readonly loginService: LoginService
  ) { }

  @HttpCode(HttpStatus.OK)
  @UseFilters(new HttpExceptionFilter())
  @Post('logar')
  async login(@Body() usuario: UsuarioDTO_REQUEST) {
      let usuarioEncontrado = await this.loginService.login(usuario);
      
      return { 
        id: usuarioEncontrado.id, 
        token: usuarioEncontrado.token 
      };
  }
}
