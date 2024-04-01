import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { LocalData } from '../models/Item';

@Injectable({
  providedIn: 'root'
})
export class LocalDataService {

constructor(private http: HttpClient) { }

getLocalData(): Observable<any> {
  return this.http.get<any>('assets/data/data.json');
}

}
