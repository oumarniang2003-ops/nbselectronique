let PRODUCTS = [];

async function loadProducts() {
  if (PRODUCTS.length > 0) return PRODUCTS;
  const res = await fetch('/api/products');
  const data = await res.json();

  PRODUCTS = data.map(p => ({
    id: p.id,
    name: p.name,
    category: p.category,
    categoryDisplay: p.category_display,
    price: Number(p.price),
    rating: Number(p.rating),
    reviewsCount: p.reviews_count,
    image: p.image,
    description: p.description,
    features: p.features,
    specs: p.specs,
    featured: p.featured
  }));

  return PRODUCTS;
}