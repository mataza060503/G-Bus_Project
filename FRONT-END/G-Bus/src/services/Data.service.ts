import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, retry, throwError } from 'rxjs';
import { FeedbackItem, PartnerPromotion, PromotionItem, RouteItem } from '../models/Item';

@Injectable({
  providedIn: 'root'
})
export class DataService {

API: string = "http://localhost:3000"

constructor(private _http: HttpClient) { }

getAllRoute():Observable<any> {
  const headers=new HttpHeaders().set("Content-Type","application/json;charset=utf8")
  const requestOptions:Object={
    headers:headers,
    responseType:"text",
  } 
  return this._http.get<any>(this.API+"/route",requestOptions).pipe(
    map(res=> JSON.parse(res) as RouteItem[]),
    retry(3),
    catchError(this.handleError)
  )
}

getAllPromotion():Observable<any> {
  const headers=new HttpHeaders().set("Content-Type","application/json;charset=utf8")
  const requestOptions:Object={
    headers:headers,
    responseType:"text",
  } 
  return this._http.get<any>(this.API+"/promotion",requestOptions).pipe(
    map(res=> JSON.parse(res) as PromotionItem[]),
    retry(3),
    catchError(this.handleError)
  )
}

getAllPartnerPromotion():Observable<any> {
  const headers=new HttpHeaders().set("Content-Type","application/json;charset=utf8")
  const requestOptions:Object={
    headers:headers,
    responseType:"text",
  } 
  return this._http.get<any>(this.API+"/partnerPromotion",requestOptions).pipe(
    map(res=> JSON.parse(res) as PartnerPromotion[]),
    retry(3),
    catchError(this.handleError)
  )
}

getAllFeedback():Observable<any> {
  const headers=new HttpHeaders().set("Content-Type","application/json;charset=utf8")
  const requestOptions:Object={
    headers:headers,
    responseType:"text",
  } 
  return this._http.get<any>(this.API+"/feedback",requestOptions).pipe(
    map(res=> JSON.parse(res) as FeedbackItem[]),
    retry(3),
    catchError(this.handleError)
  )
}

handleError(error:HttpErrorResponse){
  return throwError(()=>new Error(error.message))
}

}
