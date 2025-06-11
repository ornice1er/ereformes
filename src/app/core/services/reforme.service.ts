import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigService } from '../utils/config-service';
import { GlobalName } from '../utils/global-name';

@Injectable({
  providedIn: 'root'
})
export class ReformeService {
  url=ConfigService.toApiUrl("reformes/");

  constructor(private http:HttpClient) { }

 getAll(isPaginate=false,per_page?:any,page?:any){
    if (isPaginate) {
          return this.http.get<any[]>(`${this.url}?per_page=${per_page}&page=${page}`,ConfigService.addAction('list'));

    }else{
          return this.http.get<any[]>(`${this.url}`,ConfigService.addAction('list'));
    }
  }
  getCurrent(isPaginate=false,per_page?:any,page?:any){

     if (isPaginate) {
          return this.http.get<any[]>(`${this.url}users/get-suivi-result?per_page=${per_page}&page=${page}`,ConfigService.addAction('list'));

    }else{
          return this.http.get<any[]>(`${this.url}users/get-suivi-result`,ConfigService.addAction('list'));
    }
  }
  getMyList(isPaginate=false,per_page?:any,page?:any){
     if (isPaginate) {
          return this.http.get<any[]>(`${this.url}users/get-suivi-result?per_page=${per_page}&page=${page}`,ConfigService.addAction('list'));

    }else{
          return this.http.get<any[]>(`${this.url}users/get-suivi-result`,ConfigService.addAction('list'));
    }
  }
  getSuiviResult(isPaginate=false,per_page?:any,page?:any){
     if (isPaginate) {
          return this.http.get<any[]>(`${this.url}users/get-suivi-result?per_page=${per_page}&page=${page}`,ConfigService.addAction('list'));

    }else{
          return this.http.get<any[]>(`${this.url}users/get-suivi-result`,ConfigService.addAction('list'));
    }
  }
  publish(id:any){
    return this.http.get<any[]>(`${this.url}state/publish/${id}`);
  }
  unpublish(id:any){
    return this.http.get<any[]>(`${this.url}state/unpublish/${id}`);
  }

  store(ressource:any){
    return this.http.post<any>(`${this.url}`, ressource,
     ConfigService.httpHeader(localStorage.getItem(GlobalName.tokenName),true));
  }

  update(id:any,ressource:any){
    //ressource['method']='_patch';

    return this.http.put<any>(`${this.url}${id}/`, ressource,  ConfigService.httpHeader(localStorage.getItem(GlobalName.tokenName),true));
  }
  delete(id:any){
   // ressource['method']='delete';
    return this.http.delete<any>(`${this.url}${id}`,
     ConfigService.httpHeader(localStorage.getItem(GlobalName.tokenName),true));
  }

  get(id:any){
    return this.http.get<any>(`${this.url}${id}`,
     ConfigService.httpHeader(localStorage.getItem(GlobalName.tokenName),true));
  }
    search(resource:any){
    return this.http.post<any>(`${this.url}-search`,resource,
     ConfigService.addAction('status'));
  }
}
