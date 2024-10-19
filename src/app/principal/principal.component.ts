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
  btnCadastro:boolean = true;

  //JSON de clientes
  clientes:Client[] = [];

  constructor(private servico:ClientService){}

  selecionar():void{
    this.servico.selecionar()
    .subscribe(retorno  => this.clientes = retorno);
  }

  ngOnInit(){
    this.selecionar();
  }
}
