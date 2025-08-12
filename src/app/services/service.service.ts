import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  public baseUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }

  login(data): Observable<HttpResponse<any>> {
    return this.http.post(this.baseUrl + '/login', data, { observe: 'response' })
  }
}
