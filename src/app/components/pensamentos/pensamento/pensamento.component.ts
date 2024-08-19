import { Component, Input } from '@angular/core';
import { Pensamento } from './pensamento';
import { PensamentoService } from '../pensamento.service';

@Component({
  selector: 'app-pensamento',
  templateUrl: './pensamento.component.html',
  styleUrls: ['./pensamento.component.css'],
})
export class PensamentoComponent {
  @Input()
  pensamento: Pensamento = {
    id: 0,
    conteudo: 'Sobre o Angular',
    autoria: 'Jessé',
    modelo: 'modelo3',
    favorito: false,
  };

  @Input()
  listaFavoritos: Pensamento[] = [];

  constructor(private readonly pensamentoService: PensamentoService) {}

  larguraPensamento(): string {
    if (this.pensamento.conteudo.length >= 256) {
      return 'pensamento-g';
    }
    return 'pensamento-p';
  }

  mudarIconeFavorito(): string {
    return this.pensamento.favorito ? 'ativo' : 'inativo';
  }

  atualizarFavorito() {
    this.pensamento.favorito = !this.pensamento.favorito;
    this.pensamentoService.editar(this.pensamento).subscribe(() => {
      this.listaFavoritos.splice(this.listaFavoritos.indexOf(this.pensamento), 1)
    });
  }
}
