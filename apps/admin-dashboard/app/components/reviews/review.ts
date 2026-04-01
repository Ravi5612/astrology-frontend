export interface Review {
  id: number;
  user: string;
  expert: string;
  rating: number;
  comment: string;
  date: string;
  status: "approved" | "pending" | "flagged";
  avatar: string;
}



