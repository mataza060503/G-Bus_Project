export interface SelectItem {
  value: string,
  viewValue:string
}
export interface SearchItem {
  DLocation: string,
  ALocation: string,
  DDate: Date,
  RDate: Date
}
export interface LocalData {
  contryPort: [],
  provinces: SelectItem[],
}

export interface RouteItem {
  _id: string,
  DLocation: string,
  ALocation: string,
  Price: number,
  Discount:number,
  Image: string
}

export interface PromotionItem {
  _id: string,
  DLocation: string,
  ALocation: string,
  Price: number,
  Discount:number,
  Expire: string
}

export interface PartnerPromotion {
  _id: string,
  Title: string,
  Image: string
}

export interface FeedbackItem {
  _id: string,
  CustomerName: string,
  Avatar: string,
  TotalTrip: number,
  Destination: number,
  Tag: string[],
  Feedback: string,
  Image: string[],
  Rating: number
}

export interface SlideItem {
  Item: FeedbackItem,
  CurrentPercent: number,
  Percent: number
}

