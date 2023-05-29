import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RestDataSource } from './rest.datasource';

@Injectable()

export class AuthService {

    constructor(private dataSources: RestDataSource){}

    authenticate(userName: string, password: string): Observable<boolean>{
        return this.dataSources.authenticate(userName, password);
    }

    get authenticated(): boolean{
        return this.dataSources.auth_token != null;
    }

    clear(){
        this.dataSources.auth_token = undefined;
    }
}

