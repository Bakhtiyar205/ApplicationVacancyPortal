import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})


export class HttpsService {


  headers   = new HttpHeaders().set('Content-type', 'application/json');
  post_headers = new HttpHeaders().set('Content-type', 'application/json');
  constructor() { }

  public rootUrl: string = 'http://' + environment.host;

  get(http: HttpClient, resourceUrl: string, params: any = {}): Observable<any> {
    return http.get<Response>(this.rootUrl + resourceUrl, {
      params: params,
    });
  }

  getDocument(http: HttpClient, resourceUrl: string, params: any = {}): Observable<any> {
    return http.get<Response>(this.rootUrl + resourceUrl, {
      params: params,
    });
  }


  post(http: HttpClient, resourceUrl: string, item: any, params: any = {}): Observable<any> {
    return http.post<Response>(this.rootUrl + resourceUrl, item, {
      params: params,
    });
  }



  put(http: HttpClient, resourceUrl: string, item: any, params: any = {}): Observable<any> {
    return http.put<Response>(this.rootUrl + resourceUrl, item, {
      params: params,
    });
  }

  delete(http: HttpClient, resourceUrl: string, params: any = {}): Observable<any> {
    return http.delete<Response>(this.rootUrl + resourceUrl, {
      params: params
    });
  }
}