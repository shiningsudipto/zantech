export interface TOrder {
  user_name: string;
  user_phone: string;
  user_email: string;
  order_id: number;
  invoice_code: string;
  status: string;
  total_amount: string;
  paid_amount: string;
  due_amount: number;
  order_placed_date_time: string;
}
