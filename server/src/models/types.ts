export interface Product {
  id?: number;
  image: string;
  name: string;
  price: number;
  description: string;
  category: string;
}

export interface CartItem {
  id?: number;
  productId: number;
  quantity: number;
}
