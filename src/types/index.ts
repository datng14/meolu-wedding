export interface RSVPForm {
  name: string;
  phone: string;
  vegan: 'yes' | 'no';
  attending: 'yes' | 'no';
  guests?: number;
  message?: string;
  submittedAt: Date;
}

export interface RSVP extends RSVPForm {
  id: string;
}

export interface GuestbookMessage {
  id?: string;
  name: string;
  message: string;
  submittedAt: Date;
}
