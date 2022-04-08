import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import {Router} from '@angular/router';
import { UsuarioApi } from 'src/app/UsuarioApi';

import { Interceptor } from 'src/app/interceptor/interceptor.service';
import { HttpClient, HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router, private _http: HttpClient) { }

    //formulario: any;

    formulario = new FormGroup({
    username: new FormControl(null),
    pass: new FormControl(null),
    });

    //private interceptor:Interceptor = new Interceptor();

    apiLoginSetAuthHeader(): void{
      const usuarioApi : UsuarioApi = this.formulario.value;
      var credentialString = usuarioApi.username + ':' + usuarioApi.pass;
      localStorage.setItem("usuario", credentialString);
      this.router.navigate(['/usuarios']);
    }

  ngOnInit(): void {
  }

}
