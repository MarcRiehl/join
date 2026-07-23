export interface Contact {
  id?: number;
  created_at?: string;
  firstname: string;
  lastname: string;
  email: string;
  phone?: string | number;
  initials?: string;
  colors?: string;
  authUserId?: string;
}
