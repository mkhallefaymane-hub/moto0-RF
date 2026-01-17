"use client"

import { Play, ChevronRight, ChevronLeft, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/lib/language-context"
import { useState } from "react"

export function HeroSection() {
  const { t, dir, formatPrice } = useLanguage()
  const ArrowIcon = dir === "rtl" ? ChevronLeft : ChevronRight
  const [searchQuery, setSearchQuery] = useState("")

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (!searchQuery.trim()) return
    
    // Dispatch search event to ListingsGrid
    window.dispatchEvent(new CustomEvent("search-listings", { detail: searchQuery }))
    
    // Scroll to listings section
    const listingsSection = document.getElementById("listings-section")
    if (listingsSection) {
      listingsSection.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-16 lg:pt-20 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="/used-dacia-logan-parked-in-moroccan-city-street-wi.jpg"
          alt={t("Véhicule à la une", "السيارة المميزة")}
          className="w-full h-full object-cover"
        />
        {/* Dark overlay for readability */}
        <div className="absolute inset-0 bg-black/60" />
        <div
          className={`absolute inset-0 bg-gradient-to-${dir === "rtl" ? "l" : "r"} from-background via-background/40 to-transparent`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/20" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-secondary/80 backdrop-blur-sm rounded-full mb-6">
            <span className="w-2 h-2 bg-accent rounded-full animate-pulse" />
            <span className="text-sm font-medium text-muted-foreground">
              {t("Nouvelles annonces disponibles", "إعلانات جديدة متاحة")}
            </span>
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-8xl font-black tracking-tighter text-foreground leading-none mb-6">
            {t("TROUVEZ", "اعثر على")}
            <br />
            <span className="text-accent">{t("VOTRE", "سيارتك")}</span>
            <br />
            {t("VÉHICULE", "المثالية")}
          </h1>

          <p className="text-lg lg:text-xl text-muted-foreground max-w-lg mb-8 leading-relaxed">
            {t(
              "Découvrez des véhicules d'occasion vérifiés partout au Maroc. Vendeurs de confiance, historique vérifié, transactions sécurisées.",
              "اكتشف سيارات مستعملة موثوقة في جميع أنحاء المغرب. بائعون موثوقون، سجل موثق، معاملات آمنة.",
            )}
          </p>

          <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-4 mb-8">
            <div className="relative flex-grow">
              <Search className={`absolute top-1/2 -translate-y-1/2 ${dir === "rtl" ? "right-4" : "left-4"} h-5 w-5 text-muted-foreground`} />
              <input
                type="text"
                placeholder={t("Marque, modèle, ville...", "الماركة، الموديل، المدينة...")}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`w-full h-14 ${dir === "rtl" ? "pr-12 pl-4" : "pl-12 pr-4"} rounded-xl bg-background/80 backdrop-blur-sm border border-border focus:outline-none focus:ring-2 focus:ring-accent font-medium text-foreground`}
              />
            </div>
            <Button
              type="submit"
              size="lg"
              className="bg-accent text-accent-foreground hover:bg-accent/90 font-bold text-base px-8 h-14 shrink-0"
            >
              {t("Rechercher", "بحث")}
            </Button>
          </form>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              size="lg"
              className="bg-foreground text-background hover:bg-foreground/90 font-bold text-base px-8 h-14"
            >
              {t("Explorer les annonces", "استعرض الإعلانات")}
              <ArrowIcon className={`${dir === "rtl" ? "mr-2" : "ml-2"} h-5 w-5`} />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-border bg-secondary/50 hover:bg-secondary text-foreground font-bold text-base px-8 h-14"
            >
              <Play className={`${dir === "rtl" ? "ml-2" : "mr-2"} h-5 w-5`} />
              {t("Voir les vidéos", "شاهد الفيديوهات")}
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground">
        <span className="text-xs uppercase tracking-widest">{t("Défiler", "مرر للأسفل")}</span>
        <div className="w-px h-12 bg-gradient-to-b from-muted-foreground to-transparent" />
      </div>
    </section>
  )
}
