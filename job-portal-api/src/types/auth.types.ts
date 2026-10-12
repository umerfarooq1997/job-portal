export interface AuthenticatedUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: "candidate" | "employee" | "admin";
  isVerified: boolean;
}
