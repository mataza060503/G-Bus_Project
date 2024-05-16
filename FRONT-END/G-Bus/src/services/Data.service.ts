import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, retry, throwError } from 'rxjs';
import { FeedbackItem, PartnerPromotion, PromotionItem, RouteItem } from '../models/Item';
import { Amenities, BookedTicket, Bus, Driver, Invoice, OrderTicket, PassengerInfo, PostBookedTicket, RawOrderTicket, RawTicket, Route, UserInfo, Voucher } from '../models/ticket';

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
getTicket(ticketId: string):Observable<any> {
  const headers=new HttpHeaders().set("Content-Type","application/json;charset=utf8")
  const requestOptions:Object={
    headers:headers,
    responseType:"text",
  } 
  return this._http.get<any>(this.API+"/ticket/"+ticketId,requestOptions).pipe(
    map(res=> JSON.parse(res) as RawTicket),
    retry(3),
    catchError(this.handleError)
  )
}

postInvoice(orderId: string, invoice: Invoice):Observable<any> {
  const headers=new HttpHeaders().set("Content-Type","application/json;charset=utf8")
  const requestOptions:Object={
    headers:headers,
    responseType:"text",
  } 
  return this._http.post<any>(this.API+"/invoice/"+orderId,JSON.stringify(invoice),requestOptions).pipe(
    map(res=> res as string),
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
    map(res=> JSON.parse(res)),
    retry(3),
    catchError(this.handleError)
  )
}
getAllOrderByStatus(accountId: string, status: string):Observable<any> {
  const headers=new HttpHeaders().set("Content-Type","application/json;charset=utf8")
  const requestOptions:Object={
    headers:headers,
    responseType:"text"
  } 
  return this._http.post<any>(this.API+"/getOrder",JSON.stringify({"accountId":accountId,"status":status}),requestOptions).pipe(
    map(res=> JSON.parse(res) as RawOrderTicket),
    retry(3),
    catchError(this.handleError)
  )
}

getOrderUnPaid(orderId: string):Observable<any> {
  const headers=new HttpHeaders().set("Content-Type","application/json;charset=utf8")
  const requestOptions:Object={
    headers:headers,
    responseType:"text"
  } 
  return this._http.get<any>(this.API+"/getOrder/"+orderId,requestOptions).pipe(
    map(res=> JSON.parse(res) as RawOrderTicket),
    retry(3),
    catchError(this.handleError)
  )
}

getBookedTicket(ticketId: string):Observable<any> {
  const headers=new HttpHeaders().set("Content-Type","application/json;charset=utf8")
  const requestOptions:Object={
    headers:headers,
    responseType:"text"
  } 
  return this._http.post<any>(this.API+"/getBookedTicket",JSON.stringify({"ticketId":ticketId}),requestOptions).pipe(
    map(res=> JSON.parse(res) as PostBookedTicket),
    retry(3),
    catchError(this.handleError)
  )
}

patchOrderStatus(orderId: string, status: string):Observable<any> {
  const headers=new HttpHeaders().set("Content-Type","application/json;charset=utf8")
  const requestOptions:Object={
    headers:headers,
    responseType:"text"
  } 
  return this._http.patch<any>(this.API+"/order",JSON.stringify({"orderId":orderId, "status": status}),requestOptions).pipe(
    map(res=> res as String),
    retry(3),
    catchError(this.handleError)
  )
}

patchInvoice(orderId: string, invoiceId: string, status: string):Observable<any> {
  const headers=new HttpHeaders().set("Content-Type","application/json;charset=utf8")
  const requestOptions:Object={
    headers:headers,
    responseType:"text"
  } 
  return this._http.patch<any>(this.API+"/invoice",JSON.stringify({"orderId":orderId, "invoiceId": invoiceId, "status": status}),requestOptions).pipe(
    map(res=> res as String),
    retry(3),
    catchError(this.handleError)
  )
}

