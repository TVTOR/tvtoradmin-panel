import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { StorageService } from './storage.service';


@Injectable({
  providedIn: 'root'
})

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  public baseUrl = environment.apiUrl;

  constructor(
    private http: HttpClient,
    private router: Router,
    private storageService: StorageService
  ) {
  }
  loginUser(data): Observable<any> {
    return this.http.post(this.baseUrl + '/login', data, { observe: 'response' })
  }
  emailSend(data): Observable<any> {
    return this.http.post(this.baseUrl + '/forgotpassword', data);
  }


  deleteUser(id: any): Observable<any> {
    var sessionData = this.storageService.loadSessionData();
    let headers = new HttpHeaders({ 'Content-Type': 'application/json', "Authorization": sessionData.token });
    const params = new HttpParams()
      .set('id', id)
    return this.http.delete(this.baseUrl + '/user/' + id, { params, headers: headers });
  }


  resetPassword(data, id: any): Observable<any> {
    var sessionData = this.storageService.loadSessionData();
    let headers = new HttpHeaders({ 'Content-Type': 'application/json', "Authorization": sessionData.token });
    const params = new HttpParams()
      .set('id', id)
    return this.http.post(this.baseUrl + '/resetpassword/' + id, data, { params, headers: headers });
  }

  changeStatus(id: any): Observable<any> {
    var sessionData = this.storageService.loadSessionData();
    let headers = new HttpHeaders({ 'Content-Type': 'application/json', "Authorization": sessionData.token });
    return this.http.put(this.baseUrl + '/changeuserstatus/' + id, {}, { headers: headers });
  }

  deleteStatus(id: any): Observable<any> {
    var sessionData = this.storageService.loadSessionData();
    let headers = new HttpHeaders({ 'Content-Type': 'application/json', "Authorization": sessionData.token });
    const params = new HttpParams()
      .set('id', id)
    return this.http.put(this.baseUrl + '/userdelete/' + id, {}, { params, headers: headers });
  }

  getTutors(data): Observable<any> {
    var sessionData = this.storageService.loadSessionData();
    let headers = new HttpHeaders({ 'Content-Type': 'application/json', "Authorization": sessionData.token });
    data.searchdata = data.search.value;
    data.column = data.order[0].column;
    data.dir = data.order[0].dir;
    return this.http.get(this.baseUrl + '/managers', { params: data, headers: headers });
  }

  getTutorsManagers(data): Observable<any> {
    var sessionData = this.storageService.loadSessionData();
    let headers = new HttpHeaders({ 'Content-Type': 'application/json', "Authorization": sessionData.token });
    data.searchdata = data.search.value;
    data.column = data.order[0].column;
    data.dir = data.order[0].dir;
    return this.http.get(this.baseUrl + '/getallTManager', { params: data, headers: headers });
  }

  getSingleTutor(id: any): Observable<any> {
    var sessionData = this.storageService.loadSessionData();
    let headers = new HttpHeaders({ 'Content-Type': 'application/json', "Authorization": sessionData.token });
    const params = new HttpParams()
      .set('id', id)
    return this.http.get(this.baseUrl + '/user/' + id, { headers: headers });
  }

  getAllTutorOfManagers(data, id: any): Observable<any> {
    var sessionData = this.storageService.loadSessionData();
    let headers = new HttpHeaders({ 'Content-Type': 'application/json', "Authorization": sessionData.token });
    data.searchdata = data.search.value;
    data.column = data.order[0].column;
    data.dir = data.order[0].dir;
    return this.http.get(this.baseUrl + '/getAllTutorsOfManager/' + id, { params: data, headers: headers });
  }

  userLogout(id: any): Observable<any> {
    const params = new HttpParams()
      .set('id', id)
    return this.http.delete(this.baseUrl + '/user/logout/' + id, { params });
  }

  addSubject(data: any): Observable<any> {
    var sessionData = this.storageService.loadSessionData();
    let headers = new HttpHeaders({ 'Content-Type': 'application/json', "Authorization": sessionData.token });
    return this.http.post(this.baseUrl + '/subject', data, { observe: 'response', headers: headers })
  }

  editSubject(data: any, id: any): Observable<any> {
    var sessionData = this.storageService.loadSessionData();
    let headers = new HttpHeaders({ 'Content-Type': 'application/json', "Authorization": sessionData.token });
    return this.http.put(this.baseUrl + '/subject/' + id, data, { observe: 'response', headers: headers })
  }

  getSingleSubject(id: any): Observable<any> {
    var sessionData = this.storageService.loadSessionData();
    let headers = new HttpHeaders({ 'Content-Type': 'application/json', "Authorization": sessionData.token });
    return this.http.get(this.baseUrl + '/subject/' + id, { observe: 'response', headers: headers })
  }

  getAllSubjects(data): Observable<any> {
    var sessionData = this.storageService.loadSessionData();
    let headers = new HttpHeaders({ 'Content-Type': 'application/json', "Authorization": sessionData.token });
    data.searchdata = data.search.value;
    data.column = data.order[0].column;
    data.dir = data.order[0].dir;
    return this.http.get(this.baseUrl + '/subject', { params: data, headers: headers });
  }

  deleteSubject(id: any): Observable<any> {
    var sessionData = this.storageService.loadSessionData();
    let headers = new HttpHeaders({ 'Content-Type': 'application/json', "Authorization": sessionData.token });
    const params = new HttpParams()
      .set('id', id)
    return this.http.delete(this.baseUrl + '/subject/' + id, { params, headers: headers });
  }

  deleteLocation(id: any): Observable<any> {
    var sessionData = this.storageService.loadSessionData();
    let headers = new HttpHeaders({ 'Content-Type': 'application/json', "Authorization": sessionData.token });
    const params = new HttpParams()
      .set('id', id)
    return this.http.delete(this.baseUrl + '/location/' + id, { params, headers: headers });
  }

  addLocation(data): Observable<any> {
    var sessionData = this.storageService.loadSessionData();
    let headers = new HttpHeaders({ 'Content-Type': 'application/json', "Authorization": sessionData.token });
    return this.http.post(this.baseUrl + '/location', data, { observe: 'response', headers: headers })
  }

  editLocation(data: any, id: any): Observable<any> {
    var sessionData = this.storageService.loadSessionData();
    let headers = new HttpHeaders({ 'Content-Type': 'application/json', "Authorization": sessionData.token });
    return this.http.put(this.baseUrl + '/location/' + id, data, { observe: 'response', headers: headers })
  }

  getAllLocations(data): Observable<any> {
    var sessionData = this.storageService.loadSessionData();
    let headers = new HttpHeaders({ 'Content-Type': 'application/json', "Authorization": sessionData.token });
    data.searchdata = data.search.value;
    data.column = data.order[0].column;
    data.dir = data.order[0].dir;
    return this.http.get(this.baseUrl + '/location', { params: data, headers: headers });
  }

  getSingleLocaion(id: any): Observable<any> {
    var sessionData = this.storageService.loadSessionData();
    let headers = new HttpHeaders({ 'Content-Type': 'application/json', "Authorization": sessionData.token });
    return this.http.get(this.baseUrl + '/location/' + id, { observe: 'response', headers: headers })
  }
}
