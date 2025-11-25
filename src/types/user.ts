export interface User{
    id: number;
    username: string;
    email: string;
    first_name: string;
    last_name: string;
    phone_number?: string;
    is_active: boolean;
    is_staff: boolean;
    date_joined: string;
}