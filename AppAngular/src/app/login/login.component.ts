import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import {Router} from '@angular/router';
import { UsuarioApi } from 'src/app/UsuarioApi';

import { setHttpHeader } from 'src/app/usuarios.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    //formulario: any;

    formulario = new FormGroup({
    username: new FormControl(null),
    pass: new FormControl(null),
    });

    apiLoginSetAuthHeader(): void{
      const usuarioApi : UsuarioApi = this.formulario.value;

      var credentialString = usuarioApi.username + ':' + usuarioApi.pass;
      var token = btoa(credentialString); // (btoa): Converter string para base 64
      setHttpHeader(token);
      this.router.navigate(['/usuarios']);
    }

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

}
