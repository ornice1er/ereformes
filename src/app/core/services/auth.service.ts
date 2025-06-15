import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigService } from '../utils/config-service';
import { GlobalName } from '../utils/global-name';
import { LocalStorageService } from '../utils/local-stoarge-service';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  url :string =ConfigService.toApiUrl("logout");
  url2 :string =ConfigService.toFile('');
  private _isAuthenticated = new BehaviorSubject<boolean>(false);
  public isReady = new BehaviorSubject<boolean>(false);


  constructor(private appLocalStorage: LocalStorageService, private http:HttpClient) {
     const token = this.appLocalStorage.get(GlobalName.tokenName);
      if (token) {
            this._isAuthenticated.next(true);
            this.isReady.next(true); 
      } else {
        this._isAuthenticated.next(false);
        this.isReady.next(true);
      }
   }
   
  isAuthenticated(): Observable<boolean> {
    return this._isAuthenticated.asObservable();
  }


  getJWTToken(){
    return this.appLocalStorage.get(GlobalName.tokenName)
  }
  setJWTToken(token:any){
    return this.appLocalStorage.set(GlobalName.tokenName,token)
  }
  setJWTRefreshToken(token:any){
    return this.appLocalStorage.set(GlobalName.refreshTokenName,token)
  }

  me(){
    return this.http.get<any>(`${this.url2}api/user`,
     ConfigService.httpHeader(null,true));
  }

  login(ressource:any){

    /*ressource['grant_type']=LoginParamProd.grantType;
    ressource['client_id']=LoginParamProd.clientId;
    ressource['client_secret']=LoginParamProd.clientSecret;
    ressource['scope']=LoginParamProd.scope;*/

    return this.http.post<any>(`${this.url2}api/login`, ressource,
     ConfigService.httpHeader(null,true));
  }

  sendMail(ressource:any){
    return this.http.post<any>(`${this.url2}api/forgot-password`, ressource,
     ConfigService.httpHeader(null,true));
  }


  
  update(ressource:any){
    return this.http.post<any>(`${this.url2}api/user-update`, ressource,ConfigService.addAction('edit'));
  }

  recoverPassword(ressource:any){
    return this.http.post<any>(`${this.url2}api/recovery-password`, ressource,
     ConfigService.httpHeader(null,true));
  }


  logout(){
    return this.http.get<any>(`${this.url}`);
  }

  changePassword(ressource:any){

    return this.http.post<any>(`${this.url2}api/change-password`, ressource,ConfigService.addAction('edit'));
    }
    changeFirstPassword(ressource:any){

    return this.http.post<any>(`${this.url2}api/change-first-password`, ressource,
    ConfigService.httpHeader(null,true));
    }

    saveDB(){

      return this.http.get<any>(`${this.url2}api/save-db`,ConfigService.addAction('add'));
      }

      getBackups(){

        return this.http.get<any>(`${this.url2}api/backups`,ConfigService.addAction('list'));
        }
}
