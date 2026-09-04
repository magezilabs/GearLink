export type Role =
  | "PLATFORM_ADMIN"
  | "GOVERNANCE_OFFICER"
  | "EQUIPMENT_OWNER"
  | "RENTER"
  | "YOUTH_AGENT"
  | "owner"
  | "renter"
  | "agent"
  | "gov";

export function hasPermission(userRole: Role, allowedRoles: Role[]): boolean {
  return allowedRoles.includes(userRole);
}

export function getRoleDashboardPage(role: string): string {
  switch (role) {
    case "owner":
    case "EQUIPMENT_OWNER":
      return "owner";
    case "renter":
    case "RENTER":
      return "renter";
    case "agent":
    case "YOUTH_AGENT":
      return "agent";
    case "gov":
    case "GOVERNANCE_OFFICER":
      return "gov";
    default:
      return "marketplace";
  }
}

export function getRoleLabel(role: string): string {
  switch (role) {
    case "owner":
    case "EQUIPMENT_OWNER":
      return "Equipment Owner";
    case "renter":
    case "RENTER":
      return "Renter";
    case "agent":
    case "YOUTH_AGENT":
      return "Youth Agent";
    case "gov":
    case "GOVERNANCE_OFFICER":
      return "Governance Officer";
    default:
      return "User";
  }
}

export function canAccessPage(userRole: string, page: string): boolean {
  if (["marketplace", "detail", "booking"].includes(page)) {
    return true;
  }
  const roleDashboard = getRoleDashboardPage(userRole);
  return page === roleDashboard;
}

