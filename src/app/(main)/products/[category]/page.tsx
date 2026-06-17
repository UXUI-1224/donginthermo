import Link from 'next/link'
import { notFound } from 'next/navigation'
import { categories, categoryMeta, type CategoryId } from '@/data/products'
import { getProductsByCategory } from '@/lib/db'
import ProductGrid from './ProductGrid'

function CategoryNav({ active }: { active: CategoryId }) {
  return (
    <div className="sticky top-16 lg:top-20 z-40 bg-white border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="flex gap-0 overflow-x-auto">
          {categories.map((cat) => (
            <Link
              key={cat}
              href={`/products/${cat}`}
              className={`px-6 py-4 text-sm font-medium whitespace-nowrap border-b-2 transition-all duration-200 ${
                active === cat
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-900'
              }`}
            >
              {categoryMeta[cat].label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>
}) {
  const { category: categoryParam } = await params
  const category = categoryParam as CategoryId
  if (!categories.includes(category)) notFound()

  const products = await getProductsByCategory(category)

  return (
    <>
      <section className="pt-32 pb-20 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <p className="text-blue-500 text-xs font-semibold tracking-[0.25em] uppercase mb-4">
            Products
          </p>
          <h1 className="text-gray-900 text-4xl md:text-5xl font-bold leading-tight">
            The One Solution
            <br />
            For You
          </h1>
        </div>
      </section>

      <CategoryNav active={category} />

      <ProductGrid products={products} />
    </>
  )
}
