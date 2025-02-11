"use client"
import Image from "next/image"
import { useRouter, useSearchParams } from "next/navigation"

import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import type { Product } from "@/types/product"

// Sample data - replace with your actual data fetching logic
const products: Product[] = [
  {
    id: "PROD001",
    name: "Banarasi Silk Saree",
    description: "Traditional Banarasi silk saree with intricate zari work",
    thumbnails: ["/placeholder.svg"],
    colors: ["Red", "Blue", "Green"],
    price: 15999,
    stock: 10,
    reviews: [
      {
        id: "REV001",
        rating: 5,
        comment: "Beautiful saree, excellent quality!",
        customerName: "Priya Sharma",
        createdAt: new Date(),
      },
    ],
  },
  // Add more products...
]

export function ProductList() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const selectedId = searchParams.get("id")

  return (
    <div className="p-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <div
            key={product.id}
            className={cn(
              "cursor-pointer rounded-lg border p-4 transition-colors hover:bg-muted/50",
              selectedId === product.id && "border-primary bg-muted",
            )}
            onClick={() => {
              router.push(`/dashboard/products?id=${product.id}`)
            }}
          >
            <div className="aspect-square overflow-hidden rounded-lg">
              <Image
                src={product.thumbnails[0] || "/placeholder.svg"}
                alt={product.name}
                width={400}
                height={400}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="mt-4">
              <h3 className="font-semibold">{product.name}</h3>
              <p className="mt-1 text-sm text-muted-foreground">₹{product.price.toLocaleString()}</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {product.colors.map((color) => (
                  <Badge key={color} variant="secondary">
                    {color}
                  </Badge>
                ))}
              </div>
              <div className="mt-2 flex items-center justify-between">
                <Badge variant={product.stock > 0 ? "default" : "destructive"}>
                  {product.stock > 0 ? "In Stock" : "Out of Stock"}
                </Badge>
                <span className="text-sm text-muted-foreground">{product.stock} left</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

