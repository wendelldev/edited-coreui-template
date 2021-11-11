import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(
    private http: HttpClient
  ) { }

  registerUser(user: any) {
    return this.http.post(environment.apiUrl + '/users', user)
  }

  getAllUser() {
    return this.http.get(environment.apiUrl + '/users')
  }
}
