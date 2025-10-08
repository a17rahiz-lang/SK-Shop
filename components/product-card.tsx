import Image from "next/image"
import Link from "next/link"
import { MapPin } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface ProductCardProps {
  id: string
  title: string
  price: number
  location: string
  image: string
  condition?: "new" | "used"
  featured?: boolean
}

export function ProductCard({ id, title, price, location, image, condition, featured = false }: ProductCardProps) {
  return (
    <Link href={`/product/${id}`}>
      <Card className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer group">
        <div className="relative aspect-square overflow-hidden bg-muted">
          <Image
            src={image || "/placeholder.svg"}
            alt={title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {condition && (
            <Badge variant={condition === "new" ? "default" : "secondary"} className="absolute top-2 left-2">
              {condition === "new" ? "New" : "Used"}
            </Badge>
          )}
        </div>
        <CardContent className="p-3">
          <div className="space-y-2">
            <p className="text-lg font-bold text-primary">৳ {price.toLocaleString()}</p>
            <h3 className="text-sm font-medium line-clamp-2 leading-tight">{title}</h3>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <MapPin className="w-3 h-3" />
              <span>{location}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
