export type Day = {
  id: string;
  date: string;
  title: string;
  morning: string;
  afternoon: string;
  evening: string;
  transport: string;
  image?: string;
};

export type Hotel = {
  name: string;
  checkIn: string;
  checkOut: string;
  nights: number;
  city: string;
};

export type Payment = {
  id: string;
  amount: string;
  due: string;
  description: string;
};

export type Flight = {
  id: string;
  date: string;
  flightNumber: string;
  airline: string;
  from: string;
  to: string;
  fromCode?: string;
  toCode?: string;
};

export type Activity = {
  id: string;
  city: string;
  name: string;
  type: string;
  timeRequired: string;
};

export type Inclusion = {
  id: string;
  category: string;
  count: string;
  details: string;
  status: string;
};

export type ItineraryData = {
  title: string;
  travellers: number;
  duration: string;
  departureFrom: string;
  departureDate: string;
  arrivalDate: string;
  destination: string;
  customerName: string;
  days: Day[];
  hotel: Hotel[];
  payments: Payment[];
  flights?: Flight[];
  activities?: Activity[];
  inclusionsList?: Inclusion[];
  inclusions: string;
  exclusions: string;
  totalAmount: string;
  tcs: string;
};
