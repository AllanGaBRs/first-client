import { Component } from '@angular/core';
import { Client } from '../modelo/Client';
import { ClientService } from '../servico/client.service';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrl: './principal.component.css'
})
export class PrincipalComponent {

  cliente = new Client();

  // Variável para visibilidade dos botões
  btnCadastro: boolean = true;

  tabela: boolean = true;

  //JSON de clientes
  clientes: Client[] = [];

  constructor(private servico: ClientService) { }

  selecionar(): void {
    this.servico.selecionar()
      .subscribe(retorno => this.clientes = retorno);
  }

  cadastrar(): void {
    this.servico.cadastrar(this.cliente)
      .subscribe(
        retorno => {
          this.clientes.push(retorno);
          this.cliente = new Client();
          alert("Cliente cadastrado com sucesso");
        });
  }

  selecionarCliente(posicao: number): void {
    this.cliente = this.clientes[posicao];

    this.btnCadastro = false;

    this.tabela = false;
  }

  editar(): void {
    this.servico.editar(this.cliente)
      .subscribe(retorno => {
        let posicao = this.clientes.findIndex(obj => {
          return obj.id == retorno.id;
        });

        this.clientes[posicao] = retorno;
        this.cliente = new Client();
        this.btnCadastro = true;
        this.tabela = true;
        alert('Cliente alterado com sucesso');
      });
  }

  remover(): void {
    this.servico.remover(this.cliente.id)
      .subscribe(retorno => {
        let posicao = this.clientes.findIndex(obj => {
          return obj.id == this.cliente.id;
        });

        this.clientes.splice(posicao, 1);
        this.cliente = new Client();
        this.btnCadastro = true;
        this.tabela = true;
        alert('Cliente removido com sucesso');
      });
  }

  cancelar(): void {
    this.cliente = new Client();
    this.btnCadastro = true;
    this.tabela = true;
  }

  ngOnInit() {
    this.selecionar();
  }
}
