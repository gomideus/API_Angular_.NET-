import { ViewEncapsulation } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { EmailValidator, FormControl, FormGroup } from '@angular/forms';
import { Usuario } from 'src/app/Usuario';
import { UsuariosService } from 'src/app/usuarios.service';


// Constantes, para validação dos campos do formulário
var NAME_MIN_LENGTH = 3;
var NAME_MAX_LENGTH = 20;
var CPF_LENGTH = 11;
var EMAIL_MIN_LENGTH = 3;
var EMAIL_MAX_LENGTH = 254;


interface Tipo {
  type: string;
}

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css'],
})

export class UsuariosComponent implements OnInit {

  tipos: Tipo[] = [
    {type: 'Normal'},
    {type: 'Administrador'},
    {type: 'Financeiro'},
  ];

  formulario: any;
  tituloFormulario: string;

  usuarios: Usuario[];

  visibilidadeTabela: boolean = true;
  visibilidadeFormulario: boolean = false;
  //visibilidadeFormularioUpdateUser: boolean = false;


  states: string[] = ["Administrador", "Normal", "Financeiro"];

  displayedColumns: string[] = ['userid', 'name', 'cpf', 'email', 'usertype', 'actions'];
  

  constructor( private usuariosService: UsuariosService ) { }

  ngOnInit(): void {
    this.usuariosService.Listar().subscribe(resultado => {
      this.usuarios = resultado;
    });
    
  };

  // Função utilizada para retornar de formulários para página da table
  Voltar(): void{
    this.visibilidadeTabela = true;
    this.visibilidadeFormulario = false;
  }

  ExibirFormularioUpdateUser(userID: number): void{
    this.visibilidadeTabela = false;
    this.usuariosService.Obter(userID).subscribe(resultado => {
      this.tituloFormulario = `Atualizar ${resultado.name}`;
      this.formulario = new FormGroup({
        userID: new FormControl(userID),
        name: new FormControl(resultado.name),
        cpf: new FormControl(resultado.cpf),
        email: new FormControl(resultado.email),
        userType: new FormControl(resultado.userType),
      });
    });

  }

  ExibirFormularioCadastro(): void{
    this.visibilidadeTabela = false;
    this.visibilidadeFormulario = true;
    this.tituloFormulario = "Novo Usuario";
    this.formulario = new FormGroup({
      name: new FormControl(null),
      cpf: new FormControl(null),
      email: new FormControl(null),
      userType: new FormControl(null),
    });
  }

  ExibirFormulario(userID: number): void{
    if(userID > 0){ // Exibir formulario de atualizar dados
      this.visibilidadeFormulario = true;
      this.visibilidadeTabela = false;
      this.usuariosService.Obter(userID).subscribe(resultado => {
      this.tituloFormulario = `Atualizar ${resultado.name}`;
      this.formulario = new FormGroup({
      userID: new FormControl(userID),
      name: new FormControl(resultado.name),
      cpf: new FormControl(resultado.cpf),
      email: new FormControl(resultado.email),
      userType: new FormControl(resultado.userType),
      });
      });
    }else{ // Exibir formulario de adicionar novo user
      this.visibilidadeTabela = false;
      this.visibilidadeFormulario = true;
      this.tituloFormulario = "Novo Usuario";
      this.formulario = new FormGroup({
      name: new FormControl(null),
      cpf: new FormControl(null),
      email: new FormControl(null),
      userType: new FormControl(null),
      });
    }
  }

  EnviarFormulario(): void{
    const usuario : Usuario = this.formulario.value;
    let isFormularioValido = this.validarFormulario(usuario);
    
    if(usuario.userID > 0 && isFormularioValido){

      this.usuariosService.Alterar(usuario).subscribe(resultado =>
      {
        console.log( "Alterando!" );
        this.visibilidadeTabela = true;
        this.visibilidadeFormulario = false
        alert("Usuario alterado com sucesso!");
        this.usuariosService.Listar().subscribe(
          resultado => {
          this.usuarios = resultado
        });
      });

    }else if(isFormularioValido){

      console.log( "Incluindo!" );
      this.usuariosService.Incluir(usuario).subscribe(resultado => {
        this.visibilidadeTabela = true;
        this.visibilidadeFormulario = false;
        alert("Usuario inserido com sucesso!");
        this.usuariosService.Listar().subscribe(
          resultado => {
          this.usuarios = resultado
        });
      });

      
      }else{
        alert("Dados invalidos! Confira e tente novamente.")
      }
    }

  EnviarFormularioUpdateUser(): void{
    const usuario : Usuario = this.formulario.value;
    let isFormularioValido = this.validarFormulario(usuario);
    if(isFormularioValido){
      this.usuariosService.Alterar(usuario).subscribe(resultado =>
        {
          console.log( "Alterando!" );
          this.visibilidadeTabela = true;
          this.visibilidadeFormulario = false;
          alert("Usuario alterado com sucesso!");
          this.usuariosService.Listar().subscribe(
            resultado => {
            this.usuarios = resultado
          });
        });
      }else{
        alert("Dados invalidos! Confira e tente novamente.")
      }
    }

  EnviarExclusao(userID: number): void{
    console.log( "Excluir!" );
    this.usuariosService.Excluir(userID).subscribe(resultado => {
      alert("Usuario apagado com sucesso!");
      this.usuariosService.Listar().subscribe(
          resultado => {
          this.usuarios = resultado
        });
    });
  }

  validarNome( name: string ): boolean{
    return name.length < NAME_MIN_LENGTH || name.length > NAME_MAX_LENGTH ? false : true;
  }

  validarCpf(cpf:string): boolean{
    return cpf.length != CPF_LENGTH ? false : true;
  }

  validarEmail(email:string): boolean{
    return email.length < EMAIL_MIN_LENGTH || email.length > EMAIL_MAX_LENGTH ? false : true;
  }

  validarTipoUsuario(userType:string): boolean{
    var isUserTypeValido = true;

    if( userType != "Administrador" && userType != "Financeiro" && userType != "Normal" )
      isUserTypeValido = false;

    return isUserTypeValido;
  }

  validarFormulario( usuario: Usuario ): boolean{
    if( this.validarNome(usuario.name) && this.validarCpf(usuario.cpf) && this.validarEmail(usuario.email) &&
     this.validarTipoUsuario(usuario.userType) ){
      return true;
    }
    return false;
  }

}
