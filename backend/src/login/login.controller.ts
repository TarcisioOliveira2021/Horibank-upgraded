import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post, UseGuards, Request, UseFilters, BadRequestException, ForbiddenException, NotFoundException } from '@nestjs/common';
import { LoginService } from './login.service';
import { UsuarioDTO_REQUEST } from './usuario_dto_REQUEST';
import { ExceptionsService } from 'src/http-exceptions/exceptions.service';

@Controller('login')
export class LoginController {
  constructor(
    private readonly loginService: LoginService,
    private readonly exceptionsService: ExceptionsService
  ) { }

  @Post('logar')
  @HttpCode(HttpStatus.OK)
  async login(@Body() usuario: UsuarioDTO_REQUEST) {
    try {
      let usuarioEncontrado = await this.loginService.login(usuario);
      return { id: usuarioEncontrado.id, token: usuarioEncontrado.token };
    } catch (e) {
      throw await this.exceptionsService.handleHttpException(e);
    }
  }
}
