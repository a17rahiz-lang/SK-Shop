"use client"

import { useState, useEffect } from "react"
import { collection, query, orderBy, limit, getDocs } from "firebase/firestore"
import { db } from "@/lib/firebase"

export interface Product {
  id: string
  title: string
  description: string
  price: number
  category: string
  location: string
  condition: "new" | "used"
  images: string[]
  userId: string
  userEmail: string
  userName: string
  createdAt: any
  status: string
}

export function useProducts(limitCount = 20) {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true)
        const productsRef = collection(db, "products")
        const q = query(productsRef, orderBy("createdAt", "desc"), limit(limitCount))

        const querySnapshot = await getDocs(q)
        const productsData: Product[] = []

        querySnapshot.forEach((doc) => {
          productsData.push({
            id: doc.id,
            ...doc.data(),
          } as Product)
        })

        setProducts(productsData)
        setError(null)
      } catch (err: any) {
        console.error("[v0] Error fetching products:", err)
        setError(err.message || "Failed to fetch products")
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [limitCount])

  return { products, loading, error }
}
