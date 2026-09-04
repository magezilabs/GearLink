export interface EquipmentItem {
  id: string;
  ownerId: string;
  name: string;
  description: string;
  category: string;
  sector: 'Agriculture' | 'Construction' | 'Mining' | 'Transport' | 'Power & Energy' | 'Creative & Media';
  location: string;
  dailyRate: number; // in UGX / USD
  status: 'AVAILABLE' | 'RENTED' | 'MAINTENANCE';
  rating: number;
  reviewsCount: number;
  specifications: { [key: string]: string };
  images: { id: string; url: string; isPrimary: boolean }[];
  createdAt: Date;
  updatedAt: Date;
}

export const mockUsers = [
  {
    id: 'usr_1',
    name: 'Alice Wanja',
    email: 'alice@gearlink.io',
    role: 'EQUIPMENT_OWNER',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
    phone: '+256 700 123 456',
    verified: true,
  },
  {
    id: 'usr_2',
    name: 'Bob Kato',
    email: 'bob@gearlink.io',
    role: 'RENTER',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200',
    phone: '+256 700 987 654',
    verified: true,
  },
  {
    id: 'usr_3',
    name: 'David Omondi',
    email: 'david@gearlink.io',
    role: 'EQUIPMENT_OWNER',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200',
    phone: '+256 750 444 555',
    verified: true,
  }
];

export const mockEquipment: EquipmentItem[] = [
  {
    id: 'eq_1',
    ownerId: 'usr_1',
    name: 'John Deere 5050D Utility Tractor',
    description: 'Heavy duty 50HP 4WD agricultural tractor equipped with disc harrow attachment. Ideal for large farm tillage and heavy transport.',
    category: 'Tractor',
    sector: 'Agriculture',
    location: 'Gulu, Northern Region',
    dailyRate: 150000,
    status: 'AVAILABLE',
    rating: 4.9,
    reviewsCount: 18,
    specifications: {
      'Horsepower': '50 HP',
      'Fuel Type': 'Diesel',
      'Transmission': '8 Forward + 4 Reverse',
      'Attachment': 'Disc Harrow included'
    },
    images: [
      { id: 'img_1', url: 'https://images.unsplash.com/photo-1592982537447-6f2a6a0a03bb?auto=format&fit=crop&q=80&w=800', isPrimary: true }
    ],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 'eq_2',
    ownerId: 'usr_1',
    name: 'CAT 320 Hydraulic Excavator',
    description: '20-ton tracked hydraulic excavator designed for high-performance digging, trenching, and site preparation in tough terrains.',
    category: 'Excavator',
    sector: 'Construction',
    location: 'Kampala Industrial Area',
    dailyRate: 450000,
    status: 'RENTED',
    rating: 4.8,
    reviewsCount: 32,
    specifications: {
      'Operating Weight': '22,500 kg',
      'Bucket Capacity': '1.2 m³',
      'Max Dig Depth': '6.72 m',
      'Operator': 'Certified operator included'
    },
    images: [
      { id: 'img_2', url: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&q=80&w=800', isPrimary: true }
    ],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 'eq_3',
    ownerId: 'usr_3',
    name: 'Perkins 150 kVA Silent Diesel Generator',
    description: 'Heavy duty three-phase mobile silent power generator with auto transfer switch (ATS). Perfect for construction sites and emergency backup.',
    category: 'Generator',
    sector: 'Power & Energy',
    location: 'Mbarara, Western Region',
    dailyRate: 180000,
    status: 'AVAILABLE',
    rating: 4.95,
    reviewsCount: 14,
    specifications: {
      'Prime Power Output': '150 kVA / 120 kW',
      'Voltage': '400V / 230V 50Hz',
      'Noise Level': '68 dBA @ 7m',
      'Fuel Tank': '350 Liters (18 hrs continuous)'
    },
    images: [
      { id: 'img_3', url: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&q=80&w=800', isPrimary: true }
    ],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 'eq_4',
    ownerId: 'usr_3',
    name: 'RED V-Raptor 8K VV Cinema Camera Package',
    description: 'Professional 8K full-frame cinema camera kit complete with Zeiss CP.3 prime lenses, wireless video transmitter, and V-mount battery rig.',
    category: 'Camera Kit',
    sector: 'Creative & Media',
    location: 'Entebbe / Kampala',
    dailyRate: 350000,
    status: 'AVAILABLE',
    rating: 5.0,
    reviewsCount: 9,
    specifications: {
      'Sensor': '35.4 MP CMOS VV',
      'Max Resolution': '8K @ 120fps',
      'Lenses': '25mm, 50mm, 85mm T2.1',
      'Monitors': '7" Touchscreen & Wireless Client Monitor'
    },
    images: [
      { id: 'img_4', url: 'https://images.unsplash.com/photo-1512790182412-b19e6d62bc39?auto=format&fit=crop&q=80&w=800', isPrimary: true }
    ],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 'eq_5',
    ownerId: 'usr_1',
    name: 'DJI Matrice 300 RTK Industrial Drone',
    description: 'Commercial thermal & RGB mapping drone with Zenmuse H20T quad-sensor payload. Includes RTK base station and high-accuracy GPS.',
    category: 'Drone',
    sector: 'Mining',
    location: 'Tororo, Eastern Region',
    dailyRate: 280000,
    status: 'AVAILABLE',
    rating: 4.7,
    reviewsCount: 11,
    specifications: {
      'Max Flight Time': '55 mins per set',
      'Payload': 'Thermal, 23x Zoom & Laser Rangefinder',
      'Transmission': '15 km HD OcuSync',
      'Pilot': 'Licensed drone pilot included'
    },
    images: [
      { id: 'img_5', url: 'https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&q=80&w=800', isPrimary: true }
    ],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 'eq_6',
    ownerId: 'usr_3',
    name: 'Scania R500 30-Ton Tipper Truck',
    description: 'Heavy duty 6x4 dump truck for aggregate, sand, and gravel hauling on civil engineering projects.',
    category: 'Truck',
    sector: 'Transport',
    location: 'Jinja, Eastern Region',
    dailyRate: 320000,
    status: 'AVAILABLE',
    rating: 4.85,
    reviewsCount: 21,
    specifications: {
      'Payload Capacity': '30,000 kg',
      'Engine Power': '500 HP V8',
      'Drive Line': '6x4 Heavy Axle',
      'Driver': 'Experienced haulage driver included'
    },
    images: [
      { id: 'img_6', url: 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&q=80&w=800', isPrimary: true }
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
    startDate: new Date(Date.now() + 86400000),
    endDate: new Date(Date.now() + 86400000 * 4),
    totalAmount: 1800000,
    status: 'CONFIRMED',
    createdAt: new Date(),
    updatedAt: new Date(),
  }
];

export const getMockEquipment = async () => {
  await new Promise(resolve => setTimeout(resolve, 300));
  return { success: true, data: mockEquipment };
};

export const getMockEquipmentById = async (id: string) => {
  await new Promise(resolve => setTimeout(resolve, 200));
  const equipment = mockEquipment.find(e => e.id === id);
  if (!equipment) return { success: false, error: { code: 'NOT_FOUND', message: 'Equipment not found' } };
  return { success: true, data: equipment };
};
