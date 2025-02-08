// Base Product Interface (from Sanity)
export interface Product {
  _id: string;
  slug: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  category: string;
  colors: number;
  isNew: boolean;
  size?: string;
  _createdAt: string;
}

// Cart Related Types
export interface CartItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  size: string;
  image: string;
  description: string;
  color: number;
}

export interface CartItemProps {
  item: CartItem;
}

// Wishlist Related Types
export interface WishlistItem {
  id: string;
  user_id: string;
  user_name: string;
  product_id: string;
  product_name: string;
  price: number;
  image_url: string;
  size?: string;
  created_at: string;
}

// Supabase Database Types
export interface SupabaseCartItem {
  id: string;
  user_id: string;
  product_id: string;
  product_name: string;
  quantity: number;
  size: string;
  price: number;
  image_url: string;
  created_at: string;
}

export interface SupabaseWishlistItem {
  id: string;
  user_id: string;
  user_name: string;
  product_id: string;
  product_name: string;
  price: number;
  image_url: string;
  size?: string;
  created_at: string;
}

// Component Props Types
export interface ProductCardProps {
  product: Product;
}

export interface ProductInfoProps {
  product: Product;
}

export interface WishlistButtonProps {
  productId: string;
  product: Product;
}

export type Category = {
  id: string;
  name: string;
  value: string;
};

export type SortOption =
  | "featured"
  | "price-low"
  | "price-high"
  | "newest"
  | "promo";

export type FilterProps = {
  categories: Category[];
  selectedCategories: string[];
  onFilterChange: (category: string) => void;
};

export type SortProps = {
  onSortChange: (value: SortOption) => void;
  currentSort: SortOption;
};

export type ProductGridProps = {
  products: Product[];
};

export interface CartStore {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
}