getInvoice(invoiceId: string):Observable<any> {
  const headers=new HttpHeaders().set("Content-Type","application/json;charset=utf8")
  const requestOptions:Object={
    headers:headers,
    responseType:"text",
  } 
  return this._http.get<any>(this.API+"/invoice/"+invoiceId,requestOptions).pipe(
    map(res=> JSON.parse(res) as Invoice),
    retry(3),
    catchError(this.handleError)
  )
}

getAllVoucher():Observable<any> {
  const headers=new HttpHeaders().set("Content-Type","application/json;charset=utf8")
  const requestOptions:Object={
    headers:headers,
    responseType:"text"
  } 
  return this._http.get<any>(this.API+"/voucher",requestOptions).pipe(
    map(res=> JSON.parse(res) as Voucher[]),
    retry(3),
    catchError(this.handleError)
  )
}

postAccount(phoneNumber: string, password: string, userId: string):Observable<any> {
  const headers=new HttpHeaders().set("Content-Type","application/json;charset=utf8")
  const requestOptions:Object={
    headers:headers,
    responseType:"text"
  } 
  return this._http.post<any>(this.API+"/account",JSON.stringify({"phoneNumber": phoneNumber, "password": password, "userId": userId}),requestOptions).pipe(
    map(res=> res as string),
    retry(3),
    catchError(this.handleError)
  )
}

postAccountInfo(userId: string, userInfo: UserInfo):Observable<any> {
  const headers=new HttpHeaders().set("Content-Type","application/json;charset=utf8")
  const requestOptions:Object={
    headers:headers,
    responseType:"text"
  } 
  return this._http.post<any>(this.API+"/account/"+userId,JSON.stringify(userInfo),requestOptions).pipe(
    map(res=> res as string),
    retry(3),
    catchError(this.handleError)
  )
}

getAccountInfo(userId: string):Observable<any> {
  const headers=new HttpHeaders().set("Content-Type","application/json;charset=utf8")
  const requestOptions:Object={
    headers:headers,
    responseType:"text"
  } 
  return this._http.get<any>(this.API+"/account/"+userId,requestOptions).pipe(
    map(res=> JSON.parse(res) as UserInfo),
    retry(3),
    catchError(this.handleError)
  )
}

checkExistAccount(phoneNumber: string):Observable<any> {
  const headers=new HttpHeaders().set("Content-Type","application/json;charset=utf8")
  const requestOptions:Object={
    headers:headers,
    responseType:"text"
  } 
  return this._http.get<any>(this.API+"/checkAccount/"+phoneNumber,requestOptions).pipe(
    map(res=> res as string),
    retry(3),
    catchError(this.handleError)
  )
}

checkExistUserId(userId: string):Observable<any> {
  const headers=new HttpHeaders().set("Content-Type","application/json;charset=utf8")
  const requestOptions:Object={
    headers:headers,
    responseType:"text"
  } 
  return this._http.get<any>(this.API+"/checkUserId/"+userId,requestOptions).pipe(
    map(res=> res as string),
    retry(3),
    catchError(this.handleError)
  )
}

checkPassword(password: string):Observable<any> {
  const headers=new HttpHeaders().set("Content-Type","application/json;charset=utf8")
  const requestOptions:Object={
    headers:headers,
    responseType:"text"
  } 
  return this._http.post<any>(this.API+"/checkPassword",{"password": password},requestOptions).pipe(
    map(res=> res as string),
    retry(3),
    catchError(this.handleError)
  )
}
patchPassword(phoneNumber: string, password: string):Observable<any> {
  const headers=new HttpHeaders().set("Content-Type","application/json;charset=utf8")
  const requestOptions:Object={
    headers:headers,
    responseType:"text"
  } 
  return this._http.patch<any>(this.API+"/password",{"phoneNumber": phoneNumber, "password": password},requestOptions).pipe(
    map(res=> res as string),
    retry(3),
    catchError(this.handleError)
  )
}

handleError(error:HttpErrorResponse){
  return throwError(()=>new Error(error.message))
}


}
