// ============================================================
// LOCATION & MACHINE DOMAIN TYPES
// ============================================================

export interface Location {
  id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  postalCode: string;
  latitude: number;
  longitude: number;
  machinesCount: number;
  active: boolean;
  partnerId?: string;
  partnerName?: string; // denormalized for display
  category: "office" | "gym" | "hospital" | "university" | "coworking" | "mall" | "other";
  operatingHours: string; // e.g. "Mon-Fri 8AM-8PM"
  imageUrl?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Machine {
  id: string;
  locationId: string;
  machineCode: string;
  model: string; // e.g. "Elevend Multivend 22"
  productCapacity: Record<string, number>; // { "total": 500, "refrigerated": 500 }
  lastRestocked: string | null;
  status: "active" | "inactive" | "maintenance";
  temperatureRangeMin: number; // in Celsius
  temperatureRangeMax: number;
  touchscreenSize: string; // e.g. "22 inch"
  powerWatts: number;
  dimensionsH: number; // in mm
  dimensionsW: number;
  dimensionsD: number;
  weightKg: number;
  paymentMethods: string[]; // ["UPI", "Card", "Wallet"]
  features: string[];
  createdAt: string;
  updatedAt: string;
}

export interface MachineWithLocation extends Machine {
  location: Location;
}

// ============================================================
// INVENTORY DOMAIN TYPES
// ============================================================

export interface InventoryCycle {
  id: string;
  machineId: string;
  date: string; // ISO date string
  inventoryTheme: string; // e.g. "Immunity Week", "Protein Monday"
  notes?: string;
  createdAt: string;
}

export interface InventoryItem {
  id: string;
  cycleId: string;
  productId: string;
  quantityLoaded: number;
  quantitySold: number;
  spoilageQuantity: number;
  createdAt: string;
  updatedAt: string;
}

export interface InventoryCycleWithItems extends InventoryCycle {
  items: (InventoryItem & { productName: string })[];
}
