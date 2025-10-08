"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import { collection, query, where, orderBy, getDocs, deleteDoc, doc } from "firebase/firestore"
import { db } from "@/lib/firebase"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Spinner } from "@/components/ui/spinner"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Trash2, Eye } from "lucide-react"
import type { Product } from "@/hooks/use-products"
import Link from "next/link"

export default function MyAdsPage() {
  const { user } = useAuth()
  const router = useRouter()
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    if (!user) {
      router.push("/sign-in")
      return
    }

    const fetchMyAds = async () => {
      try {
        const q = query(collection(db, "products"), where("userId", "==", user.uid), orderBy("createdAt", "desc"))

        const querySnapshot = await getDocs(q)
        const adsData: Product[] = []

        querySnapshot.forEach((doc) => {
          adsData.push({
            id: doc.id,
            ...doc.data(),
          } as Product)
        })

        setProducts(adsData)
      } catch (err: any) {
        console.error("[v0] Error fetching ads:", err)
        setError(err.message || "Failed to fetch your ads")
      } finally {
        setLoading(false)
      }
    }

    fetchMyAds()
  }, [user, router])

  const handleDelete = async (productId: string) => {
    if (!confirm("Are you sure you want to delete this ad?")) {
      return
    }

    try {
      await deleteDoc(doc(db, "products", productId))
      setProducts(products.filter((p) => p.id !== productId))
    } catch (err: any) {
      alert("Failed to delete ad: " + err.message)
    }
  }

  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">My Ads</h1>
          <Button asChild>
            <Link href="/post-ad">Post New Ad</Link>
          </Button>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Spinner className="w-8 h-8" />
          </div>
        ) : error ? (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        ) : products.length === 0 ? (
          <Card>
            <CardContent className="py-20 text-center">
              <p className="text-xl font-semibold mb-2">You haven't posted any ads yet</p>
              <p className="text-muted-foreground mb-6">Start selling by posting your first ad</p>
              <Button asChild>
                <Link href="/post-ad">Post Your First Ad</Link>
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {products.map((product) => (
              <Card key={product.id}>
                <CardContent className="p-4">
                  <div className="flex gap-4">
                    <div className="w-32 h-32 relative rounded-lg overflow-hidden bg-muted flex-shrink-0">
                      <img
                        src={product.images[0] || "/placeholder.svg"}
                        alt={product.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1 min-w-0">
                          <h3 className="text-lg font-semibold mb-1 truncate">{product.title}</h3>
                          <p className="text-2xl font-bold text-primary mb-2">৳ {product.price.toLocaleString()}</p>
                          <div className="flex gap-2 mb-2">
                            <Badge variant={product.condition === "new" ? "default" : "secondary"}>
                              {product.condition === "new" ? "New" : "Used"}
                            </Badge>
                            <Badge variant="outline">{product.category}</Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {product.location} • Posted{" "}
                            {product.createdAt?.toDate?.()?.toLocaleDateString() || "Recently"}
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="icon" asChild>
                            <Link href={`/product/${product.id}`}>
                              <Eye className="w-4 h-4" />
                            </Link>
                          </Button>
                          <Button variant="outline" size="icon" onClick={() => handleDelete(product.id)}>
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
