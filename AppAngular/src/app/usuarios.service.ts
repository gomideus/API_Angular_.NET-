import { LocationStrategy } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from './Usuario';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'Basic aaaAaaaaaaaaaaaaaAAA'
  })
}

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  url = 'https://localhost:5001/api/usuarios';
  constructor(private http: HttpClient) { }

  getAuthorization(): any{
    return localStorage.getItem("usuario");
  }

  // CREATE
  incluir(usuario: Usuario ): Observable<any>{
    return this.http.post<Usuario>(this.url, usuario, httpOptions);
  }

  // READ ALL
  listar(): Observable<Usuario[]>{
    return this.http.get<Usuario[]>(this.url, httpOptions);
  }
  
  // READ
  obter(userID: number): Observable<Usuario>{
    const apiUrl = `${this.url}/${userID}`;
    return this.http.get<Usuario>(apiUrl, httpOptions);
  }

  // UPDATE
  alterar(usuario: Usuario): Observable<any>{
    return this.http.put<Usuario>(this.url, usuario, httpOptions );
  } 
  
  // DELETE
  excluir(userID: number): Observable<any> {
    console.log(userID);
    const apiUrl = `${this.url}/${userID}`;
    return this.http.delete<number>(apiUrl, httpOptions);
  }

}
