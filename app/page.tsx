"use client"

import { Header } from "@/components/header"
import { CategorySidebar } from "@/components/category-sidebar"
import { SearchHero } from "@/components/search-hero"
import { ProductCard } from "@/components/product-card"
import { Button } from "@/components/ui/button"
import { Grid3x3, List } from "lucide-react"
import { useProducts } from "@/hooks/use-products"
import { Spinner } from "@/components/ui/spinner"

export default function HomePage() {
  const { products, loading, error } = useProducts(20)

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <SearchHero />

      <div className="flex flex-1">
        <CategorySidebar />

        <main className="flex-1 p-6">
          {/* Header with view toggle */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Trending ads</h2>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon">
                <Grid3x3 className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <List className="w-5 h-5" />
              </Button>
            </div>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-20">
              <Spinner className="w-8 h-8" />
            </div>
          ) : error ? (
            <div className="text-center py-20">
              <p className="text-destructive mb-4">{error}</p>
              <p className="text-muted-foreground">Please try again later</p>
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-xl font-semibold mb-2">No ads yet</p>
              <p className="text-muted-foreground mb-6">Be the first to post an ad!</p>
              <Button asChild>
                <a href="/post-ad">Post Your First Ad</a>
              </Button>
            </div>
          ) : (
            <>
              {/* Product Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {products.map((product) => (
                  <ProductCard
                    key={product.id}
                    id={product.id}
                    title={product.title}
                    price={product.price}
                    location={product.location}
                    image={product.images[0]}
                    condition={product.condition}
                  />
                ))}
              </div>

              {/* Load More */}
              <div className="mt-8 text-center">
                <Button variant="outline" size="lg">
                  Load More Ads
                </Button>
              </div>
            </>
          )}
        </main>
      </div>
    </div>
  )
}
