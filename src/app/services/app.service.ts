import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../environments/environments';
import { LOCAL_STORAGE_NAME } from '../environments/const';
import { map, tap, catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';


export abstract class AbstractMasterRestService {
    constructor(
        protected http: HttpClient,
        public actionUrl: string) {
    }

    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': 'AllowSpecificOrigin',
            'Access-Control-Allow-Credentials': 'true',
            'Authorization':  `bearer ` + localStorage.getItem(LOCAL_STORAGE_NAME.ACCESS_TOKEN)
        })
    };
}

@Injectable({
    providedIn: 'root'
})
export class AccountService extends AbstractMasterRestService {
    constructor(http: HttpClient) {
        super(http, environment.Url + 'Account');
    }

    login(data: any): Observable<any> {
        const body = JSON.stringify(data);
        return this.http.post<any>(this.actionUrl + '/login', body, this.httpOptions);
    }
}