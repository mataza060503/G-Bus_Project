import { FeedbackItem } from "./Item"

export interface RawTicket {
  _id: string,
  DTime: string,
  ATime: string,
  DOffice: string,
  AOffice: string,
  Date: string,
  Seat: any[], // Assuming Seat can be an array of any type
  Route: string,
  Reviews: string[],
  Amenities: string[],
  Bus: string,
  Price: number,
  Image: string,
  Driver: string[]
}

export interface Ticket {
  Ticket: RawTicket,
  Route: Route,
  Reviews: FeedbackItem[],
  Amenities: Amenities[],
  Bus: Bus,
  Driver: Driver[]
}

export interface BookedTicket {
  Ticket: string,
  Date: string,
  State: string,
  Seat: string[],
  Subtotal: number,
  PickUpLocation: Point,
  DropOffLocation: Point,
  PickUpTime: string,
  DropOffTime: string,
  Status: string,
  Passenger: PassengerInfo,
  BusType: string,
  DLocation: string,
  ALocation: string,
  Image: string,
  PickUpPoints: Point[],
  DropOffPoints: Point[]
}

export interface PostBookedTicket {
  Ticket: string,
  State: string,
  Seat: string[],
  Subtotal: number,
  PickUpLocation: Point,
  DropOffLocation: Point,
}

export interface OrderTicket {
  PassengerInfo: PassengerInfo,
  Status: string,
  CustomerId: string,
  Departure: String;
  Return: String;
  BookedTime: Date;
  TransactionNumber: String;
}

export interface Route {
  _id: string;
  DLocation: string;
  ALocation: string;
  PickUpPoints: Point[];
  DropOffPoints: Point[];
}

export interface PassengerInfo {
  Account: string,
  FullName: string,
  PhoneNumber: string,
  Email: string
}

export interface Point {
  Point: string;
  Address: string;
  Time: number;
  ShuttleBus: boolean;
}

export interface Amenities {
  _id: string,
  Title: string,
  Description: string,
  Image: string
}

export interface Bus {
  _id: string,
  Name: string,
  Image: string[],
  Tag: Tag[],
  Description: string,
  Seat: number
}

export interface Driver {
  _id: string;
  Name: string;
  Avatar: string;
  PhoneNumber: string;
  License: string;
  TravelTrip: number;
  Hours: number;
  Rating: number[];
  
}

export interface Tag {
  Image: string,
  Text: string
}
