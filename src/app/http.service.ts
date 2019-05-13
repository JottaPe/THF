import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HelloWorldComponent } from './hello-world/hello-world.component';
import { headersToString } from 'selenium-webdriver/http';

@Injectable()
export class HttpService {

  configUrl = 'http://localhost:56758/api/contatoes';

  // Método GET 
  getContatos() {
    return this.http.get(this.configUrl);
  }
  
  // Método PUT de inclusão 
  postContatos(object): Observable<any> {
    const httpOptions ={
      headers : new HttpHeaders({'Content-Type':'application/json'})
    }

    return this.http.post(this.configUrl, object , httpOptions);
  }

  // Método PUT de inclusão 
  putContatos(object): Observable<any> {
    const httpOptions ={
      headers : new HttpHeaders({'Content-Type':'application/json'})
    }
    return this.http.put(this.configUrl+'/'+String(object.id),object, httpOptions);
  }

  
  // Método DELET de exclusão 
  delContatos(object): Observable<any> {
    const httpOptions ={
      headers : new HttpHeaders({'Content-Type':'application/json'})
    }
    return this.http.delete(this.configUrl+'/'+String(object.id),httpOptions);
  }

  constructor(private http: HttpClient) { }
}
