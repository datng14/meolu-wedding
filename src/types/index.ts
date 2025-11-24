export interface RSVPForm {
  name: string;
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

export interface Guest {
  id: string;
  name: string;
  status: 0 | 1; // 0: not sent/not opened (default), 1: received and opened
  receivedAt?: Date;
  createdAt?: Date;
}
