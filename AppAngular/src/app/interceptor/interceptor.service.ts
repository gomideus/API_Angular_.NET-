import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UsuariosService } from '../usuarios.service';



export class CustomHttpParams extends HttpParams {
    constructor(public param1: string) {
        super();
    }
}

@Injectable()
export class Interceptor implements HttpInterceptor {

    constructor( private usuarioService: UsuariosService ){

    }

    intercept( request: HttpRequest<any>, next: HttpHandler ):
                 
    Observable<HttpEvent<any>> {
        const encode = btoa(`${localStorage.getItem("usuario")}`);
        request = request.clone({
        setHeaders: {
        Authorization: `Basic ${encode}`
        }
        });
        
        //const decode = atob(encode);
        //console.log(decode);
        console.log(localStorage.getItem("usuario"));
        console.log(request);
        return next.handle(request);
    }

}

