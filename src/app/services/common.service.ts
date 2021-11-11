import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(
    private http: HttpClient
  ) { }

  getPaginatedData(url: string, params: any = {
    page: 0,
    limit: 10,
  }) {
    return this.http.get(url, { params });
  }

  getDashboardData() {
    return this.http.get(environment.apiUrl + '/dashboard')
  }
}
