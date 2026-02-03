import { NextResponse } from 'next/server';
import { getProducts, addProduct, Product } from '@/lib/db';

export async function GET() {
  const products = await getProducts();
  return NextResponse.json(products);
}

export async function POST(request: Request) {
  const body = await request.json();

  // Basic validation
  if (!body.name || !body.price) {
    return NextResponse.json({ error: 'Name and Price are required' }, { status: 400 });
  }

  const newProduct: Product = {
    id: Date.now().toString(), // Simple ID generation
    name: body.name,
    description: body.description || '',
    price: Number(body.price),
    category: body.category || 'Uncategorized',
    sizes: body.sizes || [],
    colors: body.colors || [],
    material: body.material || '',
    image: body.image || 'https://placehold.co/600x400',
  };

  await addProduct(newProduct);
  return NextResponse.json(newProduct, { status: 201 });
}
