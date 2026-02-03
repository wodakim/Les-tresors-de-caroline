import fs from 'fs/promises';
import path from 'path';

const DB_PATH = path.join(process.cwd(), 'data', 'db.json');

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  sizes: string[];
  colors: string[];
  material: string;
  image: string;
}

export interface Review {
  id: string;
  productId: string;
  user: string;
  rating: number;
  comment: string;
  date: string;
  image?: string; // Optional review image
}

export interface User {
  id: string;
  email: string;
  password?: string; // In a real app, hash this!
  role: 'admin' | 'user';
  name: string;
}

export interface DB {
  products: Product[];
  reviews: Review[];
  users: User[];
}

export async function getDB(): Promise<DB> {
  try {
    const data = await fs.readFile(DB_PATH, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    // If file doesn't exist, return default structure
    return { products: [], reviews: [], users: [] };
  }
}

export async function writeDB(db: DB): Promise<void> {
  await fs.writeFile(DB_PATH, JSON.stringify(db, null, 2));
}

export async function getProducts(): Promise<Product[]> {
  const db = await getDB();
  return db.products;
}

export async function getProductById(id: string): Promise<Product | undefined> {
  const db = await getDB();
  return db.products.find((p) => p.id === id);
}

export async function getReviewsByProductId(productId: string): Promise<Review[]> {
  const db = await getDB();
  return db.reviews.filter((r) => r.productId === productId);
}

export async function addProduct(product: Product): Promise<void> {
  const db = await getDB();
  db.products.push(product);
  await writeDB(db);
}

export async function updateProduct(id: string, updates: Partial<Product>): Promise<void> {
  const db = await getDB();
  const index = db.products.findIndex((p) => p.id === id);
  if (index !== -1) {
    db.products[index] = { ...db.products[index], ...updates };
    await writeDB(db);
  }
}

export async function deleteProduct(id: string): Promise<void> {
  const db = await getDB();
  db.products = db.products.filter((p) => p.id !== id);
  await writeDB(db);
}
