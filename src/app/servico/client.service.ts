import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Client } from '../modelo/Client';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  //URL da API
  private url:string = "http://localhost:8080";

  constructor(private http:HttpClient) { }

  selecionar():Observable<Client[]>{
    return this.http.get<Client[]>(this.url);
  }
}
