import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Clock, Star } from "lucide-react"
import Image from "next/image"

interface CourseCardProps {
  title: string
  description: string
  instructor: string
  duration: string
  level: string
  price: number
  originalPrice?: number
  rating?: number
  tags?: string[]
  image: string
}

export function CourseCard({
  title,
  description,
  instructor,
  duration,
  level,
  price,
  originalPrice,
  rating,
  tags = [],
  image,
}: CourseCardProps) {
  // Format Indonesian Rupiah
  const formatIDR = (amount: number) => {
    if (amount === 0) return "GRATIS"
    if (amount >= 1000000) {
      return `Rp ${(amount / 1000000).toFixed(1).replace(".0", "")}jt`
    }
    if (amount >= 1000) {
      return `Rp ${(amount / 1000).toFixed(0)}rb`
    }
    return `Rp ${amount.toLocaleString("id-ID")}`
  }

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow group cursor-pointer border-0 p-0">
      <div className="relative aspect-[828/914] overflow-hidden bg-slate-50">
          <Image
            src={image || "/placeholder.svg"}
            alt={title}
            fill
            className="object-contain group-hover:scale-105 transition-transform duration-300"
          />
          {tags.length > 0 && (
            <div className="absolute top-3 left-3 flex gap-2">
              {tags.map((tag) => (
                <Badge key={tag} className="bg-primary text-primary-foreground font-semibold text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
          )}
        </div>
      <CardContent className="p-5 space-y-3">
        <h3 className="font-bold text-lg line-clamp-2 leading-snug">{title}</h3>
        <p className="text-sm text-muted-foreground line-clamp-2">{description}</p>
        <div className="text-sm text-muted-foreground">Oleh {instructor}</div>
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>{duration}</span>
          </div>
          <Badge variant="outline" className="font-normal">
            {level}
          </Badge>
          {rating && (
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-primary text-primary" />
              <span>{rating}</span>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="px-5 pb-5 pt-0">
        <div className="flex items-center gap-2">
          {originalPrice && originalPrice > 0 && (
            <span className="text-sm text-muted-foreground line-through">{formatIDR(originalPrice)}</span>
          )}
          <span className="text-2xl font-bold text-primary">{formatIDR(price)}</span>
        </div>
      </CardFooter>
    </Card>
  )
}
