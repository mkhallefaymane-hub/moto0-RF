"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Search, Menu, X, Heart, User, Globe } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useLanguage } from "@/lib/language-context"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const { language, setLanguage, t, dir } = useLanguage()
  const router = useRouter()

  const toggleLanguage = () => {
    setLanguage(language === "fr" ? "ar" : "fr")
  }

  const navigateTo = (path: string) => {
    setIsMenuOpen(false)
    if (path.startsWith("#")) {
      const element = document.querySelector(path)
      if (element) {
        element.scrollIntoView({ behavior: "smooth" })
      }
    } else {
      router.push(path)
    }
  }

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border"
      dir={dir}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigateTo("/")}>
            <span className="text-2xl lg:text-3xl font-black tracking-tighter text-foreground">
              MOTO<span className="text-accent">.</span>
            </span>
          </div>

          {/* Desktop Navigation - French/Arabic labels */}
          <nav className="hidden lg:flex items-center gap-8">
            <button 
              onClick={() => navigateTo("#listings")} 
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              {t("Explorer", "استكشاف")}
            </button>
            <button 
              onClick={() => navigateTo("/sell")} 
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              {t("Publier une annonce", "نشر إعلان")}
            </button>
            <button 
              onClick={() => navigateTo("/auctions")} 
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              {t("Enchères", "المزادات")}
            </button>
            <button 
              onClick={() => navigateTo("/news")} 
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              {t("Actualités", "الأخبار")}
            </button>
          </nav>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center gap-4">
            <div className="relative">
              <Search
                className={`absolute ${dir === "rtl" ? "right-3" : "left-3"} top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground`}
              />
              <Input
                placeholder={t("Rechercher un véhicule...", "البحث عن سيارة...")}
                className={`w-64 ${dir === "rtl" ? "pr-10" : "pl-10"} bg-secondary border-0 focus-visible:ring-accent`}
              />
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleLanguage}
              className="text-muted-foreground hover:text-foreground font-semibold"
            >
              <Globe className="h-4 w-4 mr-1" />
              {language === "fr" ? "العربية" : "Français"}
            </Button>
            <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
              <Heart className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
              <User className="h-5 w-5" />
            </Button>
            <Button 
              className="bg-foreground text-background hover:bg-foreground/90 font-semibold"
              onClick={() => navigateTo("/sell")}
            >
              {t("Publier une annonce", "نشر إعلان")}
            </Button>
          </div>

          {/* Mobile Actions */}
          <div className="flex lg:hidden items-center gap-2">
            <Button variant="ghost" size="sm" onClick={toggleLanguage} className="text-muted-foreground text-xs">
              {language === "fr" ? "ع" : "FR"}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="text-muted-foreground"
            >
              <Search className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-muted-foreground"
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Search */}
        {isSearchOpen && (
          <div className="lg:hidden pb-4">
            <div className="relative">
              <Search
                className={`absolute ${dir === "rtl" ? "right-3" : "left-3"} top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground`}
              />
              <Input
                placeholder={t("Rechercher un véhicule...", "البحث عن سيارة...")}
                className={`w-full ${dir === "rtl" ? "pr-10" : "pl-10"} bg-secondary border-0`}
              />
            </div>
          </div>
        )}

        {/* Mobile Menu - French/Arabic labels */}
        {isMenuOpen && (
          <div className="lg:hidden pb-4 border-t border-border pt-4">
            <nav className="flex flex-col gap-4">
              <button 
                onClick={() => navigateTo("#listings")} 
                className="text-left text-sm font-medium text-muted-foreground hover:text-foreground"
              >
                {t("Explorer", "استكشاف")}
              </button>
              <button 
                onClick={() => navigateTo("/sell")} 
                className="text-left text-sm font-medium text-muted-foreground hover:text-foreground"
              >
                {t("Publier une annonce", "نشر إعلان")}
              </button>
              <button 
                onClick={() => navigateTo("/auctions")} 
                className="text-left text-sm font-medium text-muted-foreground hover:text-foreground"
              >
                {t("Enchères", "المزادات")}
              </button>
              <button 
                onClick={() => navigateTo("/news")} 
                className="text-left text-sm font-medium text-muted-foreground hover:text-foreground"
              >
                {t("Actualités", "الأخبار")}
              </button>
              <Button 
                className="bg-foreground text-background hover:bg-foreground/90 font-semibold w-full mt-2"
                onClick={() => navigateTo("/sell")}
              >
                {t("Publier une annonce", "نشر إعلان")}
              </Button>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
