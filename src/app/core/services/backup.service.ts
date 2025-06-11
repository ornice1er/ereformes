import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigService } from '../utils/config-service';
import { GlobalName } from '../utils/global-name';

@Injectable({
  providedIn: 'root'
})
export class BackupService {

  url=ConfigService.toApiUrl("backups/");
  url2 :string =ConfigService.toFile('');

  constructor(private http:HttpClient) { }

 getAll(isPaginate=false,per_page?:any,page?:any){
    if (isPaginate) {
          return this.http.get<any[]>(`${this.url}?per_page=${per_page}&page=${page}`,ConfigService.addAction('list'));

    }else{
          return this.http.get<any[]>(`${this.url}`,ConfigService.addAction('list'));
    }
  }
 
  getByState(state:any){
    return this.http.get<any[]>(`${ConfigService.toApiUrl("backups-by-state")}/${state}`,ConfigService.addAction('list'));
  }

  store(ressource:any){
    return this.http.post<any>(`${this.url}`, ressource,
     ConfigService.addAction('add'));
  }

  update(id:any,ressource:any){
    ressource['_method']='patch';
    //ressource.append('_method','patch');

    return this.http.post<any>(`${this.url}${id}`, ressource,  ConfigService.addAction('edit'));
  }
  delete(id:any){
    return this.http.delete<any>(`${this.url}${id}`,
     ConfigService.addAction('delete'));
  }

  get(id:any){
    return this.http.get<any>(`${this.url}${id}`,
     ConfigService.addAction('show'));
  }

  setState(id:any,state:any){
    return this.http.get<any[]>(`${ConfigService.toApiUrl("backups-set-state")}/${id}/state/${state}`,ConfigService.addAction('status'));
  }
    search(resource:any){
    return this.http.post<any>(`${this.url}-search`,resource,
     ConfigService.addAction('status'));
  }

  
      saveDB(){
  
        return this.http.get<any>(`${this.url2}api/save-db`,ConfigService.addAction('add'));
        }
  
        getBackups(isPaginate=false,per_page?:any,page?:any){
  
            if (isPaginate) {
          return this.http.get<any[]>(`${this.url2}api/backups?per_page=${per_page}&page=${page}`,ConfigService.addAction('list'));

            }else{
                  return this.http.get<any[]>(`${this.url2}`,ConfigService.addAction('list'));
            }
      }
}
