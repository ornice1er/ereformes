import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigService } from '../utils/config-service';
import { GlobalName } from '../utils/global-name';

@Injectable({
  providedIn: 'root'
})
export class ObjectifService {
  url=ConfigService.toApiUrl("objectifs/");

  constructor(private http:HttpClient) { }

 getAll(isPaginate=false,per_page?:any,page?:any){
    if (isPaginate) {
          return this.http.get<any[]>(`${this.url}?per_page=${per_page}&page=${page}`,ConfigService.addAction('list'));

    }else{
          return this.http.get<any[]>(`${this.url}`,ConfigService.addAction('list'));
    }
  }
  getForObjectif(id:any){
    return this.http.get<any>(`${this.url}by-reforme/${id}`);
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
    return this.http.get<any>(`${this.url}`,
     ConfigService.httpHeader(localStorage.getItem(GlobalName.tokenName),true));
  }
    setStatus(id:any,status:any){
        return this.http.get<any>(`${this.url}/${id}/state/${status}`,
         ConfigService.addAction('status'));
      }

    search(resource:any){
    return this.http.post<any>(`${this.url}-search`,resource,
     ConfigService.addAction('status'));
  }
}
