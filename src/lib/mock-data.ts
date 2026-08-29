export const mockUsers = [
  {
    id: 'usr_1',
    name: 'Alice Owner',
    email: 'alice@example.com',
    role: 'EQUIPMENT_OWNER',
    phone: '+256700000001',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 'usr_2',
    name: 'Bob Renter',
    email: 'bob@example.com',
    role: 'RENTER',
    phone: '+256700000002',
    createdAt: new Date(),
    updatedAt: new Date(),
  }
];

export const mockEquipment = [
  {
    id: 'eq_1',
    ownerId: 'usr_1',
    name: 'John Deere Tractor 5050D',
    description: 'Heavy duty tractor suitable for plowing large agricultural fields.',
    category: 'Tractor',
    sector: 'Agriculture',
    location: 'Gulu, Uganda',
    dailyRate: 150000,
    status: 'AVAILABLE',
    images: [
      { id: 'img_1', url: 'https://images.unsplash.com/photo-1592982537447-6f2a6a0a03bb?auto=format&fit=crop&q=80&w=800', isPrimary: true }
    ],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 'eq_2',
    ownerId: 'usr_1',
    name: 'CAT 320 Excavator',
    description: 'Reliable excavator for construction and road maintenance.',
    category: 'Excavator',
    sector: 'Construction',
    location: 'Kampala, Uganda',
    dailyRate: 400000,
    status: 'RENTED',
    images: [
      { id: 'img_2', url: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&q=80&w=800', isPrimary: true }
    ],
    createdAt: new Date(),
    updatedAt: new Date(),
  }
];

export const mockBookings = [
  {
    id: 'bk_1',
    equipmentId: 'eq_2',
    renterId: 'usr_2',
    startDate: new Date(Date.now() + 86400000), // Tomorrow
    endDate: new Date(Date.now() + 86400000 * 4), // 4 days from now
    totalAmount: 1600000,
    status: 'CONFIRMED',
    createdAt: new Date(),
    updatedAt: new Date(),
  }
];

// Helper functions for frontend developers to simulate API/Repository calls
export const getMockEquipment = async () => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 500));
  return { success: true, data: mockEquipment };
};

export const getMockEquipmentById = async (id: string) => {
  await new Promise(resolve => setTimeout(resolve, 300));
  const equipment = mockEquipment.find(e => e.id === id);
  if (!equipment) return { success: false, error: { code: 'NOT_FOUND', message: 'Equipment not found' } };
  return { success: true, data: equipment };
};
