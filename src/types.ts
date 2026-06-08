export interface SizeOption {
  label: string; // e.g. "Tamanho P", "Tamanho M", "Tamanho G", "Tamanho Único"
  shortLabel: string; // e.g. "Tam. P", "Tam. M", "Tam. G", "Tam. Único"
  price: number;
  description?: string; // Specific content description for this size
  items?: string[]; // Detailed list of included items
}

export interface Product {
  id: string;
  name: string;
  tagline?: string;
  description: string;
  image: string;
  sizes: SizeOption[];
  badge?: string; // e.g., "Mais Pedida", "Especial Dia dos Namorados"
  isSpecial?: boolean; // Highlighted bento logic
}

export interface AddonItem {
  id: string;
  name: string;
  price: number;
  icon: string; // Lucide icon identifier (e.g. "Coffee", "Gift", "Beer")
}

export interface CartItem {
  id: string; // Unique combination of product ID and size
  product: Product;
  selectedSize: SizeOption;
  quantity: number;
  giftNote?: string;
}

export interface AddonCartItem {
  addon: AddonItem;
  quantity: number;
}

export interface OrderDetails {
  recipientName: string;
  senderName: string;
  contactPhone: string;
  serviceType: 'delivery' | 'pickup';
  deliveryAddress: string;
  deliveryNeighborhood: string;
  deliveryDate: string;
  deliveryTimeSlot: string;
  giftCardMessage: string;
  paymentMethod: 'pix' | 'transfer' | 'credit';
}
