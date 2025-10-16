export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'ojos' | 'labios' | 'rostro' | 'unas';
  image: string;
  imageUrl?: string;
  stock: number;
  featured?: boolean;
  brand?: string;
}

export const categories = {
  ojos: 'Ojos',
  labios: 'Labios',
  rostro: 'Rostro',
  unas: 'Uñas'
};