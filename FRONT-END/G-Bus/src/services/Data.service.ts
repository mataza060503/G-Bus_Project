import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, retry, throwError } from 'rxjs';
import { FeedbackItem, PartnerPromotion, PromotionItem, RouteItem } from '../models/Item';
import { Amenities, BookedTicket, Bus, Driver, OrderTicket, PassengerInfo, PostBookedTicket, RawTicket, Route } from '../models/ticket';

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

//Booking Service 
getRawTicket(DLocation:string, ALocation: string, DDate: string):Observable<any> {
  const headers=new HttpHeaders().set("Content-Type","application/json;charset=utf8")
  const requestOptions:Object={
    headers:headers,
    responseType:"text",
  } 
  return this._http.post<any>(this.API+"/ticket",{"DLocation":DLocation,"ALocation":ALocation,"DDate":DDate},requestOptions).pipe(
    map(res=> JSON.parse(res) as RawTicket[]),
    retry(3),
    catchError(this.handleError)
  )
}
getAllTicket():Observable<any> {
  const headers=new HttpHeaders().set("Content-Type","application/json;charset=utf8")
  const requestOptions:Object={
    headers:headers,
    responseType:"text",
  } 
  return this._http.post<any>(this.API+"/allTicket",requestOptions).pipe(
    map(res=> JSON.parse(res) as RawTicket[]),
    retry(3),
    catchError(this.handleError)
  )
}

getRouteWithPoints(route:string):Observable<any> {
  const headers=new HttpHeaders().set("Content-Type","application/json;charset=utf8")
  const requestOptions:Object={
    headers:headers,
    responseType:"text"
  } 
  return this._http.post<any>(this.API+"/routeWithPoints",JSON.stringify({"Route":route}),requestOptions).pipe(
    map(res=> JSON.parse(res) as Route[]),
    retry(3),
    catchError(this.handleError)
  )
}

getReviews(reviews:string[]):Observable<any> {
  const headers=new HttpHeaders().set("Content-Type","application/json;charset=utf8")
  const requestOptions:Object={
    headers:headers,
    responseType:"text"
  } 
  return this._http.post<any>(this.API+"/reviews",JSON.stringify({"Reviews":reviews}),requestOptions).pipe(
    map(res=> JSON.parse(res) as FeedbackItem[]),
    retry(3),
    catchError(this.handleError)
  )
}

getBus(id:string):Observable<any>{
  const headers=new HttpHeaders().set("Content-Type","application/json;charset=utf8")
  const requestOptions:Object={
    headers:headers,
    responseType:"text"
  } 
  return this._http.post<any>(this.API+"/bus",JSON.stringify({"Bus":id}),requestOptions).pipe(
    map(res=> JSON.parse(res) as Bus),
    retry(3),
    catchError(this.handleError)
  )
}

getAmenities(amenities:string[]):Observable<any>{
  const headers=new HttpHeaders().set("Content-Type","application/json;charset=utf8")
  const requestOptions:Object={
    headers:headers,
    responseType:"text"
  } 
  return this._http.post<any>(this.API+"/amenities",JSON.stringify({"Amenities":amenities}),requestOptions).pipe(
    map(res=> JSON.parse(res) as Amenities[]),
    retry(3),
    catchError(this.handleError)
  )
}

getDrivers(drivers:string[]):Observable<any>{
  const headers=new HttpHeaders().set("Content-Type","application/json;charset=utf8")
  const requestOptions:Object={
    headers:headers,
    responseType:"text"
  } 
  return this._http.post<any>(this.API+"/driver",JSON.stringify({"Driver":drivers}),requestOptions).pipe(
    map(res=> JSON.parse(res) as Driver[]),
    retry(3),
    catchError(this.handleError)
  )
}

// [POST] Save booked tickets
postBookedTickets(order: PostBookedTicket):Observable<any> {
  const headers=new HttpHeaders().set("Content-Type","application/json;charset=utf8")
  const requestOptions:Object={
    headers:headers,
    responseType:"text"
  } 
  return this._http.post<any>(this.API+"/bookedTicket",JSON.stringify(order),requestOptions).pipe(
    map(res=> JSON.parse(res) as string),
    retry(3),
    catchError(this.handleError)
  )
}
postOrder(order: OrderTicket):Observable<any> {
  const headers=new HttpHeaders().set("Content-Type","application/json;charset=utf8")
  const requestOptions:Object={
    headers:headers,
    responseType:"text"
  } 
  return this._http.post<any>(this.API+"/order",JSON.stringify(order),requestOptions).pipe(
    map(res=> JSON.parse(res) as string),
    retry(3),
    catchError(this.handleError)
  )
}

handleError(error:HttpErrorResponse){
  return throwError(()=>new Error(error.message))
}


}
