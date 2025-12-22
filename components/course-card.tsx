import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Clock, Star, CheckCircle2, PlayCircle } from "lucide-react"
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
  isOwned?: boolean
}

// Max characters for tag display (based on "Private University" = 18 chars)
const MAX_TAG_LENGTH = 18

function truncateTag(tag: string): string {
  if (tag.length <= MAX_TAG_LENGTH) return tag
  return tag.slice(0, MAX_TAG_LENGTH).trim() + "..."
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
  isOwned = false,
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
    <Card className={`overflow-hidden hover:shadow-lg transition-shadow group cursor-pointer p-0 ${
      isOwned
        ? 'border-2 border-[#1c9af1]/40'
        : 'border-0'
    }`}>
      <div className="relative aspect-[828/914] overflow-hidden bg-slate-50">
          <Image
            src={image || "/placeholder.svg"}
            alt={title}
            fill
            className="object-contain group-hover:scale-105 transition-transform duration-300"
          />
          {/* Owned Badge - Shows at top left when owned */}
          {isOwned ? (
            <div className="absolute top-3 left-3 flex gap-2">
              <Badge className="bg-green-500 text-white border-0 font-semibold text-xs shadow-md">
                <CheckCircle2 className="w-3 h-3 mr-1" />
                DIMILIKI
              </Badge>
            </div>
          ) : (
            tags.length > 0 && (
              <div className="absolute top-3 left-3 flex gap-2">
                {tags.map((tag) => (
                  <Badge
                    key={tag}
                    className="bg-primary text-primary-foreground font-semibold text-xs"
                    title={tag.length > MAX_TAG_LENGTH ? tag : undefined}
                  >
                    {truncateTag(tag)}
                  </Badge>
                ))}
              </div>
            )
          )}
        </div>
      <CardContent className="p-5 space-y-3">
        <h3 className="font-bold text-lg line-clamp-2 leading-snug">{title}</h3>
        <p className="text-sm text-muted-foreground line-clamp-2">{description}</p>
        <div className="text-sm text-muted-foreground">Oleh {instructor}</div>
        <div className="flex items-center gap-3 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>{duration}</span>
          </div>
          {rating && (
            <>
              <span className="text-muted-foreground/50">•</span>
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 fill-primary text-primary" />
                <span>{rating}</span>
              </div>
            </>
          )}
        </div>
      </CardContent>
      <CardFooter className="px-5 pb-5 pt-0">
        {isOwned ? (
          <Button className="w-full bg-[#1c9af1] hover:bg-[#1580d1] text-white font-semibold">
            <PlayCircle className="w-4 h-4 mr-2" />
            Lanjutkan Belajar
          </Button>
        ) : (
          <div className="flex items-center gap-2">
            {originalPrice && originalPrice > 0 && (
              <span className="text-sm text-muted-foreground line-through">{formatIDR(originalPrice)}</span>
            )}
            <span className="text-2xl font-bold text-primary">{formatIDR(price)}</span>
          </div>
        )}
      </CardFooter>
    </Card>
  )
}
