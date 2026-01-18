"use client"

import { useState, useEffect } from "react"
import { Heart, MapPin, Gauge, Calendar, Fuel, ChevronRight, ChevronLeft, MessageSquare, Check, Inbox } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/lib/language-context"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

export function ListingsGrid() {
  const { t, dir, formatPrice } = useLanguage()
  const router = useRouter()
  const [savedIds, setSavedIds] = useState<string[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [activeCategory, setActiveCategory] = useState("all")
  const [adminData, setAdminData] = useState<any>({ listings: [], trends: [] })

  useEffect(() => {
    const handleSearch = (e: any) => {
      setSearchQuery(e.detail || "")
    }
    const handleCategory = (e: any) => {
      setActiveCategory(e.detail || "all")
    }
    window.addEventListener("search-listings", handleSearch)
    window.addEventListener("filter-category", handleCategory)
    
    // Fetch listings
    fetch('/api/listings').then(res => res.json())
      .then((data) => {
        setAdminData({ listings: data.listings || [] })
      }).catch(() => setAdminData({ listings: [] }))

    return () => {
      window.removeEventListener("search-listings", handleSearch)
      window.removeEventListener("filter-category", handleCategory)
    }
  }, [])

  const handleWhatsAppClick = (e: React.MouseEvent, listing: any) => {
    e.stopPropagation()
    if (listing.status === 'SOLD') {
      toast.error(t("Cette annonce est vendue", "هذا الإعلان مباع"))
      return
    }
    if (!listing.whatsapp) return
    const message = encodeURIComponent(`Bonjour, je suis intéressé par votre annonce : ${listing.title}`)
    const whatsappUrl = `https://wa.me/${listing.whatsapp}?text=${message}`
    router.push(`/safety?redirect=${encodeURIComponent(whatsappUrl)}`)
  }

  const handleCardClick = (id: string) => {
    router.push(`/listings/${id}`)
  }
  const ArrowIcon = dir === "rtl" ? ChevronLeft : ChevronRight

  const listings = adminData?.listings || []

  const filteredListings = listings.filter((listing: any) => {
    // Show only APPROVED or SOLD listings
    if (listing.status !== 'APPROVED' && listing.status !== 'SOLD') return false

    // Category filter logic
    if (activeCategory === "voiture") {
      if (listing.category !== "car") return false
    } else if (activeCategory === "moto") {
      if (listing.category !== "motorcycle") return false
    }

    if (!searchQuery) return true
    const q = searchQuery.toLowerCase().trim()
    
    // Comprehensive universal search across all available fields
    return (
      listing.title?.toLowerCase().includes(q) ||
      listing.brand?.toLowerCase().includes(q) ||
      listing.model?.toLowerCase().includes(q) ||
      listing.city?.toLowerCase().includes(q) ||
      listing.fuel?.toLowerCase().includes(q) ||
      listing.year?.toString().includes(q) ||
      listing.price?.toString().includes(q) ||
      listing.description?.toLowerCase().includes(q)
    )
  })

  const getBadgeVariant = (status: string) => {
    switch (status) {
      case "APPROVED":
        return "bg-emerald-500/20 text-emerald-400 border-emerald-500/30"
      case "SOLD":
        return "bg-blue-500/20 text-blue-400 border-blue-500/30"
      default:
        return "bg-secondary text-secondary-foreground"
    }
  }

  const toggleSave = (id: string) => {
    setSavedIds((prev: any) => (prev.includes(id) ? prev.filter((i: any) => i !== id) : [...prev, id]))
  }

  return (
    <section id="listings" className="py-12 lg:py-20 bg-secondary/30" dir={dir}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="text-3xl lg:text-5xl font-black tracking-tight text-foreground mb-2">
              {t("Dernières annonces", "أحدث الإعلانات")}
              <span className="text-accent">.</span>
            </h2>
            <p className="text-muted-foreground">
              {t("Nouvelles arrivées de vendeurs vérifiés", "وصول جديد من بائعين موثوقين")}
            </p>
          </div>
          <Button variant="ghost" className="text-muted-foreground hover:text-foreground font-semibold hidden sm:flex">
            {t("Voir tout", "عرض الكل")}
            <ArrowIcon className={`${dir === "rtl" ? "mr-1" : "ml-1"} h-4 w-4`} />
          </Button>
        </div>

        {/* Listings Grid */}
        {filteredListings.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredListings.map((listing: any) => (
              <div
                key={listing.id}
                onClick={() => handleCardClick(listing.id)}
                className={`group bg-card rounded-2xl overflow-hidden border border-border hover:border-accent/50 transition-all duration-300 relative cursor-pointer ${listing.status === 'SOLD' ? "opacity-75" : ""}`}
              >
                {listing.status === 'SOLD' && (
                  <div className="absolute inset-0 z-20 pointer-events-none">
                    <div
                      className={`absolute ${dir === "rtl" ? "-left-12" : "-right-12"} top-8 ${dir === "rtl" ? "rotate-[-45deg]" : "rotate-45"} bg-red-600 text-foreground text-sm font-black py-2 px-16`}
                    >
                      {t("VENDU", "مباع")}
                    </div>
                  </div>
                )}

                {/* Image Container */}
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={listing.images?.[0] || "/placeholder.svg"}
                    alt={listing.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />

                  {/* Save Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      toggleSave(listing.id)
                    }}
                    className={`absolute top-3 ${dir === "rtl" ? "left-3" : "right-3"} w-10 h-10 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center transition-transform hover:scale-110`}
                  >
                    <Heart
                      className={`h-5 w-5 transition-colors ${
                        savedIds.includes(listing.id) ? "text-red-500 fill-red-500" : "text-foreground"
                      }`}
                    />
                  </button>
                </div>

                {/* Content */}
                <div className="p-5">
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <div>
                      <h3 className="text-lg font-bold text-foreground group-hover:text-accent transition-colors">
                        {listing.title}
                      </h3>
                      {/* Brand/Model details often empty if not properly mapped, ensuring visibility */}
                      <p className="text-sm text-muted-foreground">{listing.brand} {listing.model}</p>
                    </div>
                    <p className="text-xl font-black text-accent whitespace-nowrap">{formatPrice(listing.price)}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-3 mb-3">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <MapPin className="h-4 w-4 flex-shrink-0" />
                      <span className="truncate">{listing.city}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Gauge className="h-4 w-4 flex-shrink-0" />
                      <span>{listing.mileage || "—"} km</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4 flex-shrink-0" />
                      <span>{listing.year || "—"}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Fuel className="h-4 w-4 flex-shrink-0" />
                      <span>{listing.fuel || "—"}</span>
                    </div>
                  </div>

                  {/* CTA */}
                  {listing.status === 'SOLD' ? (
                    <Button disabled className="w-full bg-secondary/50 text-muted-foreground font-semibold cursor-not-allowed">
                      {t("Annonce vendue", "الإعلان مباع")}
                    </Button>
                  ) : (
                    <Button 
                      className="w-full bg-green-600 hover:bg-green-700 text-foreground font-semibold"
                      onClick={(e) => handleWhatsAppClick(e, listing)}
                    >
                      <MessageSquare className={`h-4 w-4 ${dir === "rtl" ? "ml-2" : "mr-2"}`} />
                      {t("Contacter", "تواصل")}
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-20 text-center bg-card border border-dashed border-border rounded-3xl">
            <Inbox className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-bold">{t("Aucune annonce", "لا توجد إعلانات")}</h3>
          </div>
        )}
      </div>
    </section>
  )
}
