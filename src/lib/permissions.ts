export type Role = 'PLATFORM_ADMIN' | 'GOVERNANCE_OFFICER' | 'EQUIPMENT_OWNER' | 'RENTER' | 'YOUTH_AGENT';

export function hasPermission(userRole: Role, allowedRoles: Role[]): boolean {
  return allowedRoles.includes(userRole);
}
