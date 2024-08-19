import { Component, OnInit } from '@angular/core';
import { Pensamento } from '../pensamento/pensamento';
import { PensamentoService } from '../pensamento.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { maiusculoValidators } from './maiusculo.validators';

@Component({
  selector: 'app-criar-pensamento',
  templateUrl: './criar-pensamento.component.html',
  styleUrls: ['./criar-pensamento.component.css'],
})
export class CriarPensamentoComponent implements OnInit {
  form!: FormGroup;

  constructor(
    private readonly service: PensamentoService,
    private readonly router: Router,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      conteudo: [
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern(/(.|\s)*\S(.|\s)*/),
        ]),
      ],
      autoria: [
        '',
        Validators.compose([Validators.required, Validators.minLength(3), maiusculoValidators]),
      ],
      modelo: ['modelo2'],
      favorito: [false]
    });
  }

  criarPensamento() {
    console.log(this.form.get('autoria')?.errors);
    if (this.form.valid) {
      this.service.criar(this.form.value).subscribe(() => {
        this.router.navigate(['/listarPensamento']);
      });
    }
  }

  habilitarBotao(): string {
    if (this.form.valid) {
      return 'botao';
    } 
    return 'botao__desabilitado';
  }
}
