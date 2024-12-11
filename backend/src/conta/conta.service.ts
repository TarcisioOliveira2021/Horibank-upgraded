import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ContaDTO } from './conta_dto';
import { Prisma } from '@prisma/client';
import { NotFoundException } from '@nestjs/common';

//Código para resolver o problema de serialização do JSON para  BigInt
declare global {
    interface BigInt{
        toJSON(): number;
    }
}
BigInt.prototype.toJSON = function(){ return Number(this); }

@Injectable()
export class ContaService {
    constructor(private prismaService: PrismaService) {}

    cadastrarConta(conta: ContaDTO){
        return this.prismaService.conta.create({data: conta});
    }

    listarContas(id: number){
        return this.prismaService.conta.findMany({ where:{idPessoa: id}});
    }
}
