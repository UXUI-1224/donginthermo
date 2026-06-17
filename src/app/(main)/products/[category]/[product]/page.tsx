import { notFound } from 'next/navigation'
import { categories, type CategoryId } from '@/data/products'
import { getProduct, getProductsByCategory } from '@/lib/db'
import ProductDetailClient from './ProductDetailClient'

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ category: string; product: string }>
}) {
  const { category: categoryParam, product: productParam } = await params
  const category = categoryParam as CategoryId
  if (!categories.includes(category)) notFound()

  const [product, allInCategory] = await Promise.all([
    getProduct(category, productParam),
    getProductsByCategory(category),
  ])

  if (!product) notFound()

  const siblings = allInCategory.filter((p) => p.id !== product.id)

  return <ProductDetailClient product={product} siblings={siblings} />
}
