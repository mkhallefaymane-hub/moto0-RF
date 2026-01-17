"use client"

import { useEffect, useState } from "react"
import { Play, Heart, MessageCircle, Share2, MessageSquare } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/lib/language-context"

export function FeaturedReels() {
  const { t, dir, formatPrice } = useLanguage()
  const [hoveredId, setHoveredId] = useState<string | null>(null)
  const [likedIds, setLikedIds] = useState<string[]>([])
  const [reels, setReels] = useState<any[]>([])

  useEffect(() => {
    fetch('/api/admin')
      .then(res => res.json())
      .then(data => {
        const trends = Array.isArray(data?.trends) ? data.trends : []
        setReels(trends.filter((t: any) => t.active))
      })
      .catch(() => {
        setReels([])
      })
  }, [])

  const toggleLike = (id: string) => {
    setLikedIds((prev) => (prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]))
  }

  return (
    <section className="py-12 lg:py-20 bg-background" dir={dir}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="text-3xl lg:text-5xl font-black tracking-tight text-foreground mb-2">
              {t("Tendances", "الأكثر رواجاً")}
              <span className="text-accent">.</span>
            </h2>
            <p className="text-muted-foreground">{t("Les plus vues cette semaine", "الأكثر مشاهدة هذا الأسبوع")}</p>
          </div>
          <Button variant="ghost" className="text-muted-foreground hover:text-foreground font-semibold">
            {t("Voir tout", "عرض الكل")}
          </Button>
        </div>

        {/* Reels Grid - Instagram Style */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {reels.map((reel) => (
            <div
              key={reel.id}
              className="relative aspect-[3/4] rounded-2xl overflow-hidden group cursor-pointer"
              onMouseEnter={() => setHoveredId(reel.id)}
              onMouseLeave={() => setHoveredId(null)}
              onClick={() => reel.url && window.open(reel.url, '_blank')}
            >
              {/* Thumbnail */}
              <img
                src={reel.thumbnail || "/placeholder.svg"}
                alt={t(reel.titleFr, reel.titleAr)}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />

              {/* Play Button */}
              <div
                className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${
                  hoveredId === reel.id ? "opacity-100" : "opacity-0"
                }`}
              >
                <div className="w-16 h-16 rounded-full bg-foreground/90 flex items-center justify-center">
                  <Play className={`h-6 w-6 text-background ${dir === "rtl" ? "mr-1" : "ml-1"}`} fill="currentColor" />
                </div>
              </div>

              {/* Side Actions */}
              <div
                className={`absolute ${dir === "rtl" ? "left-3" : "right-3"} bottom-24 flex flex-col items-center gap-4`}
              >
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    toggleLike(reel.id)
                  }}
                  className="flex flex-col items-center gap-1"
                >
                  <Heart
                    className={`h-6 w-6 transition-colors ${
                      likedIds.includes(reel.id) ? "text-red-500 fill-red-500" : "text-foreground"
                    }`}
                  />
                  <span className="text-xs font-semibold text-foreground">{reel.likes || '0'}</span>
                </button>
                <button className="flex flex-col items-center gap-1">
                  <MessageCircle className="h-6 w-6 text-foreground" />
                  <span className="text-xs font-semibold text-foreground">{reel.comments || '0'}</span>
                </button>
                <button className="flex flex-col items-center gap-1">
                  <Share2 className="h-5 w-5 text-foreground" />
                </button>
              </div>

              {/* Bottom Info */}
              <div className={`absolute bottom-0 ${dir === "rtl" ? "right-0 left-0" : "left-0 right-0"} p-4`}>
                <p className="text-xs text-muted-foreground mb-1">{reel.platform || 'Trend'}</p>
                <h3 className="text-base lg:text-lg font-bold text-foreground mb-1">{t(reel.titleFr, reel.titleAr)}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
