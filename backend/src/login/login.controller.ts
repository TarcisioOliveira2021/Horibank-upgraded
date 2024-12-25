import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post, UseGuards, Request, UseFilters } from '@nestjs/common';
import { LoginService } from './login.service';
import { UsuarioDTO } from './usuario_dto';


@Controller('login')
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post('logar')
  login(@Body() usuario: UsuarioDTO) {
    return this.loginService.login(usuario);
  }
}
