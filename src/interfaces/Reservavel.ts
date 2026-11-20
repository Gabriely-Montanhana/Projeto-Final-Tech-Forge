export interface Reservavel {
    reservar(nomeUsuario: string): void;
    cancelarReserva(): void;
    readonly possuiReserva: boolean;
}
