import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
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
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow group cursor-pointer">
      <CardHeader className="p-0">
        <div className="relative aspect-video overflow-hidden">
          <Image
            src={image || "/placeholder.svg"}
            alt={title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
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
      </CardHeader>
      <CardContent className="p-5 space-y-3">
        <h3 className="font-bold text-lg line-clamp-2 leading-snug">{title}</h3>
        <p className="text-sm text-muted-foreground line-clamp-2">{description}</p>
        <div className="text-sm text-muted-foreground">By {instructor}</div>
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
          {originalPrice && <span className="text-sm text-muted-foreground line-through">${originalPrice}</span>}
          <span className="text-2xl font-bold text-primary">${price}</span>
        </div>
      </CardFooter>
    </Card>
  )
}
