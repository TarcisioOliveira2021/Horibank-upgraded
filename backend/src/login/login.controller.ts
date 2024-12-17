import { Body, Controller, Post } from '@nestjs/common';
import { LoginService } from './login.service';
import { UsuarioDTO } from './usuario_dto';

@Controller('login')
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  @Post('logar')
  login(@Body() usuario: UsuarioDTO) {
    return this.loginService.login(usuario);
  }
}
