export interface RSVPForm {
  name: string;
  phone: string;
  attending: 'yes' | 'no';
  guests?: number;
  message?: string;
  submittedAt: Date;
}

export interface GuestbookMessage {
  id?: string;
  name: string;
  message: string;
  submittedAt: Date;
}
