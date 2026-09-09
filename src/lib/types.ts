/**
 * Unified EquipmentItem type used across gearlink-app components and mock data.
 */
export interface EquipmentItem {
  id: number;
  name: string;
  cat: string;
  loc: string;
  price: number;
  owner: string;
  rating: number;
  reviews: number;
  status: "Available" | "Booked" | "Maintenance";
  img3d?: string;
}

export interface BookingRequest {
  id: string;
  equipmentId: number;
  equipmentName: string;
  renterName: string;
  renterPhone: string;
  purpose: string;
  siteAddress: string;
  totalAmount: number;
  rentalDays: number;
  submittedAt: string;
  status: "Pending" | "Approved" | "Rejected";
}

export type UserRole = "owner" | "renter" | "agent" | "gov";
