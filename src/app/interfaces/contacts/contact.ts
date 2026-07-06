export interface Contact {
  id?: number;
  created_at?: string;
  user_firstname: string;
  user_lastname: string;
  user_mail: string;
  user_phone?: string;
}