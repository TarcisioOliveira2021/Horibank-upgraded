import Decimal from "decimal.js";

export class ContaDTO{
    idPessoa: number;
    tipoConta: string;
    numero: number;
    digito: number;
    agencia: number;
    saldo: Decimal;
}