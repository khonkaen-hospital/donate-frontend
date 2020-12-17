import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(
    @Inject('API_URL') private apiUrl: string,
    private http: HttpClient
  ) {
    this.apiUrl += '/donate/'
  }

  cashData(data: any): Observable<any> {
    return this.http.post(this.apiUrl + `cash`, { data });
  }

  chattelData(data: any): Observable<any> {
    return this.http.post(this.apiUrl + `chattel`, { data });
  }

  cashDonateMonth(id: number): Observable<any> {
    return this.http.get(this.apiUrl + `cash-month/` + id);
  }

  cashFilter(data: any): Observable<any> {
    return this.http.post(this.apiUrl + `cash-name-filter`, { data });
  }

}
