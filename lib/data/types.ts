export type ProjectCategory = "web" | "ecommerce" | "saas" | "uiux";

export type Project = {
  id: string;
  slug: string;
  titleAr: string;
  titleEn: string;
  descriptionAr: string;
  descriptionEn: string;
  longDescriptionAr: string | null;
  longDescriptionEn: string | null;
  category: ProjectCategory;
  tech: string[];
  imageUrl: string | null;
  demoUrl: string | null;
  repoUrl: string | null;
  featured: boolean;
  published: boolean;
  sortOrder: number;
  createdAt: string;
};

export type Service = {
  id: string;
  slug: string;
  titleAr: string;
  titleEn: string;
  descriptionAr: string;
  descriptionEn: string;
  icon: string;
  price: number;
  active: boolean;
  sortOrder: number;
};

export type SiteSettings = {
  nameAr: string;
  nameEn: string;
  titleAr: string;
  titleEn: string;
  bioAr: string;
  bioEn: string;
  email: string;
  whatsapp: string;
  github: string;
  linkedin: string;
  x: string;
  telegram: string;
};

export type ContactMessage = {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  read: boolean;
  createdAt: string;
};

export type OrderStatus = "pending" | "paid" | "cancelled" | "failed";
export type PaymentStatus = "pending" | "paid" | "failed" | "refunded";

export type Order = {
  id: string;
  serviceId: string | null;
  serviceTitle: string;
  customerName: string;
  customerEmail: string;
  notes: string | null;
  amount: number;
  currency: string;
  status: OrderStatus;
  createdAt: string;
  payments?: Payment[];
};

export type Payment = {
  id: string;
  orderId: string;
  provider: string;
  providerPaymentId: string | null;
  amount: number;
  currency: string;
  status: PaymentStatus;
  createdAt: string;
};

export type AdminStats = {
  projects: number;
  published: number;
  unreadMessages: number;
  pendingOrders: number;
  paidRevenue: number;
};
