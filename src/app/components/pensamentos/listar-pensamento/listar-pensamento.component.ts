import { Component, OnInit } from '@angular/core';
import { Pensamento } from '../pensamento/pensamento';
import { PensamentoService } from '../pensamento.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listar-pensamento',
  templateUrl: './listar-pensamento.component.html',
  styleUrls: ['./listar-pensamento.component.css'],
})
export class ListarPensamentoComponent implements OnInit {
  listaPensamentos: Pensamento[] = [];
  paginaAtual: number = 1;
  haMaisPensamentos: boolean = true;
  filtro: string = '';
  favoritos: boolean = false;
  listaFavoritos: Pensamento[] = [];
  titulo: string = 'Meu Mural';

  constructor(
    private service: PensamentoService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.service
      .listar(this.paginaAtual, this.filtro, this.favoritos)
      .subscribe((pensamentos) => {
        this.listaPensamentos = pensamentos;
      });
  }

  carregarMaisPensamentos() {
    this.service
      .listar(++this.paginaAtual, this.filtro, this.favoritos)
      .subscribe((listaPensamentos) => {
        this.listaPensamentos.push(...listaPensamentos);
        if (!listaPensamentos.length) {
          this.haMaisPensamentos = false;
        }
      });
  }

  pesquisarPensamentos() {
    this.paginaAtual = 1;
    this.haMaisPensamentos = true;
    this.service
      .listar(this.paginaAtual, this.filtro, this.favoritos)
      .subscribe((listPensamentos) => {
        this.listaPensamentos = listPensamentos;
      });
  }

  recarregarComponente() {
    // recarrega a página toda
    //location.reload();
    this.favoritos = false;
    this.paginaAtual = 1;
    //Realiza a busca da lista
    /*this.haMaisPensamentos = true;
    this.paginaAtual = 1;
    this.service
      .listar(this.paginaAtual, this.filtro, this.favoritos)
      .subscribe((lista) => {
        this.listaPensamentos = lista;
      });*/
      //Informa ao angular para recarregar só a rota atual
      this.router.routeReuseStrategy.shouldReuseRoute = () => false;
      this.router.onSameUrlNavigation = 'reload';
      this.router.navigate([this.router.url]);
  }

  listarFavoritos() {
    this.titulo = 'Meus Favoritos';
    this.favoritos = true;
    this.haMaisPensamentos = true;
    this.paginaAtual = 1;
    this.service
      .listar(this.paginaAtual, this.filtro, this.favoritos)
      .subscribe((lista) => {
        this.listaPensamentos = lista;
        this.listaFavoritos = lista;
      });
  }
}
