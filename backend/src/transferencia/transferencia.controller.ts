import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../login/auth.guard';
import { TransferenciaService } from './transferencia.service';

@Controller('transferencia')
export class TransferenciaController {
    constructor(
        private readonly transferenciaService: TransferenciaService
    ) {}

    @UseGuards(AuthGuard)
    @Get('/historico/:idContaOrigem')
    getHistoricoTransferencias(@Param ('idContaOrigem') idContaOrigem: string) {
        return this.transferenciaService.buscarTransferencias(parseInt(idContaOrigem));
    }
    
}
